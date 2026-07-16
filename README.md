# Chaos UI

> 企业级 React/Next.js 组件设计系统 / Enterprise-grade React component library for ERP & business systems

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-10.4-ff4785)](https://storybook.js.org/)

## 简介

Chaos UI 是服务于清香园（QXY Foods）所有业务系统的企业级 React 组件库，基于 `@base-ui/react` + Tailwind CSS 4 构建，对标 Ant Design 5 / MUI X Pro / Tremor 的企业级能力，为主消费项目 `qxy-mop` ERP 平台及后续所有业务系统提供统一的 UI 基础设施。

### 核心特性

- 🧩 **106 UI 基础组件** — 覆盖通用、布局、导航、表单、数据展示、反馈全场景
- 🏢 **208 业务组件** — 单据体系、CRUD 模板、审批流、图表、移动端组件
- 📐 **28 布局组件** — 11 通用布局 + 17 后台管理布局（AdminShell、DashboardLayout 等）
- 🪝 **28 React Hooks** — 状态管理、副作用、响应式、反馈命令式 API
- 🔧 **7+ 工具库** — 存储、事件总线、下载、Cookie、URL、格式化、API 客户端
- 🌍 **i18n 国际化** — 内置中文/英文，支持扩展
- 🎯 **TypeScript 优先** — 完整类型定义
- ♿ **无障碍** — WAI-ARIA 标准，WCAG AA 对比度
- 📖 **Storybook 文档 + 组件官网** — 交互式组件文档 + 全量组件预览
- 🌙 **暗色模式** — 基于 CSS 变量的一键切换
- 📦 **Tree-shaking** — 7 个子路径导出，按需引入

## 版本与 API 稳定性

| 版本           | 含义                                                                             |
| -------------- | -------------------------------------------------------------------------------- |
| `0.x`          | 开发期，API 可能在 minor 间 break（已发生 useBreakpoint/DictSelect 等 breaking） |
| `1.0.0-beta.x` | **API 冻结候选**：公开 API 趋稳，可试用，仍可能有 bug 修复与小调整               |
| `1.0.0`        | 稳定版，遵循 semver：minor 加功能向后兼容，patch 仅修 bug                        |

**1.0 公开 API 边界**：`@chaos_team/chaos-ui`、`/ui`、`/ui/icons`、`/business`、`/hooks`、`/lib`、`/next`、`/styles.css` 这 8 个入口的导出为公开 API。`AdvancedDataTable` 等已标 `@deprecated` 的组件从公开 barrel 移除（文件保留供直接 import 过渡）。Breaking change 会先在 CHANGELOG 标注并在一个 minor 周期保留 deprecated 别名。

## 安装

```bash
pnpm install @chaos_team/chaos-ui
```

### Peer Dependencies

```bash
pnpm install react@^19 react-dom@^19
# For Next.js projects:
pnpm install next@^16 next-themes@^0.4
```

## 快速开始

### 1. 配置 Tailwind CSS

```css
/* globals.css */
@import "tailwindcss";
@source "../node_modules/@chaos_team/chaos-ui";
@import "@chaos_team/chaos-ui/styles.css";
```

### 2. 引入组件

```tsx
import { Button, Input, Dialog, DataTable } from "@chaos_team/chaos-ui";

function App() {
  return (
    <div className="space-y-4 p-4">
      <Button variant="default">点击我</Button>
      <Input placeholder="请输入" />
    </div>
  );
}
```

### 3. 子路径导出（按需引入）

| 路径                              | 说明               |
| --------------------------------- | ------------------ |
| `@chaos_team/chaos-ui`            | 主入口（全部导出） |
| `@chaos_team/chaos-ui/ui`         | UI 基础组件        |
| `@chaos_team/chaos-ui/ui/icons`   | 图标导出           |
| `@chaos_team/chaos-ui/business`   | 业务组件           |
| `@chaos_team/chaos-ui/hooks`      | 自定义 Hooks       |
| `@chaos_team/chaos-ui/lib`        | 工具函数和国际化   |
| `@chaos_team/chaos-ui/next`       | Next.js 专用组件   |
| `@chaos_team/chaos-ui/styles.css` | 主题样式           |

> **Note**: `MessageProvider` / `Toaster` / `ThemeToggle` 从 `@chaos_team/chaos-ui/next` 引入（而非主入口），因为它们依赖 `next-themes`（optional peer）。非 Next.js 项目使用主入口不会因此拉入 `next-themes`。
>
> ```ts
> import { ModalProvider } from "@chaos_team/chaos-ui";
> import {
>   MessageProvider,
>   Toaster,
>   ThemeToggle,
> } from "@chaos_team/chaos-ui/next";
> ```

### 暗色模式

`styles.css` 内置 `.dark` 主题变量。消费方用 `next-themes`（optional peer）即可接入：

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";
import "@chaos_team/chaos-ui/styles.css";
import { ThemeToggle } from "@chaos_team/chaos-ui/next";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`ThemeToggle` 提供「亮色 / 暗色 / 跟随系统」三态切换，`styles.css` 的 `.dark` 变量自动生效。

## 组件官网 (Docs Site)

`apps/docs` 是基于 Next.js 的组件官网，提供可搜索的 8 分类组件总览与 331 个组件的全量文档和实时预览。

- **入口**: `/components` — 8 分区搜索总览，卡片式跳转
- **详情页**: `/components/[category]/[slug]` — 基于 MDX 的组件文档 + 实时预览（Storybook 驱动）
- **预览覆盖**: 331/331 组件，**100%** 有实时预览（Story 或手写 Demo）
- **启动**: `npm run dev`，访问 `http://localhost:3001`
- **Storybook**: 独立运行于 `http://localhost:3002`，使用 `npm run storybook` 启动

## 组件清单

完整的组件目录请访问组件官网或查看 [COMPONENT_INDEX.md](./COMPONENT_INDEX.md)。以下是分类概览：

| 分类                   | 数量    | 说明                                                           |
| ---------------------- | ------- | -------------------------------------------------------------- |
| General 通用           | 12      | Button, Typography, Spin, SplitButton 等                       |
| Layout 布局            | 11      | Divider, Flex, Grid, Space, PageContainer 等                   |
| Navigation 导航        | 13      | Tabs, Menu, Breadcrumb, DropdownMenu, Pagination 等            |
| Form 表单              | 30      | Input, Select, Checkbox, DatePicker, Slider, Switch 等         |
| DataDisplay 数据展示   | 25      | Table, Accordion, Badge, Card, Carousel, Tag 等                |
| Feedback 反馈          | 15      | Dialog, Drawer, Sheet, Toast, Alert, Progress 等               |
| System Layout 系统布局 | 17      | AdminShell, DashboardLayout, AdminHeader 等                    |
| Business 业务          | 208     | DataTable, CrudPage, ApprovalFlow, Chart, FormField, Mobile 等 |
| **合计**               | **331** | 所有组件均在文档站有实时预览                                   |

## 开发

```bash
# 启动组件官网 (Next.js, 端口 3001)
npm run dev

	# 独立启动 Storybook (端口 3002)
npm run storybook

# 类型检查 + ESLint + CSS lint + 依赖检查
pnpm run check

# 运行测试
pnpm test

# 运行测试 + 覆盖率
pnpm run test:coverage

# 构建组件包
pnpm run build:pkg

# 构建 Storybook
pnpm run build-storybook

# 格式化代码
pnpm run format
```

## 部署

### 容器化部署 (Docker)

Docker 镜像托管在 **GitHub Container Registry**：`ghcr.io/chao2hang/chaos-ui`。推 `main` 分支时自动构建。

容器内运行 Next.js 展示站，同时通过 `serve` 提供 Storybook 静态文件：

```
                    容器内部
                ┌──────────────────┐
                │                  │
    :3001 ────►│   Next.js        │
                │   :3001          │
                └──────────────────┘

    :3002 ────►│  serve           │
                │  storybook-static│
                └──────────────────┘
```

#### 构建镜像

```bash
docker build -t ghcr.io/chao2hang/chaos-ui:latest .
```

#### 运行

```bash
docker run -d \
  --name chaos-ui \
  -p 3001:3001 \
  -p 3002:3002 \
  chaos-ui:latest

# 访问
#   http://localhost:3001             → Next.js 展示站
#   http://localhost:3002             → Storybook 组件库
```

#### Docker Compose

```bash
# 默认从源码构建（docker-compose.yml）
docker compose up -d --build

# 若已改为使用 GHCR 镜像（见 compose 内 image 选项），直接启动即可：
# docker compose up -d

# 自定义端口
DOCS_PORT=3000 STORYBOOK_PORT=9000 docker compose up -d --build
```

端口可通过环境变量 `DOCS_PORT`（默认 `3001`）和 `STORYBOOK_PORT`（默认 `3002`）配置。

### GitHub Actions Release

Release quality gates run **locally** before you tag. GitHub only rebuilds the package, checks that main CI is green for the same commit, publishes to npm, and creates a GitHub Release.

```bash
# 1) Full local gate (typecheck + unit tests + prepack + smoke)
pnpm run release:check

# 2) After CHANGELOG + version bump are committed on main and CI is green:
git tag vX.Y.Z
git push origin vX.Y.Z
```

Tag pushes trigger `.github/workflows/release.yml`:

1. Verify the tag commit is on `main` and workflow `CI` is `success` for that SHA
2. `pnpm run prepack` once (build + size-limit)
3. `pnpm publish --ignore-scripts` to npmjs.org (`NPM_TOKEN` secret)
4. Create GitHub Release notes from `CHANGELOG.md`

Do **not** rely on `prepublishOnly` for the full suite — it only runs a light `check:no-bom` if someone publishes with lifecycle scripts enabled. Prefer the tag → Actions path above.

### Public npm Publish

```bash
npm install @chaos_team/chaos-ui
# or
pnpm add @chaos_team/chaos-ui
```

## 技术栈

| 层级    | 技术                     | 版本   |
| ------- | ------------------------ | ------ |
| UI 原语 | @base-ui/react           | 1.5.0  |
| 样式    | Tailwind CSS             | 4.3.0  |
| 变体    | class-variance-authority | 0.7.1  |
| 类合并  | tailwind-merge           | 3.6.0  |
| 表单    | react-hook-form          | 7.78.0 |
| 校验    | zod                      | 4.4.3  |
| 路由    | Next.js                  | 16.2.9 |
| i18n    | i18next + react-i18next  | 26/17  |
| 图表    | recharts                 | 3.8.1  |
| 拖拽    | @dnd-kit                 | 6.3.1  |
| 通知    | sonner                   | 2.0.7  |
| 抽屉    | vaul                     | 1.1.2  |

## 浏览器兼容性

- Chrome/Edge >= 120
- Firefox >= 120
- Safari >= 17

## 贡献

请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解贡献流程。

## 许可证

[MIT](./LICENSE) © QXY Foods / Chaos UI Team

## 相关文档

- [架构说明](./ARCHITECTURE.md)
- [编码规范](./CONTRIBUTING.md)
- [组件清单](./COMPONENT_INDEX.md)
- [Hooks 清单](./HOOKS_INDEX.md)
- [工具库清单](./LIB_INDEX.md)
- [安全策略](./SECURITY.md)
- [变更日志](./CHANGELOG.md)
