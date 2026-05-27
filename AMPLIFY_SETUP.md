# AWS Amplify Setup Guide - Bodhi Project

This guide walks you through setting up automatic deployment from GitHub to AWS Amplify using pnpm + turborepo.

## Prerequisites
- AWS Account with Amplify access
- GitHub repository for this project
- pnpm 9.0.0+ and Node.js 18.0.0+

## Configuration Files Created

### 1. `amplify.yml` (Primary Configuration)
- Configured for pnpm + turborepo monorepo
- Builds only the web app: `pnpm build:web`
- Outputs to: `apps/web/.next`
- Includes caching for Turbo and pnpm

### 2. `.amplify.yml` (Alternative)
- Lighter version without backend phases
- Use this if you don't need backend deployment

## AWS Amplify Console Setup

### Step 1: Connect GitHub Repository
1. Go to [AWS Amplify Console](https://us-east-1.console.aws.amazon.com/amplify/home)
2. Click "New app" → "Host web app"
3. Select "GitHub" as the repository provider
4. Authorize AWS to access your GitHub account
5. Select this repository and branch (`main`)

### Step 2: Configure Build Settings
1. **App name**: `bodhi-web` (or your preferred name)
2. **Environment name**: `main` (for production) or `dev` (for development)

#### Build Configuration:
- **Build settings**: Select "Use existing configuration"
- **Config file**: `amplify.yml` (already created in repo root)

#### App Settings:
- **Branch**: `main`
- **Root directory**: `/` (repo root)
- **Build command**: `pnpm build:web`
- **Output directory**: `apps/web/.next`

### Step 3: Environment Variables (Optional)
Add these in Amplify Console → App settings → Environment variables:

```bash
NODE_ENV=production
NEXT_PUBLIC_STRAPI_API_URL=your-strapi-url
STRAPI_API_TOKEN=your-strapi-token
```

### Step 4: Deploy
1. Click "Save and deploy"
2. Amplify will automatically build and deploy your app
3. Future pushes to GitHub will trigger automatic deployments

## Monorepo-Specific Configuration

The setup is optimized for your turborepo structure:

```yaml
# amplify.yml key points:
- Uses pnpm 9.0.0 (matches your package.json)
- Runs: pnpm build:web (builds only the web app)
- Caches: Turbo build cache + pnpm store
- Outputs: apps/web/.next (Next.js build output)
```

## Branch Strategy

### Production Branch
```yaml
Branch: main
Auto-deploy: Enabled
```

### Development Branch (Optional)
Create a separate Amplify app for dev branch:
```yaml
Branch: fix/setup-pnpm-amplify
Auto-deploy: Enabled
Environment: Development
```

## Troubleshooting

### Build Failures
1. **Check Node.js version**: Ensure Node.js 18+ is selected in Amplify console
2. **pnpm not found**: Verify `corepack` commands are running in preBuild phase
3. **Dependencies errors**: Try clearing cache: Amplify → App settings → Build settings → Clear cache

### Missing Environment Variables
Add these in Amplify Console:
```bash
NEXT_PUBLIC_STRAPI_API_URL
STRAPI_API_TOKEN
DATABASE_URL (if needed)
```

### Turbo Cache Issues
If builds are slow, verify caching is working:
```bash
# Check cache paths in amplify.yml
cache:
  paths:
    - node_modules/.cache/turbo
    - .pnpm-store
```

## Custom Domain (Optional)

1. Go to Amplify → Domain management
2. Add custom domain
3. Configure DNS records as provided by AWS
4. Enable auto-subdomain creation for branches

## Monitoring

- **Build logs**: Amplify Console → Recent deployments
- **Deployment status**: GitHub commits will show deployment status
- **Rollbacks**: Amplify Console → Recent deployments → Rollback

## Next Steps

1. Push `amplify.yml` to GitHub
2. Complete Amplify Console setup
3. Test deployment
4. Set up custom domain (optional)
5. Configure environment variables
6. Set up monitoring and alerts

## Deployment Workflow

```mermaid
git push → GitHub webhook → Amplify detects changes →
Runs pnpm install → Runs turbo build → Deploys .next →
Production URL updated
```

## Files Modified/Created

- ✅ `amplify.yml` - Primary Amplify configuration
- ✅ `.amplify.yml` - Alternative configuration
- ✅ `AMPLIFY_SETUP.md` - This setup guide

## Support

- AWS Amplify Documentation: https://docs.aws.amazon.com/amplify/
- Turbo + Amplify Guide: Check Turborepo docs for monorepo deployment
- pnpm + Amplify: https://pnpm.io/installation#using-corepack
