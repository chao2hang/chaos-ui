---
status: 完成
created: 2026-07-13
updated: 2026-07-13
---

# AdminSider 折叠体验 + AdminHeader 搜索位置 设计计划

## 概述

修复 open issues #10 / #11 / #12：折叠侧栏子菜单 flyout、折叠 logo 插槽、顶栏搜索相对面包屑位置。

## 背景与动机

- **#10 P0**：`collapsed` 时 children 不渲染且无 flyout，多级菜单不可用。
- **#11 P1**：ReactNode `logo` 折叠时整棵渲染溢出。
- **#12 P1**：搜索固定在面包屑右侧且 `flex-1`，产品期望可配置到左侧。

## 设计方案

### 技术方案

#### #10 AdminSider collapsed flyout

- 折叠且 `hasChildren`：用 `Popover`（Portal）在项右侧展示子菜单。
- 状态：`flyoutKey: string | null`；点击父级 toggle；选中叶子后关闭。
- 展开态：保持现有内联 accordion（`expandedKeys` + `!collapsed`）。
- a11y：父级 `aria-label` 用 label 文本；`aria-haspopup="menu"`。

#### #11 logoCollapsed

- 新增 `logoCollapsed?: React.ReactNode`。
- 折叠渲染：`logoCollapsed ?? (string ? charAt(0) : logo)`，容器 `overflow-hidden` + 居中。
- `AdminShell` 透传 `logoCollapsed`。

#### #12 searchPlacement

- 新增 `searchPlacement?: "before-breadcrumb" | "after-breadcrumb"`，**默认 `before-breadcrumb`**。
- before：紧凑搜索（`w-56 max-w-xs shrink-0`），breadcrumb 可 `min-w-0`；actions 仍 `ml-auto`。
- after：保持现有 `flex-1` 搜索观感。
- `AdminShell` 透传。

### 组件 / 文件清单

- [x] `components/layout/admin-sider.tsx`
- [x] `components/layout/admin-sider.test.tsx`
- [x] `components/layout/admin-header.tsx`
- [x] `components/layout/admin-header.test.tsx`
- [x] `components/layout/admin-shell.tsx`
- [ ] `src/stories/layout/AdminSider.stories.tsx`（按需，未改）
- [ ] `src/stories/layout/AdminHeader.stories.tsx`（按需，未改）

### 依赖

- 现有 `@/components/ui/popover`

## 实施步骤

- [x] 失败测试：#10 flyout、#11 logoCollapsed、#12 placement
- [x] 实现 sider flyout + logoCollapsed
- [x] 实现 header searchPlacement + shell 透传
- [x] 跑测试（admin-sider / admin-header / admin-shell 共 53 通过）

## 验收标准

- 折叠可打开子菜单并 `onItemClick`
- ReactNode logo 折叠不横向溢出；`logoCollapsed` 优先
- 搜索可置于面包屑前；无搜索时 actions 贴右
- 不破坏 CUI-NAV-02 / CUI-LAYOUT-01/02

## 关联

- Issues: #10 #11 #12
