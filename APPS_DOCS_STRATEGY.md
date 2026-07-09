# apps/docs 影子副本收敛策略 (APPS_DOCS_STRATEGY)

> 状态: 规划文档（仅分析 + 推荐方案，尚未实施）。完成进度条 P1 任务。  
> 日期: 2026-07-03

## 1. 现状分析 (Current State)

### 1.1 文件计数

| 区域                                  | 文件数                                  | 角色                                                           |
| ------------------------------------- | --------------------------------------- | -------------------------------------------------------------- |
| `apps/docs/@/`                        | **366**                                 | 影子副本（components / hooks / lib）                           |
| `apps/docs/src/` + `apps/docs/app/`   | **183**                                 | 真正的 Next.js showcase 应用（stories/docs 页面）              |
| `packages/chaos-design-ui/`           | 303 components + hooks + lib + index.ts | **发布包源码**（pnpm workspace 成员，`name: chaos-design-ui`） |
| repo 根 `components/` `hooks/` `lib/` | —                                       | 历史遗留 demo 应用源码（`@chaos_team/chaos-ui` 根 package）    |

### 1.2 关键事实（diff 实测）

抽样对比 `apps/docs/@/<x>` vs 主源，结果：

- **`apps/docs/@/` vs `packages/chaos-design-ui/`**：**逐字节相同**。
  - `diff -q apps/docs/@/components/ui/button.tsx packages/chaos-design-ui/components/ui/button.tsx` → 无输出（完全一致）
  - `diff -q apps/docs/@/hooks/use-debounce.ts packages/chaos-design-ui/hooks/use-debounce.ts` → 无输出
  - 说明 `apps/docs/@/` 就是 `packages/chaos-design-ui/` 的一份**静态快照拷贝**。
- **`apps/docs/@/` vs repo 根 `components/`**：**已漂移**。
  - `button.tsx`: 根版本新增了 `icon` / `iconRight` props、完整 JSDoc (`@component` / `@category` / `@example`)、分号风格；影子版本是更早的精简版。`diff` 报告 ~20+ 行差异。
  - `avatar.tsx`、`skeleton.tsx`、`checkbox.tsx`、`hover-card.tsx`、`resizable.tsx`、`split-pane.tsx`、`tree-select.tsx`、`user-browse.tsx` 全部差异（JSDoc、style 规范化、新 props 缺失）。
  - `use-debounce.ts` 仍一致（hooks 漂移较少）。

### 1.3 生成来源

- **不是构建产物**：`apps/docs/scripts/` 仅含 `scan-stories.js` / `summarize-scan.js`（Storybook 视觉扫描，非拷贝脚本）。
- 全仓库无任何 `cp/sync/copy` 脚本指向 `apps/docs/@` 或 `packages/chaos-design-ui`。
- git log: `apps/docs/@/` 仅在 `532a116 refactor: restructure to monorepo with packages/chaos-design-ui` 一次性落入，此后再无同步提交。
- ⇒ 结论：`@/` 是**人工复制、永不回灌**的一次性快照，并非可再生产产物。**(B) ".gitignore 生成物" 不成立**。

### 1.4 测试与校验现状

- `apps/docs/@/` 内含 **90 个 `*.test.*` 文件**（hooks 33 + lib/components 余下）。这些测试被 `apps/docs/vitest.config.ts` 通过 `include: ["**/*.test.{ts,tsx}"]` 全量纳入。
- 根 `vitest.config.ts` 显式 `exclude: ["apps/**", "packages/**"]`，注释：「`apps/docs/@` 是 monorepo 重构引入的'影子副本'(非发布源码,含 88 个空测试),测它等于测非发布代码」⇒ 根测试链**主动规避**影子副本。
- `apps/docs/package.json` 仅有 `"lint": "eslint"`，**无 `typecheck`**。
- `apps/docs/eslint.config.mjs` 未声明任何 glob/ignore，因此默认按 ESLint flat-config 规则扫描全部 `**/*.{ts,tsx}` —— **理论上 `@/` 会被 lint**，但由于追加的 Storybook 配置和默认行为，实际效果未验证，且无 CI gate。
- 根 `eslint.config.mjs` 在 `globalIgnores` 中显式忽略 `apps/docs/@/**`、`apps/docs/src/**`、`apps/docs/app/**`、`apps/docs/scripts/**` ⇒ apps/docs **完全游离于根 lint 之外**。

