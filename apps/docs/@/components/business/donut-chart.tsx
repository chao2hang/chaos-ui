"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component DonutChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 环形图(占比) — pure SVG donut with legend.
 * @param data Segments with label/value/optional color.
 * @param size Donut pixel size.
 * @param thickness Stroke width.
 * @param centerLabel Optional text in the hole.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <DonutChart data={[{label:"A",value:60,color:"#3b82f6"}]} />
 * ```
 * 环形图(占比)
 */
export interface DonutChartProps {
  /** Segments to render. */
  data?: Array<{ label: string; value: number; color?: string }>;
  /** Donut pixel size. */
  size?: number;
  /** Stroke thickness. */
  thickness?: number;
  /** Center hole label. */
  centerLabel?: string;
  className?: string;
}

const DEFAULT_DONUT_DATA: Array<{
  label: string;
  value: number;
  color?: string;
}> = [
  { label: "已完成", value: 56, color: "#3b82f6" },
  { label: "进行中", value: 28, color: "#10b981" },
  { label: "待处理", value: 16, color: "#f59e0b" },
];

function DonutChart({
  data = DEFAULT_DONUT_DATA,
  size = 128,
  thickness = 12,
  centerLabel,
  className,
}: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = 40;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div
      data-slot="donut-chart"
      className={cn("flex flex-wrap items-center gap-4", className)}
      role="img"
      aria-label={`环形图，共 ${data.length} 段，总计 ${total}`}
    >
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          className="-rotate-90"
          role="presentation"
          width={size}
          height={size}
        >
          {data.map((d) => {
            const frac = d.value / total;
            const seg = (
              <circle
                key={d.label}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={d.color ?? "currentColor"}
                strokeWidth={thickness}
                strokeDasharray={`${frac * c} ${c}`}
                strokeDashoffset={-acc * c}
              >
                <title>
                  {d.label}: {formatNumber(d.value)}
                </title>
              </circle>
            );
            acc += frac;
            return seg;
          })}
        </svg>
        {centerLabel ? (
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium tabular-nums">
            {centerLabel}
          </span>
        ) : null}
      </div>
      <ul className="flex flex-col gap-1.5 text-sm" role="list">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: d.color ?? "currentColor" }}
              aria-hidden="true"
            />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="ml-auto tabular-nums">
              {formatNumber(d.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { DonutChart };
