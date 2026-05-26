# Base Dockerfile for Bodhi Monorepo
# This file contains common layers shared by all apps

FROM node:20-alpine AS base
# Install libc6-compat for compatibility with native modules
RUN apk add --no-cache libc6-compat openssl

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy pnpm workspace files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY turbo.json ./

# Copy workspace packages
COPY apps ./apps
COPY packages ./packages

# Install all dependencies using pnpm
FROM base AS deps
RUN pnpm install --frozen-lockfile

# Shared build layer with turborepo
FROM base AS builder
# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps ./apps
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/turbo.json ./

# Build all apps using turborepo
RUN pnpm turbo run build --filter=...
