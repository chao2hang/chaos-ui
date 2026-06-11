import{i as e}from"./preload-helper-D2yxXLVK.js";import{d as t}from"./iframe-agP7ZJF7.js";import{a as n,o as r,v as i}from"./blocks-DIlK1nBb.js";import{t as a}from"./mdx-react-shim-Ca8nzlKS.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...i(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{title:`Getting Started`}),`
`,(0,c.jsx)(t.h1,{id:`getting-started`,children:`Getting Started`}),`
`,(0,c.jsx)(t.p,{children:`Quick guide to using Chaos UI components in your project.`}),`
`,(0,c.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`pnpm install
`})}),`
`,(0,c.jsx)(t.h2,{id:`development`,children:`Development`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-bash`,children:`# Start Storybook documentation
pnpm storybook

# Start Next.js dev server
pnpm dev

# Build for production
pnpm build

# Build Storybook for deployment
pnpm build-storybook

# Run linter
pnpm lint
`})}),`
`,(0,c.jsx)(t.h2,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,c.jsx)(t.p,{children:`Import a component and use it in your code:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div>
      <Button variant="default">Click me</Button>
    </div>
  )
}
`})}),`
`,(0,c.jsx)(t.h2,{id:`component-anatomy`,children:`Component Anatomy`}),`
`,(0,c.jsx)(t.p,{children:`Every Chaos UI component follows a consistent pattern:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { cn } from '@/lib/utils'

// 1. Import the component
import { Button } from '@/components/ui/button'

// 2. Use it with TypeScript props
function MyComponent() {
  return (
    <Button
      variant="default"      // Variant prop
      size="md"              // Size prop
      disabled={false}       // State prop
      onClick={() => {}}     // Event handler
    >
      Button Text
    </Button>
  )
}
`})}),`
`,(0,c.jsx)(t.h2,{id:`styling`,children:`Styling`}),`
`,(0,c.jsxs)(t.p,{children:[`Chaos UI uses Tailwind CSS 4 with CSS custom properties. All components accept a `,(0,c.jsx)(t.code,{children:`className`}),` prop for custom styling:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<Button className="mt-4 w-full">
  Full Width Button
</Button>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Use the `,(0,c.jsx)(t.code,{children:`cn()`}),` utility to merge class names:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { cn } from '@/lib/utils'

<Button className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
`})}),`
`,(0,c.jsx)(t.h2,{id:`theming`,children:`Theming`}),`
`,(0,c.jsx)(t.p,{children:`Chaos UI supports light and dark modes via CSS variables. Toggle using the theme switcher in Storybook toolbar.`}),`
`,(0,c.jsx)(t.h3,{id:`custom-theme`,children:`Custom Theme`}),`
`,(0,c.jsxs)(t.p,{children:[`Override CSS variables in your `,(0,c.jsx)(t.code,{children:`globals.css`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-css`,children:`:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}
`})}),`
`,(0,c.jsx)(t.h2,{id:`typescript`,children:`TypeScript`}),`
`,(0,c.jsx)(t.p,{children:`All components are fully typed. Import types directly:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Button, type ButtonProps } from '@/components/ui/button'
`})}),`
`,(0,c.jsx)(t.h2,{id:`next-steps`,children:`Next Steps`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Browse the `,(0,c.jsx)(t.a,{href:`/docs`,children:`Component Library`}),` for all available components`]}),`
`,(0,c.jsxs)(t.li,{children:[`Read the `,(0,c.jsx)(t.a,{href:`/docs/design-tokens--docs`,children:`Design Tokens`}),` guide`]}),`
`,(0,c.jsxs)(t.li,{children:[`Check the `,(0,c.jsx)(t.a,{href:`/docs/component-guidelines--docs`,children:`Component Guidelines`}),` for best practices`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),r()}))();export{s as default};