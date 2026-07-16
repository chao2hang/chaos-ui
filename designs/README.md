# 设计文档看板

单目录 + Frontmatter 状态。所有设计计划放在本目录，文件**不移动**，通过 YAML frontmatter 中的 `status` 字段标记状态。

## 快速开始

```bash
cp _模板_设计计划.md 2026-07-08_功能名称_设计计划.md
# 编辑文件，status: 未执行，填写内容
# 必填：模板中的「现有组件检索」——对照 docs/component-decision-table.md
# 更新 INDEX.md，将文件链接放入对应状态区域
```

组件选型（防重复造轮子）：[`docs/component-decision-table.md`](../docs/component-decision-table.md)；Agent 协议见根目录 `AGENTS.md` → Component Reuse Protocol。

## 状态流转

```
未执行 ──→ 工作中 ──→ 待审核 ──→ 完成
  ↑                                  │
  └────── 需修改 / 补充 ←────────────┘
```

每次状态变更只需两步：

1. 改文件 frontmatter 中的 `status` 字段
2. 更新 `INDEX.md` 中的看板链接

## 文件命名

```
YYYY-MM-DD_功能名称_设计计划.md
```

## Frontmatter 字段

| 字段      | 说明     | 可选值                            |
| --------- | -------- | --------------------------------- |
| `status`  | 当前状态 | `未执行` `工作中` `待审核` `完成` |
| `created` | 创建日期 | `YYYY-MM-DD`                      |
| `updated` | 最后更新 | `YYYY-MM-DD`                      |

## 视图

- 看板总览 → `INDEX.md`
- 单个计划 → 对应 `.md` 文件
