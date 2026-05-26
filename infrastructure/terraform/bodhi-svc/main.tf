# Terraform configuration for Bodhi CMS deployment on AWS
# Creates: EC2 instance + Security Groups + S3 + CloudFront

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Get latest Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] # Canonical
}

# Get default VPC
data "aws_vpc" "default" {
  default = true
}

# Security Group for Strapi CMS EC2
resource "aws_security_group" "strapi_ec2" {
  name        = "${var.project_name}-strapi-ec2"
  description = "Security group for Strapi CMS EC2 instance"
  vpc_id      = data.aws_vpc.default.id

  # SSH access
  ingress {
    description = "SSH from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Strapi default port
  ingress {
    description = "Strapi CMS port"
    from_port   = 1337
    to_port     = 1337
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Node.js debugger (optional)
  ingress {
    description = "Node.js debugger"
    from_port   = 9229
    to_port     = 9229
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Explicit Supabase PostgreSQL access
  egress {
    description        = "Allow PostgreSQL to Supabase"
    from_port          = 5432
    to_port            = 5432
    protocol           = "tcp"
    cidr_blocks        = ["0.0.0.0/0"]
  }

  # Explicit HTTPS access
  egress {
    description        = "Allow HTTPS traffic"
    from_port          = 443
    to_port            = 443
    protocol           = "tcp"
    cidr_blocks        = ["0.0.0.0/0"]
  }

  # Explicit HTTP access
  egress {
    description        = "Allow HTTP traffic"
    from_port          = 80
    to_port            = 80
    protocol           = "tcp"
    cidr_blocks        = ["0.0.0.0/0"]
  }

  # Allow all other outbound traffic
  egress {
    description = "Allow all other outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-strapi-ec2"
    Environment = var.environment
  }
}

# Generate SSH key pair
resource "tls_private_key" "deployer" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "deployer" {
  key_name   = "${var.project_name}-deployer-key"
  public_key = tls_private_key.deployer.public_key_openssh

  tags = {
    Name        = "${var.project_name}-deployer"
    Environment = var.environment
  }
}

# EC2 Instance for Strapi CMS
resource "aws_instance" "strapi_cms" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.ec2_instance_type
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.strapi_ec2.id]
  user_data              = templatefile("${path.module}/user-data.sh", {
    project_name = var.project_name
  })

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.root_volume_size
    delete_on_termination = true
    encrypted             = true
  }

  metadata_options {
    http_tokens                 = "required" # IMDSv2 only
    http_put_response_hop_limit = 1
  }

  tags = {
    Name        = "${var.project_name}-strapi-cms"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Elastic IP for EC2 instance
resource "aws_eip" "strapi_cms" {
  domain = "vpc"

  tags = {
    Name        = "${var.project_name}-strapi-eip"
    Environment = var.environment
  }

  depends_on = [aws_instance.strapi_cms]
}

resource "aws_eip_association" "strapi_cms" {
  instance_id   = aws_instance.strapi_cms.id
  allocation_id = aws_eip.strapi_cms.id
}

# S3 Bucket for static assets
resource "aws_s3_bucket" "static_assets" {
  bucket = "${var.project_name}-static-assets-${random_id.bucket_suffix.hex}"
  
  tags = {
    Name        = "${var.project_name}-static-assets"
    Environment = var.environment
  }
}

# S3 Bucket versioning
resource "aws_s3_bucket_versioning" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id
  versioning_configuration {
    status = "Enabled"
  }
}

# S3 Bucket encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# S3 Bucket public access block
resource "aws_s3_bucket_public_access_block" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id
  
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 Bucket policy for CloudFront
resource "aws_s3_bucket_policy" "static_assets" {
  bucket = aws_s3_bucket.static_assets.id
  policy = data.aws_iam_policy_document.s3_public_read.json
}

# IAM policy for S3 public read via CloudFront
data "aws_iam_policy_document" "s3_public_read" {
  statement {
    sid     = "AllowCloudFrontServicePrincipalRead"
    actions = ["s3:GetObject"]
    effect  = "Allow"
    
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    
    resources = ["${aws_s3_bucket.static_assets.arn}/*"]
    
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.static_assets.arn]
    }
  }
}

# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "static_assets" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.project_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "never"
  signing_protocol                  = "sigv4"
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "static_assets" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100" # Cheapest (US/Europe)

  origin {
    domain_name              = aws_s3_bucket.static_assets.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.static_assets.id
    origin_access_control_id = aws_cloudfront_origin_access_control.static_assets.id

    s3_origin_config {
      origin_access_identity = ""
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.static_assets.id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  viewer_certificate {
    acm_certificate_arn      = ""
    cloudfront_default_certificate = true
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  # SPA fallback
  custom_error_response {
    error_code         = 403
    response_code       = 200
    response_page_path  = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code       = 200
    response_page_path  = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Name        = "${var.project_name}-cloudfront"
    Environment = var.environment
  }
}


# Random ID
resource "random_id" "bucket_suffix" {
  byte_length = 4
}
