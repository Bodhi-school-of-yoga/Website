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
  description = "Complete Deployment Instructions"
  value       = <<-EOT
    ## 🚀 Deploy Strapi CMS to EC2

    ### 1. Initial Setup
    terraform output ssh_private_key > deployer-key.pem
    chmod 400 deployer-key.pem
    export EC2_IP=$(terraform output ec2_public_ip | tr -d '"')

    ### 2. Deploy App via SCP
    scp -i deployer-key.pem -r ../../apps/cms ubuntu@$EC2_IP:/home/ubuntu/apps/
    ssh -i deployer-key.pem ubuntu@$EC2_IP
    cd /home/ubuntu/apps/cms
    npm install && npm run build

    ### 3. Configure Environment
    nano /home/ubuntu/apps/cms/.env
    # Add Supabase credentials and Strapi config

    ### 4. Start with PM2
    pm2 start npm --name "strapi" -- start
    pm2 save

    ### 5. Access Strapi
    http://$EC2_IP:1337/admin

    ## 🔄 Quick Commands (from local)
    # Restart: ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 restart strapi"
    # Logs:    ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 logs strapi"
    # Status:  ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 status"

    ## 📚 Full Guide
    See: scripts/deployment-instructions.md
    EOT
}
