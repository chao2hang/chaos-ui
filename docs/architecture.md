# Architecture

## Overview

Chaos UI is a Storybook-first React/Next.js enterprise component library for ERP & business systems.

## Tech Stack

- **React 19** + **Next.js 16** (App Router)
- **TypeScript (see package.json)** (strict mode, exactOptionalPropertyTypes, verbatimModuleSyntax)
- **Tailwind CSS 4** (design tokens via CSS custom properties)
- **@base-ui/react** (headless primitives)
- **Storybook 10** (component development & documentation)
- **Vitest 4** (unit/integration testing)
- **tsup** (package bundling)

## Directory Structure

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

## Key Patterns

### Component Structure

- Named exports only (no default exports)
- `cva` for component variants
- `cn()` for className merging
- `data-slot` attribute for component identification
- JSDoc with `@component`, `@category`, `@since`, `@example`

### Import Convention

- `@/` alias for project-local source (e.g., `@/lib/utils`, `@/components/ui/button`)
- External dependencies imported by package name

### State Management

- Context API for global state (permissions, loading, theme)
- React hooks for local state
- No external state management library

### Styling

- Tailwind CSS 4 utility classes
- CSS custom properties for design tokens
- `class-variance-authority` (cva) for variant definitions
- `tailwind-merge` for intelligent class merging

## Build Pipeline

1. **Development**: `npm run dev` → Docs site on port 3001; `npm run storybook` → Storybook on port 3002
2. **Type checking**: `npx tsc --noEmit`
3. **Linting**: `pnpm run lint` (ESLint) + `pnpm run lint:css` (Stylelint)
4. **Testing**: `pnpm test` (Vitest) + `pnpm run test:coverage`
5. **Package build**: `pnpm run build:pkg` (tsup)
6. **Storybook build**: `pnpm run build-storybook`
7. **Verification**: `pnpm run check` (typecheck + lint + css + deps + bom)
8. **Smoke test**: `pnpm run smoke`

## Package Exports

The library exposes multiple subpath exports (see package.json `exports`; root `.` is the ui entry, not a full umbrella):

- `@chaos_team/chaos-ui` (main)
- `@chaos_team/chaos-ui/ui`
- `@chaos_team/chaos-ui/ui/icons`
- `@chaos_team/chaos-ui/ui-icons`
- `@chaos_team/chaos-ui/business`
- `@chaos_team/chaos-ui/hooks`
- `@chaos_team/chaos-ui/lib`
- `@chaos_team/chaos-ui/next`
- `@chaos_team/chaos-ui/styles.css`
