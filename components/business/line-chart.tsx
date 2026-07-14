"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { indexFromClientX } from "./chart-hover";

/**
 * @component LineChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 折线图(多线+标注) — pure SVG multi-series line chart.
 * Measures container width for accurate hover hit testing (issue #22).
 * @param series One or more named series of values.
 * @param labels X-axis labels aligned to series values.
 * @param height SVG height in px.
 * @param showTooltip Whether to show hover tooltip + crosshair (default true).
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <LineChart series={[{name:"A",values:[10,40,30]}]} labels={["Q1","Q2","Q3"]} />
 * ```
 * 折线图(多线+标注)
 */
export interface LineChartProps {
  /** One or more named series. */
  series?: Array<{ name: string; values: number[]; color?: string }>;
  /** X-axis labels aligned 1:1 with each series values. */
  labels?: string[];
  /** SVG height in px. */
  height?: number;
  /**
   * Show hover tooltip + vertical crosshair aligned to x index (issue #22).
   * Default true.
   */
  showTooltip?: boolean;
  className?: string;
}

const LINE_PALETTE = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
const FALLBACK_CHART_WIDTH = 320;
const MIN_CHART_WIDTH = 200;

function LineChart({
  series = [{ name: "营收", values: [20, 35, 28, 50, 44] }],
  labels = ["Q1", "Q2", "Q3", "Q4", "Q5"],
  height = 180,
  showTooltip = true,
  className,
}: LineChartProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const plotRef = React.useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = React.useState(FALLBACK_CHART_WIDTH);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const pad = 8;

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const apply = (width: number) => {
      const next = Math.max(MIN_CHART_WIDTH, Math.round(width));
      setChartWidth((prev) => (prev === next ? prev : next));
    };

    apply(el.getBoundingClientRect().width || FALLBACK_CHART_WIDTH);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      apply(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const allValues = series.flatMap((s) => s.values);
  const max = Math.max(1, ...allValues);
  const min = Math.min(0, ...allValues);
  const range = max - min || 1;
  const len = Math.max(1, ...series.map((s) => s.values.length));
  const stepX = (chartWidth - pad * 2) / Math.max(1, len - 1);
  const yAt = (v: number) => pad + (1 - (v - min) / range) * (height - pad * 2);

  const resolvedSeries = series.map((s, si) => ({
    ...s,
    resolvedColor: s.color ?? LINE_PALETTE[si % LINE_PALETTE.length]!,
  }));

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!showTooltip) return;
    const plot = plotRef.current;
    if (!plot) return;
    const rect = plot.getBoundingClientRect();
    const next = indexFromClientX(
      e.clientX,
      rect.left,
      rect.width,
      pad,
      chartWidth,
      len,
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  };

  const handlePointerLeave = () => setActiveIndex(null);

  const activeX = activeIndex != null ? pad + activeIndex * stepX : null;
  const activeLabel =
    activeIndex != null ? (labels[activeIndex] ?? String(activeIndex)) : null;
  const tooltipLeftPct =
    activeX != null
      ? Math.min(88, Math.max(4, (activeX / chartWidth) * 100 + 4))
      : 0;

  return (
    <div
      ref={rootRef}
      data-slot="line-chart"
      className={cn("w-full", className)}
      role="img"
      aria-label={`折线图，${series.length} 条线，${len} 个数据点`}
    >
      <div
        ref={plotRef}
        data-slot="line-chart-plot"
        className="relative w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerMove}
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="none"
          role="presentation"
        >
          {resolvedSeries.map((s) => {
            const pts = s.values.map((v, i) => `${pad + i * stepX},${yAt(v)}`);
            const d = `M ${pts.join(" L ")}`;
            return (
              <g key={s.name}>
                <path
                  d={d}
                  fill="none"
                  stroke={s.resolvedColor}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {s.values.map((v, i) => {
                  const active = showTooltip && activeIndex === i;
                  return (
                    <circle
                      key={i}
                      cx={pad + i * stepX}
                      cy={yAt(v)}
                      r={active ? 4 : 2.5}
                      fill={s.resolvedColor}
                      stroke={active ? "var(--background, #fff)" : undefined}
                      strokeWidth={active ? 1.5 : undefined}
                      vectorEffect="non-scaling-stroke"
                    >
                      {!showTooltip ? (
                        <title>
                          {s.name} {labels[i] ?? i}: {formatNumber(v)}
                        </title>
                      ) : null}
                    </circle>
                  );
                })}
              </g>
            );
          })}
          {showTooltip && activeX != null && (
            <line
              data-slot="line-chart-crosshair"
              x1={activeX}
              x2={activeX}
              y1={pad}
              y2={height - pad}
              stroke="currentColor"
              strokeOpacity={0.28}
              strokeWidth={1}
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              pointerEvents="none"
            />
          )}
        </svg>
        {showTooltip && activeIndex != null && activeLabel != null && (
          <div
            data-slot="line-chart-tooltip"
            className="border-border bg-popover text-popover-foreground pointer-events-none absolute top-2 z-10 min-w-[7.5rem] rounded-md border px-2 py-1.5 text-[11px] shadow-md"
            style={{ left: `${tooltipLeftPct}%` }}
            aria-hidden="true"
          >
            <div className="text-muted-foreground mb-1 font-medium">
              {activeLabel}
            </div>
            <ul className="space-y-0.5">
              {resolvedSeries.map((s) => {
                const v = s.values[activeIndex];
                if (v === undefined) return null;
                return (
                  <li key={s.name} className="flex items-center gap-1.5">
                    <span
                      className="inline-block size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: s.resolvedColor }}
                    />
                    <span className="text-muted-foreground flex-1 truncate">
                      {s.name}
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatNumber(v)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <ul className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[10px]">
        <li className="flex gap-3" role="list">
          {resolvedSeries.map((s) => (
            <span key={s.name} className="flex items-center gap-1">
              <span
                className="inline-block size-2 rounded-sm"
                style={{ backgroundColor: s.resolvedColor }}
                aria-hidden="true"
              />
              {s.name}
            </span>
          ))}
        </li>
        <li
          className="text-muted-foreground flex justify-between"
          role="list"
          style={{ flex: 1 }}
        >
          {labels.slice(0, len).map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </li>
      </ul>
    </div>
  );
}

export { LineChart };
