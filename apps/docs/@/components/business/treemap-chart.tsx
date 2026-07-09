"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";

/**
 * @component TreemapChart
 * @category Business
 * @since 1.0.0-beta.0
 * @description 树图(层级占比) — squarified-style tiles scaled by value (CSS grid).
 * @param data Nodes with name/value and optional color.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <TreemapChart data={[{name:"A",value:60},{name:"B",value:40}]} />
 * ```
 * 树图(层级占比)
 */
export interface TreemapChartProps {
  /** Tiles to render. */
  data?: Array<{ name: string; value: number; color?: string }>;
  className?: string;
}

const TREEMAP_PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

function TreemapChart({
  data = [
    { name: "食品", value: 48 },
    { name: "日用", value: 28 },
    { name: "家电", value: 16 },
    { name: "其他", value: 8 },
  ],
  className,
}: TreemapChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const cols =
    data.length <= 2 ? data.length : Math.ceil(Math.sqrt(data.length));

  return (
    <div
      data-slot="treemap-chart"
      className={cn("w-full", className)}
      role="img"
      aria-label={`树图，共 ${data.length} 项`}
    >
      <div
        className="grid w-full gap-1"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {data.map((d, i) => {
          const ratio = d.value / total;
          const span = Math.max(1, Math.round(ratio * cols * 2));
          const color = d.color ?? TREEMAP_PALETTE[i % TREEMAP_PALETTE.length];
          return (
            <div
              key={d.name}
              className="flex min-h-16 flex-col justify-between overflow-hidden rounded-md p-2 text-white"
              style={{
                backgroundColor: color,
                gridColumn: `span ${Math.min(cols, span)}`,
              }}
            >
              <span className="truncate text-xs font-medium">{d.name}</span>
              <span className="text-sm font-semibold tabular-nums">
                {formatNumber(d.value)}
              </span>
              <span className="sr-only">占比 {(ratio * 100).toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { TreemapChart };
