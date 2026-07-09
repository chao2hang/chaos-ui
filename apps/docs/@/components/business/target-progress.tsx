"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";
import {
  TargetIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { formatNumber, formatPercent } from "@chaos_team/chaos-ui/lib";

/**
 * @component TargetProgress
 * @category business/finance
 * @since 0.7.0
 * @description 目标进度。展示目标值、实际完成值、完成率与达成进度条，并指示是否超额 / 落后。
 * @param target 目标值
 * @param actual 实际完成值
 * @param period 统计周期描述（如 6 月）
 * @example
 * <TargetProgress target={100000} actual={78000} period="2026 年 6 月" />
 */

interface TargetProgressProps {
  target: number;
  actual: number;
  period?: string;
  className?: string;
}

function TargetProgress({
  target,
  actual,
  period,
  className,
}: TargetProgressProps) {
  const rate = target > 0 ? actual / target : 0;
  const displayRate = Math.min(1, rate);
  const isOver = actual >= target && target > 0;
  const trend = isOver ? "up" : "down";

  return (
    <Card data-slot="target-progress" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TargetIcon className="text-primary size-4" />
            目标进度
          </span>
          {period && (
            <span className="text-muted-foreground text-xs font-normal">
              {period}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-muted-foreground text-xs">实际 / 目标</p>
            <p className="text-2xl font-semibold tabular-nums">
              {formatNumber(actual)}
              <span className="text-muted-foreground ml-1 text-sm font-normal">
                / {formatNumber(target)}
              </span>
            </p>
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
              isOver
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
            )}
          >
            {trend === "up" ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {formatPercent(rate)}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div
            className="bg-muted h-2 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={Math.round(displayRate * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="目标完成率"
          >
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isOver ? "bg-emerald-500" : "bg-primary",
              )}
              style={{ width: `${displayRate * 100}%` }}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            {isOver
              ? "已达成目标"
              : `还差 ${formatNumber(Math.max(0, target - actual))} 达成目标`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { TargetProgress };
export type { TargetProgressProps };
