# Coding Conventions — Chaos UI

## General
- Use TypeScript strict mode for all new code
- Prefer named exports over default exports
- Use `@/` import alias for project-local source
- Keep files focused: one component per file, one hook per file
- Add JSDoc comments to all exports

## React Components
- Use function declarations (not arrow functions for components)
- Use `React.ComponentProps<"tag">` for prop types
- Use `cva` from `class-variance-authority` for variant definitions
- Use `cn()` from `@/lib/utils` for className merging
- Add `data-slot="component-name"` to the root element
- Use `@base-ui/react` for accessible primitives

## Hooks
- Prefix with `use` (e.g., `useDebounce`, `useToggle`)
- Use `"use client"` directive at top of file
- Return typed values
- Clean up side effects in `useEffect` return

## Lib Utilities
- Pure functions where possible
- No React imports unless needed
- Export both the function and its types

## Styling
- Tailwind CSS 4 with CSS custom properties for theming
- Dark mode via `.dark` class
- Responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Use semantic color classes: `text-foreground`, `bg-background`, `border-border`

## Storybook Stories
- Use `Meta` and `StoryObj` from `@storybook/react`
- Include `tags: ["autodocs"]`
- Cover: Default, variants, disabled, error, loading, dark mode
- At least one interaction test with `play` function when relevant

## Tests
- Use Vitest + @testing-library/react
- One test file per component: `component-name.test.tsx`
- Test: rendering, props, interactions, accessibility
- Coverage threshold: 85% (lines/functions/statements), 80% (branches)

## Commits
- Follow Conventional Commits: `type(scope): subject`
- Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- Max subject length: 100 chars
