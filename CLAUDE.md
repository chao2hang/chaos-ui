# Claude Code Guide — Chaos UI

> This file provides guidance to Claude Code (and similar AI assistants) when working with the Chaos UI codebase.

## Project Overview

Chaos UI (`@chaos_team/chaos-ui`) is a Storybook-first React/Next.js enterprise component library for ERP and business systems (serving `qxy-mop` and future business applications).

- **Current Version**: 0.1.0 → Target: 1.0.0
- **Tech Stack**: React 19, Next.js 16, TypeScript 5.9, Tailwind CSS 4, @base-ui/react, Storybook 10
- **Package Manager**: pnpm 11.3.0
- **Node**: >= 22.0.0

## Key Commands

```bash
pnpm run storybook    # Start Storybook on port 3002
pnpm run dev          # Start component docs site on port 8080
pnpm run check        # typecheck + lint + lint:css + lint:deps
pnpm run test         # Run vitest tests
pnpm run build:pkg    # Build package with tsup
pnpm run build-storybook  # Build Storybook for deployment
```

## Code Organization

```
components/ui/         → UI primitives (button, input, dialog, etc.)
components/business/   → Business components (data-table, kanban, charts)
components/layout/     → Layout components (app-shell, dashboard-layout)
hooks/                 → React hooks (use-debounce, use-toggle, etc.)
lib/                   → Utilities (cn, api-client, format, i18n)
src/                   → Storybook stories and MDX docs
app/                   → Next.js demo app
package/               → Package entry points (re-exports)
```

## Conventions

- Use `@/` imports for project-local source (e.g., `@/lib/utils`, `@/components/ui/button`)
- Use named exports only (no default exports)
- Use `cva` for component variants
- Use `cn()` from `@/lib/utils` for className merging
- Use `@base-ui/react` for primitive components
- Use `data-slot` attribute for component identification
- Components should have JSDoc comments with `@component`, `@category`, `@since`, `@example`
- Storybook stories use `Meta` and `StoryObj` from `@storybook/react`, include `tags: ["autodocs"]`

## Important Notes

- Do not restore the old `/styleguide` app
- Treat `storybook-static/` as generated output
- Preserve existing component APIs unless explicitly asked to change
- Keep UI implementation in `components/ui`, business components in `components/business`
- Run `pnpm run check` before finishing significant changes
