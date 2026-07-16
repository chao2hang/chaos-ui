# Motion / 动效

Chaos UI uses **CSS + Base UI** for built-in motion. Consumers do **not** need a third-party animation library for Admin shell, overlays, accordion, or collapsible panels.

## Requirements

1. Import package styles once in the host app:

```ts
import "@chaos_team/chaos-ui/styles.css";
```

This file already inlines enter/exit and accordion/collapsible keyframes (from the historical `tw-animate-css` stack). You do **not** need to install `tw-animate-css` separately.

2. Do not strip `prefers-reduced-motion` media handling in host CSS. Components use Tailwind `motion-reduce:transition-none` / instant state where motion would otherwise run.

## Layers

| Layer                     | Mechanism          | Used for                                                                      |
| ------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| L0 CSS tokens / keyframes | `styles.css`       | Overlay fade/zoom/slide, accordion & collapsible height, enter/exit utilities |
| L1 Base UI open state     | `@base-ui/react`   | Accordion, Collapsible, Dialog/Sheet/Select panel state                       |
| L2 optional `motion`      | not required today | Reserved for future shared-layout cases; shell does **not** depend on it      |

## Duration conventions

Prefer existing Tailwind durations already used in shell chrome:

- **100–150ms** — overlay fade / small popovers
- **200–300ms** — sider width, submenu height, mobile drawer, chevron rotate

When adding new motion, pair transforms/opacity/height with `motion-reduce:transition-none` (or disable animation entirely under reduced motion).

## AdminSider / AdminShell

| Surface                               | Behavior                                                            |
| ------------------------------------- | ------------------------------------------------------------------- |
| `menuExpandMode="multiple"` (default) | Historical multi-open top-level groups                              |
| `menuExpandMode="accordion"`          | At most one **top-level** group open; nested levels stay multi-open |
| Submenu panel                         | Collapsible height transition when expanded desktop                 |
| Desktop width / labels                | Width + max-width/opacity (issue #18)                               |
| Mobile overlay + drawer               | Presence + opacity / translate enter-exit (issue #43)               |
| Collapsed flyout                      | Popover open/close animation                                        |

Example:

```tsx
import { AdminShell } from "@chaos_team/chaos-ui/layout";

<AdminShell
  menuExpandMode="accordion"
  menuItems={menuItems}
  selectedMenuKey={pathname}
>
  {children}
</AdminShell>;
```

## Collapsible / Accordion

- `CollapsibleContent` animates height via `--collapsible-panel-height` (Base UI).
- `AccordionContent` uses the same pattern with `--accordion-panel-height`.
- Accordion multi-panel mutual exclusion is a product API on Accordion root; Sidebar sub-menus still do **not** force accordion (consumer owns open keys).

## Overlay family

Dialog, Sheet, Drawer, Popover, Select, Tooltip, Dropdown, Hover Card, Context Menu use CSS `animate-in` / `animate-out` (or Base UI starting/ending styles). Prefer keeping host Tailwind content scanning inclusive of package classes, or rely on the prebuilt `styles.css` entry.

## Reduced motion checklist (a11y)

- [ ] Host imports `styles.css`
- [ ] OS / browser “reduce motion” yields instant expand/collapse (no janky partial height)
- [ ] No infinite decorative animations without a reduced-motion off path
- [ ] NumberTicker and similar already snap to final value under reduced motion

## Optional third-party Motion

If a host app already uses the `motion` package (Motion One / Framer Motion successor) for page transitions, keep that **outside** chaos-ui components. Do not wrap library primitives in host Motion without testing focus traps and exit unmount order (especially Dialog/Sheet).

Future library APIs that **require** Motion would be documented as an optional peer and called out in the component JSDoc. Shell #43 does not require that peer.
