---
status: 完成
created: 2026-07-16
updated: 2026-07-16
issue: 44
---

# PageChrome 页面密度 + PageHeader size / PageContent density (#44)

## 概述

为后台列表页提供**库内拥有的页面密度 API**，避免消费方用 `[&_h1]:text-lg` 等 CSS 覆盖库样式。

交付：

1. 新业务组件 `PageChrome`（`list` | `document` | `overview`）
2. 原子能力：`PageHeader` 增加 `size`；`PageContent` 增加 `density`
3. Storybook 三变体 + list 与 `ListPageShell` 组合示例
4. CHANGELOG；建议 **minor** 发版（`feat`）

## 背景与动机

- Admin 列表（如 qxy-mop 员工管理）已有 **侧栏 + 面包屑 + 多标签** 表达位置，页内再放 `text-2xl` 大标题 + 常驻 description 浪费纵向空间。
- 飞书后台 / Ant Design 列表：筛选 → 表为主；PageHeader 是可选概览，不是每张 CRUD 表必有。
- 现有分工：
  - `ListPageShell`：Filter + toolbar + table（**不**包 header）— 分工正确，缺 chrome 搭档
  - `components/business/page-header.tsx`：业务标题栏（面包屑 + actions），`h1` 固定 `text-2xl`
  - `components/ui/page-container.tsx`：`PageHeader` + `PageContent`（`space-y-6` 固定）
- **Confirmed：** `variant="list"` **完全隐藏**页内 title（最飞书化），不是默认紧凑标题。

## 现状摸底（代码）

| 文件                                          | 现状                                                            | 关联                             |
| --------------------------------------------- | --------------------------------------------------------------- | -------------------------------- |
| `components/business/page-header.tsx:85`      | `h1` 固定 `text-2xl`，无 `size`                                 | 业务故事 / MobilePageHeader 依赖 |
| `components/ui/page-container.tsx:105,136`    | UI `PageHeader` 固定 `text-2xl`；`PageContent` 固定 `space-y-6` | 文档/布局原子层                  |
| `components/business/list-page-shell.tsx`     | 不包 header/Card                                                | list 组合示例保留此边界          |
| `components/business/index.ts`                | 需 re-export `PageChrome`                                       | 包入口                           |
| `src/stories/business/PageHeader.stories.tsx` | 无 size 故事                                                    | 补 size + PageChrome 故事        |

**注意：** 仓库存在两套 `PageHeader`（business / ui）。本 issue 的 `PageContent.density` 落在 **ui**；`PageChrome` 默认组合 **business `PageHeader`**（带 breadcrumbItems / primaryAction 生态）+ **ui `PageContent`**。UI `PageHeader` 同步加 `size`，避免双轨视觉不一致。

## 设计方案

### 变体矩阵

| variant      | 页内 title                       | description | Content gap            | 典型场景           |
| ------------ | -------------------------------- | ----------- | ---------------------- | ------------------ |
| **list**     | **不渲染**                       | **忽略**    | compact（`space-y-3`） | CRUD 表            |
| **document** | medium（`PageHeader size="sm"`） | 可选        | ~16px（compact）       | 表单 / 单据 / 详情 |
| **overview** | 当前 display（`text-2xl`）       | 可选        | default `space-y-6`    | 仪表盘 / KPI       |

### 1. 原子 props

```tsx
// business PageHeader + ui PageHeader
size?: "default" | "sm"  // default = 当前视觉，无回归

// ui PageContent
density?: "default" | "compact"  // default = space-y-6；compact = space-y-3
```

`size="sm"` 建议：

- 标题：`text-lg font-semibold tracking-tight`（或 `text-xl`，实现时对照飞书/现有卡片标题）
- description：保持 `text-sm text-muted-foreground`（若已有则不放大）
- 与 actions 行：`items-center` 可对齐，避免 sm 时标题区过高

`title` 类型：本波次 **保持 `string`**（与现 API 一致）；issue 文案中的 `React.ReactNode` 作为后续增强，不在 #44 强改。

### 2. `PageChrome`（推荐入口）

```tsx
// components/business/page-chrome.tsx
type PageChromeVariant = "list" | "document" | "overview";

interface PageChromeProps {
  variant: PageChromeVariant;
  /** document / overview；list 忽略 */
  title?: string;
  /** document / overview 可选；list 忽略 */
  description?: string;
  /**
   * list：仅紧凑操作行（无 h1）
   * document / overview：交给 PageHeader actions
   */
  actions?: React.ReactNode;
  /** document / overview 透传 PageHeader；list 不用 */
  breadcrumbItems?: BreadcrumbItemType[];
  className?: string;
  children: React.ReactNode;
}
```

行为：

| variant    | header 区                                                                                                           | content                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `list`     | 有 `actions` → 单行 `flex justify-end`（~32–40px 高）；无 actions → 不渲染 header 区。**永不**渲染 h1 / description | `PageContent density="compact"` |
| `document` | `PageHeader size="sm"` + title/description/actions                                                                  | `PageContent density="compact"` |
| `overview` | `PageHeader size="default"`                                                                                         | `PageContent density="default"` |

