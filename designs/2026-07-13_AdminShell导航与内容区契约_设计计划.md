---
status: 完成
created: 2026-07-13
updated: 2026-07-13
---

# AdminShell / 导航 / 工作台契约修复（mop 1.5.1 反馈）

## 概述

处理 qxy-mop 消费方 FE-11 反馈批次（含 P0 壳层 + 续扫 P0/P1）。

## 已实现

| ID            | 级别 | 处理                                                                               |
| ------------- | ---- | ---------------------------------------------------------------------------------- |
| CUI-LAYOUT-01 | P0   | AdminHeader 右侧固定 `ml-auto`，去掉 `md:ml-0`                                     |
| CUI-LAYOUT-02 | P0   | AdminSider `relative` + 禁止 `lg:static`                                           |
| CUI-LAYOUT-03 | P1   | AdminShell `contentPadding` / `contentClassName` / `data-slot=admin-shell-content` |
| CUI-LAYOUT-04 | P2   | 注释文档化高度链；AuthLayout 默认 `min-h-svh` 更自洽                               |
| CUI-LAYOUT-05 | P0   | AuthLayout `fill="viewport"\|"parent"`，默认 `min-h-svh`                           |
| CUI-NAV-01    | P1   | `linkComponent`；`onItemClick`+href 时 preventDefault                              |
| CUI-NAV-02    | P1   | 祖先自动展开 + `data-active-branch` 弱高亮                                         |
| CUI-NAV-03    | P1   | AdminHeader `breadcrumbLinkRender` / item.render                                   |
| CUI-I18N-01   | P1   | tabs 文案走 i18n + defaultValue 兼容测试                                           |
| CUI-TAB-01    | P2   | active tab `bg-primary/5`                                                          |
| CUI-A11Y-01   | P1   | UserMenu `data-slot=user-menu` / trigger                                           |
| CUI-DASH-01   | P0   | AreaChart token/var 解析 + 默认调色板色                                            |
| CUI-DASH-02   | P1   | StatCardRow `suffix` + 语义色 preset                                               |
| CUI-DASH-03   | P1   | QuickEntryGrid auto-fill / columns                                                 |
| CUI-DASH-04   | P1   | BarChart `xLabelRotate` / `maxLabelLength` + 自动旋转                              |

## 消费方升级建议（mop）

1. 升级到含本修复的版本（建议 **1.5.2**），勿 link 本地源码。
2. `AdminShell contentPadding={false}` + 外层用 **div**（不要再包 `<main>`）做 FE-10 gutter。
3. 菜单：`linkComponent={Link}` 或继续不写 href + `onMenuItemClick`。
4. 面包屑：`breadcrumbLinkRender` 注入 Next Link。
5. AreaChart：可用 `primary` / `chart-1` 或 `var(--color-primary)`（库内映射 hex）。
6. StatCardRow：`suffix: '单'`，`color: 'green'`。
7. QuickEntryGrid：窄容器无需 columns；要固定列传 `columns={n}`。

## 验收

- [x] 相关 vitest 通过（auth / shell / sider / header / tabs / user-menu / area / stat / quick / bar）
