const shadows = [
  { name: "shadow-xs", className: "shadow-xs", description: "Subtle elevation for badges, chips" },
  { name: "shadow-sm", className: "shadow-sm", description: "Default card shadow" },
  { name: "shadow-md", className: "shadow-md", description: "Elevated cards, popovers" },
  { name: "shadow-lg", className: "shadow-lg", description: "Dropdowns, modals" },
  { name: "shadow-xl", className: "shadow-xl", description: "Dialogs, floating panels" },
  { name: "shadow-2xl", className: "shadow-2xl", description: "Maximum elevation" },
];

export default function ShadowPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Shadows</h1>
      <p className="mt-2 text-muted-foreground">
        Elevation system using CSS custom property shadows. Automatically adjusts for dark mode.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Shadow Scale</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shadows.map((s) => (
            <div key={s.name} className="rounded-lg border bg-card p-6" style={{ boxShadow: `var(--${s.name})` }}>
              <p className="text-sm font-medium">{s.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Layered Elevation</h2>
        <div className="relative h-64 rounded-lg border bg-surface p-8">
          <div className="absolute left-4 top-4 h-32 w-48 rounded-lg bg-card p-4 shadow-sm">
            <p className="text-xs font-medium">Layer 1 (shadow-sm)</p>
          </div>
          <div className="absolute left-16 top-12 h-32 w-48 rounded-lg bg-card p-4 shadow-md">
            <p className="text-xs font-medium">Layer 2 (shadow-md)</p>
          </div>
          <div className="absolute left-28 top-20 h-32 w-48 rounded-lg bg-card p-4 shadow-lg">
            <p className="text-xs font-medium">Layer 3 (shadow-lg)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
