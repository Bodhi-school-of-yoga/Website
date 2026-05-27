#!/bin/bash

# Test Amplify build locally before deployment
# This simulates the Amplify build process

set -e

echo "🔧 Testing Amplify build locally..."
echo "================================"

# Set Node version (simulating Amplify environment)
export NODE_VERSION=18

# Enable corepack for pnpm
echo "📦 Setting up pnpm..."
corepack enable
corepack prepare pnpm@9.0.0 --activate

# Set pnpm store directory
pnpm config set store-dir ~/.pnpm-store

# Install dependencies
echo "📥 Installing dependencies..."
pnpm install --frozen-lockfile

# Build web app
echo "🏗️  Building web app..."
pnpm build:web

# Check build output
if [ -d "apps/web/.next" ]; then
    echo "✅ Build successful! Output found in apps/web/.next"
    echo "📊 Build output size:"
    du -sh apps/web/.next
    echo ""
    echo "🚀 Ready for Amplify deployment!"
else
    echo "❌ Build failed - no .next directory found"
    exit 1
fi
