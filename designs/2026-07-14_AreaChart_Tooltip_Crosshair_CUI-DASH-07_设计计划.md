---
status: 完成
created: 2026-07-14
updated: 2026-07-14
issue: 22
id: CUI-DASH-07
---

# AreaChart / pure SVG 图表 Hover Tooltip + Crosshair 设计计划

## 概述

为 pure SVG 业务图（`AreaChart` 主路径，同步 `LineChart` / `BarChart`）补齐按 x 索引的 hover 读数能力：整列命中 + HTML tooltip + 竖向 crosshair / 高亮点，默认开启，零运行时图表依赖。

## 背景与动机

- 工作台「销售趋势」等场景用 pure SVG `AreaChart`，仅靠点上原生 `<title>` 无法可靠读数。
- Recharts 封装（`chart.tsx`）已有 Tooltip；两条产品线能力不一致。
- 消费方策略（FE-11）：缺口回库，不在 mop 业务页包一层。
- 关联：#13 letterbox、#14 分色；本 issue 为交互可读数 **CUI-DASH-07 / #22**。

## 设计方案

### 技术方案

1. 抽出纯函数 `indexFromClientX` / `barIndexFromClientX`（`components/business/chart-hover.ts`）。
2. plot 容器 `onPointerMove` / `Leave` / `Down` → activeIndex；HTML tooltip + SVG crosshair。
3. `showTooltip` 默认 `true`。
4. LineChart 补宽度测量；BarChart 纵向 hover。

### 组件 / 文件清单

- [x] `components/business/chart-hover.ts` + `chart-hover.test.tsx`
- [x] `components/business/area-chart.tsx` / `area-chart.test.tsx`
- [x] `components/business/line-chart.tsx` / `line-chart.test.tsx`
- [x] `components/business/bar-chart.tsx` / `bar-chart.test.tsx`
- [x] `src/stories/business/AreaChart.stories.tsx` / Line / Bar
- [x] `apps/docs/@/content/Business/charts-*-chart.zh.mdx`

### 接口设计

```typescript
showTooltip?: boolean; // default true
```

### 依赖

- 现有：`formatNumber`、`cn`、React state
- 无新第三方依赖

## 实施步骤

- [x] 设计文档入看板
- [x] 共享 hit 索引工具
- [x] TDD：AreaChart tooltip 测试 → 实现
- [x] LineChart / BarChart 契约同步
- [x] Story + 文档
- [x] 验收命令

## 验收标准

- [x] 悬停按 x 索引展示全部 series 值
- [x] crosshair / 高亮点可见
- [x] `showTooltip={false}` 关闭
- [x] 单元测试通过（26 tests in 4 files）
- [x] 既有 #13 / #14 行为不回归
- [x] `tsc --noEmit` 通过

## 风险与注意

- hit 几何用渲染后 SVG client rect
- 不污染无关 Card 改动；提交时仅 stage 本 issue 文件

## 变更记录

| 日期       | 变更               | 作者  |
| ---------- | ------------------ | ----- |
| 2026-07-14 | 初始计划并完成实现 | agent |
