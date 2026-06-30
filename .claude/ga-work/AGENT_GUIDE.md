# GA Shell Implementation — Agent Reference

You are implementing **shell components** in the Chaos UI library so they become real, production-quality React components for the 1.0.0 GA release.

## What a "shell" is

A shell looks like this — full Props interface declared, but the function ignores all props and renders an empty div:

```tsx
function FileCard({ className }: FileCardProps) {
  return <div data-slot="file-card" className={cn("", className)} />;
}
```

Your job: make the function **use every prop** from its `Props` interface and render real, semantic UI. Never render an empty div / `{null}` / unused props.

## Tech stack & rules (HARD)

- React 19, TypeScript 5.9 (strict, `exactOptionalPropertyTypes: true`), Tailwind CSS 4, @base-ui/react (NOT Radix), tsup, vitest.
- `@/` alias = repo root. e.g. `import { cn } from "@/lib/utils"`, `import { Button } from "@/components/ui/button"`.
- Named exports only (no default exports). Keep the existing `export { Comp }; export type { CompProps };` shape.
- Keep the existing JSDoc (`@component`, `@category`, `@since`, `@description`) — do not remove it. You may enrich `@param`/`@example`.
- **Preserve the Props interface exactly** unless it is degenerate (only `className?: string`). If degenerate, **extend it** with sensible data fields (e.g. `data?`, `labels?`, `value?`) and document them. Consumers currently get an empty div — adding required-but-defaulted props is fine: give new fields defaults so `<Comp />` still compiles.
- Use `cn()` from `@/lib/utils` for className merging. Keep `data-slot="<kebab-name>"` on the root element.
- `"use client"` directive: keep it if the shell had it; add it if you use hooks/state/handlers.

## Imports you may use

- `cn` from `@/lib/utils`
- format helpers from `@/lib/format`: `formatCurrency`, `formatDate`, `formatDateTime`, `formatTime`, `formatNumber`, `formatPercent`, `formatRelativeTime`, `formatFileSize`, `formatDuration`, `formatCompactNumber`, `truncate`, `initials`
- UI primitives from `@/components/ui` (barrel): `Button`, `Card`/`CardContent`/`CardHeader`/`CardTitle`, `Input`, `Textarea`, `Label`, `Badge`, `Checkbox`, `Dialog`/`DialogContent`/`DialogHeader`/`DialogTitle`/`DialogFooter`/`DialogClose`, `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`, `Tooltip`, `Popover`, `ScrollArea`, `Separator`, `Progress`, `Avatar`, `Switch`, `Select`, etc.
- Icons from `@/components/ui/icons` or `@/components/ui` (barrel re-exports icons). Available icon names include: `CheckIcon, XIcon, PlusIcon, MinusIcon, SearchIcon, ChevronRightIcon, ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon, ArrowUpIcon, ArrowDownIcon, ArrowUpRightIcon, ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, ClockIcon, CalendarIcon, BellIcon, FileIcon, FileTextIcon, ImageIcon, DownloadIcon, UploadIcon, TrashIcon, Trash2Icon, EditIcon, PencilIcon, SaveIcon, EyeIcon, CopyIcon, PrinterIcon, RefreshCwIcon, SendIcon, PinIcon, PaperclipIcon, ExternalLinkIcon, MapPinIcon, MapIcon, MoreHorizontalIcon, MoreVerticalIcon, FilterIcon, InfoIcon, AlertTriangleIcon, CheckCircle2Icon, CheckCircleIcon, TrendingUpIcon, TrendingDownIcon, UserIcon, UsersIcon, SettingsIcon, GridIcon, LayoutGridIcon, ListIcon, BarChart3Icon, BarChartIcon, PieChartIcon, LineChartIcon, DonutIcon, FunnelIcon, GanttChartIcon, TargetIcon, GoalIcon, AwardIcon, MedalIcon, TrophyIcon, ActivityIcon, ZapIcon, RocketIcon, ReceiptIcon, CalculatorIcon, WalletIcon, BanknoteIcon, CoinsIcon, PiggyBankIcon, DollarSignIcon, CreditCardIcon, CameraIcon, QrCodeIcon, SignatureIcon, FlagIcon, TagIcon, FolderIcon, FolderOpenIcon, FilePlusIcon, FileEditIcon, PlayIcon, PauseIcon, SquareIcon, CircleIcon, DotIcon, Link2Icon, Share2Icon, BookmarkIcon, PackageIcon, PackageCheckIcon, TruckIcon, ShoppingCartIcon, SmartphoneIcon, BuildingIcon, Building2Icon, FactoryIcon, ClipboardListIcon, ShieldIcon, ShieldCheckIcon, ShieldAlertIcon, LockIcon, MailIcon, StarIcon, SunIcon, MoonIcon, MonitorIcon, LanguagesIcon, LifeBuoyIcon`. If you need an icon not listed, check `lucide-react` — if it exists there, add it to `components/ui/icons.ts` first (append `export const XIcon = Lucide.XIcon;`).
- For charts: **use pure SVG/CSS** (no recharts import) to keep zero runtime cost and avoid peer-dep resolution in tests. See patterns below.

