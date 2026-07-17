---
status: 待审核
created: 2026-07-17
updated: 2026-07-17
---

# AdminShell contentPadding 分向 + 多标签顶距 (#57)

## 概述

扩展 `AdminShell.contentPadding`：支持分向对象；`true` 在有 `tabs` 时收紧顶距，避免标签栏与 PageChrome list 叠出过大白区。

## 现有检索

- [x] `admin-shell.tsx`：boolean | string → `p-4` / 自定义 class
- [x] 测试已有 true/false/string
- [x] 不新建壳，扩展既有 API

## 方案

```ts
type ContentPaddingSides = {
  /** 水平：class 或预设 */
  inline?: string; // default px-4
  top?: string; // default: tabs ? pt-2 : pt-4
  bottom?: string; // default pb-4
};
type ContentPadding = boolean | string | ContentPaddingSides;
```

解析：

| 入参           | 结果                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| `false`        | 无 padding class                                                        |
| `true` 无 tabs | `p-4`（兼容）                                                           |
| `true` 有 tabs | `px-4 pt-2 pb-4`                                                        |
| string         | 原样                                                                    |
| object         | 合并默认：`inline ?? px-4`, `top ?? (tabs?pt-2:pt-4)`, `bottom ?? pb-4` |

有 tabs：`tabs.length > 0`。

文档：壳层管 block-start；PageChrome list actions 是内容第一行。

## 文件

- admin-shell.tsx (+ export type)
- admin-shell.test.tsx
- AdminShell.stories.tsx（tabs + list 节奏）
- component-decision-table 一行
- INDEX

## 验收

- [x] true+tabs → pt-2 无整圈 p-4
- [x] true 无 tabs → p-4
- [x] object 覆盖 top/inline
- [x] false/string 不变
- [x] vitest 通过（21）
- [x] tsc 通过
