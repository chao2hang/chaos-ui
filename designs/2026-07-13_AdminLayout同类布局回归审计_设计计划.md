---
status: 完成
created: 2026-07-13
updated: 2026-07-13
---

# Admin Layout 同类布局回归审计

## 概述

在 CUI-LAYOUT-01/02 修复后，对 `components/layout` 及相邻 shell/header 做同类问题扫描，避免消费方再次踩坑。

## 审计范围与方法

1. 全库检索 `md:ml-0` / `sm:ml-0` / `lg:ml-0`（右侧 pin 被响应式取消）
2. 全库检索 `absolute -right/-left` 与 `fixed … lg:static`（定位参照被 static 取消）
3. 启发式扫描：带 `absolute` 的 className 附近无 `relative|fixed|sticky|absolute` 祖先
4. 人工复核：AdminShell / AppShell / TopBar / DashboardLayout / PublicLayout / SidebarRail / InputSearch / PageHeader

## 结论矩阵

| 组件                              | 同类风险                                      | 结论                                                                                                     |
| --------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `AdminHeader`                     | 右侧 `ml-auto` 被 `md:ml-0` 取消              | **已修**（CUI-LAYOUT-01）                                                                                |
| `AdminSider`                      | collapse `absolute` 无 containing block       | **已修** relative；**本次补强**：去掉 `lg:static`，改 `lg:relative`，防 mobileOpen 后桌面再次丢 relative |
| `DashboardLayout` header          | `ml-auto` 固定在 actions                      | 安全                                                                                                     |
| `TopBar`                          | `ml-auto` 在 actions；nav 用 `flex-1`         | 安全                                                                                                     |
| `PublicLayout`                    | `justify-between`                             | 安全                                                                                                     |
| `PageHeader` / `MobilePageHeader` | `justify-between` / `flex-1`                  | 安全                                                                                                     |
| `AppShell` aside                  | `fixed` + `md:static`，折叠钮非 absolute 外挂 | 无同类 bug                                                                                               |
| `Sidebar` / `SidebarRail`         | rail 挂在已 absolute 的 sidebar-container 内  | 安全（shadcn 模式）                                                                                      |
| `ImmersiveLayout`                 | root `relative` + chrome absolute             | 安全（有测试）                                                                                           |
| `MasterDetailLayout`              | 无 absolute 外挂钮                            | 安全                                                                                                     |
| `InputSearch` enterButton 分支    | clear 按钮 `absolute` 但 root 无 `relative`   | **本次修复**                                                                                             |

## 未发现的同类 P0

- 仓库内已无其它 `md:ml-0` 用法
- 无其它 `absolute -right-N` 外挂折叠钮

## 实施项

- [x] AdminSider：禁止 `lg:static`，桌面保持 relative containing block
- [x] InputSearch：enterButton 根节点加 `relative`；clear 偏移避开右侧搜索按钮
- [x] 回归测试：sider mobileOpen / input-search enterButton clear

## 验收

- [x] `admin-header` / `admin-sider` / `input-search` 相关 vitest 通过

## 变更记录

| 日期       | 变更            | 作者  |
| ---------- | --------------- | ----- |
| 2026-07-13 | 审计 + 补强修复 | agent |
