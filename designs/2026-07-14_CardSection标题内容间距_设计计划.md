---
status: 完成
created: 2026-07-14
updated: 2026-07-14
---

# CardSection 标题-内容间距（#20）

## 概述

有 `title`/`actions` 时，标题行与 children 之间建立约 `--card-spacing` 垂直间距，避免单据 title 与 FormGrid 贴死。

## 方案

- 有 header：`flex flex-col gap-(--card-spacing)`
- 标题行：`px-(--card-spacing)` + `border-b`；`data-slot=card-section-header`
- children 包 `min-w-0` body 槽；不给 CardContent 全局加 pt
- 无 title/actions：plain partition 不变

## 文件

- [x] `components/ui/card.tsx`
- [x] `components/ui/card.test.tsx`
- [x] `src/stories/ui/Card.stories.tsx`
- [x] `designs/INDEX.md`

## 验收

- [x] title 与内容有呼吸间距
- [x] flush 表不叠距
- [x] vitest card 通过
