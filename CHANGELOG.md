# Changelog

All notable changes to **@qxyfoods/chaos-ui** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
