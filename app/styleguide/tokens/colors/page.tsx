const brandColors = [
  { name: "brand-50", value: "var(--brand-50)", hex: "oklch(0.97 0.01 250)" },
  { name: "brand-100", value: "var(--brand-100)", hex: "oklch(0.93 0.02 250)" },
  { name: "brand-200", value: "var(--brand-200)", hex: "oklch(0.87 0.04 250)" },
  { name: "brand-300", value: "var(--brand-300)", hex: "oklch(0.77 0.07 250)" },
  { name: "brand-400", value: "var(--brand-400)", hex: "oklch(0.65 0.12 250)" },
  { name: "brand-500", value: "var(--brand-500)", hex: "oklch(0.55 0.16 250)" },
  { name: "brand-600", value: "var(--brand-600)", hex: "oklch(0.47 0.18 250)" },
  { name: "brand-700", value: "var(--brand-700)", hex: "oklch(0.40 0.16 250)" },
  { name: "brand-800", value: "var(--brand-800)", hex: "oklch(0.33 0.12 250)" },
  { name: "brand-900", value: "var(--brand-900)", hex: "oklch(0.26 0.08 250)" },
  { name: "brand-950", value: "var(--brand-950)", hex: "oklch(0.18 0.05 250)" },
];

const semanticColors = [
  { name: "primary", bg: "bg-primary", fg: "text-primary-foreground" },
  { name: "secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
  { name: "accent", bg: "bg-accent", fg: "text-accent-foreground" },
  { name: "muted", bg: "bg-muted", fg: "text-muted-foreground" },
  { name: "destructive", bg: "bg-destructive", fg: "text-destructive-foreground" },
  { name: "success", bg: "bg-success", fg: "text-success-foreground" },
  { name: "warning", bg: "bg-warning", fg: "text-warning-foreground" },
  { name: "info", bg: "bg-info", fg: "text-info-foreground" },
];

const neutralColors = [
  { name: "background", className: "bg-background" },
  { name: "foreground", className: "bg-foreground" },
  { name: "card", className: "bg-card" },
  { name: "popover", className: "bg-popover" },
  { name: "border", className: "bg-border" },
  { name: "input", className: "bg-input" },
  { name: "ring", className: "bg-ring" },
  { name: "surface", className: "bg-surface" },
];

export default function ColorsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
      <p className="mt-2 text-muted-foreground">
        Brand, semantic, and neutral color palettes. All colors use CSS custom properties for dark mode support.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Brand Palette</h2>
        <div className="grid grid-cols-11 gap-2">
          {brandColors.map((c) => (
            <div key={c.name} className="text-center">
              <div
                className="h-16 rounded-lg border"
                style={{ backgroundColor: c.value }}
              />
              <p className="mt-1 text-xs font-medium">{c.name.replace("brand-", "")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Semantic Colors</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {semanticColors.map((c) => (
            <div key={c.name} className="flex items-center gap-3 rounded-lg border p-3">
              <div className={`h-10 w-10 rounded-md ${c.bg}`} />
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  bg-{c.name} / text-{c.name}-foreground
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Neutral / Surface Colors</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {neutralColors.map((c) => (
            <div key={c.name} className="text-center">
              <div className={`h-12 rounded-lg border ${c.className}`} />
              <p className="mt-1 text-xs font-medium">{c.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
