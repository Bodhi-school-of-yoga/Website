#!/bin/bash
# User data script for Strapi CMS EC2 instance

# Update system and install dependencies
apt-get update -y
apt-get upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Git
apt-get install -y git

# Create app directory
mkdir -p /home/ubuntu/apps
chown -R ubuntu:ubuntu /home/ubuntu/apps

# Install nginx as reverse proxy
apt-get install -y nginx

# Configure nginx for Strapi
cat > /etc/nginx/sites-available/strapi <<'NGINX_EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX_EOF

# Enable nginx site
ln -sf /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl enable nginx
systemctl restart nginx

# Set up PM2 to start on reboot
su - ubuntu -c "pm2 startup systemd -u ubuntu --hp /home/ubuntu"

echo "Strapi CMS EC2 setup complete"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "PM2 version: $(pm2 -v)"