### 1.5 实际依赖路径（运行时真相）

```
apps/docs/src|app  --(import "@/components/...")-->  apps/docs/tsconfig.json paths: "@/*":["./@/*"]
                       ⇒ 实际加载 apps/docs/@/...  (影子副本)
apps/docs/globals.css  --(@source "../../packages/chaos-design-ui/components/...")-->
                       ⇒ Tailwind 已经直接指向 packages/chaos-design-ui/...  (包源)
apps/docs/package.json  --("chaos-design-ui": "file:../../packages/chaos-design-ui")-->
                       ⇒ 已声明依赖发布包，但其 exports 指向 ./dist/*，而 dist/ 不存在 ⇒ 未构建即不可用
```

即：docs 运行时**靠影子副本 `@/` 喂组件**，同时**通过 `@source` 已经直接吃包源**做 Tailwind 扫描——两套源码在 docs 内部并存且不一致。

---

## 2. 方案对比

| 方案                                                                                               | 描述                                                                          | 可行性                                                | 长期效果                                                                        |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| **(A)** apps/docs 加 `typecheck` 脚本 + 在 `apps/docs/eslint.config.mjs` 显式纳入 `@/`             | 给影子副本加一层 type/lint 闸门                                               | ✅ 实施快                                             | **治标**：仍维护 366 文件副本，漂移依旧，只是被检出更晚；测试 90 个空壳仍占资源 |
| **(B)** 标记 `@/` 为生成物 + `.gitignore`                                                          | 仅当 `@/` 真由脚本生成时成立                                                  | ❌ 无生成脚本、系手工快照，gitignore 后 docs 无法运行 | 不可行                                                                          |
| **(C) ✅ 推荐** 删除 `apps/docs/@/`，让 docs 经路径别名直接 import `packages/chaos-design-ui` 源码 | 影子副本本就是包源的字节级拷贝，包源已自含 `@/lib/utils`、自含 tsconfig paths | ✅ 真收敛                                             | **唯一能根治漂移**：366 文件归零，单一发布源，docs 在包源演进时自动跟随         |

**选择 (C) 的根据**：

1. `apps/docs/@/` 与 `packages/chaos-design-ui/` 逐字节相同 ⇒ 影子副本 = 包源快照，删之不损失任何独有代码。
2. packages/chaos-design-ui 自带 `tsconfig.json` 中 `"@/*": ["./*"]`，且其组件 import 走 `@/lib/utils` 自洽 ⇒ docs 复用包源不需要改写包内 import。
3. docs 已在 globals.css 里通过 `@source "../../packages/chaos-design-ui/..."` 直接吃包源 ⇒ 已经默认承认包源是组件 CSS 的来源，runtime 也应统一。
4. docs `package.json` 已声明 `"chaos-design-ui": "file:..."` 依赖 ⇒ 包源本就是预期消费对象，只是因 tsup 未构建 dist/ 而改走影子 `@/` 作为绕路。
5. (A) 只会让 366 文件长期保留并漂移，违反 P1 「避免 300+ 文件长期漂移」的初衷。

---

## 3. 推荐实施步骤（Action Plan）

按顺序执行；每步可独立提交，便于回滚。**仅规划，不在本任务中改源码。**

### 阶段 1：让 docs 别名直指包源（零删除迁移）

1. **改 `apps/docs/tsconfig.json`**：
   - 将 `"paths": { "@/*": ["./@/*"] }` 改为指向包源：
     ```json
     "paths": { "@/*": ["../../packages/chaos-design-ui/*"] }
     ```
   - 保留 `include` 不变；这会让 TS 把 `@/components/ui/button` 解析到 `packages/chaos-design-ui/components/ui/button.tsx`。

2. **改 `apps/docs/vitest.config.ts`**：
   - `resolve.alias."@"` 由 `path.resolve(__dirname, "./")` 改为 `path.resolve(__dirname, "../../packages/chaos-design-ui")`。
   - `coverage.include` 中 `components/**` `hooks/**` `lib/**` 同步改为 `../../packages/chaos-design-ui/{components,hooks,lib}/**`（或保留 docs 自己 src 的 coverage，把包源 coverage 让给包自身的 vitest）。

3. **确认 docs 运行 / 测试通过**：
   - `pnpm --filter chaos-ui-docs dev` 起 Next.js。
   - `pnpm --filter chaos-ui-docs test-storybook` 跑现有 90 个测试（这些测试文件**仍在 `apps/docs/@/`** —— 见阶段 2）。

