# Chaos UI — 1.0.0 GA 待办清单

> **当前版本**:`1.0.0-beta.0`(已发布到私有 registry,beta tag)
> **目标版本**:`1.0.0` GA(General Availability,正式发布)
> **最后核实**:2026-06-30
> **维护人**:Chaos UI Team

## GA 是什么

GA = General Availability(正式发布/通用可用)。软件发布阶段:Alpha → Beta → RC → **GA**。
GA 意味着:API 冻结、承诺稳定、可上生产、有长期支持。当前 beta 不能上生产(含空壳组件)。

---

## 当前真实状态(2026-06-30 核实)

### ✅ 已达标

| 维度 | 状态 | 数据 |
|---|---|---|
| 版本 | beta | `1.0.0-beta.0` |
| typecheck | ✅ 0 错误 | `tsc --noEmit` 通过 |
| lint | ✅ 0 errors | 376 warnings(非阻断) |
| 测试 | ✅ 通过 | 1171 tests / 470 files |
| 产物 | ✅ 完整 | smoke 26 exports + size-limit 4 项 |
| 打包 | ✅ | use client 保留 / sourcemap 剥离 / styles.css.d.ts |
| 依赖 | ✅ | 状态型库移 peer(防双实例)/ 0 CVE / 无 copyleft |
| lint 门禁 | ✅ | `npm run check` 全过 |
| 真实组件 | ✅ ~302 个 | ui 116 + business 84 + layout 23 + mobile 24 + hooks 36 + lib 19 |

### ❌ 未达标(GA 阻断项)

| 维度 | 当前 | GA 标准 | 差距 |
|---|---|---|---|
| **空壳组件** | **148 个空壳**(渲染 null / 11 行占位) | 真实实现 | **最大差距** |
| 覆盖率 | 26% lines | 85% | 差 59pp |
| 版本 | beta.0 | 1.0.0 GA | 需 RC → GA |
| 文档 | 部分 | 每组件 MDX + AI 矩阵 | 缺 |
| a11y | 未验证 | WCAG AA + 0 violations | 缺 |
| i18n | 硬编码中文 | 提取 key + error 规则 | 缺 |

---

## 阶段一:实现 148 个空壳组件(最高优先,GA 硬阻断)

> 空壳 = 有 Props 类型声明但函数体 `return <div>{null}</div>` 或仅 11 行占位。
> 消费方用了得到空 div,不是真实组件。**必须全部补成真实实现。**
> 每个组件:实现 + Story + 测试 + barrel 导出。`git add <具体文件>` 勿用 `git add -A`。

### 1.1 business 空壳(82 个,渲染 null)

`account-balance` `announcement-card` `application-form` `approval-action-bar` `approval-flow`
`async-task-trigger` `attachment-list` `attachment-preview` `attachment-uploader`
`badge-delta` `bar-list` `batch-print-dialog` `bill-print-template` `bill-timeline` `bill-todo-list`
`budget-overview` `calendar-view` `callout` `category-bar` `chart-card` `chart-suite`
`city-browse` `company-browse` `customer-browse` `dashboard-canvas` `delta-bar` `dock-panel`
`donut-card` `dynamic-form-builder` `feature-tour` `fee-type-browse` `file-card` `flow-tracker`
`funnel-chart` `gantt-chart` `heatmap-chart` `image-gallery` `import-error-table`
`inventory-snapshot` `invoice-manager` `invoice-summary` `map-chart` `marketing-activity-form`
`master-edit-template` `master-list-template` `oa-bridge` `operation-log` `paste-upload`
`payment-schedule` `performance-rank-table` `photo-audit` `policy-line-editor` `pool-tracker-table`
`preference-panel` `price-adjust-browse` `print-service` `print-template-builder` `product-browse`
`quick-entry-grid` `rebut-node-select` `reconciliation-line-editor` `reconciliation-summary`
`resource-schedule` `sales-order-browse` `sales-target-editor` `serial-number-manager`
`settlement-status-tag` `shipping-way-browse` `sign-action-button` `stat-card-with-sparkline`
`tab-pin` `target-progress` `task-history` `task-list-table` `task-progress` `tax-detail-table`
`template-download` `timeline-view` `tracking` `warehouse-browse`

### 1.2 聊天/AI 体系空壳(28 个,25-33 行占位)

`chat-agent-status` `chat-artifact-panel` `chat-branch` `chat-card-message` `chat-code-block`
`chat-command-menu` `chat-context-panel` `chat-conversation` `chat-conversation-search`
`chat-feedback` `chat-header` `chat-image-gallery` `chat-input-toolbar` `chat-markdown-renderer`
`chat-mention-picker` `chat-message-actions` `chat-message-bubble` `chat-message-group`
`chat-message-input` `chat-model-switcher` `chat-shared-link` `chat-shell` `chat-sidebar`
`chat-streaming-text` `chat-suggest-replies` `chat-thinking-block` `chat-tool-call-block`
`chat-voice-message`

