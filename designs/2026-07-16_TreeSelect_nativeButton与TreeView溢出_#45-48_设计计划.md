---
status: 完成
created: 2026-07-16
updated: 2026-07-16
issues: [45, 48]
---

# TreeSelect nativeButton (#45) + TreeView/TreeSelect 标签溢出 (#48)

## 概述

修两处 **P1** 树控件问题：

1. **#45**：`TreeSelect` 触发器用非 `<button>` 的 `render` 且未设 `nativeButton={false}`，Base UI 控制台报错。
2. **#48**：`TreeView` / `TreeSelect` 节点 label 硬编码 `truncate` 且无完整文案恢复（无 `title` / Tooltip），深层级主数据树看不全。

建议与 #46/#47 同 patch 波次或先单独修（改动面小）；默认 **patch** 即可（行为修复 + 非破坏可选 API）。

## 背景与动机

- 消费方（qxy-mop）挂载 `TreeSelect` 即刷 Base UI `nativeButton` error；开发体验与 a11y 契约受损。
- 商品分类等深树 + `MasterDetailLayout sidebarWidth≈300` 下，深节点只剩编码碎片；业务无法靠 props 关 truncate，也不应 CSS override 库。

## 现状摸底

### #45 TreeSelect 触发器

| 项       | 现状                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| 文件     | `components/ui/tree-select.tsx` ~268–331                                                          |
| 实现     | `Dialog` + **`DialogTrigger`**（issue 文案写 PopoverTrigger，**源码实为 Dialog**；修复点同理）    |
| 触发器   | `render={<div data-size … className="border-input flex …" />}`                                    |
| 缺失     | 未传 `nativeButton={false}`                                                                       |
| 正确先例 | `Autocomplete` / `Mentions` / `PaginationLink` / `AdminSider` 折叠 flyout：`nativeButton={false}` |

### #48 标签截断

| 文件                            | 行                       | 写法                                                            |
| ------------------------------- | ------------------------ | --------------------------------------------------------------- |
| `components/ui/tree-view.tsx`   | ~160                     | `<span className="flex-1 truncate text-sm">{node.label}</span>` |
| `components/ui/tree-select.tsx` | ~117（`TreeSelectItem`） | 同上                                                            |
| `paddingLeft`                   | `level * 16 + 8`         | 深树挤占文字宽                                                  |

## 设计方案

### #45 修复（推荐）

```tsx
<DialogTrigger
  nativeButton={false}
  render={
    <div
      data-size={size}
      role="combobox" // 若已有则保留；否则评估是否需 aria-haspopup 等（以现有 a11y 为准，不借机大改）
      className={cn(...)}
    />
  }
  disabled={disabled}
>
```

- **不**改为真 `<button>`：内部多选 Badge + clear 按钮嵌套，真 button 会引入 invalid nesting / 布局成本。
- 与 Autocomplete 一致：非 button render + 显式 `nativeButton={false}`。

### #48 分档交付

#### P0（本 issue 必达）

标签 span：

```tsx
<span
  className={cn(
    "flex-1 text-sm",
    labelOverflow === "truncate" && "truncate",
    labelOverflow === "wrap" && "break-words whitespace-normal",
  )}
  title={
    typeof node.label === "string" && labelOverflow === "truncate"
      ? node.label
      : undefined
  }
>
  {node.label}
</span>
```

- 默认 `labelOverflow = "truncate"` → **行为视觉不变**，仅增加原生 `title` hover 全名。
- `TreeSelectItem` 与 `TreeViewItem` **同一策略**。

#### P1（建议同 PR 若成本低）

| Prop            | 类型                             | 默认         | 说明                           |
| --------------- | -------------------------------- | ------------ | ------------------------------ |
| `labelOverflow` | `"truncate" \| "wrap" \| "none"` | `"truncate"` | TreeView + TreeSelect 共用语义 |

可选后续（本计划可不做）：溢出检测 + `Tooltip`（仅 `scrollWidth > clientWidth`）；`renderLabel`。

#### 文档

- TreeView / MasterDetail 故事或 JSDoc：深树建议 `sidebarWidth` ≥ 320 或 `labelOverflow="wrap"`。
- 不强制改 `MasterDetailLayout` 默认宽度。

### 组件 / 文件清单

- [ ] `components/ui/tree-select.tsx` — `nativeButton={false}` + 节点 title / `labelOverflow`
- [ ] `components/ui/tree-view.tsx` — 节点 title / `labelOverflow`
- [ ] `components/ui/tree-select.test.tsx` — 无 console error；title 存在
- [ ] `components/ui/tree-view.test.tsx` — title / wrap 断言
- [ ] Stories：深树截断 + hover；TreeSelect 默认挂载
- [ ] `CHANGELOG.md`

### 接口设计

```ts
// TreeViewProps / TreeSelectProps（可选增强）
labelOverflow?: "truncate" | "wrap" | "none";
```

## 实施步骤

- [ ] 1. TreeSelect `DialogTrigger` 加 `nativeButton={false}`
- [ ] 2. 提取或内联 label 渲染：truncate + `title`（string label）
- [ ] 3. TreeView / TreeSelect 同步；默认 truncate
- [ ] 4. 可选：`labelOverflow` prop 透传至 item
- [ ] 5. 测试：挂载 TreeSelect 时 mock/spy console.error 不应出现 nativeButton 文案；深节点 `title` 等于 label
- [ ] 6. CHANGELOG；`pnpm test` 相关 + `tsc`

## 验收标准

### #45

- [ ] 默认 `<TreeSelect data={…} />` 控制台 **无** Base UI nativeButton 错误
- [ ] 打开/关闭、多选、clear 仍可用

### #48

- [ ] 默认 truncate 视觉不变
- [ ] 字符串 label 在 truncate 时带 `title={label}`（或等价 Tooltip）
- [ ] TreeSelect 下拉节点与 TreeView **策略一致**
- [ ] （若做）`labelOverflow="wrap"` 可多行显示全名

## 风险与注意

- Issue 写 Popover，源码是 **DialogTrigger** — 修 Dialog 即可，勿误改成 Popover 重构。
- `title` 对 ReactNode label 跳过（当前 `label: string`，安全）。
- 嵌套 button（Badge 内 remove）本就存在；`nativeButton={false}` 不引入新嵌套问题。

## 发布

- Prefer **patch**；可与 #46/#47 同 minor/patch 波次。
- 消费方 pin + 回归：部门公司筛选可回 TreeSelect；商品分类树 hover 见全名。

## 变更记录

| 日期       | 变更                  | 作者  |
| ---------- | --------------------- | ----- |
| 2026-07-16 | 初始计划（#45 + #48） | agent |
