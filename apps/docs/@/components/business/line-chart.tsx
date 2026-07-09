"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component LineChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 折线图(多线+标注) — pure SVG multi-series line chart.
 * @param series One or more named series of values.
 * @param labels X-axis labels aligned to series values.
 * @param height SVG height in px.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <LineChart series={[{name:"A",values:[10,40,30]}]} labels={["Q1","Q2","Q3"]} />
 * ```
 * 折线图(多线+标注)
 */
export interface LineChartProps {
  /** One or more named series. */
  series?: Array<{ name: string; values: number[]; color?: string }>;
  /** X-axis labels aligned 1:1 with each series values. */
  labels?: string[];
  /** SVG height in px. */
  height?: number;
  className?: string;
}

const LINE_PALETTE = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function LineChart({
  series = [{ name: "营收", values: [20, 35, 28, 50, 44] }],
  labels = ["Q1", "Q2", "Q3", "Q4", "Q5"],
  height = 180,
  className,
}: LineChartProps) {
  const width = 320;
  const pad = 8;
  const allValues = series.flatMap((s) => s.values);
  const max = Math.max(1, ...allValues);
  const min = Math.min(0, ...allValues);
  const range = max - min || 1;
  const len = Math.max(1, ...series.map((s) => s.values.length));
  const stepX = (width - pad * 2) / Math.max(1, len - 1);
  const yAt = (v: number) => pad + (1 - (v - min) / range) * (height - pad * 2);

  return (
    <div
      data-slot="line-chart"
      className={cn("w-full", className)}
      role="img"
      aria-label={`折线图，${series.length} 条线，${len} 个数据点`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        role="presentation"
      >
        {series.map((s, si) => {
          const color = s.color ?? LINE_PALETTE[si % LINE_PALETTE.length];
          const pts = s.values.map((v, i) => `${pad + i * stepX},${yAt(v)}`);
          const d = `M ${pts.join(" L ")}`;
          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {s.values.map((v, i) => (
                <circle key={i} cx={pad + i * stepX} cy={yAt(v)} r={2.5} fill={color}>
                  <title>
                    {s.name} {labels[i] ?? i}: {formatNumber(v)}
                  </title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
      <ul className="mt-1 flex flex-wrap items-center justify-between gap-2 text-[10px]">
        <li className="flex gap-3" role="list">
          {series.map((s, si) => (
            <span key={s.name} className="flex items-center gap-1">
              <span
                className="inline-block size-2 rounded-sm"
                style={{ backgroundColor: s.color ?? LINE_PALETTE[si % LINE_PALETTE.length] }}
                aria-hidden="true"
              />
              {s.name}
            </span>
          ))}
        </li>
        <li className="flex justify-between text-muted-foreground" role="list" style={{ flex: 1 }}>
          {labels.slice(0, len).map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </li>
      </ul>
    </div>
  );
}

export { LineChart };
