# Chaos UI

Enterprise component design system and styleguide built with Next.js 16, Tailwind CSS 4, and shadcn/ui.

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/styleguide](http://localhost:3000/styleguide) to view the component library.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm audit --prod` | Security audit |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** shadcn/ui (base-nova)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5.9 (strict)
- **Icons:** Lucide React

## Project Structure

```
├── app/
│   ├── styleguide/          # Component showcase (6 categories)
│   │   ├── tokens/          # Design tokens
│   │   ├── components/      # Base UI components
│   │   ├── business/        # Business components
│   │   ├── patterns/        # Page-level patterns
│   │   └── layouts/         # Layout templates
├── components/
│   ├── ui/                  # shadcn base components
│   ├── business/            # Business components
│   └── layout/              # Layout components
├── lib/                     # Utilities
└── component-spec.md        # Component specification
```

## Documentation

See [component-spec.md](./component-spec.md) for naming conventions, patterns, and guidelines.
