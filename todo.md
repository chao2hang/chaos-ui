# Chaos UI — 1.0.0 GA 待办清单

> **当前版本**:`1.0.0-beta.0`
> **目标版本**:`1.0.0` GA
> **最后核实**:2026-07-01 (测试全绿后更新)
> **维护人**:Chaos UI Team

## GA 是什么

GA = General Availability(正式发布/通用可用)。API 冻结、承诺稳定、可上生产、有长期支持。

---

## 当前真实状态(2026-07-01 核实)

### ✅ 已达标

| 维度        | 状态        | 数据                                                                                                             |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------- |
| 真实组件    | ✅ 0 空壳   | 全部 148+ 空壳已补真实实现(business 145 + layout 6 + ui 5 + business 1)                                          |
| hooks       | ✅ 真实     | 19 个 hook 空壳全部补真实实现 + 测试                                                                             |
| lib         | ✅ 真实     | 5 个 lib 桩模块(crypto/date/excel/pdf/worker)全部补真实实现 + 测试                                               |
| 图标 facade | ✅ 扩充     | `components/ui/icons.ts` 新增 ~43 个 lucide 图标                                                                 |
| 稳定化清理  | ✅          | 删除临时脚本、移除 `provenance`、修复历史类型错误                                                                |
| 文档        | ✅ 完整     | 8 篇项目文档 + CHANGELOG/HOOKS_INDEX/LIB_INDEX/COMPONENT_INDEX + README                                          |
| i18n        | ✅ 完整     | 4 语言(en/zh/ja/ko),命名空间拆分,在 `lib/i18n/`                                                                  |
| CI          | ✅ 完整     | 8 个 workflow(ci/release/security/nightly/labeler/stale/dependency-review/detection)+ CODEOWNERS + PR/Issue 模板 |
| AI 规则矩阵 | ✅ 完整     | AGENTS.md/.cursorrules/CONVENTIONS.md/ARCHITECTURE.md                                                            |
| 迁移验证    | ✅ 通过     | qxy-mop 53 符号 / 5 subpath 全部兼容,0 中断                                                                      |
| smoke 测试  | ✅ 通过     | 26 exports 产物齐全,无 sourcemap 泄漏                                                                            |
| 测试数      | ✅ 大幅提升 | 1171 → 3834 passing(487 文件全部通过,0 failures)                                                                 |

### ❌ 未达标(GA 阻断项)

| 维度          | 当前                                                       | GA 标准     | 差距                                                                                                                                                        |
| ------------- | ---------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **typecheck** | 45 错误(23 个测试文件)                                     | 0 错误      | 3 类:未使用 import(TS6133,~15 个)/readonly 赋值(TS4104,8 个)/可能 undefined+类型不匹配(~19 个);重灾区:segmented-control(10)/rating(6)/mobile-page-header(4) |
| **测试失败**  | ✅ 0 failing                                               | 0 失败      | 6 Agent 并行修复 26 文件,45→0 failures,487 文件全部通过                                                                                                     |
| **覆盖率**    | Stmts 68.22% / Branch 58.86% / Funcs 65.53% / Lines 70.39% | 85/80/85/85 | 覆盖率 workflow 已将 lines 从 44%→70%,但距阈值仍差 ~15%(lines)/~21%(branches)                                                                               |
| 版本          | beta.0                                                     | 1.0.0 GA    | 需 RC → GA                                                                                                                                                  |

---

## 阶段一:实现空壳组件 ✅ 已完成

全部 148+ 空壳已补为真实实现(使用全部 Props、语义化、可访问 UI),并补真实交互测试:

- **business(145)**:charts(26)+ chat(28)+ designer(5)+ mobile(10)+ browse/picker(20)+ print(3)+ attachment(3)+ task(6)+ form(6)+ table(4)+ other-a(17)+ other-b(17) + 13 个历史半生成组件(account-balance/announcement-card/application-form/approval-action-bar/attachment-list/attachment-preview/badge-delta/bar-list/bill-print-template/bill-timeline/bill-todo-list/budget-overview/category-bar)+ reconciliation-line-editor
- **layout(6)**:article-layout / chat-layout / embed-layout / print-template-layout / split-screen / wizard-layout
- **ui(5)**:chat-input / chat-message / mobile-pull-refresh / mobile-swipe-action / with-permission
- **hooks(19)**:use-approval/async-task/bill/data-scope/dict/export/fetch/form-table/idle/import/line-editor/network-quality/print/redo/sse/swr/table/undo/websocket
- **lib(5)**:crypto / date / excel / pdf / worker

> 实现参考:`.claude/ga-work/AGENT_GUIDE.md`。空壳识别:`grep -l "{null}"` 与 `function \w+({ className }: ...)` 模式均返回 0。

---

## 阶段二:测试覆盖率补到 85% 🔄 进行中(GA 硬阻断)

