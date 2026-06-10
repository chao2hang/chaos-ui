# Component Specification

Enterprise component design system for the Marketing Platform.

## 1. Overview

This document defines the conventions, standards, and patterns used in the component library. All new components MUST follow these guidelines.

**Tech Stack:**
- Next.js 16 (App Router)
- React 19
- TypeScript 5.9 (strict mode)
- Tailwind CSS 4
- shadcn/ui (base-nova style)
- Lucide React (icons)

## 2. Directory Structure

```
├── app/
│   ├── styleguide/          # Component showcase (6 categories)
│   │   ├── tokens/          # Design tokens (colors, typography, spacing, radius, shadow, motion)
│   │   ├── components/      # Base UI components
│   │   ├── business/        # Business domain components
│   │   ├── patterns/        # Page-level patterns
│   │   └── layouts/         # Layout templates
├── components/
│   ├── ui/                  # shadcn base components (DO NOT EDIT unless necessary)
│   ├── business/            # Business components (StatusTag, DataTable, etc.)
│   └── layout/              # Layout components (DashboardLayout, AuthLayout, etc.)
├── hooks/                   # Custom React hooks
├── lib/
│   ├── utils.ts             # Utility functions (cn, etc.)
│   └── nav.ts               # Styleguide navigation config
└── component-spec.md        # This file
```

## 3. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| File names | kebab-case | `status-tag.tsx` |
| Component names | PascalCase | `StatusTag` |
| Props interfaces | `ComponentNameProps` | `StatusTagProps` |
| CSS variables | kebab-case with prefix | `--brand-500` |
| Tailwind classes | Utility-first | `bg-brand-500 text-white` |
| Hooks | `use` prefix | `use-mobile.ts` |
| Constants | UPPER_SNAKE_CASE | `ORDER_STATUSES` |

## 4. Design Tokens

All colors, spacing, and visual properties use CSS custom properties defined in `app/globals.css`.

### Color Tokens

| Token | Usage |
|-------|-------|
| `--background` / `--foreground` | Page background and text |
| `--card` / `--card-foreground` | Card surfaces |
| `--primary` / `--primary-foreground` | Primary actions, brand emphasis |
| `--secondary` / `--secondary-foreground` | Secondary actions |
| `--muted` / `--muted-foreground` | Subtle backgrounds, placeholder text |
| `--accent` / `--accent-foreground` | Hover states, highlights |
| `--destructive` / `--destructive-foreground` | Destructive actions, errors |
| `--success` / `--success-foreground` | Success states |
| `--warning` / `--warning-foreground` | Warning states |
| `--info` / `--info-foreground` | Informational states |
| `--brand-50` to `--brand-950` | Brand color scale |
| `--border` / `--input` / `--ring` | Borders, inputs, focus rings |
| `--surface` | Elevated surfaces |

### Spacing

Use Tailwind spacing scale: `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-6` (24px), `p-8` (32px).

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `rounded-sm` | radius × 0.6 | Buttons, small elements |
| `rounded-md` | radius × 0.8 | Inputs, selects |
| `rounded-lg` | radius | Cards, dialogs |
| `rounded-xl` | radius × 1.4 | Modals |
| `rounded-full` | 9999px | Avatars, pills |

### Shadows

Use `shadow-xs` through `shadow-2xl` — all defined as CSS custom properties with dark mode variants.

## 5. Component Layers

### 5.1 UI Components (`components/ui/`)

Base components from shadcn/ui. **DO NOT MODIFY** unless absolutely necessary. If customization is needed, create a wrapper in `components/business/`.

### 5.2 Business Components (`components/business/`)

Domain-specific components built on top of UI components.

**Naming pattern:** `<Domain><Element>` — e.g., `StatusTag`, `OrderForm`, `ProductCard`.

**Required exports:**
```typescript
export function StatusTag({ status, size }: StatusTagProps) { ... }
export type StatusTagProps = { status: OrderStatus; size?: "sm" | "default" }
```

