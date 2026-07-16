---
status: 未执行
created: 2026-07-16
updated: 2026-07-16
parent: 2026-07-16_已闭环Issue同类回归审计_设计计划.md
---

# 回归 E（Backlog）：表内 h-8 密度 + LineEditor 家族文案

## 概述

**不阻塞**当前 release。登记 #46/#47 边界外与 #42 边界外的同类债。

## Backlog 清单

### 表内 / 设计器 `h-8` Input（非工具栏同排）

- BOMTreeEditor / CommissionCalculator / JournalEntryEditor / LabelDesigner
- PurchaseOrderEditor / QuotationLineEditor / StockTransferDialog
- ExpenseLineEditor / OrderLineEditor 单元格
- NotificationRuleBuilder / ColorBoard / RemoteSelect 局部
- BatchSelector 对话框搜索条（半工具栏）

策略：统一表内 density 约定（保持 h-8 或引入 `size="sm"`）前需产品确认；**勿**与 FilterBar 默认 sm 混为一谈。

### LineEditor 家族英文 UI

- QuotationLineEditor / GiftLineEditor / PurchaseOrderEditor 等
- OrderLineEditor：#42 **不**做全量 i18n

策略：按业务域消费优先级逐个 `texts`/`useSafeTranslation`，或文档声明「演示预设英文」。

### 其它

- Sankey 宽卡 viewBox（非 cartesian，单独评估）
- button 内嵌 clear 控件 HTML 合法性大扫

## 验收（本文件）

- [x] 已挂看板 Backlog，无强制实施
- [ ] 有消费方需求时拆独立计划并改 status

## 变更记录

| 日期       | 变更         | 作者  |
| ---------- | ------------ | ----- |
| 2026-07-16 | 登记 backlog | agent |
