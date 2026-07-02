import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from "@/components/ui/icons";

const kpiCardVariants = cva(
  "rounded-lg border bg-card p-4 text-card-foreground",
  {
    variants: {
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface KPIItem {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

interface KPIPanelProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof kpiCardVariants> {
  items: KPIItem[];
  columns?: 1 | 2 | 3 | 4;
}

/**
 * @component KPIPanel
 * @category ui/shell
 * @since 0.2.0
 * @description A dashboard panel that renders a configurable grid of KPI cards with optional trend indicators / 仪表盘面板，渲染可配置的 KPI 卡片网格，支持趋势指示器
 * @keywords kpi, dashboard, panel, metrics, trend, analytics
 * @example
 * <KPIPanel columns={3} items={[{ label: "Revenue", value: "$12,345", change: 12.5, trend: "up" }]} />
 */
function KPIPanel({
  className,
  size,
  items,
  columns = 4,
  ...props
}: KPIPanelProps) {
  return (
    <div
      data-slot="kpi-panel"
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <KPICard key={index} item={item} size={size ?? "default"} />
      ))}
    </div>
  );
}

/**
 * @component KPICard
 * @category ui/shell
 * @since 0.2.0
 * @description A single KPI metric card displaying a label, value, trend icon, and percentage change / 单个 KPI 指标卡片，显示标签、数值、趋势图标和百分比变化
 * @keywords kpi, card, metric, trend, indicator
 * @example
 * <KPICard item={{ label: "Orders", value: 256, change: 8.3, trend: "up" }} size="default" />
 */
function KPICard({
  item,
  size,
}: {
  item: KPIItem;
  size?: "sm" | "default" | "lg";
}) {
  const trendColor =
    item.trend === "up"
      ? "text-success"
      : item.trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  const TrendIcon =
    item.trend === "up"
      ? TrendingUpIcon
      : item.trend === "down"
        ? TrendingDownIcon
        : MinusIcon;

  return (
    <div
      data-slot="kpi-card"
      className={cn(kpiCardVariants({ size: size ?? undefined }))}
    >
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{item.label}</p>
        {item.icon && (
          <span className="text-muted-foreground">{item.icon}</span>
        )}
      </div>
      <div className="mt-2">
        <p
          className={cn(
            "font-bold tracking-tight",
            size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl",
          )}
        >
          {item.value}
        </p>
      </div>
      {(item.change !== undefined || item.changeLabel) && (
        <div className="mt-2 flex items-center gap-1">
          {item.change !== undefined && (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                trendColor,
              )}
            >
              <TrendIcon className="size-3" />
              {item.change > 0 ? "+" : ""}
              {item.change}%
            </span>
          )}
          {item.changeLabel && (
            <span className="text-muted-foreground text-xs">
              {item.changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { KPIPanel, KPICard };
export type { KPIItem, KPIPanelProps };