### 阶段 2：迁移 docs 自带测试到包内（解决 90 个 test 归属）

- `apps/docs/@/` 里的 90 个 `*.test.*` 与 `packages/chaos-design-ui/` 内同名测试大概率重复（包内 `hooks/*.test.ts` 已存在）。逐个 `diff` 后：
  - **包内已存在同款**（多数 hooks）→ 删 docs 端副本。
  - **仅 docs 端有**（典型为视觉/MDX 相关）→ 移入 `packages/chaos-design-ui/` 对应目录，让包负责该测试，docs 不再持有。
- 目标：`apps/docs/@/` 内不再有任何 `*.test.*`。

### 阶段 3：删除影子副本

4. `git rm -r apps/docs/@/`（此时阶段 1+2 后 docs 已无任何 `@/` 引用，删除安全）。
5. 全仓库 `grep -rn "apps/docs/@" --include="*.ts" --include="*.tsx" --include="*.json" --include="*.mjs" --include="*.md"` 确认无残留引用；同步更新根 `eslint.config.mjs`、`vitest.config.ts` 注释中关于 `apps/docs/@` 的描述（删除对应 ignore 条目与「影子副本」注释）。

### 阶段 4：补齐 docs 的 lint / typecheck gate（吸收方案 A 的收益）

6. **`apps/docs/package.json`** 新增脚本：
   ```json
   "typecheck": "tsc --noEmit",
   "check": "pnpm lint && pnpm typecheck"
   ```
7. **`apps/docs/eslint.config.mjs`**：显式声明 `files: ["src/**", "app/**", "next.config.ts"]`（不含 `@/`，因为 `@/` 已不存在；包源由包自身 lint 负责）。
8. 在 `turbo.json`（或根 CI）注册 `chaos-ui-docs` 的 `lint` + `typecheck` 任务，确保 docs 进入 monorepo 校验门。
9. （可选）确认 `packages/chaos-design-ui` 是否补齐自己 `package.json` 的 `lint` / `typecheck` / `test` 脚本——若原本缺失，本次一并补齐，使「包源」成为单一被测对象。

### 阶段 5：根遗留 demo 应用（可选、独立任务）

- repo 根 `components/` `hooks/` `lib/` `app/`（`@chaos_team/chaos-ui`）与 `packages/chaos-design-ui/` 已漂移且未被任何发布路径消费，建议**独立工单**评估其去留（不在本 P1 范围）。本策略只要求 docs 不再维护第三份副本。

---

## 4. 风险与缓解

| 风险                                                                                                       | 缓解                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 路径别名跨 workspace 边界，部分工具（Next.js webpack / SWC、Storybook vite）解析 `../../packages/...` 报错 | 先在分支验证 `pnpm dev` 与 `build-storybook`；如失败，备选用 `chaos-design-ui` 包名 import（先 `pnpm --filter chaos-design-ui build` 产出 dist/，docs 改 import `from "chaos-design-ui"`）—— 但这会让 docs 失去对源码热更新，权衡后倾向别名方案 |
| docs 视觉/MDX 用到了仅 `apps/docs/@/` 才有的副本（如 stories 引用相对路径）                                | 阶段 3 删除前用 `grep -rn "from ['\"]\\.\\." apps/docs/src apps/docs/app apps/docs/docs` 排查相对 import；逐例改为 `@/`                                                                                                                         |
| 包内 tsconfig strictness 弱于 docs（`exactOptionalPropertyTypes: false`）→ docs typecheck 可能漏报         | 阶段 4 给 docs 独立 `typecheck`，以 docs tsconfig 为准对 docs 自己的 src/app 校验；包源 typecheck 归包                                                                                                                                          |

---

## 5. 一句话结论

`apps/docs/@/` 是 `packages/chaos-design-ui/` 已发布包源码的**逐字节静态快照**，无生成脚本、与根源已漂移、被根 lint/test 主动排除——属典型「300+ 文件长期漂移」隐患。**推荐方案 (C)：删除影子副本，把 docs 的 `@/` 别名与 vitest alias 直接指向 `packages/chaos-design-ui`，并把 docs 自带测试迁入包内**，最后补 docs 的 `typecheck` 与 lint gate，使发布包源成为唯一被测、被 lint 的组件来源。
