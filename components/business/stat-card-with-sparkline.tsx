import { cn } from "@/lib/utils";
import { formatNumber, formatPercent } from "@/lib/format";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  type LucideIcon,
} from "@/components/ui";

/**
 * @component StatCardWithSparkline
 * @category business/charts
 * @since 0.7.0
 * @description 带迷你图统计卡片 — KPI card with a sparkline trend line.
 * @param label KPI caption.
 * @param value KPI value (number or pre-formatted string).
 * @param trend Trend percentage (positive/negative).
 * @param sparklineData Numeric series for the sparkline.
 * @param className Extra classes on the root.
 * @example
 * <StatCardWithSparkline label="日活" value="12,480" trend={8} sparklineData={[5,8,6,10]} />
 */

interface StatCardWithSparklineProps {
  label: string;
  value: string | number;
  trend?: number;
  sparklineData?: number[];
  className?: string;
}

function StatCardWithSparkline({
  label,
  value,
  trend,
  sparklineData = [],
  className,
}: StatCardWithSparklineProps) {
  const hasTrend = trend !== undefined;
  const positive = (trend ?? 0) >= 0;
  const TrendIcon: LucideIcon | null = hasTrend
    ? positive
      ? TrendingUpIcon
      : TrendingDownIcon
    : null;

  const data =
    sparklineData.length > 0 ? sparklineData : [4, 8, 6, 10, 7, 12];
  const w = 120;
  const h = 36;
  const max = Math.max(1, ...data);
  const min = Math.min(0, ...data);
  const range = max - min || 1;
  const stepX = w / Math.max(1, data.length - 1);
  const yAt = (v: number) => h - ((v - min) / range) * h;
  const pts = data.map((v, i) => `${i * stepX},${yAt(v)}`).join(" L ");
  const linePath = `M ${pts}`;
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;
  const color = positive ? "#10b981" : "#ef4444";

  const display = typeof value === "number" ? formatNumber(value) : value;

  return (
    <div
      data-slot="stat-card-with-sparkline"
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-card p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-xl font-semibold tabular-nums">
            {display}
          </p>
        </div>
        {hasTrend && TrendIcon ? (
          <span
            className={cn(
              "flex shrink-0 items-center gap-0.5 text-xs font-medium tabular-nums",
              positive ? "text-emerald-600" : "text-red-600",
            )}
            aria-label={`趋势 ${positive ? "上升" : "下降"} ${Math.abs(trend as number)}%`}
          >
            <TrendIcon className="size-3.5" aria-hidden="true" />
            {formatPercent(Math.abs(trend as number) / 100)}
          </span>
        ) : null}
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height={h}
        preserveAspectRatio="none"
        role="img"
        aria-label={`趋势线，${data.length} 点`}
        className="text-primary"
      >
        <path d={areaPath} fill={color} fillOpacity={0.15} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export { StatCardWithSparkline };
export type { StatCardWithSparklineProps };
