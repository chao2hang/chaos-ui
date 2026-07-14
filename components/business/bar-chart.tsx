"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { barIndexFromClientX } from "./chart-hover";

/**
 * @component BarChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 柱状图(分组/堆叠/横向) — pure SVG.
 * Vertical orientation supports hover tooltip (issue #22).
 * @param data Bar segments with label, value and optional color.
 * @param orientation `vertical` (default) or `horizontal` bars.
 * @param height SVG height in px (vertical) or width basis (horizontal).
 * @param showTooltip Whether to show hover tooltip for vertical bars (default true).
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <BarChart data={[{label:"Q1",value:30},{label:"Q2",value:60}]} />
 * ```
 * 柱状图(分组/堆叠/横向)
 */
export interface BarChartProps {
  /** Bars to render. */
  data?: Array<{ label: string; value: number; color?: string }>;
  /** Bar orientation. */
  orientation?: "vertical" | "horizontal";
  /** Chart height in px. */
  height?: number;
  /**
   * X-axis label rotation in degrees for vertical charts (CUI-DASH-04).
   * Use e.g. -35 for dense long labels. Default 0.
   */
  xLabelRotate?: number;
  /**
   * Max characters before truncating vertical labels with ellipsis.
   * Set 0/undefined to disable.
   */
  maxLabelLength?: number;
  /**
   * Show hover tooltip for vertical bars (issue #22). Default true.
   * Horizontal bars already print values inline.
   */
  showTooltip?: boolean;
  className?: string;
}

const DEFAULT_BAR_DATA: Array<{
  label: string;
  value: number;
  color?: string;
}> = [
  { label: "一月", value: 38 },
  { label: "二月", value: 52 },
  { label: "三月", value: 41 },
  { label: "四月", value: 67 },
  { label: "五月", value: 55 },
];

const PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

function truncateLabel(label: string, max?: number) {
  if (!max || max <= 0 || label.length <= max) return label;
  return `${label.slice(0, Math.max(1, max - 1))}…`;
}

function BarChart({
  data = DEFAULT_BAR_DATA,
  orientation = "vertical",
  height = 200,
  xLabelRotate = 0,
  maxLabelLength,
  showTooltip = true,
  className,
}: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const plotRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  if (orientation === "horizontal") {
    return (
      <div
        data-slot="bar-chart"
        className={cn("flex flex-col gap-2 text-sm", className)}
        role="img"
        aria-label={`横向柱状图，共 ${data.length} 项`}
      >
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="text-muted-foreground w-16 shrink-0 truncate">
              {d.label}
            </span>
            <div
              className="bg-muted h-5 flex-1 overflow-hidden rounded"
              role="presentation"
            >
              <div
                className="h-full rounded"
                style={{
                  width: `${(d.value / max) * 100}%`,
                  backgroundColor: d.color ?? PALETTE[i % PALETTE.length],
                }}
              >
                <span className="sr-only">{formatNumber(d.value)}</span>
              </div>
            </div>
            <span className="w-12 shrink-0 text-right tabular-nums">
              {formatNumber(d.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const barW = 36;
  const gap = 16;
  const rotate = xLabelRotate ?? 0;
  const labelPad = Math.abs(rotate) > 0 ? 36 : 16;
  const chartHeight = height;
  const width = data.length * (barW + gap) + gap;
  // Auto-rotate dense long labels when consumer didn't set rotation
  const autoRotate =
    rotate === 0 && data.some((d) => d.label.length >= 6) && data.length >= 4
      ? -35
      : rotate;
  const effectiveRotate = autoRotate;
  const bottomPad = Math.abs(effectiveRotate) > 0 ? 40 : labelPad;
  const viewHeight = chartHeight + Math.max(0, bottomPad - 16);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!showTooltip) return;
    const plot = plotRef.current;
    if (!plot) return;
    const rect = plot.getBoundingClientRect();
    const next = barIndexFromClientX(
      e.clientX,
      rect.left,
      rect.width,
      width,
      data.length,
      barW,
      gap,
    );
    setActiveIndex((prev) => (prev === next ? prev : next));
  };

  const handlePointerLeave = () => setActiveIndex(null);

  const active = activeIndex != null ? data[activeIndex] : null;
  const activeColor =
    activeIndex != null
      ? (active?.color ?? PALETTE[activeIndex % PALETTE.length]!)
      : null;
  const activeCenterX =
    activeIndex != null ? gap + activeIndex * (barW + gap) + barW / 2 : null;
  const tooltipLeftPct =
    activeCenterX != null
      ? Math.min(88, Math.max(4, (activeCenterX / width) * 100))
      : 0;

  return (
    <div
      data-slot="bar-chart"
      className={cn("text-primary w-full", className)}
      role="img"
      aria-label={`柱状图，共 ${data.length} 项，最大值 ${max}`}
    >
      <div
        ref={plotRef}
        data-slot="bar-chart-plot"
        className="relative w-full touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerMove}
      >
        <svg
          viewBox={`0 0 ${width} ${viewHeight}`}
          width="100%"
          height={chartHeight}
          preserveAspectRatio="xMidYMid meet"
          role="presentation"
        >
          {data.map((d, i) => {
            const h = (d.value / max) * (chartHeight - 24);
            const x = gap + i * (barW + gap);
            const label = truncateLabel(d.label, maxLabelLength);
            const tx = x + barW / 2;
            const ty = chartHeight - 4;
            const isActive = showTooltip && activeIndex === i;
            const fill = d.color ?? PALETTE[i % PALETTE.length];
            return (
              <g key={`${d.label}-${i}`}>
                <rect
                  x={x}
                  y={chartHeight - 16 - h}
                  width={barW}
                  height={h}
                  rx={4}
                  fill={fill}
                  opacity={
                    showTooltip && activeIndex != null && !isActive ? 0.45 : 1
                  }
                >
                  {!showTooltip ? (
                    <title>
                      {d.label}: {formatNumber(d.value)}
                    </title>
                  ) : null}
                </rect>
                <text
                  x={tx}
                  y={ty}
                  textAnchor={Math.abs(effectiveRotate) > 0 ? "end" : "middle"}
                  transform={
                    Math.abs(effectiveRotate) > 0
                      ? `rotate(${effectiveRotate} ${tx} ${ty})`
                      : undefined
                  }
                  className="fill-muted-foreground text-[10px]"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
        {showTooltip && active && activeColor != null && (
          <div
            data-slot="bar-chart-tooltip"
            className="border-border bg-popover text-popover-foreground pointer-events-none absolute top-2 z-10 min-w-[6.5rem] rounded-md border px-2 py-1.5 text-[11px] shadow-md"
            style={{
              left: `${tooltipLeftPct}%`,
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          >
            <div className="text-muted-foreground mb-1 font-medium">
              {active.label}
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: activeColor }}
              />
              <span className="font-medium tabular-nums">
                {formatNumber(active.value)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { BarChart };
