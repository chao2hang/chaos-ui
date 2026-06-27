# Chaos UI

> 企业级 React/Next.js 组件设计系统 / Enterprise-grade React component library for ERP & business systems

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-10-ff4785)](https://storybook.js.org/)

## 简介

Chaos UI 是服务于清香园（QXY Foods）所有业务系统的企业级 React 组件库，基于 `@base-ui/react` + Tailwind CSS 4 构建，对标 Ant Design 5 / MUI X Pro / Tremor 的企业级能力，为主消费项目 `qxy-mop` ERP 平台及后续所有业务系统提供统一的 UI 基础设施。

### 核心特性

- 🎨 **81+ UI 基础组件** — 覆盖表单、布局、反馈、导航、数据展示全场景
- 🏢 **85+ 业务组件** — 单据体系、CRUD 模板、审批流、看板、图表
- 📐 **10+ 布局组件** — 后台管理、认证、仪表盘、详情页布局
- 🪝 **23+ React Hooks** — 状态管理、副作用、响应式、反馈命令式 API
- 🔧 **11+ 工具库** — 存储、事件总线、下载、Cookie、URL、格式化、API 客户端
- 🌍 **i18n 国际化** — 内置中文/英文，支持扩展
- 🎯 **TypeScript 优先** — 完整类型定义
- ♿ **无障碍** — WAI-ARIA 标准，WCAG AA 对比度
- 📖 **Storybook 文档** — 交互式组件文档 + 自动 API 提取
- 🌙 **暗色模式** — 基于 CSS 变量的一键切换
- 📦 **Tree-shaking** — 7 个子路径导出，按需引入

## 安装

```bash
npm install @qxyfoods/chaos-ui
```

### Peer Dependencies

```bash
npm install react@^19 react-dom@^19
# For Next.js projects:
npm install next@^16 next-themes@^0.4
```

## 快速开始

### 1. 配置 Tailwind CSS

```css
/* globals.css */
@import "tailwindcss";
@source "../node_modules/@qxyfoods/chaos-ui";
@import "@qxyfoods/chaos-ui/styles.css";
```

### 2. 引入组件

```tsx
import { Button, Input, Dialog, DataTable } from "@qxyfoods/chaos-ui";

function App() {
  return (
    <div className="p-4 space-y-4">
      <Button variant="default">点击我</Button>
      <Input placeholder="请输入" />
    </div>
  );
}
```

### 3. 子路径导出（按需引入）

| 路径 | 说明 |
|------|------|
| `@qxyfoods/chaos-ui` | 主入口（全部导出） |
| `@qxyfoods/chaos-ui/ui` | UI 基础组件 |
| `@qxyfoods/chaos-ui/ui/icons` | 图标导出 |
| `@qxyfoods/chaos-ui/business` | 业务组件 |
| `@qxyfoods/chaos-ui/hooks` | 自定义 Hooks |
| `@qxyfoods/chaos-ui/lib` | 工具函数和国际化 |
| `@qxyfoods/chaos-ui/next` | Next.js 专用组件 |
| `@qxyfoods/chaos-ui/styles.css` | 主题样式 |

## 组件清单

### UI 基础组件 (81+)

Accordion, Alert, AlertDialog, Affix, AspectRatio, Avatar, BackTop, Badge, Breadcrumb, BrowseInput, Button, Calendar, Card, Carousel, Checkbox, Collapsible, ColorPicker, Command, ConfigProvider, ContextMenu, DatePicker, Descriptions, Dialog, Divider, Dot, Drawer, DropdownMenu, FileUpload, Flex, Form, FormGrid, FormList, FormSection, GridLayout, HoverCard, Input, InputGroup, InputNumber, InputSearch, Kbd, KPIPanel, Label, Menubar, NavigationMenu, OTPField, PageContainer, Pagination, Popconfirm, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Space, Spinner, SplitPane, Spin, Stepper, Switch, Table, Tabs, TagsInput, Textarea, Timeline, Toggle, ToggleGroup, Tooltip, TreeSelect, TreeView, Typography, UserBrowse, VirtualList, VirtualTable

### 业务组件 (85+)

DataTable, AdvancedDataTable, PivotTable, KanbanBoard, KpiCard, StatCard, Chart, Gauge, MetricTrend, HeatmapCalendar, ExportButton, FileUploadManager, BulkImportWizard, ApprovalTimeline, PermissionMatrix, RoleAssignment, CampaignCard, CampaignCalendar, UtmBuilder, EmptyState, ErrorBoundary, LoadingPage, ConfirmDialog, Tour, Watermark, CommandPalette, NotificationCenter, PageHeader, Rating, Transfer, 更多...

### 布局组件 (10+)

AppShell, AuthLayout, BlankLayout, DashboardLayout, DetailLayout, ErrorLayout, PrintLayout, PublicLayout, TopBar

## 开发

```bash
# 启动 Storybook (端口 6006)
npm run dev

# 启动 Next.js 演示应用
npm run app:dev

# 类型检查 + ESLint + CSS lint + 依赖检查
npm run check

# 运行测试
npm test

# 运行测试 + 覆盖率
npm run test:coverage

# 构建组件包
npm run build:pkg

# 构建 Storybook
npm run build-storybook

# 格式化代码
npm run format
```

## 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| UI 原语 | @base-ui/react | 1.5.0 |
| 样式 | Tailwind CSS | 4.3.0 |
| 变体 | class-variance-authority | 0.7.1 |
| 类合并 | tailwind-merge | 3.6.0 |
| 表单 | react-hook-form | 7.78.0 |
| 校验 | zod | 4.4.3 |
| 数据请求 | @tanstack/react-query | 5.101.0 |
| 状态 | zustand | 5.0.14 |
| 路由 | Next.js | 16.2.9 |
| i18n | i18next + react-i18next | 26/17 |
| 图表 | recharts | 3.8.1 |
| 拖拽 | @dnd-kit | 6.3.1 |
| 通知 | sonner | 2.0.7 |
| 抽屉 | vaul | 1.1.2 |

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
