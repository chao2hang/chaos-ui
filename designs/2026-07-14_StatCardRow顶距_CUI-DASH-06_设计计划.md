---
status: 完成
created: 2026-07-14
updated: 2026-07-14
---

# StatCardRow 顶距修复（CUI-DASH-06 / #16）设计计划

## 概述

去掉 `StatCardRow` 中 `Card` `py` 与 `CardContent pt-6` 的双重顶距，使 KPI title 贴近卡内容区顶部（约 `--card-spacing`），与 `StatCard` / `StatCardWithDelta` 垂直节奏一致。

## 背景与动机

- 工作台 KPI 行 title 视觉下沉（约 40px = py 16 + pt-6 24）。
- Card 已自带 `py-(--card-spacing)`；Content 再 `pt-6` 为过时叠层。
- CUI-DASH-02 未覆盖垂直 padding。

## 设计方案

### 技术方案

1. 去掉 `CardContent` 的 `pt-6`。
2. title→value `mt-2` → `mt-1.5`（略收紧）。
3. 单测断言 content 不含 `pt-6`。
4. 不改 Card 全局 API。

### 组件 / 文件清单

- [x] `components/business/stat-card-row.tsx`
- [x] `components/business/stat-card-row.test.tsx`
- [x] `src/stories/business/StatCardRow.stories.tsx`
- [x] `designs/INDEX.md`

## 实施步骤

- [x] 看板 → 工作中
- [x] 实现 padding 修复
- [x] 测试 + Story 说明
- [x] 验收 → 完成

## 验收标准

- [x] title 顶距为单一 Card `py`，无 Content `pt-6`
- [x] title/value 间距可读（`mt-1.5`）
- [x] icon 仍 `items-start` 顶对齐
- [x] vitest `stat-card-row.test.tsx` 18 passed

## 风险与注意

- 视觉变紧：符合 KPI 惯例；消费方等 1.5.6+

## 变更记录

| 日期       | 变更        | 作者  |
| ---------- | ----------- | ----- |
| 2026-07-14 | 初始（#16） | agent |
| 2026-07-14 | 落地并验收  | agent |
