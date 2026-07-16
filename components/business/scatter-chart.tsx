"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * @component ScatterChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 散点图 — pure SVG scatter plot of (x,y) points.
 * Container width is measured (ResizeObserver) so wide cards do not pin
 * viewBox to 320 (#13/#40 sibling of AreaChart/LineChart).
 * @param data Points with x/y and optional label.
 * @param xLabel X-axis caption.
 * @param yLabel Y-axis caption.
 * @param height SVG height in px.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <ScatterChart data={[{x:10,y:20,label:"A"}]} />
 * ```
 * 散点图
 */
export interface ScatterChartProps {
  /** Points to plot. */
  data?: Array<{ x: number; y: number; label?: string; color?: string }>;
  /** X-axis caption. */
  xLabel?: string;
  /** Y-axis caption. */
  yLabel?: string;
  /** SVG height in px. */
  height?: number;
  className?: string;
}

const SCATTER_PALETTE = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
const FALLBACK_CHART_WIDTH = 320;
const MIN_CHART_WIDTH = 120;

function ScatterChart({
  data = [
    { x: 10, y: 20 },
    { x: 30, y: 50 },
    { x: 50, y: 35 },
    { x: 70, y: 70 },
    { x: 90, y: 55 },
  ],
  xLabel = "X",
  yLabel = "Y",
  height = 200,
  className,
}: ScatterChartProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = React.useState(FALLBACK_CHART_WIDTH);
  const pad = 28;
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const xMax = Math.max(1, ...xs);
  const xMin = Math.min(0, ...xs);
  const yMax = Math.max(1, ...ys);
  const yMin = Math.min(0, ...ys);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;
  const px = (v: number) =>
    pad + ((v - xMin) / xRange) * (chartWidth - pad * 2);
  const py = (v: number) =>
    height - pad - ((v - yMin) / yRange) * (height - pad * 2);

  // Measure before paint so the first frame is not viewBox=320 stretched on a
  // wide card (issue #40 sibling; same pattern as AreaChart / LineChart).
  React.useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const apply = (width: number) => {
      const next = Math.max(MIN_CHART_WIDTH, Math.round(width));
      setChartWidth((prev) => (prev === next ? prev : next));
    };

    apply(el.getBoundingClientRect().width || FALLBACK_CHART_WIDTH);

    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      apply(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      data-slot="scatter-chart"
      className={cn("w-full", className)}
      role="img"
      aria-label={`散点图，共 ${data.length} 个点`}
    >
      <svg
        viewBox={`0 0 ${chartWidth} ${height}`}
        width="100%"
        height={height}
        role="presentation"
      >
        <line
          x1={pad}
          y1={height - pad}
          x2={chartWidth - pad}
          y2={height - pad}
          className="stroke-muted-foreground/30"
          strokeWidth={0.5}
        />
        <line
          x1={pad}
          y1={pad}
          x2={pad}
          y2={height - pad}
          className="stroke-muted-foreground/30"
          strokeWidth={0.5}
        />
        {data.map((d, i) => (
          <circle
            key={i}
            cx={px(d.x)}
            cy={py(d.y)}
            r={4}
            fill={d.color ?? SCATTER_PALETTE[i % SCATTER_PALETTE.length]}
          >
            <title>
              {d.label ? `${d.label}: ` : ""}({formatNumber(d.x)},{" "}
              {formatNumber(d.y)})
            </title>
          </circle>
        ))}
        <text
          x={chartWidth - pad}
          y={height - pad + 16}
          textAnchor="end"
          className="fill-muted-foreground text-[9px]"
        >
          {xLabel}
        </text>
        <text
          x={pad - 4}
          y={pad}
          textAnchor="end"
          dominantBaseline="hanging"
          className="fill-muted-foreground text-[9px]"
        >
          {yLabel}
        </text>
      </svg>
    </div>
  );
}

export { ScatterChart };
