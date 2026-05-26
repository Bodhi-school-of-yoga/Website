# 🚀 Bodhi CMS Quick Start

## One-Line Deploy
```bash
./_workspace/deploy.sh deploy && ./_workspace/deploy.sh restart
```

## Common Commands
```bash
# Deploy app
./_workspace/deploy.sh deploy

# Restart Strapi
./_workspace/deploy.sh restart

# View logs
./_workspace/deploy.sh logs

# Check status
./_workspace/deploy.sh status

# Edit environment
./_workspace/deploy.sh env

# SSH to server
./_workspace/deploy.sh connect
```

## Manual Deployment
```bash
# 1. Get SSH key
terraform output ssh_private_key > deployer-key.pem
chmod 400 deployer-key.pem

# 2. Deploy app
EC2_IP=$(terraform output ec2_public_ip | tr -d '"')
scp -i deployer-key.pem -r ../../apps/cms ubuntu@$EC2_IP:/home/ubuntu/apps/

# 3. Build & start
ssh -i deployer-key.pem ubuntu@$EC2_IP
cd /home/ubuntu/apps/cms
npm install && npm run build
pm2 start npm --name "strapi" -- start
pm2 save
```

## Access
- **Strapi Admin**: `http://$(terraform output ec2_public_ip | tr -d '"'):1337/admin`
- **SSH**: `ssh -i deployer-key.pem ubuntu@$(terraform output ec2_public_ip | tr -d '"')`

## Troubleshooting
```bash
# Check connectivity
curl http://$EC2_IP:1337/api/home

# Check PM2 status
ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 status"

# View logs
ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 logs strapi"
```