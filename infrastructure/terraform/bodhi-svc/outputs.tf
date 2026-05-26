# Outputs for Bodhi CMS AWS deployment

output "ec2_public_ip" {
  description = "EC2 Instance Public IP"
  value       = aws_eip.strapi_cms.public_ip
}

output "ec2_instance_id" {
  description = "EC2 Instance ID"
  value       = aws_instance.strapi_cms.id
}

output "strapi_url" {
  description = "Strapi CMS URL"
  value       = "http://${aws_eip.strapi_cms.public_ip}:1337"
}

output "ssh_private_key" {
  description = "SSH Private Key Content (save this to a .pem file)"
  value       = tls_private_key.deployer.private_key_pem
  sensitive   = true
}

output "ssh_connection_string" {
  description = "SSH Connection String"
  value       = "ssh -i deployer-key.pem ubuntu@${aws_eip.strapi_cms.public_ip}"
}

output "cloudfront_url" {
  description = "CloudFront URL"
  value       = "https://${aws_cloudfront_distribution.static_assets.domain_name}"
}

output "s3_bucket" {
  description = "S3 Bucket Name"
  value       = aws_s3_bucket.static_assets.id
}

output "deployment_instructions" {
  description = "Deployment Instructions"
  value       = <<-EOT
    ## Deploy Strapi CMS to EC2

    1. Save SSH key:
       terraform output ssh_private_key > deployer-key.pem
       chmod 400 deployer-key.pem

    2. Connect to EC2:
       ${aws_eip.strapi_cms.public_ip}
       ssh -i deployer-key.pem ubuntu@${aws_eip.strapi_cms.public_ip}

    3. Deploy Strapi app from ./apps/cms/:
       scp -i deployer-key.pem -r ./apps/cms ubuntu@${aws_eip.strapi_cms.public_ip}:/home/ubuntu/
       ssh -i deployer-key.pem ubuntu@${aws_eip.strapi_cms.public_ip}
       cd /home/ubuntu/cms
       npm install
       npm run build
       pm2 start npm --name "strapi" -- start
       pm2 save

    4. Restart from local:
       ssh -i deployer-key.pem ubuntu@${aws_eip.strapi_cms.public_ip} "pm2 restart strapi"

    5. View logs:
       ssh -i deployer-key.pem ubuntu@${aws_eip.strapi_cms.public_ip} "pm2 logs strapi"

    6. Strapi URL: http://${aws_eip.strapi_cms.public_ip}:1337
    EOT
}
