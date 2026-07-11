---
status: 完成
created: 2026-07-11
updated: 2026-07-11
---

# deprecated 别名与重复组件清理 设计计划

## 概述

对截至 v1.4.0 的 `components/ui/index.ts` 中 deprecated 别名、`components/business/index.ts` 中 deprecated 别名、以及组件族中存在的重复实现进行清理，消除歧义、统一 API、减少漂移。

## 背景与动机

v1.3.0 已完成 `NavigationTabsBar` / `MultiTabManager` 合并，v1.4.0 已完成 `packages/chaos-design-ui/` 影子包删除。剩余工作：

- **Tier 2**：`ui/index.ts` 中 9 个 `@deprecated` 别名（如 `Qrcode` / `Autocomplete` / `Sonner` 等）仅为命名错误别名，存在 1.0 以来一直未清理。
- **Tier 3**：`QrCodeDisplay`（CSS 伪 QR 码）与 `QRCode`（库生成真 QR 码）功能重叠；`GlobalLoading` 内部使用 `Loader2Icon` 而非 `Spinner` 组件，存在重复加载指示器实现。

### 不纳入本次的计划

| 组件                                                                                 | 原因                                                                                           |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `AdvancedDataTable`                                                                  | 295 行自有 API（与 SearchTable/DataTable 不兼容），已标注 `@deprecated`，保持现状直到 2.0      |
| `Spin`                                                                               | 已良好包装 `Spinner`，语义不同（Spin=包裹拟态加载，Spinner=纯图标），无重复                    |
| `Message` / `MessageProvider` / `Toaster`                                            | 三者语义不同（Message=内联 banner，MessageProvider=Toaster host，Toaster=sonner 封装），无重复 |
| `Notification` / `NotificationBadge` / `NotificationDropdown` / `NotificationCenter` | 四者语义不同（banner / badge / dropdown / center），各自独立                                   |
| `NotificationDropdown` vs `NotificationCenter` `NotificationItem` 类型差异           | 差异仅 `action` 字段，属功能差异不作合并（会破坏 API）                                         |
| `Dialog` / `AlertDialog` / `ConfirmDialog` / `PromptDialog`                          | 不同语义层，已正确分层（ui vs business），无重复实现                                           |
| `Image` / `ImageViewer` / `ImageGallery` / `ImageCropper`                            | 不同语义组件，无重复                                                                           |

## 设计方案

### 2-A: 清理 deprecated 别名（ui/index.ts）

**不改代码**，仅统一注释风格 + 补充使用建议。

当前 9 个别名：

- `KpiPanel` → `KPIPanel` (casing)
- `KpiCard` → `KPICard` (casing)
- `OtpField` → `OTPField` (casing)
- `QrcodeDisplay` → `QrCodeDisplay` (casing)
- `Resizable` → `ResizablePanelGroup/ResizablePanel/ResizableHandle` (作用域)
- `Qrcode` → `QRCode` (casing)
- `Autocomplete` → `AutoComplete` (casing)
- `Sonner` → `Toaster` (naming)

**操作**：检查内部代码是否仍使用旧名，如有则批量迁移到新名。对旧别名保留导出但补充 `@deprecated Use XXX — will be removed in 2.0` 的完整 JSDoc。

### 2-B: 清理 deprecated 别名（business/index.ts）

当前仅 `AdvancedDataTable` 涉及（已从 barrel 顶部移除，但在底部保留导出）。不修改，仅确认注释一致。

### 3-A: QrCodeDisplay → 转发到 QRCode

`QrCodeDisplay` 使用纯 CSS 生成**伪 QR 码矩阵**（pattern 不可通过扫描器读取），`QRCode` 使用 `qrcode` 库生成真实 QR 码。两者功能重叠但 `QrCodeDisplay` 不可用。

**操作**：

- 将 `QrCodeDisplay` 改为转发到 `QRCode`（内部调用 `QRCode`），保留 `size` / `showText` 兼容 props
- 在 `QrCodeDisplay` 添加 `@deprecated Use QRCode` JSDoc + `console.warn`（dev 环境）
- 在 `ui/index.ts` 中 `QrcodeDisplay` 别名标记为 `@deprecated`（双重 deprecated）

### 3-B: GlobalLoading 内部改用 Spinner

`GlobalLoading` 当前硬编码 `Loader2Icon` 而非复用 `Spinner` 组件。无功能差异，纯风格统一。

