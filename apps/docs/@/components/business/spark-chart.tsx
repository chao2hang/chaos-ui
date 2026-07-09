"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component SparkChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 迷你趋势图 — tiny inline line chart for stat cards.
 * @param data Numeric series.
 * @param width SVG width in px.
 * @param height SVG height in px.
 * @param color Line color.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <SparkChart data={[3,6,4,8,7,10]} />
 * ```
 * 迷你趋势图
 */
export interface SparkChartProps {
  /** Numeric series. */
  data?: number[];
  /** SVG width in px. */
  width?: number;
  /** SVG height in px. */
  height?: number;
  /** Line color. */
  color?: string;
  className?: string;
}

function SparkChart({
  data = [4, 8, 6, 12, 10, 14, 11],
  width = 120,
  height = 32,
  color = "currentColor",
  className,
}: SparkChartProps) {
  const max = Math.max(1, ...data);
  const min = Math.min(0, ...data);
  const range = max - min || 1;
  const stepX = width / Math.max(1, data.length - 1);
  const yAt = (v: number) => height - ((v - min) / range) * height;
  const points = data.map((v, i) => `${i * stepX},${yAt(v)}`);
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <svg
      data-slot="spark-chart"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      className={cn("text-primary", className)}
      role="img"
      aria-label={`趋势线，${data.length} 点，最大 ${max}`}
    >
      <path d={areaPath} fill={color} fillOpacity={0.15} stroke="none" />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <title>最大值 {formatNumber(max)}</title>
    </svg>
  );
}

export { SparkChart };
