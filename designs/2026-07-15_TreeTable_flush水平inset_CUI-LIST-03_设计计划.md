---
status: 完成
created: 2026-07-15
updated: 2026-07-15
---

# TreeTable / 列表表 flush 水平 inset（CUI-LIST-03 / #27）

## 概述

`CardContent flush` 下，`SearchTable`（#24）已有表体水平 inset，`TreeTable` 等根节点直接 border+scroll，表体贴 Card 边。对齐 FE-10 列表节奏。

## 背景与动机

- 现象：部门管理等 `Card > CardContent flush > TreeTable` 左右无呼吸；公司管理 SearchTable 正常
- 前序：CUI-LIST-01 #8、CUI-LIST-02 #24；本项 CUI-LIST-03 #27
- FE-11：不在业务页加 `px-*`

## 设计方案

### 技术方案

与 SearchTable 一致：外层 `px-[var(--card-spacing,1rem)]`，内层保留 `overflow-x-auto` + border/rounded。

同波次：

1. **TreeTable**（#27 主修复）
2. **EditableTreeTable**（同构）
3. **DataTable**、**ProTable**（FE-10 常用；ProTable 含 toolbar / table / pagination）

### 组件 / 文件清单

- [x] `components/business/tree-table.tsx` + test
- [x] `components/business/editable-tree-table.tsx` + test
- [x] `components/business/data-table.tsx` + test
- [x] `components/business/pro-table.tsx` + test
- [x] `designs/INDEX.md`

### 接口设计

无 public API 变更。

## 实施步骤

- [x] TreeTable 外 pad / 内 border
- [x] EditableTreeTable 同构
- [x] DataTable / ProTable
- [x] 单测断言 body slot + card-spacing
- [x] vitest 相关文件

## 验收标准

- [x] flush 下 TreeTable 与 SearchTable 水平节奏一致
- [x] 横向滚动仍在内层
- [x] 单测通过；无强制 API 变更

## 风险与注意

- 消费方若已在外层手写 padding 可能双倍间距（FE-11 禁止）
- 领域 `*Table`（Todo/Task/Diff 等）后续 CUI-LIST-04
- DataTable：顺带修正 `useMemo` 双重箭头导致 columns 非数组（`columnDefs.map is not a function`）

## 变更记录

| 日期       | 变更                       | 作者  |
| ---------- | -------------------------- | ----- |
| 2026-07-15 | 初始                       | chaos |
| 2026-07-15 | 实现 + 单测；状态 → 待审核 | chaos |
