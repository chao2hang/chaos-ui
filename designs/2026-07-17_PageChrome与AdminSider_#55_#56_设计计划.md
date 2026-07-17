---
status: 待审核
created: 2026-07-17
updated: 2026-07-17
---

# PageChrome form/detail (#55) + AdminSider no-scrollbar (#56)

## 概述

- **#55**：扩展 `PageChrome` 为 `list | form | detail | overview`，`document` 弃用并对齐 `form`（无页内 title）；`detail` 增加 `identity` 槽。
- **#56**：`AdminSider` 菜单 `nav` 增加 `no-scrollbar`，与 `SidebarContent` 一致。

## 现有组件检索

- [x] PageChrome：`components/business/page-chrome.tsx`（#44）
- [x] AdminSider nav：`overflow-y-auto` 无 `no-scrollbar`（#56 根因）
- [x] 库已有 `@utility no-scrollbar` / SidebarContent 范例
- [x] 结论：扩展既有组件，不新建平行页壳

## 设计方案

### #56

```tsx
<nav className="no-scrollbar flex-1 space-y-0.5 overflow-x-hidden overflow-y-auto p-2">
```

可选 prop 本期不做（默认 none 即可）；测试断言 class 含 `no-scrollbar`。

### #55

| variant  | title                        | 顶栏                     | density |
| -------- | ---------------------------- | ------------------------ | ------- |
| list     | 否                           | optional actions         | compact |
| form     | 否                           | 无（忽略 actions/title） | compact |
| detail   | 否                           | optional identity        | compact |
| overview | 是                           | PageHeader + actions     | default |
| document | **alias form** + @deprecated | 同 form                  | compact |

`identity`：`data-slot="page-chrome-identity"`，单行薄条 `min-h-8` / `py-1`，非 PageHeader。

## 文件清单

- [x] `components/business/page-chrome.tsx`
- [x] `components/business/page-chrome.test.tsx`
- [x] `src/stories/business/PageChrome.stories.tsx`
- [x] `components/layout/admin-sider.tsx`
- [x] `components/layout/admin-sider.test.tsx`
- [x] `docs/component-decision-table.md`（PageChrome 选型）
- [x] 本计划 / INDEX

## 验收

- [x] list/form/detail 无 h1；overview 有 h1
- [x] document 无 h1（form 行为）
- [x] detail + identity 有槽
- [x] AdminSider nav 含 no-scrollbar
- [x] vitest 相关通过（32）

## 变更记录

| 日期       | 变更       |
| ---------- | ---------- |
| 2026-07-17 | 初始并开工 |
