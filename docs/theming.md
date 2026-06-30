# Theming

## Overview

Chaos UI supports theming through CSS custom properties and Tailwind CSS 4's `@theme` directive.

## Theme Provider

Use `next-themes` for dark/light mode switching:

```tsx
import { ThemeProvider } from "next-themes";

export function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
```

## Customizing Colors

Override CSS custom properties in your global CSS:

```css
:root {
  --color-primary: #1890ff;
  --color-primary-hover: #40a9ff;
  --color-primary-active: #096dd9;
}

.dark {
  --color-primary: #177ddc;
  --color-primary-hover: #3c9ae5;
}
```

## Component-Level Customization

Each component accepts a `className` prop that can override default styles:

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">Custom Button</Button>
```

## CSS Variables in Components

Components use `cn()` to merge classes, ensuring consumer overrides take precedence:

```tsx
import { cn } from "@/lib/utils";

function Button({ className, ...props }) {
  return <button className={cn(buttonVariants(), className)} {...props} />;
}
```

## Creating a Custom Theme

1. Define your color palette as CSS custom properties
2. Import `@qxyfoods/chaos-ui/styles.css` in your app
3. Override tokens in your global stylesheet
4. Use components as normal — they'll automatically pick up your theme
