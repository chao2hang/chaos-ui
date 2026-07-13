---
status: 完成
created: 2026-07-13
updated: 2026-07-13
---

# Resizable 左右面板联动 设计计划

## 概述

修复 `Resizable` 水平/垂直拖拽时仅更新单侧面板百分比、对侧不联动，导致总占比溢出、尺寸不自动调整的问题。

## 背景与动机

- 文档页 `/components/layout/resizable` 与 Storybook 中左右拖动时，一侧变大对侧不收缩。
- 根因：`ResizableHandle` 只 `setSize` 主面板，且面板使用绝对 `width/height %`，无 sibling rebalance。
- 对比：`SplitPane` 使用 `size%` + `100-size%`，行为正确。
- 预期：拖拽时相邻两面板联动，始终填满容器；尊重双方 min/max。

## 设计方案

### 技术方案

1. **布局**：面板改为 flex 权重（`flexGrow: size`，`flexBasis: 0`，`min-w/h-0`），避免百分比之和溢出。
2. **拖拽**：解析主面板 + 相邻次面板；保持 `T = primary + secondary`，双边 `setSize`；clamp 双方 min/max。
3. **UX**：拖拽时 `select-none`；加宽 handle 点击热区；保留双击折叠。
4. **测试**：覆盖 handle 在中间/内部、对侧 minSize、flexGrow 变化。

### 组件 / 文件清单

- [x] `components/ui/resizable.tsx`
- [x] `components/ui/resizable.test.tsx`
- [x] `apps/docs/src/components/resizable.test.tsx`
- [x] `designs/INDEX.md`

### 接口设计

公开 API 不变：`ResizablePanelGroup` / `ResizablePanel` / `ResizableHandle`。

### 依赖

- 无新第三方依赖
- 参考现有 `SplitPane` 拖拽数学

## 实施步骤

- [x] 写设计计划并挂看板
- [x] 实现 flex 布局 + 成对 rebalance
- [x] 补单元测试
- [x] 更新 docs 测试中对 `width %` 的断言
- [x] 跑 vitest / 必要类型检查

## 验收标准

- [x] 水平拖拽：一侧增大、对侧缩小，不溢出容器
- [x] 垂直拖拽同样正确（同一套 pair rebalance + flex 模型）
- [x] 双方 `minSize`/`maxSize` 生效
- [x] handle 在面板内或面板间均可用
- [x] 单元测试通过（root 9 + docs 5）
- [x] `npx tsc --noEmit` 通过

## 风险与注意

- 折叠态与 flex 权重：collapsed 时用 `collapsedSize` 作 flexGrow，对侧自然吃掉剩余空间。
- 不引入 `react-resizable-panels` 依赖替换。

## 变更记录

| 日期       | 变更             | 作者  |
| ---------- | ---------------- | ----- |
| 2026-07-13 | 初始             | agent |
| 2026-07-13 | 实现完成，待审核 | agent |
