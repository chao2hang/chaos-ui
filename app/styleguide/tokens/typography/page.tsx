const fontSizes = [
  { name: "text-xs", size: "0.75rem", line: "1rem", preview: "Aa" },
  { name: "text-sm", size: "0.875rem", line: "1.25rem", preview: "Aa" },
  { name: "text-base", size: "1rem", line: "1.5rem", preview: "Aa" },
  { name: "text-lg", size: "1.125rem", line: "1.75rem", preview: "Aa" },
  { name: "text-xl", size: "1.25rem", line: "1.75rem", preview: "Aa" },
  { name: "text-2xl", size: "1.5rem", line: "2rem", preview: "Aa" },
  { name: "text-3xl", size: "1.875rem", line: "2.25rem", preview: "Aa" },
  { name: "text-4xl", size: "2.25rem", line: "2.5rem", preview: "Aa" },
];

const fontWeights = [
  { name: "font-light", weight: "300" },
  { name: "font-normal", weight: "400" },
  { name: "font-medium", weight: "500" },
  { name: "font-semibold", weight: "600" },
  { name: "font-bold", weight: "700" },
];

export default function TypographyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Typography</h1>
      <p className="mt-2 text-muted-foreground">
        Font families, sizes, weights, and line heights using Geist Sans and Geist Mono.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Font Families</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Sans (Geist Sans)</p>
            <p className="font-sans text-2xl">The quick brown fox jumps over the lazy dog</p>
            <code className="text-xs text-muted-foreground">font-sans / var(--font-geist-sans)</code>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Mono (Geist Mono)</p>
            <p className="font-mono text-2xl">const x = 42;</p>
            <code className="text-xs text-muted-foreground">font-mono / var(--font-geist-mono)</code>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Type Scale</h2>
        <div className="space-y-3">
          {fontSizes.map((s) => (
            <div key={s.name} className="flex items-baseline gap-4 rounded-lg border p-3">
              <span className="w-20 shrink-0 text-xs text-muted-foreground">{s.name}</span>
              <span className={s.name}>{s.preview}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {s.size} / {s.line}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Font Weights</h2>
        <div className="space-y-2">
          {fontWeights.map((w) => (
            <div key={w.name} className="flex items-center gap-4 rounded-lg border p-3">
              <span className="w-28 shrink-0 text-xs text-muted-foreground">{w.name}</span>
              <span className={`text-xl ${w.name}`}>Aa Bb Cc 123</span>
              <span className="ml-auto text-xs text-muted-foreground">{w.weight}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Heading Examples</h2>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Heading 1 — Page Title</h1>
          <h2 className="text-3xl font-semibold tracking-tight">Heading 2 — Section</h2>
          <h3 className="text-2xl font-semibold">Heading 3 — Subsection</h3>
          <h4 className="text-xl font-medium">Heading 4 — Card Title</h4>
          <h5 className="text-lg font-medium">Heading 5 — Label</h5>
        </div>
      </section>
    </div>
  );
}
