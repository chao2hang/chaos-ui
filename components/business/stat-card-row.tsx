"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  MinusIcon,
} from "@/components/ui/icons";

/**
 * @component StatCardRow
 * @category business/dashboard
 * @since 0.2.0
 * @description 统计卡横排布局(响应式列数) / Stat card row layout with responsive columns
 * @keywords stat, card, row, grid, dashboard, kpi, metric
 * @example
 * <StatCardRow
 *   cards={[
 *     { title: 'Revenue', value: '¥1,234', change: '+12%', changeType: 'positive' },
 *     { title: 'Orders', value: '456', change: '-3%', changeType: 'negative' },
 *   ]}
 *   columns={{ xs: 1, sm: 2, lg: 4 }}
 * />
 */

interface StatCardItem {
  /** Card title / 卡片标题 */
  title: string;
  /** Card value / 卡片数值 */
  value: string | number;
  /** Change text / 变化文本 */
  change?: string;
  /** Change type / 变化类型 */
  changeType?: "positive" | "negative" | "neutral";
  /** Icon / 图标 */
  icon?: LucideIcon;
  /** Card color theme / 卡片颜色主题 */
  color?: "default" | "blue" | "green" | "orange" | "red" | "purple";
  /** Sparkline data (mini trend) / 迷你趋势数据 */
  sparkline?: number[];
  /** Click handler / 点击回调 */
  onClick?: () => void;
}

interface StatCardRowProps extends React.ComponentProps<"div"> {
  /** Stat cards / 统计卡配置 */
  cards: StatCardItem[];
  /** Responsive column count / 响应式列数 */
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Whether to show loading skeleton / 是否显示加载骨架屏 */
  loading?: boolean;
}

const responsiveColsMap: Record<string, number> = {
  xs: 1,
  sm: 2,
  md: 2,
  lg: 4,
  xl: 4,
};

const colorConfig: Record<
  NonNullable<StatCardItem["color"]>,
  { icon: string; accent: string }
> = {
  default: {
    icon: "text-muted-foreground",
    accent: "",
  },
  blue: {
    icon: "text-blue-500",
    accent: "border-l-4 border-l-blue-500",
  },
  green: {
    icon: "text-green-500",
    accent: "border-l-4 border-l-green-500",
  },
  orange: {
    icon: "text-orange-500",
    accent: "border-l-4 border-l-orange-500",
  },
  red: {
    icon: "text-red-500",
    accent: "border-l-4 border-l-red-500",
  },
  purple: {
    icon: "text-purple-500",
    accent: "border-l-4 border-l-purple-500",
  },
};

function MiniSparkline({ data, className }: { data: number[]; className?: string }) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const step = width / (data.length - 1);

  const points = data
    .map((v, i) => `${i * step},${height - ((v - min) / range) * height}`)
    .join(" ");

  const firstVal = data[0];
  const lastVal = data[data.length - 1];
  const isUp = lastVal !== undefined && firstVal !== undefined && lastVal >= firstVal;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("inline-block", className)}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? "currentColor" : "currentColor"}
        strokeWidth={1.5}
        className={isUp ? "text-green-500" : "text-red-500"}
      />
    </svg>
  );
}

function StatCardRow({
  className,
  cards,
  columns,
  loading = false,
  ...props
}: StatCardRowProps) {
  const cols = columns ?? responsiveColsMap;
  const totalCols = cols.xl ?? cols.lg ?? 4;

  const gridColsClass = cn(
    "grid gap-4",
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  );

  if (loading) {
    return (
      <div className={cn(gridColsClass, className)} {...props}>
        {Array.from({ length: totalCols }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-3 w-16 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div
      data-slot="stat-card-row"
      className={cn(gridColsClass, className)}
      {...props}
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        const colorCfg = colorConfig[card.color ?? "default"];
        const TrendIcon =
          card.changeType === "positive"
            ? TrendingUpIcon
            : card.changeType === "negative"
              ? TrendingDownIcon
              : MinusIcon;

        return (
          <Card
            key={index}
            className={cn(
              "transition-shadow hover:shadow-md",
              colorCfg.accent,
              card.onClick && "cursor-pointer",
            )}
            onClick={card.onClick}
          >
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              {Icon && <Icon className={cn("size-4", colorCfg.icon)} />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="mt-1 flex items-center justify-between">
                {card.change && (
                  <div className="flex items-center gap-1 text-xs">
                    <TrendIcon
                      className={cn(
                        "size-3.5",
                        card.changeType === "positive" && "text-green-500",
                        card.changeType === "negative" && "text-red-500",
                        card.changeType === "neutral" && "text-muted-foreground",
                      )}
                    />
                    <span
                      className={cn(
                        card.changeType === "positive" && "text-green-500",
                        card.changeType === "negative" && "text-red-500",
                        card.changeType === "neutral" && "text-muted-foreground",
                      )}
                    >
                      {card.change}
                    </span>
                  </div>
                )}
                {card.sparkline && <MiniSparkline data={card.sparkline} />}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export { StatCardRow };
export type { StatCardRowProps, StatCardItem };
