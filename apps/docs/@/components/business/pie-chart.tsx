"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component PieChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 饼图 — pure SVG pie slices with legend.
 * @param data Slices with label/value/optional color.
 * @param size Pie pixel size.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <PieChart data={[{label:"A",value:60,color:"#3b82f6"}]} />
 * ```
 * 饼图
 */
export interface PieChartProps {
  /** Slices to render. */
  data?: Array<{ label: string; value: number; color?: string }>;
  /** Pie pixel size. */
  size?: number;
  className?: string;
}

const PIE_PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function PieChart({
  data = [
    { label: "线上", value: 58 },
    { label: "线下", value: 32 },
    { label: "其他", value: 10 },
  ],
  size = 128,
  className,
}: PieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const cx = 50;
  const cy = 50;
  const r = 46;
  let angle = -90; // start at top

  const slices = data.map((d, i) => {
    const frac = d.value / total;
    const sweep = frac * 360;
    const start = angle;
    const end = angle + sweep;
    const large = sweep > 180 ? 1 : 0;
    const s = polar(cx, cy, r, start);
    const e = polar(cx, cy, r, end);
    const path =
      frac >= 1
        ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
        : `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
    angle = end;
    return {
      ...d,
      path,
      color: d.color ?? PIE_PALETTE[i % PIE_PALETTE.length],
    };
  });

  return (
    <div
      data-slot="pie-chart"
      className={cn("flex flex-wrap items-center gap-4", className)}
      role="img"
      aria-label={`饼图，共 ${data.length} 块，总计 ${total}`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} role="presentation">
        {slices.map((sl) => (
          <path key={sl.label} d={sl.path} fill={sl.color}>
            <title>
              {sl.label}: {formatNumber(sl.value)}
            </title>
          </path>
        ))}
      </svg>
      <ul className="flex flex-col gap-1.5 text-sm" role="list">
        {slices.map((sl) => (
          <li key={sl.label} className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: sl.color }}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{sl.label}</span>
            <span className="ml-auto tabular-nums">
              {formatNumber(sl.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { PieChart };
