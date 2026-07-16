---
status: 待审核
created: 2026-07-16
updated: 2026-07-16
parent: 2026-07-16_已闭环Issue同类回归审计_设计计划.md
---

# 回归 A：nativeButton + 树/列表标签 title（#45/#48 同类）

## 概述

修 #45/#48 在兄弟组件上的同构缺口：`DepartmentBrowse` 缺 `nativeButton={false}`；OrgTree / Cascader / FileManager / Transfer / BrowseDialog（+ AdminSider 可选）truncate 无 `title`。

## 实施清单

- [ ] `components/ui/department-browse.tsx` — `DialogTrigger nativeButton={false}`
- [ ] `components/ui/department-browse.test.tsx` — 挂载无 nativeButton console error
- [ ] `components/ui/org-tree.tsx` — label/description `title` when truncate
- [ ] `components/ui/org-tree.test.tsx` — title 断言
- [ ] `components/ui/cascader.tsx` — displayText + option.label title
- [ ] `components/ui/file-manager.tsx` — node/item name title
- [ ] `components/ui/transfer.tsx` — item label title
- [ ] `components/business/browse-dialog.tsx` — tree node label title
- [ ] `components/layout/admin-sider.tsx` — child.label title（顺带）

## 验收

- [ ] 无新 tsc/lint 错误
- [ ] 相关 vitest 通过
- [ ] 扫描：`Trigger+render=<div` 无 MISS

## 变更记录

| 日期       | 变更        | 作者  |
| ---------- | ----------- | ----- |
| 2026-07-16 | 计划 + 实施 | agent |
