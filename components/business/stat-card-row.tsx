"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui";

const STAT_COLOR_PRESETS: Record<string, string> = {
  green: "#22c55e",
  orange: "#f97316",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  amber: "#f59e0b",
  primary: "#3b82f6",
  muted: "#94a3b8",
};

function resolveStatColor(color?: string): string | undefined {
  if (!color) return undefined;
  const key = color.trim().toLowerCase();
  if (STAT_COLOR_PRESETS[key]) return STAT_COLOR_PRESETS[key];
  // Accept raw hex / rgb / oklch; reject bare tokens that would produce invalid CSS
  if (
    key.startsWith("#") ||
    key.startsWith("rgb") ||
    key.startsWith("hsl") ||
    key.startsWith("oklch") ||
    key.startsWith("var(")
  ) {
    return color;
  }
  return undefined;
}

interface StatCardRowProps {
  cards: {
    title: string;
    value: React.ReactNode;
    /** Unit / suffix after the value (e.g. 单 / 笔) — CUI-DASH-02 */
    suffix?: React.ReactNode;
    description?: string;
    icon?: React.ReactNode;
    /**
     * Icon chip color. Prefer presets: green | orange | red | blue | purple | amber | primary.
     * Raw hex/rgb/oklch/var() also accepted. Bare unknown tokens are ignored (avoid `green15`).
     */
    color?: string;
    trend?: {
      value: number;
      /** "up" = positive/green, "down" = negative/red */
      direction?: "up" | "down";
    };
    sparkline?: React.ReactNode;
    onClick?: () => void;
  }[];
  /** Responsive columns */
  columns?: { xs?: number; sm?: number; md?: number; lg?: number };
  className?: string;
}

/**
 * 统计卡横排布局 —— 对标 qxy-mop dashboard 的指标卡行。
 * 支持响应式列数、趋势箭头、迷你图、suffix 单位、语义色图标底。
 *
 * @component StatCardRow
 * @category business/dashboard
 * @since 0.2.0
 */
function StatCardRow({ cards, columns, className }: StatCardRowProps) {
  const colClasses = [
    columns?.xs ? `grid-cols-${columns.xs}` : "grid-cols-1",
    columns?.sm ? `sm:grid-cols-${columns.sm}` : "",
    columns?.md ? `md:grid-cols-${columns.md}` : "md:grid-cols-2",
    columns?.lg ? `lg:grid-cols-${columns.lg}` : "lg:grid-cols-4",
  ]
    .filter(Boolean)
    .join(" ");

  const trendColor = (direction?: "up" | "down") => {
    if (!direction) return "text-muted-foreground";
    // Chinese convention: 涨红跌绿
    return direction === "up" ? "text-red-500" : "text-green-500";
  };

  return (
    <div
      data-slot="stat-card-row"
      className={cn("grid gap-4", colClasses, className)}
    >
      {cards.map((card, index) => {
        const resolved = resolveStatColor(card.color);
        return (
          <Card
            key={index}
            className={cn(
              card.onClick &&
                "cursor-pointer transition-shadow hover:shadow-md",
            )}
            onClick={card.onClick}
          >
            {/* CUI-DASH-06: rely on Card py-(--card-spacing); do not stack pt-6 */}
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground truncate text-sm font-medium">
                    {card.title}
                  </p>
                  <p className="mt-1.5 flex items-baseline gap-1 tabular-nums">
                    <span className="text-2xl font-bold">{card.value}</span>
                    {card.suffix != null && card.suffix !== "" && (
                      <span
                        data-slot="stat-card-suffix"
                        className="text-muted-foreground text-sm font-medium"
                      >
                        {card.suffix}
                      </span>
                    )}
                  </p>
                  {card.description && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      {card.description}
                    </p>
                  )}
                  {card.trend && (
                    <p
                      className={cn(
                        "mt-2 text-sm font-medium",
                        trendColor(card.trend.direction),
                      )}
                    >
                      {card.trend.direction === "down" ? "↓" : "↑"}{" "}
                      {Math.abs(card.trend.value).toFixed(1)}%
                    </p>
                  )}
                  {card.sparkline && (
                    <div className="mt-2">{card.sparkline}</div>
                  )}
                </div>
                {card.icon && (
                  <div
                    data-slot="stat-card-icon"
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                      !resolved && "bg-muted",
                    )}
                    style={
                      resolved
                        ? { backgroundColor: `${resolved}26` }
                        : undefined
                    }
                  >
                    {card.icon}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export { StatCardRow, resolveStatColor };
export type { StatCardRowProps };
