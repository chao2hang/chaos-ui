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

# 构建组件包（文档站通过 link:../.. 依赖 dist/ 产物）
RUN pnpm run build:pkg

# 诊断信息
RUN echo "Node: $(node --version), pnpm: $(pnpm --version)" && \
    ls -la apps/docs/@/components/component-*.tsx apps/docs/@/components/story-*.tsx 2>&1

# 生成组件元数据文件
RUN node apps/docs/scripts/generate-component-loader.mjs && \
    node apps/docs/scripts/generate-component-map.mjs && \
    node apps/docs/scripts/generate-component-story-previews.mjs && \
    node apps/docs/scripts/generate-mdx-map.mjs

# 校验生成文件非空(防止正则/路径回归再次静默清空)
RUN echo "=== Generated file line counts ===" && \
    wc -l apps/docs/@/components/component-loader.ts \
          apps/docs/@/components/component-map.ts \
          apps/docs/@/components/component-story-previews.tsx \
          apps/docs/@/components/mdx-loaders.ts && \
    test $(wc -l < apps/docs/@/components/component-loader.ts) -gt 5 || \
      (echo "ERROR: component-loader.ts is empty — meta regex may be broken" && exit 1)

# 构建 Storybook 静态站点
RUN pnpm run build-storybook

# 构建 Next.js 展示站
RUN cd apps/docs && pnpm run build 2>&1

# ─── Runtime Stage ───
FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate && \
    npm install -g serve@latest

WORKDIR /app

# 生产依赖（pnpm 完整 node_modules + workspace 包）
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# apps/docs 构建产物 + 源码（public）
COPY --from=builder /app/apps/docs ./apps/docs

# Storybook 静态站点
COPY --from=builder /app/storybook-static ./storybook-static

# 启动脚本
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["docker-entrypoint.sh"]