### 5.3 Layout Components (`components/layout/`)

Page-level layout shells.

**Required exports:**
```typescript
export function DashboardLayout({ children, title }: DashboardLayoutProps) { ... }
```

## 6. Props Design Principles

1. **Use discriminated unions** for variant props:
   ```typescript
   type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
   ```

2. **Extend HTML attributes** when applicable:
   ```typescript
   interface StatusTagProps extends React.HTMLAttributes<HTMLSpanElement> {
     status: OrderStatus;
   }
   ```

3. **Use `React.ReactNode`** for slot props (not `string`):
   ```typescript
   interface PageHeaderProps {
     title: string;
     actions?: React.ReactNode;  // NOT actions?: string
   }
   ```

4. **Default values** should be documented in JSDoc:
   ```typescript
   /** @default "default" */
   size?: "sm" | "default" | "lg";
   ```

## 7. Styling Rules

1. **Always use `cn()` from `@/lib/utils`** for conditional classes:
   ```typescript
   import { cn } from "@/lib/utils";
   <span className={cn("base-class", condition && "conditional-class", className)} />
   ```

2. **DO NOT use inline styles** unless absolutely necessary (animations, dynamic values).

3. **Use Tailwind classes** for all static styling.

4. **Component variants** use `class-variance-authority` (cva):
   ```typescript
   const badgeVariants = cva("base-classes", {
     variants: { variant: { default: "...", destructive: "..." } },
     defaultVariants: { variant: "default" }
   });
   ```

## 8. Form Patterns

Use `react-hook-form` + `zod` for all forms:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

type FormValues = z.infer<typeof schema>;

function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });
  // ...
}
```

**Form layout:** Use `FormField` wrapper from `@/components/business/form-field`.

## 9. Data Table Patterns

Use `DataTable` from `@/components/business/data-table`:

```typescript
const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name", render: (row) => <strong>{row.name}</strong> },
  { key: "status", header: "Status", render: (row) => <StatusTag status={row.status} /> },
];

<DataTable columns={columns} data={orders} onRowClick={(row) => router.push(`/orders/${row.id}`)} />
```

## 10. Error & Loading States

1. **Loading:** Use `Skeleton` components for content placeholders.
2. **Empty:** Use `EmptyState` with icon, title, description, and optional action.
3. **Error:** Use `EmptyState` with `AlertTriangle` icon and retry action.
4. **Toast notifications:** Use `sonner`'s `toast.success()`, `toast.error()`, etc.

## 11. Dark Mode

All colors use CSS custom properties with `.dark` class variants. Components automatically adapt.

**When creating new components:**
- Use semantic tokens (`bg-primary`, `text-foreground`) — NOT raw colors
- Test both light and dark modes
- Use `opacity` for subtle dark mode borders: `border-border/50`

## 12. Accessibility (a11y)

1. All interactive elements must be keyboard accessible.
2. Use `aria-label` for icon-only buttons.
3. Use `aria-describedby` for form field descriptions.
4. Use semantic HTML (`<nav>`, `<main>`, `<section>`, `<table>`).
5. Maintain 4.5:1 contrast ratio for text.
6. Use `sr-only` text for screen reader context.

## 13. Performance

1. Use `"use client"` ONLY when the component needs browser APIs, state, or event handlers.
2. Prefer Server Components by default.
3. Use `React.memo()` for expensive render components.
4. Use `useCallback` for event handlers passed as props.
5. Use `next/dynamic` for heavy components (charts, editors).

## 14. Prohibited Patterns

- ❌ Raw hex colors in className (use tokens)
- ❌ Inline styles for static values
- ❌ `any` type
- ❌ Modifying `components/ui/` files directly
- ❌ Using `console.log` in production code
- ❌ Hardcoded strings (use constants)
- ❌ Missing TypeScript types on props
- ❌ Using `@apply` when a Tailwind class exists
- ❌ Importing from relative paths (use `@/` alias)

## 15. Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-06-10 | Initial spec created | System |
