# Chaos UI

Enterprise component design system with Storybook as the primary component
review surface, built with Next.js 16, Tailwind CSS 4, and shadcn/ui.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:6006](http://localhost:6006) to view the component library in Storybook.
Use `npm run app:dev` when you need the Next.js app shell.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Storybook on port 6006 |
| `npm run app:dev` | Start the Next.js app |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run audit` | Run production dependency audit |

## Tech Stack

- **Primary UI surface:** Storybook 10
- **Framework:** Next.js 16 (App Router)
- **UI Library:** shadcn/ui (base-nova)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5.9 (strict)
- **Icons:** Lucide React

## Project Structure

```
├── app/                     # Next.js app shell / Storybook launcher page
├── .storybook/              # Storybook configuration
├── components/              # Shared UI, business, and layout components
├── src/                     # Storybook stories and MDX docs
├── lib/                     # Utilities
└── component-spec.md        # Component specification
```

## Documentation

See [component-spec.md](./component-spec.md) for naming conventions, patterns, and guidelines.
