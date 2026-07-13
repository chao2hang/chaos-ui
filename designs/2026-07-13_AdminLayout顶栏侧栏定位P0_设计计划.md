---
status: 完成
created: 2026-07-13
updated: 2026-07-13
---

# Admin Layout 顶栏/侧栏定位 P0 设计计划

## 概述

修复 `@chaos_team/chaos-ui@1.5.1` 两个 P0 布局问题：

1. **CUI-LAYOUT-01** `AdminHeader`：用户菜单贴在面包屑旁，未靠右
2. **CUI-LAYOUT-02** `AdminSider`：折叠按钮定位到视口右侧，未贴侧栏右缘

## 背景与动机

- 实测 1440 宽：用户 chip left≈300；折叠钮 left≈1424
- 根因已明确，属 CSS 布局错误，非消费方误用

## 设计方案

### CUI-LAYOUT-01

- 右侧 actions 容器固定 `ml-auto`，去掉错误的 `md:ml-0`
- 搜索区改为中间 `flex-1`（去掉 `ml-auto`），避免与右侧 pin 抢 free space
- 增加 `data-slot="admin-header-actions"` 便于测试与消费方定位

### CUI-LAYOUT-02

- `<aside>` 增加 `relative`，使折叠钮 `absolute -right-3 top-20` 相对侧栏定位

### 组件 / 文件清单

- [x] `components/layout/admin-header.tsx`
- [x] `components/layout/admin-header.test.tsx`
- [x] `components/layout/admin-sider.tsx`
- [x] `components/layout/admin-sider.test.tsx`
- [x] `designs/INDEX.md`

## 实施步骤

- [x] 设计计划挂看板
- [x] 先写失败测试（class 断言）
- [x] 修 header / sider
- [x] 跑 vitest

## 验收标准

- [x] `showSearch={false}` 时右侧容器仍含 `ml-auto`，且无 `md:ml-0`
- [x] `data-slot="admin-sider"` 含 `relative`
- [x] 单元测试通过（header 23 + sider 3）

## 变更记录

| 日期       | 变更             | 作者  |
| ---------- | ---------------- | ----- |
| 2026-07-13 | 初始             | agent |
| 2026-07-13 | 实现完成，待审核 | agent |