## Chart patterns (pure SVG, no deps)

**Bar list (horizontal bars):**
```tsx
function BarList({ data, className }: BarListProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div data-slot="bar-list" className={cn("flex flex-col gap-2", className)}>
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-sm">
          <span className="w-28 shrink-0 truncate text-muted-foreground">{d.label}</span>
          <div className="h-4 flex-1 overflow-hidden rounded bg-muted">
            <div className="h-full rounded bg-primary" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
          <span className="w-12 shrink-0 text-right tabular-nums">{d.value}</span>
        </div>
      ))}
    </div>
  );
}
```

**Donut (SVG stroke-dasharray):**
```tsx
const total = data.reduce((s, d) => s + d.value, 0) || 1;
let acc = 0;
const r = 40, c = 2 * Math.PI * r;
return (
  <div data-slot="donut-chart" className={cn("flex items-center gap-4", className)}>
    <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
      {data.map((d) => {
        const frac = d.value / total;
        const seg = (
          <circle key={d.label} cx="50" cy="50" r={r} fill="none" stroke={d.color}
            strokeWidth="12" strokeDasharray={`${frac * c} ${c}`} strokeDashoffset={-acc * c} />
        );
        acc += frac; return seg;
      })}
    </svg>
    <ul className="flex flex-col gap-1 text-sm">
      {data.map((d) => (
        <li key={d.label} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
          <span className="text-muted-foreground">{d.label}</span>
          <span className="ml-auto tabular-nums">{d.value}</span>
        </li>
      ))}
    </ul>
  </div>
);
```

For pie/gauge/area/line/radar/funnel/etc., use the same pure-SVG approach. Gauge = semicircle arc. Funnel = stacked trapezoids via CSS widths. Heatmap = CSS grid of colored cells. Gantt = rows of absolutely-positioned bars over a time axis. Map = placeholder grid (no real geo dep — render a styled placeholder with markers as absolutely-positioned dots).

## exactOptionalPropertyTypes gotcha

With `exactOptionalPropertyTypes: true`, you CANNOT pass `undefined` to an optional prop. When forwarding optional props to a child, spread conditionally:
```tsx
<FileCard name={a.name} size={a.size} type={a.type} {...(a.url !== undefined && { url: a.url })} />
```
Or make the child's prop explicitly `field?: string | undefined` is NOT allowed either — instead use conditional spread as above.

## Accessibility (required for GA)

- Interactive elements (button/a) need `type="button"`, keyboard handlers (`onKeyDown` for Enter/Space on non-buttons), and `aria-label` when icon-only.
- Icon-only buttons MUST have `aria-label`.
- Lists: use `<ul>/<ol>/<li>` or `role="list"`.
- Tables: `<table>/<thead>/<tbody>/<th scope="col">/<td>`.
- `role="button"` + `tabIndex={0}` + `onKeyDown` for clickable non-buttons.

## Test pattern (write `<comp>.test.tsx` next to the component)

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FileCard } from "./file-card";

describe("FileCard", () => {
  it("renders file name", () => {
    render(<FileCard name="report.pdf" size={1024} type="application/pdf" />);
    expect(screen.getByText("report.pdf")).toBeDefined();
  });
});
```
For components that need Base UI Root context (Dialog/Popover/Select), test type exports + module import + simple rendering only (jsdom can't always render portals). Prefer props that render visible output so `screen.getByText` works.

## Output format

For each assigned component file, **write the complete file** (overwrite the shell). Keep the same filename. Do NOT touch the barrel (`components/business/index.ts`) — it already exports everything. Do NOT modify other components outside your assigned list.

After implementing all your assigned components, return a JSON summary: `{"implemented":["name1","name2"], "notes":"brief issues"}`. If you intentionally could not implement one, list it under `"skipped"` with a reason.
