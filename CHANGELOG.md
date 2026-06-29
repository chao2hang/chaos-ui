# Changelog

All notable changes to **@qxyfoods/chaos-ui** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] — 2026-06-30

### 新功能

- `ExpenseLineEditor` 非受控模式（`defaultData`，组件内置 lines 状态）；
  `data` 改为可选，消费方不必每次手写 useState。
- 暗色模式接入文档（README）：消费方用 next-themes `ThemeProvider` +
  `ThemeToggle`，`.dark` 变量自动生效。

### 质量与工具

- 8 个核心组件测试（input/textarea/checkbox/switch/table/dialog/select/
  form），测试数 24→47（12 files），覆盖率从仅 lib 扩展到核心 UI。
- `size-limit` 体积门槛（index≤120KB/business≤180KB/hooks≤30KB/lib≤30KB
  gzip），接入 `prepack`（build 后检查）。
- `changesets` 集成：`.changeset/config.json` + `changeset`/`version`/
  `release:changeset` 脚本，PR 累积变更、release 自动 bump+CHANGELOG。
- CI `build-package` job 改为 `prepack`（build+size）+ smoke test；
  `release.yml` 门禁对齐 prepublishOnly（typecheck+test+no-bom+smoke+prepack），
  避免既有 lint 债阻断发布。
- eslint `globalIgnores` 补 `apps/docs/.next`、`apps/docs/src`、
  `packages/chaos-design-ui` 等，lint problems 10541→234（消除生成产物误报）。

### 重构

- `Typography` 的 `createHeading` 从 `React.forwardRef` 迁移到函数组件 +
  ref prop（React 19 风格）。
- `menu.tsx` 双重 `as` 断言改为 `as unknown as`（更规范的类型断言）。

## [0.3.0] — 2026-06-30

### 生产可用性修复（P0 阻断性）

- **`"use client"` 指令保留**：tsup 改 preserve-modules（关 treeshake/splitting），
  给 client entry barrel 注入 `"use client"` prologue。此前 dist 产物 0 命中，
  消费方在 Next App Router RSC 中接入即崩。
- **strip 全库 UTF-8 BOM**：38 个文件的 BOM 使 `"use client"` 失效。新增
  `scripts/check-no-bom.mjs` 并接入 `npm run check`。
- **`next-themes` 移出主入口**：`MessageProvider`/`Toaster` 移至 `./next` 子路径，
  主入口不再依赖 optional peer `next-themes`，非 Next 项目可用。
- **隔离影子测试**：根 vitest 排除 `apps/docs/@`（88 个测影子副本）与
  `packages/chaos-design-ui`，`npm test` 只测 chaos-ui 自身源码。

### 依赖重构（防双实例）

- 状态型库移 `peerDependencies`：`react-hook-form`/`react-i18next`/`i18next`/
  `axios`/`sonner`/`recharts`/`@tanstack/*`/`@dnd-kit/*`/`react-day-picker`/
  `lucide-react`，避免消费方双实例（hooks/context/toast/i18n 失效）。
- 删除幽灵依赖：`shadcn`/`zustand`/`@tanstack/react-query`/`tw-animate-css`/`date-fns`；
  `zod`/`@hookform/resolvers` 移 dev（仅 stories 用）。
- peer 版本加 `^` 范围 + 上界（`react ^19`、`next >=16 <17`）。

### 发布物质量

- tsup `sourcemap: false`（防源码泄露，tarball 1.6MB→646kB）。
- `files` 加 `LICENSE`/`CHANGELOG.md`/`styles.css.d.ts`；`./styles.css` exports 加 `types`。
- 新增 `scripts/smoke-test.mjs`（验证 26 个 exports 产物齐全 + 无 sourcemap），
  接入 `prepublishOnly`。
- `prepublishOnly` 改 `typecheck && test && check:no-bom && smoke`（去重 build）。

### API 补强

- 9 个核心组件导出 Props 类型（`ButtonProps`/`InputProps`/`DialogProps`/
  `SelectTriggerProps`/`TableProps`/`FormItemProps` 等），消费方可 `import type`。
- `SearchTable<T>`/`ColumnDef<T>` 泛型化，`render` value 类型为 `T[keyof T]`，消除 `as`。
- 清理：删 `package/__deprecated__/` 死壳、`auth-guard` 重复导出、business `FormField`
  别名（与 ui `FormField` 同名冲突）、`Typography` 的 `@internal` 矛盾。

### 新功能

