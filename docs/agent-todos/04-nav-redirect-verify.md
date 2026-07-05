# Agent D — 导航改造 + 根 app 重定向 + 全量验证

> 目标:把"组件"导航改为真实路由;根 app 重定向到 docs;跑通批次1全量验证。
> 范围:导航、重定向、最终全局验证。不动 MDX 基建、不动总览页、不动详情页(只在它们都就绪后做最后集成验证)。

## 依赖 (Dependencies)

- ⬆ 需要 **Agent A** 完成(MDX 基建)
- ⬆ 需要 **Agent B** 完成(总览页 `/components` 存在)
- ⬆ 需要 **Agent C** 完成(详情页路由 + 30 个 MDX 落地)
- 本 Agent 是批次1的收尾,**必须在 A/B/C 全部 done 后启动**

## 上下文 (Context)

- 根 app:`/home/chaos/projects/personal/chaos_style/app/`(独立 Next app)
- docs app:`apps/docs/app/`(独立 Next app,本批改造主战场)
- 部署耦合点:`vercel.json`、`pnpm-workspace.yaml`、根 `package.json` scripts
- 风险:根 app 与 docs app 是两个独立站点。重定向选 URL 跳还是删根 app,影响部署拓扑
- 现有 navLinks:`apps/docs/@/components/site-header.tsx` 第 9-13 行

## 任务 (Tasks)

### 1. 导航改造(`apps/docs/@/components/site-header.tsx`)

- [ ] 定位第 9-13 行 `navLinks` 数组
- [ ] 新增条目 `{ href: "/components", label: "组件", labelEn: "Components" }`
- [ ] 原 `<a href="#components">` 占位 anchor 替换为 `<Link href="/components">`(Next `Link`,客户端路由)
- [ ] 保留现有"安装 / 特性"两个 anchor 不动
- [ ] 确认 `Link` 已从 `next/link` 引入;若文件原来用 `<a>` 则一并改 import
- [ ] 移动端 menu(若有)同步加 `/components` 入口
- [ ] 视觉零变化(只是行为从 anchor 跳到 client route)

### 2. 根 app 重定向决策(分支二选一)

#### 决策点:先复核部署配置

- [ ] 读 `vercel.json`、`pnpm-workspace.yaml`、根 `package.json` scripts
- [ ] 判断根 `app/` 是否仍被 dev/build(看 scripts)
- [ ] 判断 docs 是否 build 后部署到不同 host/subroute

#### 分支 A:根 app 仍在用 → URL 重定向

- [ ] 编辑根 `app/page.tsx`:
  ```tsx
  import { redirect } from "next/navigation";
  export default function Home() {
    redirect("https://<docs-host>/");  // 实际 docs host 待复核
  }
  ```
- [ ] 不删根 app/,不动其它根路由
- [ ] 在 PR 描述中明确 docs host 来源(env / vercel 表)

#### 分支 B(推荐):根 app 已成冗余 → 删根 app/ 让 docs 为唯一站点

- [ ] `git rm -r app/`(留下 `app/README.md` 说明已迁移到 `apps/docs/`)
- [ ] 改 `vercel.json` 让 docs 成为根站点(build command、outputDirectory)
- [ ] 改 `pnpm-workspace.yaml` 与根 `package.json` scripts(把 `dev`/`build` 指向 `apps/docs`)
- [ ] 复核 `apps/docs/next.config.ts` 的 `basePath`/`output` 是否需要调整
- [ ] 跑全量 build 确认没有别处 import 根 `app/`

> ⚠ 选择 B 之前必须确认根 `app/` 内的页面都没有被外部引用(README、CI workflow、Vercel 等)

### 3. 全量验证(批次1收尾)

- [ ] `cd apps/docs && pnpm lint`
- [ ] `cd apps/docs && npx tsc --noEmit`
- [ ] `cd apps/docs && pnpm build`(关键:`generateStaticParams` 出 30 页)
- [ ] `pnpm dev` 全链路手测:
  - [ ] 根路径 → /components(8 分区,搜索过滤、卡片点击跳转)
  - [ ] 抽 3 个高频组件详情页(Button / Form / Table)目检 6 区块
  - [ ] 详情页 footer Storybook 链接可达
- [ ] `pnpm build-storybook` 保底回归(确认 Storybook 未被破坏)
- [ ] 若分支 B:再跑根 `package.json` 的 dev/build,确认删根 app/ 没把根 site 跑挂

### 4. 文档 & PR 描述

- [ ] 更新 `apps/docs/README.md`(若存在)或根 `README.md`:说明 `/components` 入口与见 `docs/agent-todos/` 子计划
- [ ] `CHANGELOG.md` 增加"批次1"条目:列出 A/B/C/D 4 个子 agent 的产出
- [ ] PR 描述贴 4 个子 agent 的验证日志 + 总览页/详情页截图 ≥3 张

## 交付 (Deliverables)

- `apps/docs/@/components/site-header.tsx`(diff:navLinks + Link)
- 根 `app/page.tsx`(diff:分支 A)OR `app/` 删除 + `vercel.json` 等改动(分支 B)
- `CHANGELOG.md`(diff:批次1条目)
- 验证日志全集:lint / tsc / build / build-storybook / 手测清单
- 截图:总览页深浅色 × 2、详情页 × 3、搜索过滤 × 1

## 边界 (Out of Scope)

- 不改 MDX 基建(A)
- 不改总览页 schema/卡片(B)
- 不补 211 个剩余 MDX(批次2)
- 不动 Storybook 配置(`.storybook/`、`storybook-static/` 不编辑)
- 不引入新部署 host/凭据(若需要 docs host,通过 env,不硬编码)

## 完成定义 (Definition of Done)

- [ ] 顶部导航"组件"点击 → 客户端路由跳 `/components`(无整页刷新)
- [ ] 根路径最终落点是 docs 站点(无论分支 A/B,行为对用户一致)
- [ ] 4 个子 agent 验证日志全绿
- [ ] Storybook 仍可 `pnnpm dev` + `pnpm build-storybook` 通过
- [ ] PR 描述包含分支选择说明 + 3+ 张截图
- [ ] Git 暂存仅含本 Agent 改动(不动其它 3 个 agent 的产物除非是收尾 merge)
