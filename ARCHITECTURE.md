# Architecture — Chaos UI

## Overview

Chaos UI is an enterprise-grade React component library built on top of `@base-ui/react` (Base UI by MUI) and styled with Tailwind CSS 4. It serves as the unified UI layer for all QXY Foods business systems, replacing Ant Design in the `qxy-mop` ERP platform.

## Technology Stack

| Layer         | Technology               | Version |
| ------------- | ------------------------ | ------- |
| UI Primitives | @base-ui/react           | 1.5.0   |
| Styling       | Tailwind CSS             | 4.3.0   |
| Variants      | class-variance-authority | 0.7.1   |
| Class Merge   | tailwind-merge           | 3.6.0   |
| Forms         | react-hook-form          | 7.78.0  |
| Validation    | zod                      | 4.4.3   |
| Data Fetching | @tanstack/react-query    | 5.101.0 |
| State         | zustand                  | 5.0.14  |
| Routing       | Next.js                  | 16.2.9  |
| i18n          | i18next + react-i18next  | 26/17   |
| Charts        | recharts                 | 3.8.1   |
| DnD           | @dnd-kit                 | 6.3.1   |
| Notifications | sonner                   | 2.0.7   |
| Drawer        | vaul                     | 1.1.2   |

## Directory Structure

```
chaos_style/
├── components/
│   ├── ui/         # 81+ primitive components (button, input, dialog, etc.)
│   ├── business/   # 85+ business components (data-table, kanban, charts)
│   └── layout/     # 10+ layout components (app-shell, dashboard-layout)
├── hooks/          # 23+ React hooks
├── lib/            # 11+ utility libraries
├── src/            # Storybook stories and MDX documentation
├── app/            # Next.js demo application
├── package/        # Package entry points (see package.json exports)
├── .storybook/     # Storybook configuration
└── eslint-plugin-chaos/  # Custom ESLint rules
```

## Package Exports

The library exports multiple subpath entries (see package.json `exports`; root `.` is the ui entry, not a full umbrella):

| Export                          | Entry File                           | Contents                          |
| ------------------------------- | ------------------------------------ | --------------------------------- |
| `@chaos_team/chaos-ui`          | `components/ui/index.ts (root = ui)` | All (ui + business + hooks + lib) |
| `@chaos_team/chaos-ui/ui`       | `package/ui.ts`                      | UI primitives only                |
| `@chaos_team/chaos-ui/ui/icons` | `package/ui-icons.ts`                | Icon exports                      |
| `@chaos_team/chaos-ui/ui-icons` | `package/ui-icons.ts`                | Icon exports (alias)              |
| `@chaos_team/chaos-ui/business` | `package/business.ts`                | Business components only          |
| `@chaos_team/chaos-ui/hooks`    | `package/hooks.ts`                   | Hooks only                        |
| `@chaos_team/chaos-ui/lib`      | `package/lib.ts`                     | Lib utilities only                |
| `@chaos_team/chaos-ui/next`     | `package/next.ts`                    | Next.js utilities                 |

## Build System

- **tsup** for package building (ESM + CJS + d.ts)
- **Storybook** with `@storybook/nextjs-vite` framework
- **Vitest** for unit testing with jsdom environment
- **ESLint** with custom `@chaos/eslint-plugin`

## Design Tokens

Theming is done via CSS custom properties defined in `app/globals.css`:

- Colors: `--primary`, `--secondary`, `--destructive`, `--muted`, `--accent`, etc.
- Border radius: `--radius` (with `--radius-sm`, `--radius-md`, `--radius-lg`)
- Dark mode: `.dark` class on root element

## i18n

- Uses `i18next` with `react-i18next`
- Resource files in `lib/i18n/resources/{zh,en}/`
- Locale provider: `LocaleProvider` from `hooks/use-locale.tsx`
- 13 namespaces: common, chart, cookie, data, error, language, marketing, mobile, navigation, notification, tour, transfer, ui, upload
