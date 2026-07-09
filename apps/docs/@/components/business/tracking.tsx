import { cn } from "@chaos_team/chaos-ui/lib";
import {
  TrendingUpIcon,
  TrendingDownIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { formatNumber, formatPercent } from "@chaos_team/chaos-ui/lib";

/**
 * @component Tracking
 * @category business/charts
 * @since 0.7.0
 * @description 追踪组件。以紧凑环形展示实际值相对目标值的达成度，附趋势指示。
 * @param target 目标值
 * @param actual 实际值
 * @param label 追踪项名称
 * @example
 * <Tracking target={100} actual={76} label="回款率" />
 */

interface TrackingProps {
  target: number;
  actual: number;
  label?: string;
  className?: string;
}

function Tracking({
  target,
  actual,
  label = "追踪项",
  className,
}: TrackingProps) {
  const rate = target > 0 ? actual / target : 0;
  const displayRate = Math.min(1, rate);
  const isOver = actual >= target && target > 0;

  // Donut (semicircle-free full ring) using stroke-dasharray
  const r = 32;
  const c = 2 * Math.PI * r;
  const dash = displayRate * c;

  return (
    <div
      data-slot="tracking"
      className={cn("inline-flex items-center gap-3", className)}
      role="group"
      aria-label={`${label} 追踪`}
    >
      <svg
        viewBox="0 0 80 80"
        className="size-16 -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          className={isOver ? "text-emerald-500" : "text-primary"}
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className="text-lg font-semibold tabular-nums">
          {formatNumber(actual)}
          <span className="text-muted-foreground ml-1 text-xs font-normal">
            / {formatNumber(target)}
          </span>
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium tabular-nums",
            isOver ? "text-emerald-600" : "text-muted-foreground",
          )}
        >
          {isOver ? <TrendingUpIcon /> : <TrendingDownIcon />}
          {formatPercent(rate)}
        </span>
      </div>
    </div>
  );
}

export { Tracking };
export type { TrackingProps };
