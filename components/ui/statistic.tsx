"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component Statistic
 * @category ui/data-display
 * @since 0.5.0
 * @description Statistic display — number with label, prefix/suffix, and trend.
 * / 统计数值组件，仪表盘场景核心展示单元
 * @keywords statistic, number, metric, kpi, dashboard
 * @example
 * <Statistic title="总收入" value={123456.78} prefix="¥" precision={2} />
 * <Statistic title="转化率" value={85.5} suffix="%" trend={12.3} />
 */

interface StatisticProps {
  /** Title / 标题 */
  title?: React.ReactNode;
  /** Numeric value / 数值 */
  value?: number | string;
  /** Prefix (e.g. currency symbol) / 前缀 */
  prefix?: React.ReactNode;
  /** Suffix (e.g. %) / 后缀 */
  suffix?: React.ReactNode;
  /** Decimal precision / 小数精度 */
  precision?: number;
  /** Thousands separator / 千分位分隔符 */
  groupSeparator?: string;
  /** Trend percentage (positive=up, negative=down) / 趋势百分比 */
  trend?: number;
  /** Trend color mode / 趋势颜色模式 */
  trendMode?: "default" | "invert";
  /** Value style / 数值样式 */
  valueStyle?: React.CSSProperties;
  /** Loading state / 加载状态 */
  loading?: boolean;
  /** className */
  className?: string;
  /** HTML style */
  style?: React.CSSProperties;
}

function Statistic({
  className,
  title,
  value,
  prefix,
  suffix,
  precision,
  groupSeparator = ",",
  trend,
  trendMode = "default",
  valueStyle,
  loading = false,
  ...props
}: StatisticProps) {
  const formattedValue = React.useMemo(() => {
    if (value === undefined || value === null) return "--";
    if (typeof value === "string") return value;
    let num = value;
    if (precision !== undefined) {
      num = Number(num.toFixed(precision));
    }
    if (!groupSeparator) return String(num);
    const parts = String(num).split(".");
    const intPart = parts[0] ?? "";
    const decPart = parts[1];
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
    return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
  }, [value, precision, groupSeparator]);

  const trendUp = trend !== undefined && trend > 0;
  const trendDown = trend !== undefined && trend < 0;

  let trendColor = "text-muted-foreground";
  if (trendMode === "default") {
    if (trendUp) trendColor = "text-green-500";
    if (trendDown) trendColor = "text-red-500";
  } else {
    if (trendUp) trendColor = "text-red-500";
    if (trendDown) trendColor = "text-green-500";
  }

  return (
    <div data-slot="statistic" className={cn("space-y-1", className)} {...props}>
      {title && (
        <div className="text-sm text-muted-foreground">{title}</div>
      )}
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-lg text-muted-foreground">{prefix}</span>}
        {loading ? (
          <span className="inline-block h-8 w-24 animate-pulse rounded bg-muted" />
        ) : (
          <span
            className="text-3xl font-bold tabular-nums tracking-tight"
            style={valueStyle}
          >
            {formattedValue}
          </span>
        )}
        {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
      </div>
      {trend !== undefined && (
        <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
          <span>{trendUp ? "↑" : trendDown ? "↓" : "–"}</span>
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  );
}

export { Statistic };
export type { StatisticProps };
