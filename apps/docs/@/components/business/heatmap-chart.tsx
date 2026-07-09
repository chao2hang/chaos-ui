"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

/**
 * @component HeatmapChart
 * @category business/charts
 * @since 0.7.0
 * @description 热力图 — CSS-grid of colored cells across X (columns) and Y (rows).
 * @param data Cells with x/y/value.
 * @param className Extra classes on the root.
 * @example
 * <HeatmapChart data={[{x:"周一",y:"上午",value:8}]} />
 */

interface HeatmapChartProps {
  data: Array<{ x: string; y: string; value: number }>;
  className?: string;
}

function HeatmapChart({ data, className }: HeatmapChartProps) {
  const xs = React.useMemo(() => {
    const seen: string[] = [];
    for (const d of data) if (!seen.includes(d.x)) seen.push(d.x);
    return seen;
  }, [data]);
  const ys = React.useMemo(() => {
    const seen: string[] = [];
    for (const d of data) if (!seen.includes(d.y)) seen.push(d.y);
    return seen;
  }, [data]);

  const max = Math.max(1, ...data.map((d) => d.value));
  const lookup = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const d of data) m.set(`${d.x}|${d.y}`, d.value);
    return m;
  }, [data]);

  const cellColor = (v: number) => {
    if (v <= 0) return "bg-muted";
    return "";
  };
  const cellStyle = (v: number): React.CSSProperties => {
    if (v <= 0) return {};
    const t = v / max;
    return { backgroundColor: `rgba(59,130,246,${(0.15 + t * 0.85).toFixed(2)})` };
  };

  return (
    <div
      data-slot="heatmap-chart"
      className={cn("w-full overflow-x-auto", className)}
      role="img"
      aria-label={`热力图，${ys.length} 行 × ${xs.length} 列`}
    >
      <table className="w-full border-separate border-spacing-1 text-xs">
        <thead>
          <tr>
            <th scope="col" className="w-16" />
            {xs.map((x) => (
              <th
                key={x}
                scope="col"
                className="px-1 text-center text-muted-foreground"
              >
                {x}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ys.map((y) => (
            <tr key={y}>
              <th scope="row" className="truncate pr-1 text-left text-muted-foreground">
                {y}
              </th>
              {xs.map((x) => {
                const v = lookup.get(`${x}|${y}`) ?? 0;
                return (
                  <td key={x} className="p-0">
                    <div
                      role="gridcell"
                      aria-label={`${y} ${x}: ${v}`}
                      title={`${y} ${x}: ${formatNumber(v)}`}
                      className={cn(
                        "flex h-7 min-w-7 items-center justify-center rounded tabular-nums",
                        cellColor(v),
                      )}
                      style={cellStyle(v)}
                    >
                      {v > 0 ? formatNumber(v) : ""}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { HeatmapChart };
export type { HeatmapChartProps };
