# Agent A — MDX 基建

> 目标:把 `apps/docs` 升级为可承载 MDX 详情页的 Next 站点。
> 范围:仅基建(依赖、next.config、mdx-components、CodeBlock 抽离)。不动总览页、不动详情页、不动 navLinks。

## 上下文 (Context)

- 工程根:`/home/chaos/projects/personal/chaos_style`
- 目标 app:`apps/docs`(独立 Next app,next `16.2.9`,已用 Tailwind)
- 仓库已用 pnpm + monorepo(`pnpm-workspace.yaml`)
- 现有约定见 `AGENTS.md`:优先 npm 脚本、保留 API、TLD `@/` 导入、Storybook-first
- 风险:next.config 改动会影响 `pnpm dev` / `pnpm build` / `pnpm build-storybook`,需最小改 + 验证

## 任务 (Tasks)

### 1. 装依赖

- [ ] 编辑 `apps/docs/package.json`,新增 dependencies:
  - `@next/mdx`、`@mdx-js/loader`、`@mdx-js/react`、`gray-matter`
  - 版本对齐 next `16.2.9`(查 `@next/mdx` 兼容版本)
- [ ] `cd apps/docs && pnpm install` 校验 lockfile 一致

### 2. 改 `apps/docs/next.config.ts`

- [ ] 用 `withMDX()` 包装导出
- [ ] `pageExtensions: ['ts','tsx','md','mdx']`
- [ ] 保留现有 `reactStrictMode`、`transpilePackages` 等配置项不被覆盖
- [ ] 不引入 remark/rehype 插件(批次1不需要)

### 3. 新建 `apps/docs/mdx-components.tsx`

- [ ] Next 约定文件,默认导出映射表
- [ ] 映射 `h1/h2/h3/p/ul/ol/li/table/thead/tbody/tr/th/td/code/pre/a/inlineCode` → Tailwind 排版类
- [ ] 视觉对齐 antd 风格(h1 粗 36px、h2 28px、p 行高 1.75、table 带边框、code 浅灰底)
- [ ] 深浅色自适应(用 `dark:` 变体;站点已用 `next-themes`)
- [ ] 不引入第三方 typography 插件

### 4. 抽离可复用 `CodeBlock`

- [ ] 读 `apps/docs/@/components/install-tabs.tsx`,定位现有内嵌的代码块 + 复制按钮 + 样式
- [ ] 新建 `apps/docs/@/components/code-block.tsx`(`"use client"`):暴露 `<CodeBlock code={...} lang={...} />`
- [ ] `install-tabs.tsx` 改为复用 `CodeBlock`,行为不变
- [ ] 确认复制按钮文案/图标、`navigator.clipboard`、fallback 与原版一致
- [ ] 不改其它 prop、不改导出名

### 5. 增量验证

- [ ] `cd apps/docs && pnpm lint`
- [ ] `cd apps/docs && npx tsc --noEmit`
- [ ] `cd apps/docs && pnpm build`(空 MDX 也要能 build 过)
- [ ] `pnpm dev` 手测 `/` 仍能进(本批次不接详情页,但要保证没把站点跑挂)
- [ ] `pnpm build-storybook` 保底回归

## 交付 (Deliverables)

- `apps/docs/package.json`(diff:仅新增 4 个依赖)
- `apps/docs/next.config.ts`(diff:withMDX 包装)
- `apps/docs/mdx-components.tsx`(新增)
- `apps/docs/@/components/code-block.tsx`(新增)
- `apps/docs/@/components/install-tabs.tsx`(diff:复用 CodeBlock)
- `pnpm-lock.yaml`(由 install 自动更新)
- 验证日志:lint / tsc / build / build-storybook 全部通过

## 边界 (Out of Scope)

- 不写 `components.meta.ts`(Agent B 负责)
- 不建总览页 `app/components/page.tsx`(Agent B 负责)
- 不建详情页路由(本批次 Agent C 负责)
- 不改 navLinks / 根 app/page.tsx
- 不写 MDX 内容

## 完成定义 (Definition of Done)

- [ ] `pnpm build` 在无任何 MDX 文件时仍通过
- [ ] `<CodeBlock>` 已被 `install-tabs.tsx` 复用,行为零回归
- [ ] 所有验证命令通过,日志贴到 PR 描述
- [ ] Git 暂存仅 Stage 本文件清单内的产物(不 `git add .`)