覆盖率 workflow 已将 lines 从 44% 提升到 70.39%,测试数从 1171 提升到 3804+。但距 85% 阈值仍有显著差距,需继续补测试。

### 待办(收尾)

- [ ] **继续补测试提升覆盖率**至 85%(当前 Stmts 68.22% / Branch 58.86% / Funcs 65.53% / Lines 70.39%)
- [ ] **修 45 个 typecheck 错误**(23 个测试文件,3 类:①未使用 import TS6133 ~15 个→删未用变量;②readonly 赋值 TS4104 8 个→加 `as` 断言或改 mutable;③可能 undefined+类型不匹配 ~19 个→加 null check/修类型;重灾区:segmented-control 10 个/rating 6 个/mobile-page-header 4 个)
- [x] **修失败测试** — ✅ 已完成(6 Agent 并行修复 26 文件,45→0 failures)
- [ ] 删除调试残留:`components/ui/__probe*.test.tsx`(已删 __probe3,确认无其他)
- [ ] 跑 `npm run test:coverage` 确认 ≥ 85%(lines/branches/functions/statements);vitest 阈值已设 85/80/85/85
- [ ] 覆盖率达 85% 后,`prepublishOnly` 加 `npm run test:coverage`(目前是 `typecheck && test && check:no-bom && smoke`)
- [ ] 测试模式:Base UI 子组件需 Root context 的,测类型导出+模块导入(参考 dialog/select/form.test.tsx);JSX 测试文件必须用 `.test.tsx` 扩展名(不能 `.test.ts`)

### 剩余低覆盖率重点(若 workflow 未完全覆盖)

- mobile 组件(23 个,多为 0%):需补真实渲染测试
- layout 组件(16 个):admin-breadcrumb/admin-header/admin-tabs/auth-layout/blank-layout/detail-layout/error-layout/public-layout/region-layout/top-bar 等
- lib:security.ts(0%)/url.ts(50%)/message.ts/modal.ts/modal-store.tsx/logger.ts/api-client.ts
- hooks:use-crud/use-form/use-permission/use-locale/use-confirm-async 等需深度测试

---

## 阶段三:清理 + 稳定化 ✅ 已完成

- [x] 删除临时脚本:`scripts/gen-business-shells.mjs`(未提交残留)
- [x] 核实 `rule-editor` 真实实现(241 行,非空壳)
- [x] 核实 layout 组件真实(6 个空壳已补)
- [x] 移除 `package.json` 的 `provenance: true`
- [x] 修复 21 个历史生成脚本遗留类型错误
- [ ] 清理 376 个 lint warnings(非阻断,GA 前应大幅减少)— 可选
- [ ] 核实 turbo.json 是否真正接入(monorepo 未真正重组)— 可选,GA 不强制

---

## 阶段四:文档 & AI 友好性 ✅ 已完成

- [x] 项目级文档:`docs/architecture.md`/`design-tokens.md`/`theming.md`/`migration.md`/`i18n.md`/`performance.md`/`testing.md`/`monorepo.md`
- [x] AI 规则文件矩阵:AGENTS.md/CLAUDE.md/.cursorrules/CONVENTIONS.md/ARCHITECTURE.md
- [x] 组件清单:COMPONENT_INDEX.md / HOOKS_INDEX.md / LIB_INDEX.md
- [x] AI 提示词模板:`docs/ai-prompts/{component-new,test-new,story-new,component-bugfix}.md`
- [x] README/CHANGELOG 完整(已加 1.0.0 GA 条目)
- [ ] 每个组件 JSDoc 完善(@param/@example)— 大部分已有,可补
- [ ] 每个组件 Storybook MDX(312 stories 已在 apps/docs;business 聚合 story)— 可选补全

---

## 阶段五:可访问性(a11y) ✅ 基础完成

- [x] interactive 组件有 aria-label/aria-describedby(GA 实现已遵循)
- [x] 键盘可访问(Enter/Space/Esc/方向键,GA 实现已遵循)
- [x] 焦点可见(focus-visible)、语义化元素(header/main/nav/ol/table)
- [x] Storybook a11y addon 已装(`@storybook/addon-a11y`)
- [x] `@axe-core/cli` devDep 已装
- [ ] 颜色对比度 WCAG AA(4.5:1)— 需全量验证
- [ ] 全部组件 Storybook a11y 面板 0 violations — 需全量验证
- [ ] 引入 @axe-core/playwright 到 E2E

---

## 阶段六:国际化(i18n) ✅ 基础完成

- [x] `lib/i18n/resources/{zh,en,ja,ko}/*.json` 已建(15 命名空间)
- [x] 命名空间拆分:common/chart/cookie/data/error/language/marketing/mobile/navigation/notification/tour/transfer/ui/upload
- [x] en-US/ja-JP/ko-KR 已建
- [ ] 提取所有硬编码中文到 i18n key(business 当前 `@chaos/no-hardcoded-chinese` 豁免,分批推进)
- [ ] `@chaos/no-hardcoded-chinese` 从 off 升 error(待 business 迁移完成)
- [ ] 数字/日期/货币本地化、RTL 支持

