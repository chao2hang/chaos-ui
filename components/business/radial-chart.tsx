"use client";
import { cn } from "@/lib/utils";
import { formatNumber, formatPercent } from "@/lib/format";

/**
 * @component RadialChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 径向图(达成率) — circular progress ring showing a percentage.
 * @param value Current value.
 * @param max Ceiling (default 100).
 * @param label Caption below the ring.
 * @param color Ring color.
 * @param size Pixel size.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <RadialChart value={78} label="达成率" />
 * ```
 * 径向图(达成率)
 */
export interface RadialChartProps {
  /** Current value. */
  value?: number;
  /** Ceiling. */
  max?: number;
  /** Caption below the ring. */
  label?: string;
  /** Ring color. */
  color?: string;
  /** Pixel size. */
  size?: number;
  className?: string;
}

function RadialChart({
  value = 66,
  max = 100,
  label = "达成率",
  color = "#3b82f6",
  size = 120,
  className,
}: RadialChartProps) {
  const ratio = Math.min(1, Math.max(0, value / max));
  const r = 42;
  const c = 2 * Math.PI * r;
  const center = 50;

  return (
    <div
      data-slot="radial-chart"
      className={cn("flex flex-col items-center", className)}
      role="img"
      aria-label={`${label}: ${formatNumber(value)} / ${formatNumber(max)}`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="-rotate-90" width={size} height={size} role="presentation">
          <circle
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth={8}
            className="text-muted-foreground"
          />
          <circle
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${ratio * c} ${c}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold tabular-nums">
            {formatPercent(ratio)}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {formatNumber(value)}/{formatNumber(max)}
          </span>
        </div>
      </div>
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export { RadialChart };
