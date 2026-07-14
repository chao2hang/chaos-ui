---
status: 完成
created: 2026-07-14
updated: 2026-07-14
---

# AdminShell 折叠钮 Topbar（#17）设计计划

## 概述

桌面侧栏折叠钮默认改到 AdminHeader 最左侧（面包屑旁）；侧栏腰部 absolute 钮可选。新增 `collapseTrigger`。

## 设计方案

- 类型：`AdminCollapseTrigger = "sider-edge" | "header" | "both" | "none"`
- `AdminShell` 默认 `"header"`（产品期望，视觉变更写 CHANGELOG Notes）
- `AdminSider` 默认 `"sider-edge"`（单独使用时保持旧行为）
- `AdminHeader`：`onCollapseClick` + `collapsed` → `lg+` 桌面钮
- mobile `onMenuClick` 不变

## 文件清单

- [x] `components/layout/admin-sider.tsx`
- [x] `components/layout/admin-header.tsx`
- [x] `components/layout/admin-shell.tsx`
- [x] 对应 tests + AdminShell.stories
- [x] `designs/INDEX.md`

## 验收

- [x] Shell 默认 header 有折叠钮、sider 无 edge 钮
- [x] `collapseTrigger="sider-edge"` 恢复旧位置
- [x] vitest layout 三文件 59 passed；`tsc --noEmit` OK

## 变更记录

| 日期       | 变更        | 作者  |
| ---------- | ----------- | ----- |
| 2026-07-14 | 初始（#17） | agent |
| 2026-07-14 | 落地验收    | agent |
