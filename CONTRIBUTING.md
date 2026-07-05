# Contributing to Chaos UI

Thank you for your interest in contributing to **Chaos UI**! This document outlines the process for contributing to the project.

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 9.0.0

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd chaos_style

# Install dependencies
	pnpm install
	
	# Start Storybook (port 6006)
	pnpm run dev
	
	# Start Next.js demo app
	pnpm run app:dev
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Changes

Follow the project conventions:

- UI components go in `components/ui/`
- Business components go in `components/business/`
- Layout components go in `components/layout/`
- Hooks go in `hooks/`
- Lib utilities go in `lib/`
- Storybook stories go in `src/`
- Use `@/` imports for project-local source
- Use named exports (no default exports)
- Use `cva` for component variants
- Use `cn()` from `@/lib/utils` for className merging

### 3. Write Tests

Every new component should have:

- At least one Storybook story (`.stories.tsx`) with `tags: ["autodocs"]`
- At least one unit test (`.test.tsx`) with render + interaction test
- JSDoc comments on all exports

### 4. Verify

Before submitting a PR, run:

```bash
# Type checking + lint + CSS lint + dependency check
	pnpm run check
	
	# Run tests with coverage
	pnpm run test:coverage
	
	# Build Storybook
	pnpm run build-storybook
	
	# Build package
	pnpm run build:pkg
```

### 5. Commit

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(button): add loading state variant"
git commit -m "fix(dialog): resolve focus trap issue"
git commit -m "docs(readme): update installation guide"
git commit -m "test(hooks): add use-debounce tests"
```

### 6. Submit a Pull Request

- Use the PR template
- Link related issues
- Ensure all CI checks pass
- Request review from maintainers

## Coding Standards

### Component Structure

```tsx
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const componentVariants = cva("base-classes", {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ },
})

function Component({
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof componentVariants>) {
  return (
    <div
      data-slot="component"
      className={cn(componentVariants({ className }))}
      {...props}
    />
  )
}

export { Component, componentVariants }
```

### Hook Structure

```ts
"use client"
import * as React from "react"

export function useHook(/* params */): ReturnType {
  // implementation
}
```

### Lib Utility Structure

```ts
export function utility(/* params */): ReturnType {
  // implementation
}
```

## Project Structure

```
chaos_style/
├── components/
│   ├── ui/         # 67+ primitive components
│   ├── business/   # 85+ business components
│   └── layout/     # 10+ layout components
├── hooks/          # 17+ React hooks
├── lib/            # 6+ utility libraries
├── src/            # Storybook stories and MDX docs
├── app/            # Next.js demo app
├── package/        # Package entry points (re-exports)
└── .storybook/     # Storybook configuration
```

## Reporting Issues

- Use the issue templates (bug report / feature request)
- Include reproduction steps for bugs
- Include screenshots/recordings when relevant

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