**操作**：

- `GlobalLoading` 内部 `Loader2Icon` 替换为 `<Spinner size="lg" />`
- 视觉无差异（Spinner 默认使用 `Loader2Icon`）

## 实施步骤

- [x] 2-A: 检查内部代码中旧别名使用，迁移到新名
- [x] 2-A: 统一 ui/index.ts 中 deprecated 别名的 JSDoc 注释格式
- [x] 2-B: 确认 business/index.ts 中 deprecated 注释一致
- [x] 3-A: QrCodeDisplay 改为转发到 QRCode
- [x] 3-A: 更新 QrCodeDisplay 测试确保转发行为正确
- [x] 3-B: GlobalLoading 内部的 Loader2Icon 替换为 Spinner
- [x] 3-B: 更新 GlobalLoading 测试确保 Spinner 渲染正确
- [x] 跑 typecheck + build:pkg + test
- [x] 升 1.5.0 + CHANGELOG + commit + tag + push

## 验收标准

- [x] `npx tsc --noEmit` 通过
- [x] `npm run build:pkg` 通过
- [x] `npm run test -- --run` 全绿 (5421 tests / 600 files)
- [x] 旧别名仍可 import（不破坏 API）
- [x] `QrCodeDisplay` 实际渲染真 QR 码（非伪矩阵）
- [x] `GlobalLoading` 内部使用 Spinner 组件

## 风险与注意

- 旧别名（如 `Qrcode`、`Autocomplete`）不可删除——consumers 可能已 import
- `QrCodeDisplay` 改为转发后，`showText` prop 保留但不再渲染伪矩阵（用真 QR 码替代）
- 本次不涉及 breaking change，版本号升 minor → 1.5.0

## AdminShell 重构

### 问题

原 `AdminShell` 实现存在以下问题：

1. **双重嵌套**：通过 `AppShell` 的 `header`/`sidebar` slots 传入 `AdminHeader`/`AdminSider`，导致 `<header>`/`<aside>` 标签嵌套
2. **状态管理混乱**：`AdminShell` 和 `AppShell` 都维护 `collapsed`/`mobileOpen` 状态，容易不同步
3. **布局失效**：根容器使用 `display: contents` 导致 flex 布局断裂
4. **NotificationCenter 隐藏渲染**：用 `hidden` 包裹但仍在 DOM 中

### 解决方案

**移除 AppShell 依赖**，直接使用已有组件组合：

- `AdminHeader`：顶栏（Logo + Breadcrumb + Search + NotificationCenter + UserMenu）
- `AdminSider`：侧边栏（Logo + Menu + Footer + Collapse toggle）
- `AdminTabs`：标签栏（多页签切换）
- `NotificationCenter`：通知中心（放在 header 的 actions 区域）
- `UserMenu`：用户菜单

### 新布局结构

```
<div data-slot="admin-shell" class="flex min-h-screen">
  <AdminSider />
  <div class="flex flex-1 flex-col">
    <AdminHeader />
    {tabs && <div class="border-b"><AdminTabs /></div>}
    <div class="flex flex-1 overflow-hidden">
      <main class="flex-1 overflow-y-auto p-4">{children}</main>
      {aside && <aside>{aside}</aside>}
    </div>
    {footer && <footer>{footer}</footer>}
  </div>
</div>
```

### 变更点

- 移除 `AppShell` 依赖，不再传递 `variant`/`sidebarWidth`/`collapsedWidth`/`asideWidth`/`sidebarCollapsible`/`defaultCollapsed` 到 AppShell
- 移除 `notificationCount`/`onNotificationClick` 等 header 通知 props（NotificationCenter 直接渲染在 header actions）
- 移除 `variant` prop（AppShell 特有）
- 简化状态管理：只维护 `collapsed`/`mobileOpen`，直接传递给 `AdminSider`
- 根容器改为 `flex` 而非 `contents`

### 消费方影响

- **Breaking**：移除 `variant`/`notificationCount`/`onNotificationClick` 等 props
- **兼容**：其他 props 保持不变（`menuItems`/`tabs`/`user`/`notifications` 等）
- 消费方无需修改布局代码，只需移除已废弃的 props

## 变更记录

| 日期       | 变更                     | 作者     |
| ---------- | ------------------------ | -------- |
| 2026-07-11 | 初始                     | OpenCode |
| 2026-07-11 | 添加 AdminShell 重构说明 | OpenCode |
