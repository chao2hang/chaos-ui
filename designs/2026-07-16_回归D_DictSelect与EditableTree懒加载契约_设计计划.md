---
status: 待审核
created: 2026-07-16
updated: 2026-07-16
parent: 2026-07-16_已闭环Issue同类回归审计_设计计划.md
---

# 回归 D：DictSelect size 阶梯 + EditableTreeTable 懒加载契约

## 概述

1. `DictSelect` 的 `sm` 现为 `h-8`，与库约定 sm=h-7（#28–#32 / #46）不一致。
2. `EditableTreeTable` 尚无 `onExpandRow`；在代码与 JSDoc 写明：若未来加懒加载，必须同步 `isLeafKey`/`canExpand`，禁止 `hasChildren || !!onExpandRow`（#50 教训）。

## 实施清单

- [ ] `components/business/dict-select.tsx` — sm → h-7；default 与 SelectTrigger 对齐（h-8）
- [ ] dict-select 测试（若有 size 断言则更新）
- [ ] `components/business/editable-tree-table.tsx` — 模块/props JSDoc 契约注释
- [ ] CHANGELOG Changed：DictSelect sm 高度

## 验收

- [ ] DictSelect `size="sm"` class 含 h-7
- [ ] EditableTreeTable 注释可见 #50 交叉引用

## 变更记录

| 日期       | 变更        | 作者  |
| ---------- | ----------- | ----- |
| 2026-07-16 | 计划 + 实施 | agent |