- `SidebarMenuSub` 可折叠（`collapsible`/`open`/`onOpenChange`/`defaultOpen`），
  基于 Collapsible，chevron 随 open 旋转；不内置手风琴。
- `StatusBadge` 业务组件（`preset: biz|active-inactive|open-closed` + 自定义 `mapping`，
  基于 ColorTag 14 色板）。
- `RemoteSelect` 远程搜索下拉基类（防抖 + loading + 可选缓存，消费方注入 fetcher）。
- `useCrud` 多筛选 + 校验拦截（**BREAKING**：fetcher 签名 `(page,pageSize,filters)`，
  移除 `keyword`；新增 `onValidate`/`filterFields`/`setFilters`）。
- `CrudPage` 内置刷新/新增 actions + 修复编辑记录 bug（`onEdit`/`onRefresh`/`onAdd`）。
- `MasterDetailLayout` 移动端折叠抽屉（`collapsible`/`masterOpen`/`onMasterOpenChange`）。
- `message`/`formatCurrency` 等 lib 工具从 `./business` 顶层导出（不再走内部 `./lib`）。
- `DialogFormBody` 默认 gap 调小（4→3）。

### 文档

- README 标注 `MessageProvider`/`Toaster`/`ThemeToggle` 从 `./next` 引入。
- `THIRD_PARTY_NOTICES` 补 `class-variance-authority` (Apache-2.0) NOTICE。
- `audit` 脚本加 `--registry=npmjs.org`（私有 registry 不支持 audit 端点）。

## [0.2.0]

### Added

- `license: "MIT"` field to `package.json`.
- `repository` / `bugs` / `homepage` / `keywords` / `description` metadata.
- `prepublishOnly` script: `npm run check && npm run test && npm run build:pkg`.
- `format` and `format:check` scripts using Prettier.
- `.prettierrc.json` and `.prettierignore` configuration files.
- `.editorconfig` for consistent editor formatting.
- `CONTRIBUTING.md` contribution guide.
- `SECURITY.md` vulnerability reporting policy.
- `LICENSE` file (MIT).
- `vitest.setup.ts` with `@testing-library/jest-dom` matchers and `matchMedia` mock.
- Vitest environment changed from `node` to `jsdom`.
- Vitest coverage thresholds raised: lines 85, branches 80, functions 85, statements 85.
- `clearMocks: true` and `restoreMocks: true` in Vitest config.
- `tsup` target upgraded from `es2019` to `es2020`.
- `tsup` treeshake preset set to `smallest`.
- `tsconfig.json` strictness: `noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames`.
- New UI components: `Space`, `Flex`, `Divider`, `Typography`, `Spinner`, `ConfigProvider`, `InputSearch`, `InputNumber`, `DatePicker`, `Descriptions`, `Popconfirm`, `Spin`, `Affix`, `BackTop`.
- New hooks: `useBreakpoint`, `useEventListener`, `useKey`, `useMessage`, `useModal`, `useNotification`.
- New lib utilities: `storage`, `eventBus`, `download`, `cookie`, `url`.
- AI-friendly files: `CLAUDE.md`, `.cursorrules`, `CONVENTIONS.md`, `ARCHITECTURE.md`, `COMPONENT_INDEX.md`, `HOOKS_INDEX.md`, `LIB_INDEX.md`.
- GitHub Actions workflows: `ci.yml`, `release.yml`, `dependency-review.yml`.
- `.github/dependabot.yml`, PR template, issue templates.
- Commitlint configuration with conventional commits.
- Storybook intro MDX files: getting-started, installation, theming, i18n, accessibility.
- Layout components: `AdminSider`, `AdminHeader`, `AdminTabs`, `AdminBreadcrumb`.
- Business components: `BillPage`, `BillHeader`, `LineEditor`, `BillFooter`, `CrudPage`, `FilterBar`, `SearchTable`, `BizStatusTag`, `BillStatusBar`, `DictSelect`, etc.

### Changed

- `tsup` target from `es2019` to `es2020`.

## [0.1.0] - 2026-06-10

### Added

- Initial release of `@qxyfoods/chaos-ui`.
- 67 UI primitive components based on `@base-ui/react` + Tailwind CSS.
- 85 business components.
- 10 layout components.
- 17 hooks.
- 6 lib utilities.
- Storybook 10 with `@storybook/nextjs-vite`.
- ESLint plugin `@chaos/eslint-plugin`.
- i18n support (zh / en).
- Next.js 16 demo app.
