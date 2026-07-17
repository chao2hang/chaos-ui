---
status: 待审核
created: 2026-07-17
updated: 2026-07-17
---

# PageChrome list / ListPageShell 工具条同行 (#58)

## 概述

List 主操作与 FilterBar 同一行；禁止推荐 `PageChrome.actions` 悬空全宽行。

## 方案

- `ListPageShell.toolbarPlacement`: `"end-of-filter-row"` (default) | `"below-filter"`
- PageChrome JSDoc + Story 正/反例
- 决策表

## 验收

- [x] 默认同行
- [x] below-filter 兼容
- [x] Story/docs
- [x] vitest（list-page-shell + page-chrome）+ tsc
