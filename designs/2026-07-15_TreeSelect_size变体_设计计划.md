---
status: 待审核
created: 2026-07-15
updated: 2026-07-15
issue: 28
---

# TreeSelect size 变体 设计计划

## 概述

为 `TreeSelect` 增加 `size?: "sm" | "default"`，使工具栏场景可与 `Button size="sm"` / `SelectTrigger size="sm"`（`h-7`）并排对齐。对应 GitHub #28。

## 背景与动机

- mop `/base-data/departments` 等 PageHeader actions 中 TreeSelect 与 sm 按钮并排时触发器偏高。
- 触发器 class 硬编码 `min-h-8` + `py-1`，props 无 `size`。
- `SelectTrigger` 已有 `data-[size=default]:h-8 data-[size=sm]:h-7`。

## 设计方案

### 技术方案

1. **API（additive）**：`TreeSelectProps.size?: "sm" | "default"`，默认 `"default"`。
2. **触发器高度**：
   - `default`：保持 `min-h-8 py-1`（多选换行兼容）。
   - `sm` 单选：`h-7 min-h-7 py-0`，对齐 SelectTrigger/Button sm。
   - `sm` 多选：`min-h-7 py-0`（允许多 Badge 换行增高），sm 圆角对齐 Select。
3. **data-size**：根节点与触发器打 `data-size={size}` 便于测试/样式。
4. **Badge**：`size="sm"` 时紧凑 class（更小 h/px），避免撑破工具栏意图。
5. **不改** `OrgTreeSelect`（独立 Popover 实现，非包装 TreeSelect）。

### 组件 / 文件清单

- [x] `components/ui/tree-select.tsx`
- [x] `components/ui/tree-select.test.tsx`
- [x] `src/stories/ui/TreeSelect.stories.tsx`
- [x] `designs/INDEX.md`（看板状态）

### 接口设计

```typescript
interface TreeSelectProps {
  // …existing…
  size?: "sm" | "default";
}
```

### 依赖

- 无新第三方依赖；对齐现有 SelectTrigger / Button sm token。

## 实施步骤

- [x] 更新 `TreeSelectProps` + 触发器 class + Badge sm
- [x] 单测：props 类型、`data-size`、sm `h-7` class
- [x] Story：SizeSm、WithPageHeaderActions
- [x] `vitest` + `tsc` / eslint 窄范围验证

## 验收标准

- [x] `size` 默认 default，行为与现网一致
- [x] `size="sm"` 单选触发器含 `h-7` / `min-h-7`，可与 Button sm 齐平
- [x] 多选 sm 不强制 `h-7`（仅 `min-h-7`）
- [x] Storybook 覆盖 sm + PageHeader 工具栏并排
- [x] 单元测试通过（9）
- [x] typecheck 通过；eslint 无 error（仅既有 missing-story path 警告）

## 风险与注意

- 固定 `h-7` 会裁切多选换行 → sm 多选仅用 `min-h-7`。
- 不改全局 Badge API。
- DialogTrigger 对非 button render 的 Base UI 警告为既有问题，本 issue 不修。

## 变更记录

| 日期       | 变更                         | 作者  |
| ---------- | ---------------------------- | ----- |
| 2026-07-15 | 初始计划 + 实施完成 → 待审核 | chaos |
