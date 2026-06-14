# Chaos UI

Enterprise component design system with Storybook as the primary component
review surface, built with React 19, Next.js 16, Tailwind CSS 4, and shadcn/ui.

The package is published as `@qxyfoods/chaos-ui` for internal applications.

## Install

```bash
npm install @qxyfoods/chaos-ui
```

React and React DOM are peer dependencies. Next.js and `next-themes` are optional
peer dependencies used only by the `@qxyfoods/chaos-ui/next` entry.

## Tailwind CSS 4 Setup

Add the package as a Tailwind source and import the shared design tokens in your
app-level CSS:

```css
@import "tailwindcss";
@source "../node_modules/@qxyfoods/chaos-ui";
@import "@qxyfoods/chaos-ui/styles.css";
```

Adjust the `@source` path if your global CSS file is nested more deeply.

## React Usage

Use framework-neutral UI, hooks, and utilities from the root package or focused
subpath exports:

```tsx
import { Button, Card, CardContent } from "@qxyfoods/chaos-ui";
import { SearchIcon } from "@qxyfoods/chaos-ui/ui/icons";

export function SearchCard() {
  return (
    <Card>
      <CardContent>
        <Button>
          <SearchIcon />
          Search
        </Button>
      </CardContent>
    </Card>
  );
}
```

Available public entries:

| Entry                           | Purpose                                 |
| ------------------------------- | --------------------------------------- |
| `@qxyfoods/chaos-ui`            | React-safe UI, hooks, and lib utilities |
| `@qxyfoods/chaos-ui/ui`         | UI primitives                           |
| `@qxyfoods/chaos-ui/ui/icons`   | Lucide icon facade                      |
| `@qxyfoods/chaos-ui/business`   | Framework-neutral business components   |
| `@qxyfoods/chaos-ui/hooks`      | Shared hooks                            |
| `@qxyfoods/chaos-ui/lib`        | Utilities and i18n provider             |
| `@qxyfoods/chaos-ui/next`       | Next.js and next-themes adapters        |
| `@qxyfoods/chaos-ui/styles.css` | Tailwind 4 tokens and base styles       |

## Next.js Usage

Next-only components and adapters live under `@qxyfoods/chaos-ui/next` so Vite or
plain React consumers do not need to install Next.js.

```tsx
import { ChaosI18nProvider } from "@qxyfoods/chaos-ui/lib";
import { Toaster, TopBar } from "@qxyfoods/chaos-ui/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ChaosI18nProvider>
          <TopBar />
          {children}
          <Toaster richColors position="top-right" />
        </ChaosI18nProvider>
      </body>
    </html>
  );
}
```

If you use `ThemeToggle`, wrap your app with `ThemeProvider` from `next-themes`.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:6006](http://localhost:6006) to view the component
library in Storybook. Use `npm run app:dev` when you need the local Next.js app
shell.

## Package Commands

| Command                   | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Start Storybook on port 6006                        |
| `npm run app:dev`         | Start the local Next.js app                         |
| `npm run build:pkg`       | Build package ESM/CJS/types into `dist/`            |
| `npm run pack:dry`        | Preview npm package contents                        |
| `npm run check`           | Typecheck, ESLint, Stylelint, and dependency checks |
| `npm run build-storybook` | Verify Storybook production build                   |

## Migrating from Source Copy

Replace local imports such as `@/components/ui`, `@/hooks`, and `@/lib` with
package entries:

```tsx
import { Button } from "@qxyfoods/chaos-ui/ui";
import { useDebounce } from "@qxyfoods/chaos-ui/hooks";
import { ChaosI18nProvider } from "@qxyfoods/chaos-ui/lib";
```

Move any `next/link` or `next-themes` dependent usage to
`@qxyfoods/chaos-ui/next`.

## Project Structure

```text
app/          Local Next.js app shell
components/   Shared UI, business, and layout components
hooks/        Shared React hooks
lib/          Utilities and i18n
package/      Public package entry points
src/          Storybook stories and docs
```

See [component-spec.md](./component-spec.md) for naming conventions, patterns,
and guidelines.
