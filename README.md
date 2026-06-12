# Chaos UI

Enterprise component design system built with Next.js 16, Tailwind CSS 4, and shadcn/ui.  
Component showcase powered by **Storybook 10**.

## Quick Start

```bash
pnpm install
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) to browse the component library.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Start Storybook dev server (component showcase) |
| `pnpm build-storybook` | Build static Storybook site |
| `pnpm test-storybook` | Run Storybook interaction tests |
| `pnpm lint` | Run ESLint |
| `pnpm audit` | Security audit |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** shadcn/ui (base-nova)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5.9 (strict)
- **Icons:** Lucide React
- **Showcase:** Storybook 10 + Chromatic

## Project Structure

```
├── src/                     # Storybook stories (component showcase)
│   ├── intro/               # Introduction & getting started
│   ├── components/          # UI component stories
│   ├── business/            # Business component stories
│   └── layout/              # Layout component stories
├── components/
│   ├── ui/                  # shadcn base + composite UI components
│   ├── business/            # Business domain components
│   └── layout/              # Page layout components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions (utils, api-client, logger, etc.)
└── component-spec.md        # Component specification
```

## Documentation

See [component-spec.md](./component-spec.md) for naming conventions, patterns, and guidelines.