> 依赖评估:Shiki/Prism(代码高亮)、KaTeX(公式)、Mermaid(图表)。`chat-markdown-renderer`/`chat-code-block` 需这些。

### 1.3 低代码设计器空壳(4 个)

`form-designer` `form-designer-runtime` `workflow-designer` `workflow-preview`

> 依赖评估:reactflow(画布)。`rule-editor` 已存在(需核实是否真实)。

### 1.4 hooks 空壳(19 个,11 行占位)

`use-approval` `use-async-task` `use-bill` `use-data-scope` `use-dict` `use-export` `use-fetch`
`use-form-table` `use-idle` `use-import` `use-line-editor` `use-network-quality` `use-print`
`use-redo` `use-sse` `use-swr` `use-table` `use-undo` `use-websocket`

> 注:`use-debounce`/`use-toggle`/`use-previous` 虽 11 行但是真实实现(短 hook),非空壳。

### 1.5 lib 空壳(5 个,9 行占位)

`crypto` `date` `excel` `pdf` `worker`

> 注:`utils.ts`(cn 函数)是真实实现。

### 1.6 mobile 补充组件(10 个,未建)

`mobile-page-shell` `mobile-action-sheet` `mobile-picker` `mobile-camera` `mobile-qrcode-scanner`
`mobile-signature` `mobile-geolocation` `mobile-infinite-scroll` `mobile-tab-bar` `mobile-list-item`

> 这 10 个文件不存在,需新建(非空壳修复)。

---

## 阶段二:测试覆盖率补到 85%(GA 硬阻断)

当前 26% lines,目标 85%(差 59pp,5739+ statements 需覆盖 ~3700 更多)。

- [ ] 补 82 个 business 空壳组件实现后的交互测试
- [ ] 补 28 个 chat + 4 个 designer 组件测试
- [ ] 补 19 个 hooks 测试(已测 9 个:use-crud/use-debounce/use-pagination/use-async/use-toggle/use-previous/use-countdown/use-breakpoint/use-event-listener)
- [ ] 补剩余 ui 组件测试(已测 ~30 个,剩 ~86 个)
- [ ] 补剩余 lib 测试(已测 12 个,剩 7 个含空壳)
- [ ] 覆盖率达 85% 后,`prepublishOnly` 加 `npm run test:coverage`
- [ ] 测试模式:vitest + @testing-library,`@/` alias 已配;Base UI 子组件需 Root context 的测类型导出+模块导入(参考 dialog/select/form.test.tsx)

---

## 阶段三:清理 + 稳定化

- [ ] 删除临时脚本:`scripts/fix-tests.mjs` `scripts/fix-tests2.mjs`(未提交,工作区残留)
- [ ] 核实 `rule-editor` 是否真实实现(非空壳)
- [ ] 核实 23 个 layout 组件是否都真实(layout 无空壳,但需确认新增的 6 个)
- [ ] 移除 `package.json` 的 `provenance: true`(私有 restricted registry 不支持 provenance,会发布失败)
- [ ] 清理 376 个 lint warnings(非阻断,但 GA 前应大幅减少)
- [ ] 核实 turbo.json 是否真正接入(monorepo 未真正重组,仅加了配置)

---

## 阶段四:文档 & AI 友好性

- [ ] 每个真实组件补 JSDoc(description/@param/@example/@since)
- [ ] 每个组件 Storybook MDX(标题+演示+API 表格+最佳实践)
- [ ] 项目级文档:`docs/architecture.md` `docs/design-tokens.md` `docs/theming.md` `docs/migration.md`
- [ ] AI 规则文件矩阵:AGENTS.md/CLAUDE.md/.cursorrules/CONVENTIONS.md/ARCHITECTURE.md
- [ ] 组件清单:COMPONENT_INDEX.md / HOOKS_INDEX.md / LIB_INDEX.md
- [ ] AI 提示词模板:`docs/ai-prompts/{component-new,test-new,migrate-antd}.md`

---

## 阶段五:可访问性(a11y)

- [ ] 所有 interactive 组件有 aria-label/aria-describedby
- [ ] 颜色对比度 WCAG AA(4.5:1)
- [ ] 键盘可访问(Tab/Shift+Tab/Enter/Space/Esc/方向键)
- [ ] 焦点可见(focus-visible)、Reduced motion、High contrast
- [ ] 全部组件 Storybook a11y 面板 0 violations
- [ ] 引入 @axe-core/playwright 到 E2E(已装 @axe-core/cli devDep)

---

## 阶段六:国际化(i18n)

- [ ] 创建 `/locales/zh-CN.json` + `/locales/en-US.json`
- [ ] 命名空间拆分:common/components/business/errors
- [ ] 提取所有硬编码中文到 i18n key
- [ ] `@chaos/no-hardcoded-chinese` 从 warn 升 error(business 当前豁免)
- [ ] 添加 en-US/ja-JP/ko-KR
- [ ] 数字/日期/货币本地化、RTL 支持

---

## 阶段七:性能 & CI/CD

