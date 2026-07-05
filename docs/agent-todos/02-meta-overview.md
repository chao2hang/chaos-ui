# Agent B — 元数据 Schema + 总览页

> 目标:产出 241 条组件元数据 + 8 分区常量,并打造 antd 风格的可搜索总览页(`/components`)。
> 范围:仅元数据 + 总览页(含搜索 client island + 卡片组件)。不写详情页 MDX、不动 navLinks、不动 next.config。

## 依赖 (Dependencies)

- ⬆ 需要 **Agent A** 完成(MDX 基建 + CodeBlock 可用),否则总览页跑不起来

## 上下文 (Context)

- 元数据来源:`docs/COMPONENT_INDEX.md` + `packages/chaos-design-ui/components/**.tsx` 源码注释
- 8 分区:`General / Layout / Navigation / Form / DataDisplay / Feedback / Business / System Layout`
- 站点入口文档:原文 §A-D
- 视觉对齐 antd 官网(深浅色自适应;Hero 已定调,Tailwind 实现)
- 路由约定:详情页为 `/components/[category]/[slug]`(本批次仅 Agent C 落地 30 个,其余 211 个总览可见但点过去先 fallback 跳 Storybook)

## 任务 (Tasks)

### 1. 定义元数据 Schema(`apps/docs/@/content/components.meta.ts`)

- [ ] 导出 `type Category = 'General'|'Layout'|'Navigation'|'Form'|'DataDisplay'|'Feedback'|'Business'|'System Layout'`
- [ ] 导出 `type ComponentMeta = { slug; name; nameZh; category; desc; descZh; icon?; sourcePath; storybookId?; tags? }`
- [ ] 导出 `CATEGORIES: Category[]`(8 项顺序固定)
- [ ] 导出 `categoryLabelsZh: Record<Category,string>`(中英对照)

### 2. 生成 241 条草稿元数据

- [ ] 扫描 `docs/COMPONENT_INDEX.md` 拿到 slug + category 归类
- [ ] 对每条打开 `sourcePath` 解析组件 JSDoc/顶部注释,抽取一句话描述
- [ ] 中英双语:`name`(PascalCase)、`nameZh`(中文)、`desc`(en)、`descZh`(zh)
- [ ] `sourcePath` 必须真实存在(`packages/chaos-design-ui/...`)
- [ ] `storybookId` 可空(批次2补);`icon` 批次1免填
- [ ] 输出为 `apps/docs/@/content/components.meta.ts` 中的 `components: ComponentMeta[]`
- [ ] 在文件顶部用 `// AI-generated draft, manual review needed` 标注

### 3. 总览页路由(`apps/docs/app/components/page.tsx`)

- [ ] Server Component(默认导出)
- [ ] 顶部分区 tabs(8 个):点击锚滚到对应分区(`<a href="#general">` 或 `scrollIntoView`)
- [ ] 渲染 `<ComponentSearch>`(client island,负责过滤态)
- [ ] 8 个 `<section id="category">`,每个 section 标题分区中英文
- [ ] 每个 section 内 `<ComponentCard>` 网格(grid-cols-2 md:grid-cols-3 lg:grid-cols-4)
- [ ] 用 Tailwind,深浅色自适应,卡片 hover 边框/阴影动画

### 4. 客户端搜索(`apps/docs/@/components/component-search.tsx`)

- [ ] `"use client"`(Client Component)
- [ ] 接收 `components: ComponentMeta[]` 全量
- [ ] 顶部搜索框:实时按 `name/nameZh/desc/descZh/tags` 过滤
- [ ] 分区 tabs 同步高亮:有结果时高亮命中分区,无结果时灰色
- [ ] 用 `useState` + `useMemo`,无外部依赖
- [ ] 空状态文案中英双语"未找到匹配的组件 / No matching components"

### 5. 卡片组件(`apps/docs/@/components/component-card.tsx`)

- [ ] props: `{ component: ComponentMeta }`
- [ ] 视觉:卡片标题 `name` + 副标题 `nameZh` + 描述 `descZh`(截断 2 行)+ 右上角 `Tag(category)`
- [ ] 主入口:`<Link href={\`/components/${category}/${slug}\`}>`
- [ ] 副入口:"Browse in Storybook" 小字链接(若 `storybookId` 空则不渲染)
- [ ] 卡片用 Tailwind,border + hover translateY(-2px) + shadow

### 6. 增量验证

- [ ] `cd apps/docs && pnpm lint`
- [ ] `cd apps/docs && npx tsc --noEmit`
- [ ] `cd apps/docs && pnpm build`(此阶段详情页路由尚未建,总览卡点击会 404,这是预期 —— 不在本 Agent 范围)
- [ ] `pnpm dev` 手测 `/components`:8 分区渲染、搜索过滤、卡片视觉(深浅色切换)

## 交付 (Deliverables)

- `apps/docs/@/content/components.meta.ts`(新增)
- `apps/docs/app/components/page.tsx`(新增)
- `apps/docs/@/components/component-search.tsx`(新增)
- `apps/docs/@/components/component-card.tsx`(新增)
- 验证日志:lint / tsc / build / 手测截图

## 边界 (Out of Scope)

- 不建详情页 MDX(Agent C 负责)
- 不建详情页路由 `app/components/[category]/[slug]/page.tsx`(Agent C 负责)
- 不改 navLinks(Agent D 负责)
- 不动根 app/page.tsx(Agent D 负责)
- 不动 next.config(Agent A 负责)

## 完成定义 (Definition of Done)

- [ ] 241 条元数据全部有 `slug/name/nameZh/category/desc/descZh/sourcePath`
- [ ] `sourcePath` 全部解析到真实文件(脚本抽样 10 条核对)
- [ ] 总览页深浅色切换正常,搜索不区分大小写、中英都能命中
- [ ] 8 分区常量与中文标签一一对应
- [ ] 不引入新运行时依赖(仅 Tailwind + lucide-react 已有)
