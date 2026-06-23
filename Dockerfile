# ============================================
# Stage 1: Install dependencies & build libs
# ============================================
FROM node:22-slim AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@11.5.0 --activate

# Set working directory
WORKDIR /app

# Copy workspace config files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Copy package manifests for all workspace packages
COPY packages/chaos-design-ui/package.json ./packages/chaos-design-ui/
COPY apps/docs/package.json ./apps/docs/

# Install dependencies (skip scripts for faster install)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/ ./packages/
COPY apps/ ./apps/

# Build the component library first
RUN pnpm --filter chaos-design-ui build

# ============================================
# Stage 2: Build docs & storybook
# ============================================
FROM base AS builder

# Build Next.js docs (skip type checking - docs components have many optional deps)
ENV NEXT_TELEMETRY_DISABLED=1
RUN NEXT_TYPESCRIPT_IGNORE_BUILD_ERRORS=1 pnpm --filter chaos-ui-docs build

# Build Storybook
RUN pnpm --filter chaos-ui-docs build-storybook

# ============================================
# Stage 3: Production image
# ============================================
FROM node:22-slim AS production

# Install pnpm and serve
RUN corepack enable && corepack prepare pnpm@11.5.0 --activate

# Install serve globally for static file serving
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy workspace config
COPY package.json pnpm-workspace.yaml ./

# Copy only the built docs app (Next.js standalone output)
COPY --from=builder /app/apps/docs/.next/standalone/ ./
COPY --from=builder /app/apps/docs/.next/static/ ./apps/docs/.next/static/
COPY --from=builder /app/apps/docs/public/ ./apps/docs/public/

# Copy built Storybook
COPY --from=builder /app/apps/docs/storybook-static/ ./storybook-static/

# Copy entrypoint script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Expose ports
# 3000: Next.js docs
# 6006: Storybook
EXPOSE 3000 6006

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start both services
ENTRYPOINT ["./docker-entrypoint.sh"]
