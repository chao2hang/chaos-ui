# ─── Build Stage ───
FROM node:22-slim AS builder
WORKDIR /app

# 复制包文件并安装依赖
COPY package*.json ./
RUN npm ci

# 复制源码并构建
COPY . .
RUN npm run build:pkg
RUN npm run build-storybook

# ─── Storybook 静态站点 ───
FROM nginx:alpine AS storybook
COPY --from=builder /app/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
