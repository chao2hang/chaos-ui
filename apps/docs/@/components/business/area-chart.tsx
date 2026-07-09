"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component AreaChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 面积图(趋势+填充) — pure SVG, zero runtime deps.
 * @param data Series points to plot. Defaults to a small demo series.
 * @param labels X-axis labels aligned to data points.
 * @param height SVG viewport height in px.
 * @param color Fill/stroke color of the area.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <AreaChart data={[10, 40, 25, 60, 45]} labels={["一","二","三","四","五"]} />
 * ```
 * 面积图(趋势+填充)
 */
export interface AreaChartProps {
  /** Numeric series values, left-to-right. */
  data?: number[];
  /** X-axis labels aligned 1:1 with `data`. */
  labels?: string[];
  /** SVG height in px. */
  height?: number;
  /** Stroke + fill color. */
  color?: string;
  className?: string;
}

const DEFAULT_AREA_DATA = [12, 28, 18, 45, 32, 60, 48];
const DEFAULT_AREA_LABELS = ["一", "二", "三", "四", "五", "六", "日"];

function AreaChart({
  data = DEFAULT_AREA_DATA,
  labels = DEFAULT_AREA_LABELS,
  height = 180,
  color = "currentColor",
  className,
}: AreaChartProps) {
  const width = 320;
  const pad = 8;
  const max = Math.max(1, ...data);
  const min = Math.min(0, ...data);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / Math.max(1, data.length - 1);
  const yAt = (v: number) => pad + (1 - (v - min) / range) * (height - pad * 2);

  const points = data.map((v, i) => `${pad + i * stepX},${yAt(v)}`);
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${pad + (data.length - 1) * stepX},${height - pad} L ${pad},${height - pad} Z`;

  return (
    <div
      data-slot="area-chart"
      className={cn("text-primary w-full", className)}
      role="img"
      aria-label={`面积图，共 ${data.length} 个数据点，最大值 ${max}`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        role="presentation"
      >
        <path d={areaPath} fill={color} fillOpacity={0.18} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((v, i) => (
          <circle key={i} cx={pad + i * stepX} cy={yAt(v)} r={2.5} fill={color}>
            <title>
              {labels[i] ?? i}: {formatNumber(v)}
            </title>
          </circle>
        ))}
      </svg>
      <ul
        className="text-muted-foreground mt-1 flex justify-between text-[10px]"
        role="list"
      >
        {labels.slice(0, data.length).map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

export { AreaChart };
