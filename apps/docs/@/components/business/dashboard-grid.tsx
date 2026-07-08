"use client";
import { cn } from "@/lib/utils";
import { formatCompactNumber, formatPercent } from "@/lib/format";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@/components/ui";

/**
 * @component DashboardGrid
 * @category Business
 * @since 1.0.0-beta.0
 * @description 预设仪表盘网格布局 — 以响应式网格渲染 KPI 卡片，含标题、数值、趋势与环比。
 * @param title 仪表盘标题
 * @param stats KPI 指标数组，每项含 label/value/delta(可选)/trend(可选 'up'|'down')
 * @param columns 网格列数，默认 4（小屏自适应）
 * @example
 * ```tsx
 * <DashboardGrid
 *   title="经营概览"
 *   stats={[
 *     { label: "营收", value: 1280000, delta: 0.12 },
 *     { label: "成本", value: 420000, delta: -0.05 },
 *   ]}
 * />
 * ```
 */
interface DashboardGridProps {
  /** 仪表盘标题 */
  title?: string;
  /** KPI 指标数组 */
  stats?: Array<{
    label: string;
    value: number;
    /** 环比变化，正数增长负数下降 */
    delta?: number;
    /** 显式趋势方向，省略时按 delta 推断 */
    trend?: "up" | "down";
  }>;
  /** 网格列数 */
  columns?: 1 | 2 | 3 | 4 | 6;
  className?: string;
}

const COLS_CLASS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  6: "sm:grid-cols-3 lg:grid-cols-6",
};

function DashboardGrid({
  title = "仪表盘",
  stats = [],
  columns = 4,
  className,
}: DashboardGridProps) {
  return (
    <div
      data-slot="dashboard-grid"
      className={cn("flex flex-col gap-4", className)}
      role="region"
      aria-label={title}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground">{stats.length} 项指标</span>
      </div>
      <div className={cn("grid grid-cols-1 gap-4", COLS_CLASS[columns] ?? COLS_CLASS[4])}>
        {stats.map((s) => {
          const isUp = s.trend ? s.trend === "up" : (s.delta ?? 0) >= 0;
          const TrendIcon = isUp ? TrendingUpIcon : TrendingDownIcon;
          const DeltaIcon = isUp ? ArrowUpRightIcon : ArrowDownRightIcon;
          return (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-lg border bg-card p-4"
            >
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <span className="text-2xl font-semibold tabular-nums">
                {formatCompactNumber(s.value)}
              </span>
              {s.delta !== undefined && (
                <span
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    isUp ? "text-emerald-600" : "text-destructive",
                  )}
                >
                  <DeltaIcon className="size-3" />
                  {formatPercent(s.delta)}
                  <TrendIcon className="size-3 opacity-70" />
                </span>
              )}
            </div>
          );
        })}
      </div>
      {stats.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">暂无指标数据</p>
      )}
    </div>
  );
}

export { DashboardGrid };
export type { DashboardGridProps };
