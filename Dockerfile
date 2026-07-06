# syntax=docker/dockerfile:1
# ─── Build Stage ───
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# 依赖清单（利用 Docker 层缓存）
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/docs/package.json apps/docs/package.json
COPY packages/chaos-design-ui/package.json packages/chaos-design-ui/package.json
COPY eslint-plugin-chaos/package.json eslint-plugin-chaos/package.json
RUN pnpm install --frozen-lockfile

# 源码
COPY . .

# 构建 Storybook 静态站点
RUN pnpm run build-storybook

# 构建 Next.js 展示站
RUN cd apps/docs && pnpm run build

# ─── Runtime Stage ───
FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate && \
    npm install -g serve@latest

WORKDIR /app

# 生产依赖（pnpm 完整 node_modules + workspace 包）
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# apps/docs 构建产物 + 源码（proxy、public）
COPY --from=builder /app/apps/docs ./apps/docs

# Storybook 静态站点
COPY --from=builder /app/storybook-static ./storybook-static

# 启动脚本
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["docker-entrypoint.sh"]
