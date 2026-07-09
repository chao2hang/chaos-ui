"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component GaugeChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 仪表盘图 — semicircle gauge showing value against a range.
 * @param value Current value.
 * @param min Range floor.
 * @param max Range ceiling.
 * @param label Caption below the gauge.
 * @param color Arc color.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <GaugeChart value={72} max={100} label="完成率" />
 * ```
 * 仪表盘图
 */
export interface GaugeChartProps {
  /** Current value. */
  value?: number;
  /** Range floor. */
  min?: number;
  /** Range ceiling. */
  max?: number;
  /** Caption below the gauge. */
  label?: string;
  /** Arc color. */
  color?: string;
  className?: string;
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number,
) {
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function GaugeChart({
  value = 64,
  min = 0,
  max = 100,
  label,
  color = "#3b82f6",
  className,
}: GaugeChartProps) {
  const clamped = Math.min(max, Math.max(min, value));
  const ratio = max === min ? 0 : (clamped - min) / (max - min);
  // semicircle from 180deg (left) to 0deg (right)
  const sweepEnd = 180 - ratio * 180;
  const cx = 50;
  const cy = 50;
  const r = 40;

  return (
    <div
      data-slot="gauge-chart"
      className={cn("flex flex-col items-center", className)}
      role="img"
      aria-label={label ? `${label}: ${value}` : `仪表盘: ${value}`}
    >
      <svg viewBox="0 0 100 56" width="160" role="presentation">
        <path
          d={arcPath(cx, cy, r, 180, 0)}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={10}
          strokeLinecap="round"
          className="text-muted-foreground"
        />
        <path
          d={arcPath(cx, cy, r, 180, sweepEnd)}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-foreground text-sm font-semibold tabular-nums"
        >
          {formatNumber(clamped)}
        </text>
      </svg>
      {label ? (
        <span className="text-muted-foreground mt-1 text-xs">{label}</span>
      ) : null}
    </div>
  );
}

export { GaugeChart };
