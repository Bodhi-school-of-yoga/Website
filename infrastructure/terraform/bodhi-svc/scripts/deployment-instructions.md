# Bodhi CMS Deployment Instructions

## Initial Setup

### 1. Deploy Infrastructure
```bash
cd infrastructure/terraform/bodhi-svc
terraform apply
```

### 2. Get Connection Details
```bash
# Get EC2 public IP
terraform output ec2_public_ip

# Save SSH key
terraform output ssh_private_key > deployer-key.pem
chmod 400 deployer-key.pem

# Get connection string
terraform output ssh_connection_string
```

## SSH Access

### Basic Connection
```bash
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP>
```

### With SSH Config (Recommended)
Add to `~/.ssh/config`:
```
Host bodhi-cms
    HostName <EC2_PUBLIC_IP>
    User ubuntu
    IdentityFile ~/path/to/deployer-key.pem
    IdentitiesOnly yes
```

Then connect:
```bash
ssh bodhi-cms
```

## Deploy Strapi CMS via SCP

### Method 1: Copy & Build on EC2
```bash
# Copy app to EC2
scp -i deployer-key.pem -r ../../apps/cms ubuntu@<EC2_PUBLIC_IP>:/home/ubuntu/apps/

# SSH and build
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP>
cd /home/ubuntu/apps/cms
npm install
npm run build
```

### Method 2: Build Locally & Copy
```bash
# Build locally
cd ../../apps/cms
npm install
npm run build

# Copy built app to EC2
scp -i deployer-key.pem -r . ubuntu@<EC2_PUBLIC_IP>:/home/ubuntu/apps/cms
```

## Environment Setup

### Create .env File on EC2
```bash
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP>
cd /home/ubuntu/apps/cms
cat > .env << 'EOF'
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
APP_NAME=Bodhi CMS

# Supabase Configuration
SUPABASE_DB_HOST=db.nfmncgfdxeqikvtiwqre.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-password
SUPABASE_DB_NAME=postgres
SUPABASE_DB_URL=postgresql://postgres:your-password@db.nfmncgfdxeqikvtiwqre.supabase.co:5432/postgres?sslmode=require

# Supabase API
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Strapi Admin
STRAPI_ADMIN_EMAIL=admin@bodhi.com
STRAPI_ADMIN_PASSWORD=change-this-password
EOF

chmod 600 .env
```

## PM2 Process Management

### Start Strapi with PM2
```bash
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP>
cd /home/ubuntu/apps/cms

# Start with PM2
pm2 start npm --name "strapi" -- start

# Save PM2 configuration
pm2 save

# Enable PM2 startup script (already in user-data, but can redo)
pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### PM2 Management Commands (from local)
```bash
# Check status
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP> "pm2 status"

# View logs
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP> "pm2 logs strapi"

# Restart
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP> "pm2 restart strapi"

# Stop
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP> "pm2 stop strapi"

# Start
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP> "pm2 start strapi"

# Monitor
ssh -i deployer-key.pem ubuntu@<EC2_PUBLIC_IP> "pm2 monit"
```

## Deployment Workflow

### Initial Deployment
```bash
# 1. Deploy infrastructure
terraform apply

# 2. Save SSH key
terraform output ssh_private_key > deployer-key.pem
chmod 400 deployer-key.pem

# 3. Copy app to EC2
EC2_IP=$(terraform output ec2_public_ip | tr -d '"')
scp -i deployer-key.pem -r ../../apps/cms ubuntu@$EC2_IP:/home/ubuntu/apps/

# 4. Setup environment
ssh -i deployer-key.pem ubuntu@$EC2_IP
cd /home/ubuntu/apps/cms
npm install
npm run build

# 5. Configure .env (see Environment Setup above)
nano .env

# 6. Start with PM2
pm2 start npm --name "strapi" -- start
pm2 save
```

### Updating Code
```bash
# Option 1: Git Pull on EC2
ssh -i deployer-key.pem ubuntu@$EC2_IP
cd /home/ubuntu/apps/cms
git pull
npm run build
pm2 restart strapi

# Option 2: SCP Updated Files
scp -i deployer-key.pem -r ../../apps/cms ubuntu@$EC2_IP:/home/ubuntu/apps/
ssh -i deployer-key.pem ubuntu@$EC2_IP "cd /home/ubuntu/apps/cms && npm run build && pm2 restart strapi"
```

### Quick Restart from Local
```bash
EC2_IP=$(terraform output ec2_public_ip | tr -d '"')
ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 restart strapi"
```

## Access & Troubleshooting

### Access Strapi
- **Admin URL**: `http://<EC2_PUBLIC_IP>:1337/admin`
- **API URL**: `http://<EC2_PUBLIC_IP>:1337/api`
- **Via Nginx**: `http://<EC2_PUBLIC_IP>/admin`

### View Logs
```bash
# Real-time logs
ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 logs strapi"

# Last 100 lines
ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 logs strapi --lines 100"

# Error logs only
ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 logs strapi --err"
```

### Check Connectivity
```bash
# Test if Strapi is running
curl http://$EC2_IP:1337/api/home

# Check PM2 status
ssh -i deployer-key.pem ubuntu@$EC2_IP "pm2 status"

# Check nginx status
ssh -i deployer-key.pem ubuntu@$EC2_IP "sudo systemctl status nginx"
```

### Database Connection Test
```bash
ssh -i deployer-key.pem ubuntu@$EC2_IP
cd /home/ubuntu/apps/cms
node -e "console.log('Testing DB connection...'); require('./config/database.js');"
```

## Backup & Recovery

### Backup Database
```bash
# Dump Supabase database
pg_dump "postgresql://postgres:password@db.nfmncgfdxeqikvtiwqre.supabase.co:5432/postgres" > backup.sql
```

### Backup Strapi Configuration
```bash
scp -i deployer-key.pem ubuntu@$EC2_IP:/home/ubuntu/apps/cms/.env ./backups/
scp -i deployer-key.pem -r ubuntu@$EC2_IP:/home/ubuntu/apps/cms/config ./backups/
```

## Security Checklist

- [ ] Change default Strapi admin password
- [ ] Restrict SSH access to specific IP in security group
- [ ] Enable SSL/TLS certificate
- [ ] Set up database backups
- [ ] Configure CloudWatch alerts
- [ ] Review security group rules
- [ ] Enable API rate limiting
- [ ] Set up monitoring dashboard

## Useful Aliases

Add to `~/.bashrc` or `~/.zshrc`:
```bash
alias bodhi-connect='ssh -i ~/path/to/deployer-key.pem ubuntu@<EC2_IP>'
alias bodhi-logs='ssh -i ~/path/to/deployer-key.pem ubuntu@<EC2_IP> "pm2 logs strapi"'
alias bodhi-restart='ssh -i ~/path/to/deployer-key.pem ubuntu@<EC2_IP> "pm2 restart strapi"'
alias bodhi-status='ssh -i ~/path/to/deployer-key.pem ubuntu@<EC2_IP> "pm2 status"'
```