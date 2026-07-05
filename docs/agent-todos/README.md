# Agent 计划索引 — apps/docs 组件官网改造(批次1)

> 源需求:`docs/agent-todos/` 根据粘贴的改造方案原文拆分;原文件:`pasted-text-20260705-165613-c9edee7d.txt`
> 目标:把 `apps/docs` 升级为 antd 风格的"组件官网" —— 可搜索总览 + per-component MDX 详情页;Storybook 保留为底层组件浏览器。

## 拆分原则

- 单 agent 单职责:基建 / 元数据+总览 / 详情页MDX / 导航+收尾
- 每个 agent 配 `依赖 / 上下文 / 任务 / 交付 / 边界 / 完成定义` 六段
- 收尾 Agent D 串起全链路验证;不可并行启动

## 子计划文件

| # | Agent | 职责 | 依赖 |
|---|---|---|---|
| 01 | MDX 基建 | deps + next.config + mdx-components + CodeBlock 抽离 | 无 |
| 02 | 元数据 + 总览页 | 241 条 meta + 8 分区 + /components 搜索总览 | A |
| 03 | 详情页路由 + 30 MDX | 动态路由 + 30 个高频组件 MDX | A, B |
| 04 | 导航 + 重定向 + 验证 | navLinks 改真路由 + 根 app 重定向 + 全量验证 | A, B, C |

## 依赖拓扑

```
A (基建) ──┬─→ B (总览) ──┐
           └─→ C (详情页) ─┤
                            └─→ D (导航+收尾)
```

- A 是根(无前置)
- B、C 都依赖 A;B、C 之间弱依赖(C 只需要 B 定的 slug 约定)
- D 必须在 A/B/C 全部 done 后启动(D 跑全量验证)

## 范围批次(原文)

- **本批次(批次1)**:基建 + 总览 + 30 个高频组件完整 MDX + 导航 + 重定向
- **后续(批次2)**:剩余 211 个组件 MDX 自动生成草稿 + 人工审稿

分批原因:一次性交付 241 个高质量 MDX 超出单轮可控范围,后期 200 个易"中看不中用"。先上批次1让用户验证方向再铺量。

## 8 个分区(antd 6 类 + Business / System Layout)

- General — Button / Icon / Typography / Divider / Tag / Badge / Avatar ...
- Layout — Grid / Flex / Space / Stack / Container / Separator ...
- Navigation — Tabs / Breadcrumb / Pagination / Menu / Stepper / Sidebar ...
- Form — Input / Select / Checkbox / Radio / Switch / DatePicker / Form / Upload ...
- DataDisplay — Table / Card / Descriptions / Timeline / List / Tree / Statistic ...
- Feedback — Dialog / Drawer / Toast / Alert / Progress / Skeleton / Spinner / Result ...
- Business — AuditLog / ApprovalFlow / CampaignCard / DataTable / KpiCard ... (108 项专属区)
- System Layout — AppShell / AdminHeader / DashboardLayout / MasterDetailLayout ... (17 项专属区)

## 使用方式

执行顺序建议:

1. 启动 Agent A(无前置),done 后启动 B、C 并行(B、C 间仅 slug 约定弱依赖)
2. B、C 都 done 后启动 Agent D 收尾
3. 每个 agent 按 `Definition of Done` 自检,贴日志到 PR 描述
4. 批次1完成 → 用户验证方向 → 启动批次2(本文档未涵盖)
