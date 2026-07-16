---
status: 完成
created: 2026-07-17
updated: 2026-07-17
---

# RowActionsMenu #52 设计计划

## 概述

新增列表行「点击操作」菜单原语，组合 DropdownMenu；共享/扩展 `RowMenuItem`。

## 现有组件检索

- [x] RowContextMenu（右键）+ RowMenuItem
- [x] SplitButton（主 CTA + 更多）
- [x] DropdownMenu 原语齐全
- [x] 结论：新建 `RowActionsMenu` 门面，不复制 ContextMenu

## 技术方案

- `RowActionsMenu`：默认 link/sm「操作」trigger + items
- `RowMenuItem` 增加可选 `onClick`；item.onClick 优先，否则 `onItemSelect`
- portal 菜单，fixed 列不被裁切

## 文件清单

- [x] `components/ui/row-actions-menu.tsx` + test + story
- [x] `components/ui/row-context-menu.tsx`（导出/扩展 type）
- [x] `components/ui/index.ts`

## 验收

- [x] disabled 可见不可点；danger destructive；separator
- [x] Story + 单测 + 导出 + CHANGELOG
