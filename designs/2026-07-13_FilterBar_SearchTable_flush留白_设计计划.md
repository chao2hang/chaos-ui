---
status: 完成
created: 2026-07-13
updated: 2026-07-13
---

# FilterBar / SearchTable flush 留白（#8 / CUI-LIST-01）

## 问题

`Card > CardContent flush` + `FilterBar` + `SearchTable` 时，搜索栏与「共 N 条」贴卡片左右边；表格贴边符合 flush，工具栏/分页不应贴边。

## 修复

- `FilterBar` `layout="inline"`：`px-[var(--card-spacing,1rem)]`（card 布局不双加）
- `SearchTable` 分页条：`data-slot="search-table-pagination"` + 同样水平 inset；表格容器不加 padding

## 验收

- [x] unit tests
- [x] 并入 1.5.2 发版
