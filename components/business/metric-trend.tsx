"use client";
import * as React from "react";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui";
import { Dot } from "@/components/ui";
import { formatNumber, formatPercent } from "@/lib/format";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  fill?: boolean;
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  strokeWidth = 1.5,
  className,
  color = "currentColor",
  fill = true,
}: SparklineProps) {
  if (data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const points = data
    .map((v, i) => `${i * step},${height - ((v - min) / range) * height}`)
    .join(" ");
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={cn("overflow-visible", className)}
      aria-hidden
    >
      {fill && (
        <polygon points={areaPoints} className="fill-current opacity-20" />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-current"
      />
    </svg>
  );
}

interface MetricTrendProps extends Omit<
  React.ComponentProps<typeof Card>,
  "children"
> {
  label: string;
  value: number | string;
  unit?: string;
  change?: number;
  changeLabel?: string;
  format?: "number" | "percent" | "compact" | "currency";
  sparklineData?: number[];
  trendDirection?: "up-good" | "down-good" | "neutral";
  icon?: React.ReactNode;
  loading?: boolean;
}

const formatFns: Record<
  NonNullable<MetricTrendProps["format"]>,
  (v: number) => string
> = {
  number: (v) => formatNumber(v),
  percent: (v) => formatPercent(v),
  compact: (v) => formatNumber(v, { notation: "compact" }),
  currency: (v) => formatNumber(v, { style: "currency", currency: "CNY" }),
};

export function MetricTrend({
  label,
  value,
  unit,
  change,
  changeLabel,
  format = "number",
  sparklineData = [],
  trendDirection = "up-good",
  icon,
  loading,
  className,
  ...props
}: MetricTrendProps) {
  const { t } = useTranslation("chart");
  const resolvedChangeLabel = changeLabel ?? t("metricTrend.changeLabel");
  const formatted =
    typeof value === "number" ? formatFns[format](value) : value;
  const changeValue = change ?? 0;
  const direction = changeValue > 0 ? "up" : changeValue < 0 ? "down" : "flat";
  const isGood =
    trendDirection === "up-good"
      ? direction === "up"
      : trendDirection === "down-good"
        ? direction === "down"
        : false;
  const variant = isGood
    ? "success"
    : direction === "flat"
      ? "default"
      : "destructive";

  return (
    <Card
      data-slot="metric-trend"
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            {icon}
            {label}
          </span>
          {change !== undefined && change !== 0 && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded px-1 text-[0.65rem] font-medium",
                variant === "success" && "bg-success/10 text-success",
                variant === "destructive" &&
                  "bg-destructive/10 text-destructive",
                variant === "default" && "bg-muted text-muted-foreground",
              )}
            >
              {direction === "up" && <ArrowUpIcon className="size-3" />}
              {direction === "down" && <ArrowDownIcon className="size-3" />}
              {direction === "flat" && <MinusIcon className="size-3" />}
              {formatPercent(Math.abs(changeValue), 1)}
            </span>
          )}
        </div>
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-1">
            {loading ? (
              <div className="h-7 w-20 animate-pulse rounded bg-muted" />
            ) : (
              <>
                <span className="text-2xl font-semibold tabular-nums tracking-tight">
                  {formatted}
                </span>
                {unit && (
                  <span className="text-xs text-muted-foreground">{unit}</span>
                )}
              </>
            )}
          </div>
          {sparklineData.length > 0 && (
            <div
              className={cn(
                variant === "success" && "text-success",
                variant === "destructive" && "text-destructive",
                variant === "default" && "text-muted-foreground",
              )}
            >
              <Sparkline data={sparklineData} />
            </div>
          )}
        </div>
        {change !== undefined && (
          <p className="text-[0.65rem] text-muted-foreground">
            <Dot
              variant={
                variant === "destructive"
                  ? "destructive"
                  : variant === "success"
                    ? "success"
                    : "default"
              }
              className="mr-1 inline-block align-middle"
            />
            {resolvedChangeLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
