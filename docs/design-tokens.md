# Design Tokens

Chaos UI uses CSS custom properties (CSS variables) as the primary design token system, integrated with Tailwind CSS 4.

## Token Categories

### Colors

- `--color-primary` — Brand primary color
- `--color-secondary` — Secondary actions
- `--color-success` — Success states
- `--color-warning` — Warning states
- `--color-error` — Error/destructive states
- `--color-background` — Page background
- `--color-foreground` — Text color
- `--color-muted` — Muted/secondary text
- `--color-border` — Border color

### Typography

- `--font-sans` — Primary font family
- `--font-mono` — Monospace font family
- Font sizes follow Tailwind's scale: `text-xs` (0.75rem) → `text-3xl` (1.875rem)

### Spacing

- Tailwind's spacing scale: 0, 0.5, 1, 2, 3, 4, 6, 8, 12, 16, 24...

### Border Radius

- `--radius-sm` — 0.25rem
- `--radius-md` — 0.375rem
- `--radius-lg` — 0.5rem
- `--radius-xl` — 0.75rem

### Shadows

- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`

## Dark Mode

Dark mode is supported via `next-themes` and the `.dark` class. All tokens have corresponding dark variants.

## Customization

Consumers can override tokens by setting CSS custom properties:

```css
:root {
  --color-primary: #your-brand-color;
  --radius-lg: 0.75rem;
}
```

## Tailwind Configuration

Tailwind CSS 4 uses CSS-based configuration. The `@theme` directive in `styles.css` maps CSS variables to Tailwind utilities.
