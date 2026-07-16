"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * @component WaterfallChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 瀑布图(财务分析) — bars showing running total increments/decrements.
 * Container width is measured (ResizeObserver) so wide cards do not pin
 * viewBox to 320 (#13/#40 sibling of AreaChart/LineChart).
 * @param data Steps: label + delta (positive/negative). The first/last may be
 *   absolute totals when `absolute` is true.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <WaterfallChart data={[{label:"期初",value:100},{label:"收入",value:40},{label:"支出",value:-20}]} />
 * ```
 * 瀑布图(财务分析)
 */
export interface WaterfallChartProps {
  /** Steps: label + value (delta, or absolute when `absolute`). */
  data?: Array<{ label: string; value: number; absolute?: boolean }>;
  height?: number;
  className?: string;
}

const FALLBACK_CHART_WIDTH = 320;
const MIN_CHART_WIDTH = 120;

function WaterfallChart({
  data = [
    { label: "期初", value: 100, absolute: true },
    { label: "收入", value: 40 },
    { label: "成本", value: -20 },
    { label: "税费", value: -10 },
    { label: "期末", value: 110, absolute: true },
  ],
  height = 200,
  className,
}: WaterfallChartProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = React.useState(FALLBACK_CHART_WIDTH);
  const pad = 20;

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

  // compute running totals and bounds
  let running = 0;
  const rows = data.map((d) => {
    let start: number;
    let end: number;
    if (d.absolute) {
      start = 0;
      end = d.value;
      running = d.value;
    } else {
      start = running;
      end = running + d.value;
      running = end;
    }
    return { ...d, start, end, delta: end - start };
  });
  const maxVal = Math.max(1, ...rows.map((r) => Math.max(r.start, r.end)));
  const minVal = Math.min(0, ...rows.map((r) => Math.min(r.start, r.end)));
  const range = maxVal - minVal || 1;
  const plotH = height - pad * 2;
  const yAt = (v: number) => pad + (1 - (v - minVal) / range) * plotH;

  // Distribute bars across measured width
  const n = Math.max(1, rows.length);
  const gap = 16;
  const available = Math.max(0, chartWidth - pad * 2 - gap * (n - 1));
  const barW = Math.min(36, Math.max(12, available / n));

  return (
    <div
      ref={rootRef}
      data-slot="waterfall-chart"
      className={cn("w-full", className)}
      role="img"
      aria-label={`瀑布图，共 ${data.length} 步`}
    >
      <svg
        viewBox={`0 0 ${chartWidth} ${height}`}
        width="100%"
        height={height}
        role="presentation"
      >
        <line
          x1={pad}
          y1={yAt(0)}
          x2={chartWidth - pad}
          y2={yAt(0)}
          className="stroke-muted-foreground/30"
          strokeWidth={0.5}
        />
        {rows.map((r, i) => {
          const x = pad + i * (barW + gap);
          const yTop = yAt(Math.max(r.start, r.end));
          const h = Math.max(2, Math.abs(yAt(r.end) - yAt(r.start)));
          const positive = r.delta >= 0;
          const fill = r.absolute
            ? "#64748b"
            : positive
              ? "#10b981"
              : "#ef4444";
          return (
            <g key={r.label}>
              <rect x={x} y={yTop} width={barW} height={h} fill={fill} rx={3}>
                <title>
                  {r.label}:{" "}
                  {r.absolute
                    ? formatNumber(r.value)
                    : `${r.delta >= 0 ? "+" : ""}${formatNumber(r.delta)}`}
                </title>
              </rect>
              {i < rows.length - 1 && !r.absolute ? (
                <line
                  x1={x + barW}
                  y1={yAt(r.end)}
                  x2={x + barW + gap}
                  y2={yAt(r.end)}
                  className="stroke-muted-foreground/40"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                />
              ) : null}
              <text
                x={x + barW / 2}
                y={height - 4}
                textAnchor="middle"
                className="fill-muted-foreground text-[9px]"
              >
                {r.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export { WaterfallChart };
