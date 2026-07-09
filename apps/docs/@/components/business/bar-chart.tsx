"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component BarChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 柱状图(分组/堆叠/横向) — pure SVG.
 * @param data Bar segments with label, value and optional color.
 * @param orientation `vertical` (default) or `horizontal` bars.
 * @param height SVG height in px (vertical) or width basis (horizontal).
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

function BarChart({
  data = DEFAULT_BAR_DATA,
  orientation = "vertical",
  height = 200,
  className,
}: BarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

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
  const width = data.length * (barW + gap) + gap;

  return (
    <div
      data-slot="bar-chart"
      className={cn("text-primary w-full", className)}
      role="img"
      aria-label={`柱状图，共 ${data.length} 项，最大值 ${max}`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        {data.map((d, i) => {
          const h = (d.value / max) * (height - 24);
          const x = gap + i * (barW + gap);
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={height - 16 - h}
                width={barW}
                height={h}
                rx={4}
                fill={d.color ?? PALETTE[i % PALETTE.length]}
              >
                <title>
                  {d.label}: {formatNumber(d.value)}
                </title>
              </rect>
              <text
                x={x + barW / 2}
                y={height - 4}
                textAnchor="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export { BarChart };
