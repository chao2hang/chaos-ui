# AI Prompt: Create Storybook Story

Use this prompt to guide AI in creating a Storybook story.

## Prompt Template

```
Create a Storybook story for the `{ComponentName}` component.

File: `src/components/{component-name}.stories.tsx` (or `src/business/`)

Requirements:
1. Import: `import type { Meta, StoryObj } from "@storybook/react"`
2. Import the component from `@/components/ui/{component-name}` (or business/layout)
3. Meta configuration:
   - title: "UI/{ComponentName}" (or "Business/{Name}" / "Layout/{Name}")
   - component: ComponentName
   - tags: ["autodocs"]
   - parameters: { layout: "centered" }
4. Stories to include:
   - Default: basic usage
   - Variants: all variant combinations
   - Sizes: all size options
   - Disabled: disabled state
   - WithIcon: component with icon
   - DarkMode: dark mode variant (if applicable)
5. At least one story with `play` function for interaction testing
6. Use `args` for configurable props
7. Add `decorators` for providers if needed (ThemeProvider, etc.)
```
