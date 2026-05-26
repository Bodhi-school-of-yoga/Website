# Variables for Bodhi CMS Terraform configuration

variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "bodhi-cms"
}

variable "environment" {
  description = "Environment (dev, staging, production)"
  type        = string
  default     = "production"
}

variable "ssh_public_key" {
  description = "SSH public key for EC2 access (optional - will be auto-generated if not provided)"
  type        = string
  default     = null
  sensitive   = true
}

variable "ec2_instance_type" {
  description = "EC2 instance type for Strapi CMS"
  type        = string
  default     = "t3.medium"
}

variable "root_volume_size" {
  description = "Root volume size in GB"
  type        = number
  default     = 30
}
