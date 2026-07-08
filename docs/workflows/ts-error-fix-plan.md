# TypeScript 报错修复计划

> 总览：257 个错误，5 大类。按「改动少、影响大」排序。

---

## 批次 1：@base-ui/react API 适配（~12 个文件，~20 个错误）

### 1.1 移除残留的 `asChild` prop（3 个文件）
| 文件 | 行 | 修复 |
|------|------|------|
| `apps/docs/@/components/business/audit-sidebar.tsx` | 41 | `<SheetTrigger asChild>` → `<SheetTrigger>` |
| `apps/docs/@/components/business/channel-picker.tsx` | 53 | `<Button asChild>` → `<Button>` |
| `apps/docs/@/components/business/import-dialog.tsx` | 69 | `<DialogTrigger asChild>` → `<DialogTrigger>` |

这些是 Radix UI → @base-ui/react 迁移遗留，base-ui 没有 `asChild` prop。

### 1.2 Select `onValueChange` 签名适配（7 个文件）
base-ui v1.5.0 中 `onValueChange` 签名改为 `(value: string | null, eventDetails) => void`。

**需要修改接口定义（4 个文件）：**
| 文件 | 行 | 修复 |
|------|------|------|
| `apps/docs/@/components/ui/autocomplete.tsx` | 32 | `onValueChange?: (value: string) => void` → `(value: string \| null) => void` |
| `apps/docs/@/components/ui/input-search.tsx` | 26 | 同上 |
| `apps/docs/@/components/ui/mentions.tsx` | 32 | 同上 |
| `apps/docs/@/components/ui/otp-field.tsx` | 11 | 同上 |

**需要修改 consumer（3 个文件）：**
| 文件 | 行 | 修复 |
|------|------|------|
| `apps/docs/@/components/business/address-picker.tsx` | 116,128,140 | `handleProvinceChange(code)` → `handleProvinceChange(code ?? "")` |
| `apps/docs/@/components/business/unit-converter.tsx` | 93,119 | 同上（已部分处理，补全） |
| `apps/docs/@/components/business/dict-select.tsx` | 37 | `onValueChange={onValueChange}` → `onValueChange={(v) => onValueChange(v ?? "")}` |

### 1.3 ColumnDef 补充 `width`（1 个文件）
| 文件 | 行 | 修复 |
|------|------|------|
| `components/business/advanced-data-table.tsx` | 42 | 接口增加 `width?: number \| string` |

### 1.4 Descriptions `value` vs `content` 统一（1 个文件）
| 文件 | 行 | 修复 |
|------|------|------|
| `apps/docs/@/components/ui/descriptions.tsx` | 28 | `content: React.ReactNode` → `value: React.ReactNode`（对齐 root 版本） |

---

## 批次 2：Mobile barrel shim 补齐（27 个新文件）

`apps/docs/@/components/mobile/index.ts` 引用了 27 个 `./mobile-*` 模块，但 docs 没有对应 shim。

**修复方式：** 为每个缺失的 mobile 组件创建 shim，统一模式：
```ts
// apps/docs/@/components/mobile/mobile-button.tsx
"use client";
export * from "../../../../components/mobile/mobile-button";
```

已存在的可复制（24 个，从 `components/business/` 已有对应文件复制），需要新建 3 个：
- `mobile-checkout.tsx`
- `mobile-share-sheet.tsx`
- `mobile-swipe-card.tsx`

**缺失清单（27 个）：**
mobile-auth-layout, mobile-bottom-nav, mobile-button, mobile-card, mobile-checkout, mobile-dashboard-layout, mobile-data-table, mobile-dialog, mobile-filter-builder, mobile-form, mobile-form-field, mobile-form-wizard, mobile-input, mobile-kanban, mobile-kpi-card, mobile-navigation, mobile-page-header, mobile-pull-to-refresh, mobile-select, mobile-share-sheet, mobile-sheet, mobile-skeleton, mobile-swipe-actions, mobile-swipe-card, mobile-tabs, mobile-textarea, mobile-empty-state

---

## 批次 3：Storybook 渲染类型兼容（~95 个文件，~160 个错误）

### 根因
`StoryObj<typeof meta>` 当 `meta.component` 的 props 继承 `React.ComponentProps<"div">` 时，`ComponentProps<Component>` 展开为包含 280+ DOM 属性的巨型类型，导致 `render: () => JSX.Element` 或 `{}` 无法赋值给 `StoryAnnotations`。

### 修复方案
在报错 story 文件中加 `as Story` 断言，改动最小：
```ts
// Before
export const Default: Story = { ... };

// After
export const Default = { ... } as Story;
```

受影响的 story 文件清单（~95 个，全部在 `apps/docs/src/business/` 下）。可以用 `sed` 批量替换。

---

## 批次 4：业务组件泛型修复（~5 个文件）

| 文件 | 错误 | 修复 |
|------|------|------|
| `apps/docs/src/business/AdvancedDataTable.stories.tsx:49` | `User[]` → `Record<string, unknown>[]` | Story 中用 `users as Record<string, unknown>[]` |
| `apps/docs/src/business/Workflow.stories.tsx:33,41` | `Node[]` → `Node<WorkflowNodeData>[]` | `nodes as Node<WorkflowNodeData>[]` |
| `apps/docs/@/components/business/workflow.test.tsx:14,20,26` | 同上 | 同上 |

---

## 批次 5：（可选）component-loader.ts 类型宽松

`apps/docs/@/components/component-loader.ts` 是自动生成文件，使用 `Record<string, React.ComponentType<unknown>>` 导致连锁报错。

```ts
// 修复：改为宽松类型
export const componentLoaders: Record<string, React.ComponentType<any>> = { ... };
```

自动生成文件，推荐在生成模板源头修复，非手动编辑。

---

## 批次 6：（可选）AMap 类型声明

在 `tsconfig.json` 的 `include` 路径下补全局声明：
```ts
// apps/docs/types/amap.d.ts
declare namespace AMap {
  class Map { ... }
  class Marker { ... }
  // ...
}
```

---

## 执行顺序

```
批次 1（base-ui API）     → 12 个文件，~20 错误，手动精确修改
批次 2（mobile shim）      → 27 个文件，~27 错误，模板化新建
批次 3（Storybook）        → 95 个文件，~160 错误，可用 sed 批量处理
批次 4（泛型）             → 5 个文件，~8 错误，手动
批次 5（component-loader） → 1 个文件，连锁错误，可选
批次 6（AMap）             → 1 个文件，~6 错误，可选
```

每批次完成后跑 `npx tsc --noEmit` 验证。