- [ ] 所有大表虚拟化验证、lucide-react 替换为 @chaos/ui/icons
- [ ] size-limit 单组件入口 ≤ 5KB gzip
- [ ] RSC 兼容性验证、代码分割
- [ ] CI:storybook-deploy/chromatic/codeql/labeler/stale/nightly
- [ ] 治理:CODEOWNERS/PR template/Issue template/ADR
- [ ] 安全:api-client Token 刷新/XSS 审查/CSP/移除 console.log
- [ ] DX:.vscode 配置/Vitest UI/Codemod(antd→chaos-ui)

---

## 阶段八:Monorepo 重组(可选,GA 不强制)

- [ ] 3.1 单仓内重组:`packages/chaos-ui/src/components/ui/button/{button.tsx,test,types,index.ts}`(Mantine 风格,200+ 文件迁移,保留 `@/` 别名 + 7 subpath exports)
- [ ] 3.2 启用 npm workspaces:拆 chaos-icons/chaos-hooks/chaos-lib 子包
- [ ] 3.3 monorepo 治理:CODEOWNERS/共享 config

> 风险高,保留 `pre-monorepo-restructure` branch 可回退。GA 可不做(单仓也能发)。

---

## 发版路径

1. **阶段一完成**(148 空壳补真实)→ 发 `1.0.0-beta.1`
2. **阶段二完成**(覆盖率 85%)→ 发 `1.0.0-beta.2`
3. **阶段三-七完成**(清理/文档/a11y/i18n/性能)→ 发 `1.0.0-rc.0`
4. **qxy-mop 真实迁移验证通过** → 发 `1.0.0` GA

---

## 验收清单(发 1.0.0 GA 前必过)

- [ ] 148 个空壳组件全部真实实现(无 `return null` / `{null}` 占位)
- [ ] `npm run check` 0 错误(typecheck + lint + css + deps + bom)
- [ ] `npm test` 0 失败
- [ ] `npm run test:coverage` ≥ 85%(lines/branches/functions/statements)
- [ ] `npm run smoke` 通过(26 exports 产物齐全)
- [ ] `npm run prepack` 通过(build + size-limit)
- [ ] 所有组件有 .stories.tsx
- [ ] 所有 Story 通过 a11y 校验
- [ ] README/CHANGELOG 完整
- [ ] qxy-mop 真实项目迁移验证通过
- [ ] AI 规则文件矩阵完整
- [ ] CI 流水线绿

---

## 给执行模型的关键约束

1. **技术栈**:React 19 / Next 16 / TypeScript 5.9 / Tailwind 4 / @base-ui/react(非 Radix)/ tsup / vitest
2. **包管理**:npm(不用 pnpm)/ 私有 Verdaccio registry(npm.qxy1828.com)
3. **别名**:`@/ = ./*`(全仓 200+ import 依赖,勿改)
4. **入口**:7 subpath exports(`.`/`./ui`/`./ui/icons`/`./business`/`./hooks`/`./lib`/`./next`)+ `./styles.css`
5. **提交**:`git add <具体文件>` 勿用 `git add -A`(避免误加 .claude 等杂项);commit message 遵循 conventional commits + `Co-Authored-By: Claude <noreply@anthropic.com>`
6. **每批验证**:`npm run typecheck && npm test && npm run check:no-bom && npm run smoke`
7. **空壳识别**:空壳 = `grep -l "{null}" components/business/*.tsx` 或 hooks/lib <15 行且非短函数
8. **测试模式**:Base UI 子组件需 Root context 的,测类型导出+模块导入(参考 dialog/select/form.test.tsx);Popover/Select 在 jsdom 渲染不稳的用类型+模块测试

---

## 附录:真实实现组件清单(84 个 business,作实现参考)

activity-feed / advanced-search / announcement-banner / approval-timeline / async-task-center
audience-segment-builder / audit-log / audit-sidebar / auth-guard / avatar-group / bill-footer
bill-header / bill-page / bill-status-bar / biz-status-tag / budget-pacing-card / bulk-actions-toolbar
bulk-import-wizard / campaign-calendar / campaign-card / campaign-status-tag / channel-picker / chart
chip / code-block / color-tag / combobox / command-palette / confirm-dialog / cookie-banner / crud-page
crud-toolbar / creative-preview / data-table / date-range-picker / diff-viewer / dict-select / empty-state
error-boundary / expense-line-editor / experiment-summary / export-button / fab / field-mask
file-upload-manager / filter-bar / filter-builder / forbidden / form-field / form-wizard / gauge
heatmap-calendar / inline-edit / json-viewer / kanban-board / kpi-card / language-switcher / line-editor
loading-page / metric-trend / multi-select / notification-center / order-line-editor / page-header
permission-matrix / permission-wrapper / pivot-table / prompt-dialog / rating / remote-select
responsive-preview / role-assignment / saved-filters / search-table / segmented-control / stat-card
stat-card-row / status-badge / status-tag / time-picker / tour / transfer / user-menu / utm-builder
version-history / watermark / global-loading / edit-toolbar / print-button / import-dialog
