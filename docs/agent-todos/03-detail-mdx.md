# Agent C — 详情页路由 + 30 个高频 MDX

> 目标:落地详情页动态路由 + 出齐首批 30 个高频组件的 antd 风格 MDX。
> 范围:仅路由 + 30 个 MDX 文件。不动总览页、不动 navLinks、不动 next.config。

## 依赖 (Dependencies)

- ⬆ 需要 **Agent A** 完成(MDX 基建 + CodeBlock)
- ⬆ 需要 **Agent B** 完成(`components.meta.ts` 的 schema 与 slug 约定;Agent B 决定了 `<category>/<slug>` 路径大小写)

## 上下文 (Context)

- 路由:`apps/docs/app/components/[category]/[slug]/page.tsx`
- MDX 位置:`apps/docs/@/content/<category>/<slug>.mdx`(category 大小写与 meta 一致)
- 30 个候选名单见下方 §候选
- 每个 MDX 用 `<Component>` 真实演示,`<CodeBlock code={...} lang="tsx" />` 展示源(复用 Agent A 抽离的 `apps/docs/@/components/code-block.tsx`)
- `props` 表格:由 Agent 读源码 `packages/chaos-design-ui/components/<x>.tsx` 抽 Props 类型,手动列(勿编造)
- 末尾 footer:Storybook autodocs 链接 `?path=/docs/<group>-<name>--docs`

## 候选名单 (Batch-1 30 Slugs)

| 分区 | 数量 | Slugs |
|---|---|---|
| General | 6 | Button / Icon / Typography / Tag / Badge / Divider |
| Layout | 3 | Grid / Flex / Separator |
| Navigation | 2 | Tabs / Breadcrumb |
| Form | 8 | Input / Textarea / Select / Checkbox / Switch / DatePicker / Form / FileUpload |
| DataDisplay | 4 | Table / Card / Descriptions / Statistic |
| Feedback | 4 | Dialog / Drawer / Toast / Progress |
| Business | 2 | DataTable / KpiCard |
| System Layout | 1 | AppShell |

## 任务 (Tasks)

### 1. 详情页动态路由(`apps/docs/app/components/[category]/[slug]/page.tsx`)

- [ ] `params` 读 `category`/`slug`,组装 `import(\`@/content/${category}/${slug}.mdx\`)`
- [ ] MDX 未找到 → `notFound()` + 提示"该组件详情生成中,请前往 Storybook";带 Storybook 入口
- [ ] `generateStaticParams`:**仅**返回本批 30 个的 `{category,slug}`(其余 211 个 slug 不静态化)
- [ ] `generateMetadata`:从 `components.meta.ts` 查到对应 meta,产出 `<title>{name} {nameZh} · Chaos UI</title>` 与 `ogDescription`
- [ ] 详情页 layout:左侧留 breadcrumb + 右上角 Storybook 链接 + 主体 MDX render
- [ ] 包装 `<MDXRemote>` 或 Next 内置 MDX 渲染(看 Agent A 选哪条技术栈)

### 2. 写 30 个 MDX

每个 MDX 必须含以下 6 个区块:

- [ ] **标题区**:`# {name} {nameZh}` + 一句中文介绍 + 一句英文介绍
- [ ] **何时使用**:`## 何时使用 / When to use` 一个段落(中英双语)
- [ ] **代码演示**:`## 代码示例 / Examples` ≥3 段
  - 每段:Card 包 `<Component>` 真实样例(直接 import `chaos-design-ui` 的 export)
  - 紧接下方 `<CodeBlock code={\`...\`} lang="tsx" />` 展示该样例源码
  - 样例覆盖:基础用法 / 常见变体 / 边界状态(如 disabled/loading/empty)
- [ ] **API 表格**:`## API` 用 markdown table
  - 列:`Prop / Type / Default / Description(zh) / Description(en)`
  - 数据来自源码 Props 类型(手抄,先不写自动抽取脚本)
- [ ] **Notes**:`## 注意事项` 段:concatnote(组合取舍)+ accessibility note(键盘/a11y)
- [ ] **Footer**:`> 完整 Storybook autodocs: [?path=/docs/...](...)`

### 3. 内容质量底线

- [ ] 中英描述不得机器翻译腔(人话优先,关键术语保留英文)
- [ ] 演示样例必须真能跑通(本地 `pnpm dev` 抽 3 个组件手测渲染正常)
- [ ] props 表格中 `Type` 列写 TS 类型原文(`React.ReactNode`/`'sm'|'md'|'lg'` 这种),不偷懒写 `string`
- [ ] Default 列若组件没默认值,填 `—`
- [ ] 不编造 prop;源码里没有的 prop 不写

### 4. 增量验证

- [ ] `cd apps/docs && pnpm lint`(MDX 一般不过 lint,但 tsx 内嵌的代码不报错)
- [ ] `cd apps/docs && npx tsc --noEmit`
- [ ] `cd apps/docs && pnpm build`(`generateStaticParams` 必须能列出 30 个)
- [ ] `pnpm dev` 抽 3 个高频组件(Button / Form / Table)手检 6 区块齐全、Storybook 链接可达
- [ ] `pnpm build-storybook` 保底回归

## 交付 (Deliverables)

- `apps/docs/app/components/[category]/[slug]/page.tsx`(新增)
- `apps/docs/@/content/<category>/<slug>.mdx`(30 个新增,按 8 分区目录分布)
- 验证日志:lint / tsc / build / 手测组件清单

## 边界 (Out of Scope)

- 不补剩余 211 个 MDX(批次2)
- 不动总览页(Agent B 负责)
- 不动 navLinks(Agent D 负责)
- 不写 props 自动抽取脚本(后期优化)

## 完成定义 (Definition of Done)

- [ ] 30 个 slug 全部能 `pnpm build` 通过且产生静态页
- [ ] 211 个未上线 slug 在详情页落 `notFound()` 友好提示(总览卡点过去不报 500)
- [ ] 30 个 MDX 6 区块全部齐全,无 `<TODO>` 占位
- [ ] props 表格抽样 5 条与源码对照,0 编造
- [ ] Storybook 链接真实有效(抽取 5 条验证 ?path= 路径正确)
