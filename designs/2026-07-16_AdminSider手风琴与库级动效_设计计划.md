---
status: 待审核
created: 2026-07-16
updated: 2026-07-16
---

# AdminSider 手风琴 + 壳层/库级动效 (#43)

## 概述

- Issue #43：`AdminSider` / `AdminShell` 顶层菜单手风琴 + 子菜单/移动抽屉/折叠 flyout 动效，尊重 `prefers-reduced-motion`。
- 扩展：Collapsible 高度动效、动效文档与 token 约定；CSS/Base UI 优先，不强制第三方 Motion。

## 背景与动机

- qxy-mop ERP 长菜单多组同时展开嘈杂；子菜单硬切；移动遮罩无进出。
- 库内 `styles.css` 已有 accordion/collapsible keyframes，但 Collapsible 未接线；AdminSider 未用高度过渡。

## 设计方案

### 技术方案

1. `menuExpandMode?: "multiple" | "accordion"`（默认 `multiple`）。
2. 手风琴仅顶层互斥；嵌套仍多开；deep-link seed 在 accordion 下剪掉其他顶层 key。
3. 子菜单：`Collapsible` + height via `--collapsible-panel-height`。
4. 移动端：presence + opacity/transform 进出；flyout 依赖 Popover 已有 animate。
5. `CollapsibleContent` 对齐 Accordion 高度模式。
6. 文档：`docs/motion.md` + design-tokens 动效小节。

### 组件 / 文件清单

- [x] `designs/2026-07-16_AdminSider手风琴与库级动效_设计计划.md`
- [x] `components/layout/admin-sider.tsx`
- [x] `components/layout/admin-shell.tsx`
- [x] `components/layout/admin-sider.test.tsx`
- [x] `components/ui/collapsible.tsx`
- [x] `components/ui/dialog.tsx` / `sheet.tsx`（reduced-motion）
- [x] `src/stories/layout/AdminSider.stories.tsx`
- [x] `docs/motion.md` + `docs/design-tokens.md`
- [x] `CHANGELOG.md`

### 接口设计

```typescript
menuExpandMode?: "multiple" | "accordion"; // default "multiple"
```

### 依赖

- 现有：`@base-ui/react`、`styles.css`
- 不引入强制 `motion` peer（CSS-first）

## 实施步骤

- [x] AdminSider accordion + 子菜单高度 + 移动进出
- [x] AdminShell 透传
- [x] Collapsible 高度动效
- [x] 测试 + Storybook
- [x] 文档 + CHANGELOG
- [x] 验证 typecheck / 单测

## 验收标准

- [x] #43 acceptance（multiple 默认、accordion 顶层、deep-link、动效、reduced-motion、测试、导出）
- [x] Collapsible 展开有高度过渡
- [x] 消费方文档说明 `styles.css` 与 reduced-motion

## 风险与注意

- tailwind-merge：`fixed` 与 `relative` 并存行为；保持现测期望。
- 移动 exit：300ms presence timeout。

## 变更记录

| 日期       | 变更                     | 作者  |
| ---------- | ------------------------ | ----- |
| 2026-07-16 | 初始 + 实现完成 → 待审核 | chaos |
