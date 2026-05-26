# Next.js Web Dockerfile with PNPM + Turborepo
# This builds only the Web app from the monorepo

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Install dependencies
FROM base AS deps
# Copy monorepo config files
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json turbo.json ./

# Copy only web package.json for dependency installation
COPY apps/web/package.json ./apps/web/

# Install dependencies (only web + its deps)
RUN pnpm install --frozen-lockfile --filter=web

# Build web
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY apps/web ./apps/web
COPY turbo.json ./

# Build web using turborepo
RUN pnpm turbo run build --filter=web

# Production runtime
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 nextjs

# Copy built Next.js app
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

# Set permissions
RUN chown -R nextjs:nextjs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start Next.js
CMD ["node", "server.js"]