---

## 阶段七:性能 & CI/CD ✅ 基础完成

- [x] CI:ci/release/security/nightly/labeler/stale/dependency-review/detection workflow
- [x] 治理:CODEOWNERS/PR template/Issue template/SECURITY/CONTRIBUTING/CODE_OF_CONDUCT/SUPPORT
- [x] 安全:`no-console` 限 warn(允许 warn/error)、api-client Token 机制
- [x] `eslint-plugin-jsx-a11y` 已装
- [ ] 大表虚拟化验证、lucide-react 替换为 @chaos/ui/icons(已集中 facade,业务直引 lucide 仍 warn)
- [ ] size-limit 单组件入口 ≤ 5KB gzip
- [ ] RSC 兼容性验证、代码分割
- [ ] api-client Token 刷新/XSS 审查/CSP
- [ ] DX:.vscode 配置/Vitest UI/Codemod(antd→chaos-ui,`scripts/codemod-antd-to-chaos.mjs` 已有)

---

## 阶段八:Monorepo 重组(可选,GA 不强制)

- [ ] 单仓内重组(Mantine 风格)
- [ ] 启用 npm workspaces:拆 chaos-icons/chaos-hooks/chaos-lib 子包
- [ ] monorepo 治理

> 风险高,保留 `pre-monorepo-restructure` branch 可回退。GA 可不做。

---

## 发版路径

1. ~~阶段一完成~~ ✅ → `1.0.0-beta.1`(空壳补真实)
2. **阶段二完成**(覆盖率 85%)→ `1.0.0-beta.2` ← **当前**
3. 阶段三-七完成 → `1.0.0-rc.0`
4. qxy-mop 真实迁移验证通过 ✅ → `1.0.0` GA

---

## 验收清单(发 1.0.0 GA 前必过)

- [x] 148 个空壳组件全部真实实现(无 `return null` / `{null}` / 空 div 占位)
- [ ] `npm run check` 0 错误(typecheck + lint + css + deps + bom)— typecheck 仍有 45 错误(23 测试文件)
- [x] `npm test` 0 失败 — ✅ 487 文件全部通过,3834 tests passed
- [ ] `npm run test:coverage` ≥ 85%(当前 Stmts 68.22% / Branch 58.86% / Funcs 65.53% / Lines 70.39%)
- [x] `npm run smoke` 通过(26 exports 产物齐全)
- [ ] `npm run prepack` 通过(build + size-limit)
- [ ] 所有组件有 .stories.tsx(business 用聚合 story)
- [ ] 所有 Story 通过 a11y 校验
- [x] README/CHANGELOG 完整
- [x] qxy-mop 真实项目迁移验证通过
- [x] AI 规则文件矩阵完整
- [ ] CI 流水线绿

---

## 给执行模型的关键约束

1. **技术栈**:React 19 / Next 16 / TypeScript 5.9 / Tailwind 4 / @base-ui/react(非 Radix)/ tsup / vitest
2. **包管理**:npm(不用 pnpm)/ 私有 Verdaccio registry(npm.qxy1828.com)
3. **别名**:`@/ = ./*`(全仓 200+ import 依赖,勿改)
4. **入口**:7 subpath exports(`.`/`./ui`/`./ui/icons`/`./business`/`./hooks`/`./lib`/`./next`)+ `./styles.css`
5. **提交**:`git add <具体文件>` 勿用 `git add -A`;conventional commits + `Co-Authored-By: Claude <noreply@anthropic.com>`
6. **每批验证**:`npm run typecheck && npm test && npm run check:no-bom && npm run smoke`
7. **空壳识别**:`grep -l "{null}" components/business/*.tsx`(返回 0)/ `grep -lE "function \w+({ className }: \w+Props)"`(返回 0)
8. **测试模式**:Base UI 子组件需 Root context 的,测类型导出+模块导入;**JSX 测试必须用 `.test.tsx`**;Popover/Select 在 jsdom 用类型+模块测试
9. **图标**:统一从 `@/components/ui/icons` 引入;缺图标时在 `components/ui/icons.ts` 追加 `export const XIcon = Lucide.XIcon;`

---

## GA 工作产物

- `.claude/ga-work/AGENT_GUIDE.md` — 实现指南(技术栈/导入/图表模式/a11y/测试模式)
- `.claude/ga-work/workflow-shells.mjs` — 空壳实现 workflow(已完成)
- `.claude/ga-work/workflow-coverage.mjs` — 覆盖率提升 workflow(进行中,run `wf_0c8c4d0f-5c3`)
- `.claude/ga-work/cats/*.json` — 各批次空壳元数据
- `.claude/ga-work/cov/*.json` — 各批次低覆盖率文件清单
