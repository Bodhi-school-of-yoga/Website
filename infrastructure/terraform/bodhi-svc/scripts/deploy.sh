#!/bin/bash
# Bodhi CMS Deployment Script

set -e

# Configuration
KEY_FILE="deployer-key.pem"
EC2_IP=$(terraform output ec2_public_ip 2>/dev/null | tr -d '"' || echo "")
APP_PATH="../../apps/cms"
REMOTE_PATH="/home/ubuntu/apps/cms"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Bodhi CMS Deployment Script                              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check prerequisites
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ SSH key not found. Generating from Terraform..."
    terraform output ssh_private_key > "$KEY_FILE"
    chmod 400 "$KEY_FILE"
    echo "✅ SSH key generated"
fi

if [ -z "$EC2_IP" ]; then
    echo "❌ EC2 IP not found. Run: terraform output ec2_public_ip"
    exit 1
fi

echo "📊 Deployment Configuration:"
echo "   EC2 IP:      $EC2_IP"
echo "   App Path:    $APP_PATH"
echo "   Remote Path: $REMOTE_PATH"
echo ""

# Menu
case "${1:-deploy}" in
    "deploy")
        echo "🚀 Starting deployment..."

        # Copy app to EC2
        echo "📦 Copying files to EC2..."
        scp -i "$KEY_FILE" -r "$APP_PATH" ubuntu@"$EC2_IP":"$REMOTE_PATH"

        # Install dependencies and build
        echo "🔧 Installing dependencies on EC2..."
        ssh -i "$KEY_FILE" ubuntu@"$EC2_IP" << ENDSSH
cd $REMOTE_PATH
npm install
npm run build
ENDSSH

        echo "✅ Deployment complete!"
        echo ""
        echo "Next steps:"
        echo "1. Configure .env file on EC2"
        echo "2. Start with PM2: ssh -i $KEY_FILE ubuntu@$EC2_IP 'cd $REMOTE_PATH && pm2 start npm --name strapi -- start'"
        ;;

    "restart")
        echo "🔄 Restarting Strapi..."
        ssh -i "$KEY_FILE" ubuntu@"$EC2_IP" "pm2 restart strapi"
        echo "✅ Restarted"
        ;;

    "logs")
        echo "📋 Showing Strapi logs..."
        ssh -i "$KEY_FILE" ubuntu@"$EC2_IP" "pm2 logs strapi"
        ;;

    "status")
        echo "📊 Checking PM2 status..."
        ssh -i "$KEY_FILE" ubuntu@"$EC2_IP" "pm2 status"
        ;;

    "env")
        echo "🔧 Opening .env for editing..."
        ssh -i "$KEY_FILE" ubuntu@"$EC2_IP" "nano $REMOTE_PATH/.env"
        ;;

    "connect")
        echo "🔌 Connecting to EC2..."
        ssh -i "$KEY_FILE" ubuntu@"$EC2_IP"
        ;;

    "update")
        echo "🔄 Updating code via git pull..."
        ssh -i "$KEY_FILE" ubuntu@"$EC2_IP" << ENDSSH
cd $REMOTE_PATH
git pull
npm run build
pm2 restart strapi
ENDSSH
        echo "✅ Updated and restarted"
        ;;

    *)
        echo "Usage: $0 {deploy|restart|logs|status|env|connect|update}"
        echo ""
        echo "Commands:"
        echo "  deploy   - Deploy app to EC2 via SCP"
        echo "  restart  - Restart Strapi (PM2)"
        echo "  logs     - Show Strapi logs"
        echo "  status   - Check PM2 status"
        echo "  env      - Edit .env file on EC2"
        echo "  connect  - SSH to EC2"
        echo "  update   - Git pull and rebuild on EC2"
        exit 1
        ;;
esac