# Strapi CMS EC2 Deployment Guide

## Infrastructure Overview
- **Region**: ap-south-1 (Mumbai)
- **VPC**: Default VPC in ap-south-1
- **Instance**: Ubuntu 22.04 with t3.medium
- **Storage**: 30GB GP3 encrypted volume
- **Security**: Opens ports 22, 80, 443, 1337, 9229
- **Access**: SSH key pair (auto-generated)

## Quick Start

### 1. Deploy Infrastructure
```bash
cd infrastructure/terraform/bodhi-svc
terraform init
terraform plan
terraform apply
```

### 2. Get Connection Details
```bash
# Save SSH key
terraform output ssh_private_key > deployer-key.pem
chmod 400 deployer-key.pem

# Get connection details
terraform output ec2_public_ip
terraform output ssh_connection_string
terraform output deployment_instructions
```

### 3. Connect to EC2
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP>
```

## Deploy Strapi CMS

### Option 1: Deploy from Local Machine
```bash
# Copy app to EC2
scp -i deployer-key.pem -r ../../apps/cms ubuntu@<PUBLIC_IP>:/home/ubuntu/apps/

# Install and start
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> << 'ENDSSH'
cd /home/ubuntu/apps/cms
npm install
npm run build
pm2 start npm --name "strapi" -- start
pm2 save
pm2 status
ENDSSH
```

### Option 2: Clone & Build on EC2
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP>
cd /home/ubuntu/apps
git clone <your-repo-url> cms
cd cms
npm install
npm run build
pm2 start npm --name "strapi" -- start
pm2 save
```

## Management Commands

### Restart Strapi (from local)
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "pm2 restart strapi"
```

### View Logs (from local)
```bash
# Real-time logs
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "pm2 logs strapi"

# Last 100 lines
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "pm2 logs strapi --lines 100"
```

### Check Status
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "pm2 status"
```

### Stop/Start
```bash
# Stop
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "pm2 stop strapi"

# Start
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "pm2 start strapi"
```

### Update Code
```bash
# Pull latest changes
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> << 'ENDSSH'
cd /home/ubuntu/apps/cms
git pull
npm install
npm run build
pm2 restart strapi
ENDSSH
```

## Access Strapi

- **Strapi Admin**: http://<PUBLIC_IP>:1337/admin
- **Strapi API**: http://<PUBLIC_IP>:1337/api
- **Via Nginx**: http://<PUBLIC_IP>/admin

## Environment Setup

### Create .env file on EC2
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP>
cd /home/ubuntu/apps/cms
cat > .env << 'ENVEOF'
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_NAME=Strapi
# Add your database, API keys, etc.
ENVEOF
```

### Database Setup (PostgreSQL)
```bash
# Install PostgreSQL on EC2 (for development)
sudo apt install -y postgresql postgresql-contrib
sudo -u postgres createdb strapi
sudo -u postgres createuser ubuntu
sudo -u postgres psql -c "ALTER USER ubuntu PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE strapi TO ubuntu;"
```

## Troubleshooting

### Check if Strapi is running
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "pm2 status"
```

### Check port 1337
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "netstat -tlnp | grep 1337"
```

### View system logs
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "journalctl -u nginx -n 50"
```

### Restart nginx
```bash
ssh -i deployer-key.pem ubuntu@<PUBLIC_IP> "sudo systemctl restart nginx"
```

## Security

### Security Groups
- Port 22: SSH (restrict to your IP in production)
- Port 80: HTTP
- Port 443: HTTPS
- Port 1337: Strapi direct access
- Port 9229: Node.js debugger (remove in production)

### Recommended Security Hardening
1. Restrict SSH access to your IP only
2. Set up SSL/TLS certificates
3. Configure firewall rules
4. Regular security updates
5. Monitor CloudWatch logs

## Costs

Estimated monthly costs (ap-south-1):
- **EC2 t3.medium**: ~$25/month
- **EIP**: ~$3/month (if not attached to running instance)
- **Data transfer**: Varies
- **Total**: ~$30-50/month

## Cleanup

```bash
terraform destroy
```