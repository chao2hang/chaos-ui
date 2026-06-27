# AI Prompt: Create New Component

Use this prompt to guide AI in creating a new Chaos UI component.

## Prompt Template

```
Create a new Chaos UI component named `{ComponentName}` in `components/ui/{component-name}.tsx`.

Requirements:
1. Follow the project's component pattern:
   - Use `@base-ui/react` primitives when available
   - Use `cva` from `class-variance-authority` for variants
   - Use `cn()` from `@/lib/utils` for className merging
   - Add `data-slot="component-name"` to root element
   - Named exports only (no default exports)

2. Props:
   - Extend `React.ComponentProps<"tag">`
   - Use `VariantProps<typeof componentVariants>` for variant props
   - Include JSDoc with `@component`, `@category`, `@since`, `@description`, `@keywords`, `@example`

3. Variants:
   - Include at least `variant` and `size` if applicable
   - Use semantic Tailwind classes (text-foreground, bg-background, etc.)

4. Export from `components/ui/index.ts`

5. Create a Storybook story at `src/components/{component-name}.stories.tsx`:
   - Use `Meta` and `StoryObj` from `@storybook/react`
   - Include `tags: ["autodocs"]`
   - Cover: Default, variants, sizes, disabled, dark mode
   - At least one interaction test

6. Create a unit test at `components/ui/{component-name}.test.tsx`:
   - Use Vitest + @testing-library/react
   - Test rendering and at least one interaction
```
