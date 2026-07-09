"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { TrendingUpIcon, TrendingDownIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A single stat/metric item.
 */
interface StatItem {
  /** Stat title / 指标标题 */
  title: string;
  /** Stat value / 指标值 */
  value: string | number;
  /** Optional unit / 可选单位 */
  unit?: string;
  /** Optional trend value (e.g. "12.5%") / 可选趋势值 */
  trend?: string;
  /** Trend direction / 趋势方向 */
  trendDirection?: "up" | "down";
  /** Optional icon / 可选图标 */
  icon?: React.ReactNode;
}

/**
 * Props for the StatGrid component.
 */
interface StatGridProps {
  /** Stat items to display / 统计项列表 */
  items: StatItem[];
  /** Number of columns (default: 4) / 列数 */
  columns?: number;
  /** Gap between cells (default: 4) / 单元格间距 */
  gap?: number;
  /** Additional className / 额外类名 */
  className?: string;
  /** Custom render function for each item / 自定义渲染函数 */
  renderItem?: (item: StatItem, index: number) => React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  StatGrid - main export                                             */
/* ------------------------------------------------------------------ */

/**
 * @component StatGrid
 * @category ui/data-visualization
 * @since 0.2.0
 * @description Responsive metric/stat grid with auto-layout. Each cell
 *   displays a card with title, large value, optional trend indicator
 *   with arrow. Responsive: 1 col mobile, 2 col sm, 3 col md, 4 col lg. /
 *   响应式指标/统计网格，自动布局。每个单元格显示带标题、大字号值和可选
 *   趋势指示器的卡片。响应式：手机 1 列，sm 2 列，md 3 列，lg 4 列。
 * @keywords stat, grid, metric, kpi, dashboard, trend, card, responsive
 * @example
 * ```tsx
 * <StatGrid
 *   items={[
 *     { title: "Revenue", value: "$12,345", trend: "12%", trendDirection: "up" },
 *     { title: "Users", value: 1234, trend: "3%", trendDirection: "down" },
 *   ]}
 * />
 * ```
 */
function StatGrid({
  items = [],
  columns = 4,
  gap = 4,
  className,
  renderItem,
}: StatGridProps) {
  const gridCols = cn(
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    columns === 1 && "lg:grid-cols-1",
    columns === 2 && "lg:grid-cols-2",
    columns === 3 && "lg:grid-cols-3",
    columns === 4 && "lg:grid-cols-4",
    columns === 5 && "lg:grid-cols-5",
    columns === 6 && "lg:grid-cols-6",
  );

  const gapClass = cn(
    gap === 1 && "gap-1",
    gap === 2 && "gap-2",
    gap === 3 && "gap-3",
    gap === 4 && "gap-4",
    gap === 5 && "gap-5",
    gap === 6 && "gap-6",
  );

  const renderDefaultItem = (item: StatItem) => (
    <div
      data-slot="stat-grid-item"
      className="bg-card text-card-foreground flex flex-col gap-2 rounded-xl border p-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">
          {item.title}
        </span>
        {item.icon && (
          <span className="text-muted-foreground">{item.icon}</span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-2xl font-semibold tabular-nums">
          {item.value}
        </span>
        {item.unit && (
          <span className="text-muted-foreground text-sm">{item.unit}</span>
        )}
      </div>
      {item.trend && (
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            item.trendDirection === "up"
              ? "text-green-600"
              : item.trendDirection === "down"
                ? "text-red-600"
                : "text-muted-foreground",
          )}
        >
          {item.trendDirection === "up" ? (
            <TrendingUpIcon className="size-3.5" />
          ) : item.trendDirection === "down" ? (
            <TrendingDownIcon className="size-3.5" />
          ) : null}
          <span>{item.trend}</span>
        </div>
      )}
    </div>
  );

  return (
    <div data-slot="stat-grid" className={cn(gridCols, gapClass, className)}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {renderItem ? renderItem(item, idx) : renderDefaultItem(item)}
        </React.Fragment>
      ))}
    </div>
  );
}

export { StatGrid };
export type { StatItem, StatGridProps };
