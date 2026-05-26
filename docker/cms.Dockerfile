# Strapi CMS Dockerfile with PNPM + Turborepo
# This builds only the CMS app from the monorepo

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Install dependencies
FROM base AS deps
# Copy monorepo config files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json ./

# Copy only CMS package.json for dependency installation
COPY apps/cms/package.json ./apps/cms/

# Install dependencies (only CMS + its deps)
RUN pnpm install --frozen-lockfile --filter=cms

# Build CMS
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY apps/cms ./apps/cms
COPY turbo.json ./

# Build CMS using turborepo
RUN pnpm turbo run build --filter=cms

# Production runtime
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=1337

# Create non-root user
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi

# Copy built CMS application
COPY --from=builder /app/apps/cms/dist ./apps/cms/dist
COPY --from=builder /app/apps/cms/package.json ./apps/cms/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/cms/public ./apps/cms/public 2>/dev/null || true

# Set permissions
RUN chown -R strapi:strapi /app

USER strapi

EXPOSE 1337

# Start Strapi
CMD ["pnpm", "start", "--filter=cms"]
