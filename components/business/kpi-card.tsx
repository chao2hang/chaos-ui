"use client";
import * as React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "@/components/ui/icons";

function KPICard({
  title,
  value,
  change,
  changeLabel,
  changeType = "neutral",
  sparkline,
  target,
  targetLabel,
  icon: Icon,
  className,
}: {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  changeType?: "positive" | "negative" | "neutral";
  sparkline?: { value: number }[];
  target?: number;
  targetLabel?: string;
  icon?: React.ElementType;
  className?: string;
}) {
  const trendIcons: Record<string, React.ElementType> = {
    positive: ArrowUpIcon,
    negative: ArrowDownIcon,
    neutral: MinusIcon,
  };
  const trendColors: Record<string, string> = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };
  const TrendIcon = trendIcons[changeType] ?? ArrowUpIcon;

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 mt-1 text-xs",
              trendColors[changeType],
            )}
          >
            <TrendIcon className="size-3" />
            <span className="font-medium">{change}</span>
            {changeLabel && (
              <span className="text-muted-foreground">{changeLabel}</span>
            )}
          </div>
        )}
        {sparkline && sparkline.length > 0 && (
          <div className="h-10 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline}>
                <defs>
                  <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="url(#sparkFill)"
                  strokeWidth={1.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        {target !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">
                {targetLabel ?? "Progress"}
              </span>
              <span className="font-medium">{target}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: target + "%" }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { KPICard };
