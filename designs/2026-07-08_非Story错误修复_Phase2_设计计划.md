---
status: 待审核
created: 2026-07-08
updated: 2026-07-08
---

# 非 Story 类型错误修复 — Phase 2/3 设计计划

## 概述

修复 Phase 1（Story 文件）之后剩余的约 874 个类型错误，覆盖 Business Shim 文件、UI/Mobile/Layout 组件、Hooks/Lib 文件、以及模块缺失问题。

## 背景与动机

- Stage 1 已修复 552 个 `.stories.tsx` 文件，消除 ~404 个 TS2322
- 剩余错误分布在 91+ 个文件中，根因不同，需要分模式处理
- TypeScript 5.9.3 存在 `RangeError: Map maximum size exceeded` 内崩溃，修复到一定程度后会自动消除

## 错误分类

### A: Business Shim 接口继承冲突（TS2430）— ~26 errors / ~20 files

**模式**: `interface XProps extends React.ComponentProps<"div">` 覆盖 `onChange` 为不同签名

```typescript
// 当前
interface AudienceSegmentBuilderProps extends React.ComponentProps<"div"> {
  rules: SegmentRule[];
  onChange?: (rules: SegmentRule[]) => void; // 与 ChangeEventHandler 冲突
  className?: string;
}

// 修复
interface AudienceSegmentBuilderProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  rules: SegmentRule[];
  onChange?: (rules: SegmentRule[]) => void;
  className?: string;
}
```

**涉及文件**: audience-segment-builder.tsx, channel-picker.tsx, contract-template.tsx, advanced-search.tsx, announcement-banner.tsx, approval-flow.tsx, async-task-center.tsx, audit-sidebar.tsx, avatar-group.tsx, barcode-display.tsx, batch-selector.tsx, bill-page.tsx, bulk-import-wizard.tsx, campaign-calendar.tsx, chat.tsx, code-block.tsx, code-editor.tsx 等

**修复方式**: sed 批量替换 `extends React.ComponentProps<"div">` → `extends Omit<React.ComponentProps<"div">, "onChange">`

---

### B: Business Shim 导出声明冲突（TS2484）— ~30 errors / ~15 files

**模式**: 同一名称在文件中既 `export interface/type` 又通过 `export { X } from` 重新导出

```typescript
// 当前 — audit-sidebar.tsx
export interface AuditSidebarEntry { ... }  // 本地定义
export { AuditSidebarEntry } from "@/components/business/audit-sidebar";  // 且 re-export

// 修复方式一：只保留本地定义，删除 re-export
// 修复方式二：将本地定义改为 type-only import + re-export
```

**涉及文件**: approval-timeline.tsx, async-task-center.tsx, audience-segment-builder.tsx (×3), audit-sidebar.tsx, bill-page.tsx, campaign-calendar.tsx, contract-template.tsx, diff-viewer-table.tsx, editable-tree-table.tsx, expense-line-editor.tsx, formula-editor.tsx, inline-edit.tsx, inventory-alert-list.tsx, line-editor.tsx, maintenance-log.tsx, media-recorder.tsx, order-line-editor.tsx, permission-matrix.tsx, quality-inspection-form.tsx, remote-select.tsx, role-assignment.tsx, search-table.tsx, shift-calendar.tsx, stat-card-row.tsx, tree-table.tsx, utm-builder.tsx, version-history.tsx

**修复方式**: 逐文件处理，通常删除重复的 re-export 或改为 `export { X as ShimX }`

---

### C: 循环导入别名（TS2303）— 5 errors / 1 file

**模式**: browse-dialog.tsx 从自身 re-export

```typescript
export { BrowseDialog } from "@/components/business/browse-dialog"; // 引用自身！
```

**修复**: 改为引用真实源组件路径

---

### D: 模块不存在（TS2307）— ~86 errors / 1 file

**模式**: `component-story-previews.tsx` 中 `import(...)` 引用了不存在的 `.stories` 文件

例如：`OtpField.stories` 但源文件名是 `otp-field.stories`（大小写差异）

**修复**: 修正文件名大小写或删除对应动态 import

---

### E: UI/Layout/Mobile Shim 错误 — ~50 errors / ~30 files

**涉及路径**: `@/components/ui/*.tsx`, `@/components/layout/*.tsx`, `@/components/mobile/*.tsx`, `@/components/component-loader.ts`, `@/components/component-map.ts`

**错误类型**:

- TS2322: 类型不匹配
- TS2305: 无导出成员（名称不一致）
- TS18046: 'unknown' 不可赋值
- 其他

---

### F: Hooks/Lib 小错误 — ~15 errors / 5 files

**涉及**: `@/hooks/use-online-status.ts`, `@/hooks/use-translation.tsx`, `@/lib/modal-store.tsx`, `@/lib/perf/web-vitals.ts`

**错误类型**: TS2769, TS18046, TS2305, TS2339, TS2722

---

## 方案

### 执行顺序

1. **Group A**: `Omit<ComponentProps, "onChange">` 批量替换（最高 ROl，~20 文件一次性修复 ~26 errors）
2. **Group B**: 导出声明冲突逐个修复（模式明确但需要逐文件检查）
3. **Group C**: 循环导入（1 个文件）
4. **Group D**: 模块缺失（1 个大文件，但 errors 多）
5. **Group E**: UI/Layout/Mobile 按文件逐个 fix
6. **Group F**: Hooks/Lib 小修复

### 批量替换方式

**Group A** — 一条 sed 命令：

```bash
sed -i 's/extends React\.ComponentProps<"div">/extends Omit<React.ComponentProps<"div">, "onChange" | "className">/' *.tsx
```

**Group D** — 检查 component-story-previews.tsx 中不存在的 import，删除或修正路径

其余需要逐文件处理。

## 预期结果

- 消除约 600-700 个错误（~80% of remaining）
- TypeScript 5.9.3 `RangeError` 崩溃可能在错误数量降到一定程度后消失
- 剩余错误将是少数跨包类型不一致或深层类型问题

## 不做范围

- 不改动实际组件源码（package/ 目录）
- 不改动 Story 文件（Phase 1 已完成）
- 不改动 tsconfig 严格性设置

---

## 执行记录

- **2026-07-08**: 全部 6 个 Group 已完成修复并提交 (`8bb9cbc`)
- **Group A**: 71 个 shim 文件中 `React.ComponentProps<"div">` → `React.HTMLAttributes<HTMLDivElement>`（避免 Map 溢出）
- **Group B**: 23 个文件的 TS2484 导出冲突修复（从 `export type { ... }` 删除重复名）
- **Group C**: `browse-dialog.tsx` 循环导入修复（指向 `../../../../../components/...`）
- **Group D**: `component-story-previews.tsx` 重新生成（483 个入口）
- **Group E**: UI(5) + Layout(2) + Mobile(18) + Loader(2) 修复
- **Group F**: Hooks(2) + Lib(2) 修复
- **验证**: Storybook 构建成功。`tsc --noEmit` 仍因 TS 5.9.3 V8 Map 溢出崩溃（0 错误后），已知限制。
