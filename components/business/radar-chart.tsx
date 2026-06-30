"use client";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * @component RadarChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 雷达图(多维评估) — pure SVG radar/spider chart.
 * @param axes Dimension labels (vertices).
 * @param series One or more named series of values 0..max.
 * @param max Scale ceiling (default 100).
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <RadarChart axes={["速度","质量","成本"]} series={[{name:"A",values:[80,60,40]}]} />
 * ```
 * 雷达图(多维评估)
 */
export interface RadarChartProps {
  /** Dimension labels (vertices). */
  axes?: string[];
  /** Named series; each `values` array aligns 1:1 with `axes`. */
  series?: Array<{ name: string; values: number[]; color?: string }>;
  /** Scale ceiling. */
  max?: number;
  className?: string;
}

const RADAR_PALETTE = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

function RadarChart({
  axes = ["速度", "质量", "成本", "服务", "创新"],
  series = [{ name: "本期", values: [80, 70, 60, 75, 50] }],
  max = 100,
  className,
}: RadarChartProps) {
  const cx = 100;
  const cy = 100;
  const r = 80;
  const n = axes.length;
  const angleAt = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const point = (i: number, value: number) => {
    const ratio = Math.min(1, Math.max(0, value / max));
    const a = angleAt(i);
    return `${cx + r * ratio * Math.cos(a)},${cy + r * ratio * Math.sin(a)}`;
  };

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div
      data-slot="radar-chart"
      className={cn("w-full", className)}
      role="img"
      aria-label={`雷达图，${n} 个维度，${series.length} 条数据`}
    >
      <svg viewBox="0 0 200 200" width="100%" role="presentation">
        {rings.map((ring, i) => (
          <polygon
            key={i}
            points={axes.map((_, j) => {
              const a = angleAt(j);
              return `${cx + r * ring * Math.cos(a)},${cy + r * ring * Math.sin(a)}`;
            }).join(" ")}
            fill="none"
            className="stroke-muted-foreground/20"
            strokeWidth={0.5}
          />
        ))}
        {axes.map((_, j) => {
          const a = angleAt(j);
          return (
            <line
              key={j}
              x1={cx}
              y1={cy}
              x2={cx + r * Math.cos(a)}
              y2={cy + r * Math.sin(a)}
              className="stroke-muted-foreground/20"
              strokeWidth={0.5}
            />
          );
        })}
        {series.map((s, si) => {
          const color = s.color ?? RADAR_PALETTE[si % RADAR_PALETTE.length];
          return (
            <g key={s.name}>
              <polygon
                points={s.values.map((v, j) => point(j, v)).join(" ")}
                fill={color}
                fillOpacity={0.15}
                stroke={color}
                strokeWidth={1.5}
              />
              {s.values.map((v, j) => {
                const a = angleAt(j);
                const ratio = Math.min(1, Math.max(0, v / max));
                return (
                  <circle
                    key={j}
                    cx={cx + r * ratio * Math.cos(a)}
                    cy={cy + r * ratio * Math.sin(a)}
                    r={2}
                    fill={color}
                  >
                    <title>
                      {s.name} {axes[j]}: {formatNumber(v)}
                    </title>
                  </circle>
                );
              })}
            </g>
          );
        })}
        {axes.map((label, j) => {
          const a = angleAt(j);
          const lx = cx + (r + 12) * Math.cos(a);
          const ly = cy + (r + 12) * Math.sin(a);
          return (
            <text
              key={j}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[9px]"
            >
              {label}
            </text>
          );
        })}
      </svg>
      <ul className="mt-1 flex flex-wrap justify-center gap-3 text-[10px]" role="list">
        {series.map((s, si) => (
          <li key={s.name} className="flex items-center gap-1">
            <span
              className="inline-block size-2 rounded-sm"
              style={{ backgroundColor: s.color ?? RADAR_PALETTE[si % RADAR_PALETTE.length] }}
              aria-hidden="true"
            />
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { RadarChart };