`data-slot="page-chrome"` + `data-variant={variant}` 便于测试与文档站扫描。

### 3. 分工（不变）

| 组件                         | 职责                                                  |
| ---------------------------- | ----------------------------------------------------- |
| `PageChrome`                 | 页级密度 + list 是否显示标题行                        |
| `ListPageShell`              | FilterBar + toolbar/extra + 表间距                    |
| `Card` + `CardContent flush` | 仍由 app 组装；**本 issue 不强制** Card 进 PageChrome |

### 4. 示例（list / 员工管理）

```tsx
<PageChrome
  variant="list"
  actions={
    <Space>
      <Button variant="outline" size="sm">刷新</Button>
      <Button variant="outline" size="sm">从 OA 同步</Button>
      <Button size="sm">新增</Button>
    </Space>
  }
>
  <Card>
    <CardContent flush>
      <ListPageShell
        filterFields={fields}
        onSearch={...}
        extra={<RecordCount total={total} />}
      >
        <SearchTable ... />
      </ListPageShell>
    </CardContent>
  </Card>
</PageChrome>
```

- 人数 → `RecordCount` / 分页，**不是** header description
- 同步说明 → confirm / tooltip，**不是** 粘性 description

### 组件 / 文件清单

- [ ] `components/business/page-chrome.tsx` — 新建
- [ ] `components/business/page-chrome.test.tsx` — 新建
- [ ] `components/business/page-header.tsx` — `size` prop
- [ ] `components/business/page-header.test.tsx` — size 断言
- [ ] `components/ui/page-container.tsx` — UI `PageHeader.size` + `PageContent.density`
- [ ] `components/ui/page-container.test.tsx` — 同步测试
- [ ] `components/business/index.ts` — export
- [ ] `src/stories/business/PageChrome.stories.tsx` — 三变体 + ListPageShell 组合
- [ ] `src/stories/business/PageHeader.stories.tsx` — SizeSm 故事
- [ ] `src/stories/ui/PageContainer.stories.tsx` — density / size（若已有则补）
- [ ] `CHANGELOG.md` — Unreleased feat 条目
- [ ] 可选：`docs/specs` / component-map 若文档站静态登记新组件

### 依赖

- 现有：`PageHeader`（business）、`PageContent`（ui）、`cn`、`ListPageShell`（故事内）
- 无新第三方依赖
- **不**本 issue 改造 `CrudPage`（可选 follow-up：`CrudPage` 内包 `PageChrome variant="list"`）

## 实施步骤

- [ ] 1. `PageContent` 增加 `density`（default 视觉不变）
- [ ] 2. business + ui `PageHeader` 增加 `size`（default 视觉不变）
- [ ] 3. 实现 `PageChrome` 变体映射与 list actions 行
- [ ] 4. 单元测试：list 无 h1；list+actions 有操作无 title；default 回归；compact/sm class 存在
- [ ] 5. Storybook：overview / document / list / list+ListPageShell
- [ ] 6. 导出 + CHANGELOG
- [ ] 7. `pnpm test` 相关文件 + `npx tsc --noEmit` + `pnpm run lint`

## 验收标准（对齐 issue）

- [ ] `variant="list"` 无 `actions`：无页内 `h1`、无 description 行
- [ ] `variant="list"` 有 `actions`：单行紧凑操作区，无 title
- [ ] `PageHeader size="default"` / `PageContent density="default"` 保持当前视觉
- [ ] `PageHeader size="sm"` + `PageContent density="compact"` 有文档/故事
- [ ] Storybook：三变体 + list + `ListPageShell` 组合
- [ ] CHANGELOG；建议 minor（`feat`）
- [ ] 不强制迁移 `CrudPage`

## 风险与注意

- **双 PageHeader**：只改一边会导致文档示例与业务页不一致；本计划两边都加 `size`。
- **MobilePageHeader** 包 business `PageHeader`：透传 `size` 可选；默认不改移动端视觉。
- **API 稳定**：`size` / `density` 默认值必须无回归；list 忽略 title 时若误传 title，静默忽略即可（勿 warning 刷屏）。
- **designs 门禁**：本文件即为开发前置计划；实施前将 status 改为 `工作中` 并更新 `INDEX.md`。

## 发布与消费方

- 库：`/release minor`（或并入含 #43 的 minor 波次）
- qxy-mop：pin + `/chaos-ui-up` → FE-10 → 迁 `base-data/employees` → 去掉 `[&_h1]` 临时方案（FE-11）

## Out of scope

- AdminShell 面包屑 / tab 高度
- 全局搜索 / bookmark chrome
- 消费方 CSS override 作为正式方案
- `CrudPage` 强制迁移

## 变更记录

| 日期       | 变更                  | 作者  |
| ---------- | --------------------- | ----- |
| 2026-07-16 | 初始计划（issue #44） | agent |
