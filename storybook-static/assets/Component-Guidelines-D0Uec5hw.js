import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{a as n,o as r,v as i}from"./blocks-DIlK1nBb.js";import{t as a}from"./mdx-react-shim-Ca8nzlKS.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Component Guidelines`}),`
`,(0,c.jsx)(t.h1,{id:`component-guidelines`,children:`Component Guidelines`}),`
`,(0,c.jsx)(t.p,{children:`Standards and best practices for building Chaos UI components.`}),`
`,(0,c.jsx)(t.h2,{id:`architecture`,children:`Architecture`}),`
`,(0,c.jsx)(t.h3,{id:`component-layers`,children:`Component Layers`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`components/
├── ui/           # Base UI components (atomic)
├── business/     # Business domain components
└── layout/       # Page-level layouts
`})}),`
`,(0,c.jsx)(t.h3,{id:`layer-rules`,children:`Layer Rules`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`UI Components`}),` (`,(0,c.jsx)(t.code,{children:`components/ui/`}),`)`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Base, reusable components`}),`
`,(0,c.jsx)(t.li,{children:`No business logic`}),`
`,(0,c.jsx)(t.li,{children:`Highly customizable`}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Business Components`}),` (`,(0,c.jsx)(t.code,{children:`components/business/`}),`)`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Built on top of UI components`}),`
`,(0,c.jsx)(t.li,{children:`Contains domain-specific logic`}),`
`,(0,c.jsx)(t.li,{children:`Examples: DataTable, FormField, StatusTag`}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Layout Components`}),` (`,(0,c.jsx)(t.code,{children:`components/layout/`}),`)`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Page-level layouts`}),`
`,(0,c.jsx)(t.li,{children:`Compose business and UI components`}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`naming-conventions`,children:`Naming Conventions`}),`
`,(0,c.jsxs)(t.p,{children:[`| Type | Convention | Example |
|------|-----------|---------|
| Files | `,(0,c.jsx)(t.code,{children:`kebab-case.tsx`}),` | `,(0,c.jsx)(t.code,{children:`status-tag.tsx`}),` |
| Components | `,(0,c.jsx)(t.code,{children:`PascalCase`}),` | `,(0,c.jsx)(t.code,{children:`StatusTag`}),` |
| Props Types | `,(0,c.jsx)(t.code,{children:`ComponentNameProps`}),` | `,(0,c.jsx)(t.code,{children:`StatusTagProps`}),` |
| CSS Variables | `,(0,c.jsx)(t.code,{children:`--kebab-case`}),` | `,(0,c.jsx)(t.code,{children:`--brand-500`}),` |
| Hooks | `,(0,c.jsx)(t.code,{children:`use`}),` prefix | `,(0,c.jsx)(t.code,{children:`use-mobile.ts`}),` |
| Constants | `,(0,c.jsx)(t.code,{children:`UPPER_SNAKE_CASE`}),` | `,(0,c.jsx)(t.code,{children:`ORDER_STATUSES`}),` |`]}),`
`,(0,c.jsx)(t.h2,{id:`component-structure`,children:`Component Structure`}),`
`,(0,c.jsx)(t.h3,{id:`basic-component-template`,children:`Basic Component Template`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Variant definitions
const componentVariants = cva(
  "base-classes",
  {
    variants: { ... },
    defaultVariants: { ... },
  }
)

// 2. Props interface
interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Custom props
}

// 3. Component implementation
function ComponentName({ ... }: ComponentNameProps) {
  return <div className={cn(componentVariants({ ... }))} />
}

// 4. Exports
export { ComponentName, componentVariants }
export type { ComponentNameProps }
`})}),`
`,(0,c.jsx)(t.h2,{id:`design-token-usage`,children:`Design Token Usage`}),`
`,(0,c.jsx)(t.p,{children:`Always use semantic tokens, never hardcoded colors:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// ✅ Correct
<div className="bg-primary text-primary-foreground" />

// ❌ Incorrect
<div className="bg-blue-500 text-white" />
`})}),`
`,(0,c.jsx)(t.h3,{id:`status-color-pattern`,children:`Status Color Pattern`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// For badges and tags
className="bg-success/15 text-success"
className="bg-warning/15 text-warning"
className="bg-destructive/10 text-destructive"
`})}),`
`,(0,c.jsx)(t.h2,{id:`state-management`,children:`State Management`}),`
`,(0,c.jsx)(t.h3,{id:`focus-states`,children:`Focus States`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
`})}),`
`,(0,c.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`"disabled:pointer-events-none disabled:opacity-50"
`})}),`
`,(0,c.jsx)(t.h3,{id:`validation-states`,children:`Validation States`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`"aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
`})}),`
`,(0,c.jsx)(t.h2,{id:`dark-mode`,children:`Dark Mode`}),`
`,(0,c.jsx)(t.p,{children:`All components must support dark mode:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Background colors
"dark:bg-input/30"  // Default
"dark:bg-input/50"  // Hover

// Border colors
"dark:border-input"

// Invalid states
"dark:aria-invalid:border-destructive/50"
`})}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,c.jsx)(t.p,{children:`Every component should use data attributes for state and variant:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Slot identification
<div data-slot="component-name" />

// Size variant
<div data-size={size} />

// Visual variant
<div data-variant={variant} />

// State
<div data-state="open" />
`})}),`
`,(0,c.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsx)(t.li,{children:`All interactive elements must be keyboard accessible`}),`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`aria-label`}),` for icon-only buttons`]}),`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`aria-describedby`}),` for form field descriptions`]}),`
`,(0,c.jsx)(t.li,{children:`Use semantic HTML elements`}),`
`,(0,c.jsx)(t.li,{children:`Maintain 4.5:1 contrast ratio for text`}),`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`sr-only`}),` for screen reader context`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`performance`,children:`Performance`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`"use client"`}),` ONLY when needed`]}),`
`,(0,c.jsx)(t.li,{children:`Prefer Server Components by default`}),`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`React.memo()`}),` for expensive renders`]}),`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`useCallback`}),` for event handlers passed as props`]}),`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`next/dynamic`}),` for heavy components`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`testing`,children:`Testing`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsx)(t.li,{children:`Every component should have a Story`}),`
`,(0,c.jsx)(t.li,{children:`Include all variants in stories`}),`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`argTypes`}),` for complete Props documentation`]}),`
`,(0,c.jsxs)(t.li,{children:[`Tag with `,(0,c.jsx)(t.code,{children:`autodocs`}),` for automatic documentation`]}),`
`,(0,c.jsxs)(t.li,{children:[`Add `,(0,c.jsx)(t.code,{children:`tags: ['a11y']`}),` for accessibility testing`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`anti-patterns`,children:`Anti-Patterns`}),`
`,(0,c.jsx)(t.p,{children:`Avoid these patterns:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`❌ Raw hex colors in className`}),`
`,(0,c.jsx)(t.li,{children:`❌ Inline styles for static values`}),`
`,(0,c.jsxs)(t.li,{children:[`❌ `,(0,c.jsx)(t.code,{children:`any`}),` type`]}),`
`,(0,c.jsx)(t.li,{children:`❌ Modifying UI components directly`}),`
`,(0,c.jsxs)(t.li,{children:[`❌ `,(0,c.jsx)(t.code,{children:`console.log`}),` in production`]}),`
`,(0,c.jsx)(t.li,{children:`❌ Hardcoded strings (use constants)`}),`
`,(0,c.jsx)(t.li,{children:`❌ Missing TypeScript types`}),`
`,(0,c.jsxs)(t.li,{children:[`❌ Using `,(0,c.jsx)(t.code,{children:`@apply`}),` when a Tailwind class exists`]}),`
`,(0,c.jsxs)(t.li,{children:[`❌ Importing from relative paths (use `,(0,c.jsx)(t.code,{children:`@/`}),` alias)`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),r()}))();export{s as default};