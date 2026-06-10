"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const durations = [
  { name: "duration-75", value: "75ms", use: "Micro-interactions" },
  { name: "duration-100", value: "100ms", use: "Button press" },
  { name: "duration-150", value: "150ms", use: "Toggle, checkbox" },
  { name: "duration-200", value: "200ms", use: "Fade in/out" },
  { name: "duration-300", value: "300ms", use: "Slide, expand" },
  { name: "duration-500", value: "500ms", use: "Page transitions" },
];

const easings = [
  { name: "ease-linear", value: "linear", css: "linear" },
  { name: "ease-in", value: "ease-in", css: "cubic-bezier(0.4, 0, 1, 1)" },
  { name: "ease-out", value: "ease-out", css: "cubic-bezier(0, 0, 0.2, 1)" },
  { name: "ease-in-out", value: "ease-in-out", css: "cubic-bezier(0.4, 0, 0.2, 1)" },
];

export default function MotionPage() {
  const [playing, setPlaying] = useState(false);

  const triggerAll = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 600);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Motion</h1>
      <p className="mt-2 text-muted-foreground">
        Animation durations and easing curves. Use motion purposefully to guide attention.
      </p>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Durations</h2>
          <Button size="sm" onClick={triggerAll}>Play All</Button>
        </div>
        <div className="space-y-3">
          {durations.map((d) => (
            <div key={d.name} className="flex items-center gap-4 rounded-lg border p-3">
              <code className="w-24 shrink-0 text-xs text-muted-foreground">{d.name}</code>
              <code className="w-16 shrink-0 text-xs">{d.value}</code>
              <div className="flex-1 overflow-hidden rounded bg-muted">
                <div
                  className={`h-6 rounded bg-brand-500 ${playing ? "translate-x-full" : "translate-x-0"}`}
                  style={{ transitionDuration: d.value, transitionTimingFunction: "ease-out" }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{d.use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Easing Curves</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {easings.map((e) => (
            <div key={e.name} className="rounded-lg border p-4">
              <p className="text-sm font-medium">{e.name}</p>
              <code className="text-xs text-muted-foreground">{e.css}</code>
              <div className="mt-3 h-2 overflow-hidden rounded bg-muted">
                <div
                  className={`h-full w-1/2 rounded bg-brand-500 ${playing ? "translate-x-full" : "translate-x-0"}`}
                  style={{ transitionDuration: "500ms", transitionTimingFunction: e.css }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Guidelines</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-success">Do</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Use ease-out for entering elements</li>
              <li>Use ease-in for exiting elements</li>
              <li>Keep durations under 300ms for UI feedback</li>
              <li>Use prefers-reduced-motion media query</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium text-destructive">Don&apos;t</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Don&apos;t animate layout-triggering properties (width, height)</li>
              <li>Don&apos;t use linear easing for UI elements</li>
              <li>Don&apos;t exceed 500ms for micro-interactions</li>
              <li>Don&apos;t animate without purpose</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
