const radiusScale = [
  { name: "radius-sm", variable: "var(--radius-sm)", description: "calc(radius * 0.6)" },
  { name: "radius-md", variable: "var(--radius-md)", description: "calc(radius * 0.8)" },
  { name: "radius-lg", variable: "var(--radius-lg)", description: "radius (0.625rem)" },
  { name: "radius-xl", variable: "var(--radius-xl)", description: "calc(radius * 1.4)" },
  { name: "radius-2xl", variable: "var(--radius-2xl)", description: "calc(radius * 1.8)" },
  { name: "radius-3xl", variable: "var(--radius-3xl)", description: "calc(radius * 2.2)" },
  { name: "radius-4xl", variable: "var(--radius-4xl)", description: "calc(radius * 2.6)" },
  { name: "rounded-full", variable: "9999px", description: "Full round" },
];

export default function RadiusPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Border Radius</h1>
      <p className="mt-2 text-muted-foreground">
        Border radius tokens for consistent rounded corners. Base radius: 0.625rem (10px).
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Radius Scale</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {radiusScale.map((r) => (
            <div key={r.name} className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center border-2 border-brand-500 bg-brand-50"
                style={{ borderRadius: r.variable }}>
                <span className="text-xs text-muted-foreground">Aa</span>
              </div>
              <p className="mt-2 text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Usage Examples</h2>
        <div className="flex flex-wrap gap-4">
          <div className="rounded-sm border bg-card p-4 shadow-xs">
            <p className="text-sm">rounded-sm (button)</p>
          </div>
          <div className="rounded-md border bg-card p-4 shadow-xs">
            <p className="text-sm">rounded-md (input)</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-xs">
            <p className="text-sm">rounded-lg (card)</p>
          </div>
          <div className="rounded-xl border bg-card p-4 shadow-xs">
            <p className="text-sm">rounded-xl (dialog)</p>
          </div>
          <div className="rounded-full border bg-card px-6 py-2 shadow-xs">
            <p className="text-sm">rounded-full (pill)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
