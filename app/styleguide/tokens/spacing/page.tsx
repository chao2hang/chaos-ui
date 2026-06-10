const spacingScale = [
  { name: "0", value: "0px", px: 0 },
  { name: "0.5", value: "0.125rem", px: 2 },
  { name: "1", value: "0.25rem", px: 4 },
  { name: "1.5", value: "0.375rem", px: 6 },
  { name: "2", value: "0.5rem", px: 8 },
  { name: "2.5", value: "0.625rem", px: 10 },
  { name: "3", value: "0.75rem", px: 12 },
  { name: "3.5", value: "0.875rem", px: 14 },
  { name: "4", value: "1rem", px: 16 },
  { name: "5", value: "1.25rem", px: 20 },
  { name: "6", value: "1.5rem", px: 24 },
  { name: "7", value: "1.75rem", px: 28 },
  { name: "8", value: "2rem", px: 32 },
  { name: "9", value: "2.25rem", px: 36 },
  { name: "10", value: "2.5rem", px: 40 },
  { name: "12", value: "3rem", px: 48 },
  { name: "14", value: "3.5rem", px: 56 },
  { name: "16", value: "4rem", px: 64 },
  { name: "20", value: "5rem", px: 80 },
  { name: "24", value: "6rem", px: 96 },
];

export default function SpacingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Spacing</h1>
      <p className="mt-2 text-muted-foreground">
        Spacing scale based on Tailwind CSS 4px grid. Used for padding, margin, and gaps.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Spacing Scale</h2>
        <div className="space-y-2">
          {spacingScale.map((s) => (
            <div key={s.name} className="flex items-center gap-4 rounded-lg border p-2">
              <code className="w-12 shrink-0 text-xs text-muted-foreground">{s.name}</code>
              <code className="w-20 shrink-0 text-xs">{s.value}</code>
              <code className="w-12 shrink-0 text-xs text-muted-foreground">{s.px}px</code>
              <div className="flex-1">
                <div
                  className="h-4 rounded bg-brand-500"
                  style={{ width: `${Math.min(s.px * 2, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Common Patterns</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">Card padding</p>
            <code className="text-xs text-muted-foreground">p-6 (24px)</code>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">Section gap</p>
            <code className="text-xs text-muted-foreground">gap-4 (16px)</code>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">Inline spacing</p>
            <code className="text-xs text-muted-foreground">gap-2 (8px)</code>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium">Page padding</p>
            <code className="text-xs text-muted-foreground">p-8 (32px)</code>
          </div>
        </div>
      </section>
    </div>
  );
}
