---
status: 完成
created: 2026-07-14
updated: 2026-07-14
---

# AdminShell 高度链文档（CUI-LAYOUT-04 / #15）设计计划

## 概述

补齐 `AdminShell` 消费方高度链文档：Next App Router 根布局样例、parent-fill 契约说明、Story 宿主高度提示。不改组件默认高度行为；`fill` API 延后。

## 背景与动机

- 源码注释已写 CUI-LAYOUT-04（`h-full` + 宿主 `min-h-svh`/`h-svh`），AuthLayout 已自洽（CUI-LAYOUT-05）。
- MDX「注意事项」与 Story 未写 Next 根布局样例，短页侧栏高度易被消费方漏配（issue #15）。
- 2026-07-13 契约计划将 CUI-LAYOUT-04 标为注释完成；本计划覆盖 residual 对外文档。

## 设计方案

### 技术方案

- 文档 only：三份 AdminShell MDX Notes + Props `className` 提示。
- Story：保留 canvas decorator；`FullAdminShell` 增加 docs 描述；`WithMinHSvh` 演示消费方 `className="min-h-svh"`。
- 不改 `admin-shell.tsx` 根高度类；不新增 `fill` prop。

### 组件 / 文件清单

- [x] `designs/INDEX.md`
- [x] `apps/docs/@/content/System Layout/admin-shell.mdx`
- [x] `apps/docs/@/content/System Layout/admin-shell.zh.mdx`
- [x] `apps/docs/@/content/System Layout/admin-shell.en.mdx`
- [x] `src/stories/layout/AdminShell.stories.tsx`

### 接口设计

无 API 变更。文档约定：

```tsx
// Next.js App Router 根布局推荐
<html className="h-full">
  <body className="h-full min-h-svh">
    {children} {/* 中间 Provider 也需能传 h-full / min-h-svh */}
  </body>
</html>
```

### 依赖

- 现有 AdminShell / AuthLayout 对照说明
- 无新第三方依赖

## 实施步骤

- [x] 看板：本计划 → 工作中
- [x] 更新三份 MDX 注意事项 + className 说明
- [x] 更新 AdminShell Story 高度链描述 / WithMinHSvh
- [x] 验收勾选后 → 完成并移看板

## 验收标准

- [x] 中/英/双语 Notes 含高度契约 + Next 根布局样例
- [x] 明确 AdminShell 默认 parent-fill，非 AuthLayout 式默认 `min-h-svh`
- [x] Props 表提示 `className` 可加 `min-h-svh` 等
- [x] Story 说明宿主高度；演示仍正常
- [x] 无 AdminShell 运行时行为变更

## 风险与注意

- MDX 三语同步
- Story decorator 与 `min-h-svh` 叠高：`WithMinHSvh` 仍在 meta host 内，仅演示 className 逃生舱

## 变更记录

| 日期       | 变更                      | 作者  |
| ---------- | ------------------------- | ----- |
| 2026-07-14 | 初始（#15）               | agent |
| 2026-07-14 | 文档 + Story 落地，标完成 | agent |
