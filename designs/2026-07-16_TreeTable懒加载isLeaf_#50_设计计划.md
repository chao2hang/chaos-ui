---
status: 待审核
created: 2026-07-16
updated: 2026-07-16
issue: 50
---

# TreeTable 懒加载 isLeaf / canExpand (#50)

## 概述

修复 `TreeTable` 在传入 `onExpandRow` 时**所有行都显示展开箭头**的问题（包括明确无下级的叶节点）。增加声明式「是否可展开」能力，并补齐懒加载文档与 Story。

建议 **minor**（新 prop / 行字段约定，默认兼容可尽量保持）或 **patch**（若默认语义仅收紧假箭头、完全兼容旧用法）。

## 背景与动机

- 消费方（qxy-mop）全国行政区划 4 万+ 节点必须懒加载：`onExpandRow` 按 parent 拉子节点。
- 现状：展开 UI 条件为 `hasChildren || !!onExpandRow` → 只要开了懒加载，**叶节点也有箭头**。
- 业务只能 `level>=4 return []`，用户仍点到「假展开」。
- 区划树（只读字典懒加载）与部门小树（内存全量）体验应可区分。

## 现状摸底

| 位置                     | 行为                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `tree-table.tsx:98`      | `onExpandRow?: (row: T) => Promise<T[]>`                                                                           |
| `tree-table.tsx:183–197` | `hasChildren = Array.isArray(children) && length > 0`；`isLeaf: !hasChildren`（**内部 FlatRow**，不读业务 isLeaf） |
| `tree-table.tsx:514–519` | lazy：`onExpandRow` 且 children 空 → 请求                                                                          |
| `tree-table.tsx:771–798` | **显示箭头**：`fr.hasChildren \|\| (!!onExpandRow && !fr.hasChildren)` → 等价于有 lazy 时几乎行行有箭头            |
| 加载失败                 | `try/finally` 不 `catch`：reject 会冒泡；成功才 `loadedKeysRef.add`（未成功标记 loaded，可重试）                   |

## 设计方案

### 1. 可展开判定（推荐组合）

新增 props（均可选，**默认不破坏**「无 onExpandRow 的旧全量树」）：

```ts
interface TreeTableProps<T> {
  // existing...
  onExpandRow?: (row: T) => Promise<T[]>;

  /**
   * Row field meaning "this node has no descendants" (issue #50).
   * When true, never show expand control and never call onExpandRow.
   * Default: undefined (no field).
   */
  isLeafKey?: keyof T & string; // e.g. "isLeaf"

  /**
   * Override expandability. Return false → leaf chrome (no chevron).
   * Runs after hasChildren / isLeafKey checks when provided.
   */
  canExpand?: (row: T) => boolean;
}
```

**显示展开控件当且仅当** `rowCanExpand(row)`：

```
function rowCanExpand(row, fr):
  if canExpand provided:
    return canExpand(row)
  if isLeafKey and row[isLeafKey] === true:
    return false
  if fr.hasChildren:
    return true
  if onExpandRow:
    // children === [] after successful load → leaf
    if loadedKeys has key and !hasChildren:
      return false
    // children undefined or missing → candidate for lazy
    // children [] never loaded → treat as leaf if we want strict; see below
    return true when children is undefined/null OR (not loaded yet and empty?)
  return false
```

### 2. `children` 语义（文档化 + 实现一致）

| 数据形态                                          | 含义                                                                                               |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 有 `children` 且 `length > 0`                     | 已有子节点，可展开                                                                                 |
| `children` **undefined / 缺字段** + `onExpandRow` | **可懒加载**（显示箭头）                                                                           |
| `children: []` 且 **已成功 load**                 | **叶**（无箭头）                                                                                   |
| `children: []` 且 **从未 load** + `onExpandRow`   | 建议：**默认当叶**（避免「空数组假可展开」）；或提供 `lazyEmptyMeansExpand?: boolean` 默认 `false` |

兼容路径：现有全量树 `children` 有数据 → 不变。  
现有懒加载若根节点用 `children: []` 表示「未加载」，会与「叶」冲突 — **推荐消费方未加载用 omit children / undefined**，加载后写 `[]` 或真实数组。CHANGELOG 与 Story 写清。

### 3. 加载后 0 条

- `onExpandRow` resolve `[]` → `replaceNodeChildren` 为 `[]` + `loadedKeys` → 箭头消失（变为叶占位 spacer）。
- （可选）不强制「无下级」文案，避免表格噪声；文档说明即可。

### 4. 加载失败

- 保持：**不**写入 `loadedKeys`，箭头保留，可重试。
- 建议 `try/catch` 后 rethrow 或 `onExpandError?(err, row)`（P2，可不做）。

### 5. 文档 / Story

- Story：`LazyRegions` — 根无 children；`isLeaf` 或 `level>=4` 用 `canExpand`；展开后 0 条变叶。
- JSDoc / business docs：「区划懒加载 vs 部门全量树」一句选型。

### 组件 / 文件清单

- [ ] `components/business/tree-table.tsx` — props + flatten `isLeaf`/canExpand + 渲染条件
- [ ] `components/business/tree-table.test.tsx` — lazy + isLeaf + canExpand + 空加载
- [ ] Storybook TreeTable lazy 示例
- [ ] `CHANGELOG.md`

### 接口设计（摘要）

```tsx
<TreeTable
  data={roots}
  rowKey="id"
  childrenKey="children"
  isLeafKey="isLeaf"
  // or: canExpand={(row) => row.level < 4 && !row.isLeaf}
  onExpandRow={async (row) => api.listRegions(row.id)}
/>
```

## 实施步骤

- [ ] 1. 抽出 `rowCanExpand(row, meta)`，替换 771–798 条件
- [ ] 2. flatten 时若 `isLeafKey` 为 true，强制 `hasChildren` 显示逻辑为叶
- [ ] 3. 成功 load `[]` 后 loadedKeys + 无箭头
- [ ] 4. 单元测试
- [ ] 5. Story + CHANGELOG
- [ ] 6. `pnpm test` tree-table + `tsc`

## 验收标准（对齐 issue）

- [ ] `onExpandRow` + 叶行（`isLeaf` / `canExpand false` / 已 load 空 children）**不**显示展开箭头
- [ ] 未加载且可展开的父级仍显示箭头，点击仍触发 `onExpandRow`
- [ ] 加载 0 条后箭头消失或等价叶态
- [ ] reject 后仍可再次展开重试
- [ ] 无 `onExpandRow` 的全量树行为与现网一致
- [ ] Story + CHANGELOG

## 风险与注意

- **破坏性**：若消费方用 `children: []` 表示「待懒加载」，默认改为叶后需改为 `undefined`。必须在 CHANGELOG **Changed** 写明。
- 内部 `FlatRow.isLeaf` 与业务 `isLeafKey` 命名易混 — 实现时统一 `rowCanExpand` 命名。
- 不在本 issue 做虚拟滚动（issue P2）。

## Out of scope

- VirtualTreeTable
- 组织工作台（#49）
- 强制迁移 mop 字段名

## 发布

- Prefer **minor** if documenting children semantics change; else patch with clear Changed notes.
- 关闭 #50 时 comment 版本 + SHA。

## 变更记录

| 日期       | 变更                  | 作者  |
| ---------- | --------------------- | ----- |
| 2026-07-16 | 初始计划（issue #50） | agent |
