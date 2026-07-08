# Chaos UI - Storybook Visual Audit Report

## Audit Time

2026-06-14

## Coverage

| Scope | Count | Result |
|---|---:|---|
| Story files in source | 140 | Covered by Storybook docs/index audit |
| Docs pages exposed by Storybook `index.json` | 139 | Scanned |
| Device/theme matrix | 3 devices x 2 themes | Scanned |
| Total docs combinations | 834 | Visual pass |

Source story files:

| Group | Story files |
|---|---:|
| `business` | 64 |
| `components` | 67 |
| `layout` | 9 |

Storybook docs combinations scanned:

| Device | Light | Dark |
|---|---:|---:|
| Desktop | 139 | 139 |
| Tablet | 139 | 139 |
| Mobile | 139 | 139 |

## Visual Result

All 834 docs/device/theme combinations passed the visual layout audit after fixes.

Primary inspection focus:

- Timeline dots, connectors, step nodes, and similar center-line UI alignment.
- Button, checkbox, badge, icon, and text alignment.
- Card, table, dialog, drawer, menu, and story wrapper overflow.
- Dark-mode contrast and disabled/read-only readability.
- Mobile width constraints, wrapping, horizontal scroll, and text overlap.
- Interaction states including transfer-list double click, quick click, and expandable demos.

## Fixed Issues

| Area | Issue | Fix |
|---|---|---|
| Timeline | Vertical connector did not align with timeline dots | Centered the connector relative to the icon column in `components/ui/timeline.tsx`. |
| Stepper | Final horizontal step could visually drift because it still participated in flexible line layout | Made the final horizontal step shrink to its own content while previous steps keep connector space in `components/ui/stepper.tsx`. |
| Transfer | Double click toggled selection twice instead of moving the item | Added double-click move behavior and delayed single-click selection in `components/ui/transfer.tsx`. |
| Transfer | Mobile layout could overflow horizontally | Switched panels to stacked mobile layout and kept side-by-side layout from `sm` upward. |
| Tour | Popover used a fixed width and could overflow small screens | Added viewport-aware width, clamped positioning, and wrapping footer actions in `components/ui/tour.tsx`. |
| Chart | Chart container had a fixed minimum width that could trigger mobile overflow | Removed the fixed min-width in `components/business/chart.tsx`. |
| TopBar | Header actions could overflow on mobile | Hid desktop actions on small screens and kept them available in the mobile menu in `components/layout/top-bar.tsx`. |
| Story demos | Several docs examples used fixed-width wrappers | Replaced fixed widths with responsive `w-full max-w-*` wrappers across affected story files. |

Responsive story wrapper fixes were applied to:

- `src/components/AspectRatio.stories.tsx`
- `src/components/Collapsible.stories.tsx`
- `src/components/ContextMenu.stories.tsx`
- `src/components/Kbd.stories.tsx`
- `src/components/ScrollArea.stories.tsx`
- `src/components/Skeleton.stories.tsx`
- `src/components/Slider.stories.tsx`
- `src/components/Tabs.stories.tsx`
- `src/components/TagsInput.stories.tsx`
- `src/business/Transfer.stories.tsx`

## Remaining Non-Visual Warnings

The automated audit still records 6 docs pages with console/demo warnings in every matrix run. These were inspected as non-visual findings and did not block visual pass.

| Docs page | Warning type | Status |
|---|---|---|
| `components-departmentbrowse--docs` | Base UI native button warning in `Dialog` composition | Non-visual accessibility warning, not fixed in this visual pass. |
| `components-treeselect--docs` | Base UI native button warning in `Dialog` composition | Non-visual accessibility warning, not fixed in this visual pass. |
| `components-userbrowse--docs` | Base UI native button warning in `Dialog` composition | Non-visual accessibility warning, not fixed in this visual pass. |
| `business-errorpage--docs` | Base UI native button warning in `Button` composition | Non-visual accessibility warning, not fixed in this visual pass. |
| `business-errorboundary--docs` | Intentional story error: `Revenue widget failed to load` | Expected ErrorBoundary demo behavior. |
| `business-themetoggle--docs` | React warning for script tag in demo content | Non-visual story warning, not fixed in this visual pass. |

## Verification

Targeted checks:

```bash
npm.cmd run lint -- components/ui/transfer.tsx components/ui/tour.tsx components/business/chart.tsx components/layout/top-bar.tsx components/ui/timeline.tsx components/ui/stepper.tsx src/components/AspectRatio.stories.tsx src/components/Collapsible.stories.tsx src/components/ContextMenu.stories.tsx src/components/Kbd.stories.tsx src/components/ScrollArea.stories.tsx src/components/Skeleton.stories.tsx src/components/Slider.stories.tsx src/components/Tabs.stories.tsx src/components/TagsInput.stories.tsx src/business/Transfer.stories.tsx
node --check output/playwright/visual-audit/run-audit.mjs
```

Both targeted checks passed.

Full checks:

```bash
npm.cmd run lint
npm.cmd run build-storybook
```

Both full checks passed. Storybook build completed with Vite informational warnings for plugin timing and large chunks.

Audit artifacts:

- `output/playwright/visual-audit/audit-all-desktop-light-0-all.json`
- `output/playwright/visual-audit/audit-all-desktop-dark-0-all.json`
- `output/playwright/visual-audit/audit-all-tablet-light-0-all.json`
- `output/playwright/visual-audit/audit-all-tablet-dark-0-all.json`
- `output/playwright/visual-audit/audit-all-mobile-light-0-all.json`
- `output/playwright/visual-audit/audit-all-mobile-dark-0-all.json`

## Notes

- Storybook was audited through `http://localhost:6006`.
- `storybook-static/` is treated as generated output and was not edited by hand.
- The audit helper lives under `output/playwright/visual-audit/run-audit.mjs` so future visual passes can reuse the same matrix.
