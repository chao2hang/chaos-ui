---
status: 待审核
created: 2026-07-15
updated: 2026-07-15
issues: [23, 24]
---

# Chart 图例显隐 + SearchTable 表体 inset 设计计划

## 概述

处理 GitHub **#23（P1）** 与 **#24（P2）**：

1. **#23 / CUI-DASH-08**：`AreaChart` / `LineChart` 多系列图例可点击切换系列显隐；Y 轴 scale 与 tooltip 仅基于可见系列；允许全部隐藏。
2. **#24 / CUI-LIST-02**：`SearchTable` 表体在 `CardContent flush` 下与 FilterBar / 分页同一水平节奏（表体加水平 inset），避免嵌套表框贴 Card 边。

## 背景与动机

- #22 已补 hover tooltip，图例仍静态，工作台「销售趋势」无法按系列过滤读图。
- #8 已为 FilterBar / 分页加 `--card-spacing` inset，并**有意**保留 table full-bleed；消费方反馈表体贴边与筛选/分页不协调，需调整列表契约（CUI-LIST-02）。

## 设计方案

### #23 技术方案

1. 新增共享 hook `useSeriesVisibility`（`components/business/use-series-visibility.ts`）：
   - 内部 `Set` 维护 hidden 系列名
   - `toggle(name)` / `isHidden(name)` / `hiddenNames: string[]`
   - `defaultHiddenSeries?: string[]` 初始化
   - `interactiveLegend` 默认 `true`；为 `false` 时图例不可点、不响应 toggle
   - 可选 `onSeriesVisibilityChange?: (hidden: string[]) => void`
2. `AreaChart` / `LineChart`：
   - 新增 props：`interactiveLegend?`、`defaultHiddenSeries?`、`onSeriesVisibilityChange?`
   - 图例项改为可聚焦 `button`，`aria-pressed`（可见 `true` / 隐藏 `false`）
   - 隐藏态：`opacity` 降 + 文字划线
   - 绘制 path/area/points、Y scale、tooltip 均过滤 hidden
   - 全隐：`max=1`、`min=0`、`range=1`，不崩溃
3. 单测覆盖 toggle、全隐、tooltip 过滤、`interactiveLegend={false}`、回调

### #24 技术方案（选 A：表体水平 inset）

- 表格外包一层 `px-[var(--card-spacing,1rem)]`，内层保留 `overflow-x-auto rounded-md border`
- 与 FilterBar inline / pagination 同一 token，默认列表观感一致
- 更新 #8 时代「table body stays full-bleed」注释与单测契约

不选 B（去嵌套边框）以免破坏非 Card 场景下表格边界语义；后续若要 B 可加 prop。

### 组件 / 文件清单

- [x] `designs/2026-07-15_Chart图例显隐_SearchTable表体inset_设计计划.md`
- [x] `components/business/use-series-visibility.ts`（新）
- [x] `components/business/use-series-visibility.test.tsx`（新）
- [x] `components/business/area-chart.tsx`
- [x] `components/business/area-chart.test.tsx`
- [x] `components/business/line-chart.tsx`
- [x] `components/business/line-chart.test.tsx`
- [x] `components/business/search-table.tsx`
- [x] `components/business/search-table.test.tsx`
- [x] `CHANGELOG.md`（Unreleased / 1.5.8 条目）
- [x] `designs/INDEX.md`

### 接口设计

```typescript
// useSeriesVisibility
function useSeriesVisibility(options: {
  interactiveLegend?: boolean; // default true
  defaultHiddenSeries?: string[];
  onSeriesVisibilityChange?: (hidden: string[]) => void;
}): {
  isHidden: (name: string) => boolean;
  toggle: (name: string) => void;
  hiddenNames: string[];
};

// AreaChart / LineChart 增量 props
interactiveLegend?: boolean; // default true
defaultHiddenSeries?: string[];
onSeriesVisibilityChange?: (hidden: string[]) => void;
```

### 依赖

- 现有：`chart-hover`、`formatNumber`、Card `--card-spacing`
- 无新第三方依赖

## 实施步骤

- [x] 写本计划并挂看板「工作中」
- [x] 实现 `useSeriesVisibility` + 单测
- [x] 接入 `AreaChart` 图例 / scale / tooltip
- [x] 接入 `LineChart` 图例 / scale / tooltip
- [x] `SearchTable` 表体水平 inset + 测例
- [x] CHANGELOG
- [x] 跑相关 vitest（45 passed）

## 验收标准

- [x] 点击 AreaChart / LineChart 图例可切换系列显隐；允许全隐
- [x] 隐藏后图例降级；scale / tooltip 仅可见系列
- [x] `interactiveLegend={false}` 时图例不可点
- [x] SearchTable 表体 wrapper 有 `px-[var(--card-spacing,1rem)]`，与分页一致
- [x] 相关单元测试通过
- [x] 不破坏既有单系列 / 无图例路径

## 风险与注意

- #8 契约变更：full-bleed 表体 → inset 表体，需 CHANGELOG 写明
- 图例 `role="list"` + `button`：listitem 可用 button 直接作项；注意 pointer 事件不要冒泡干扰 plot hover
- 默认 `interactiveLegend=true` 为增强非 breaking（无新必填 props）

## 变更记录

| 日期       | 变更 | 作者  |
| ---------- | ---- | ----- |
| 2026-07-15 | 初始 | chaos |
