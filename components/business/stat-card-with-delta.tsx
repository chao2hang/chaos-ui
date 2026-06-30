"use client";
import { cn } from "@/lib/utils";
import { formatNumber, formatPercent } from "@/lib/format";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  type LucideIcon,
} from "@/components/ui";

/**
 * @component StatCardWithDelta
 * @category Business
 * @since 1.0.0-beta.0
 * @description 统计卡 + 增减标签 — KPI card with value and trend delta.
 * @param label KPI caption.
 * @param value KPI value (number or pre-formatted string).
 * @param delta Trend percentage (positive/negative).
 * @param icon Optional leading icon.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <StatCardWithDelta label="月营收" value={1280000} delta={12.5} />
 * ```
 * 统计卡 + 增减标签
 */
export interface StatCardWithDeltaProps {
  /** KPI caption. */
  label?: string;
  /** KPI value. */
  value?: string | number;
  /** Trend percentage. */
  delta?: number;
  /** Leading icon component. */
  icon?: LucideIcon;
  className?: string;
}

function StatCardWithDelta({
  label = "指标",
  value = 0,
  delta = 0,
  icon: Icon,
  className,
}: StatCardWithDeltaProps) {
  const positive = delta >= 0;
  const display =
    typeof value === "number" ? formatNumber(value) : value;
  const TrendIcon = positive ? ArrowUpRightIcon : ArrowDownRightIcon;

  return (
    <div
      data-slot="stat-card-with-delta"
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card p-4",
        className,
      )}
    >
      {Icon ? (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-xl font-semibold tabular-nums">{display}</p>
      </div>
      <span
        className={cn(
          "flex shrink-0 items-center gap-0.5 text-xs font-medium tabular-nums",
          positive ? "text-emerald-600" : "text-red-600",
        )}
        aria-label={`趋势 ${positive ? "上升" : "下降"} ${Math.abs(delta)}%`}
      >
        <TrendIcon className="size-3.5" aria-hidden="true" />
        {formatPercent(Math.abs(delta) / 100)}
      </span>
    </div>
  );
}

export { StatCardWithDelta };
