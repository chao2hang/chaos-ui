"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber, formatPercent } from "@chaos_team/chaos-ui/lib";

/**
 * @component FunnelChart
 * @category business/charts
 * @since 0.7.0
 * @description 漏斗图 — stacked horizontal bars that narrow by value, with
 * conversion percentages.
 * @param data Funnel stages ordered top-to-bottom.
 * @param height Row height in px.
 * @param className Extra classes on the root.
 * @example
 * <FunnelChart data={[{label:"访问",value:1000},{label:"下单",value:300}]} />
 */

interface FunnelChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  height?: number;
  className?: string;
}

const FUNNEL_PALETTE = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];

function FunnelChart({ data, height = 44, className }: FunnelChartProps) {
  const top = data[0]?.value ?? 0;
  const total = data.length;

  return (
    <div
      data-slot="funnel-chart"
      className={cn("flex flex-col gap-2", className)}
      role="img"
      aria-label={`漏斗图，共 ${total} 阶段`}
    >
      <ol role="list">
        {data.map((d, i) => {
          const widthPct = top > 0 ? Math.max(8, (d.value / top) * 100) : 100;
          const conv = top > 0 ? d.value / top : 0;
          return (
            <li
              key={d.label}
              className="flex items-center gap-2 py-0.5"
              style={{ minHeight: height }}
            >
              <span className="w-20 shrink-0 truncate text-sm text-muted-foreground">
                {d.label}
              </span>
              <div className="flex flex-1 items-center justify-center">
                <div
                  className="flex items-center justify-center rounded text-xs font-medium text-white"
                  style={{
                    width: `${widthPct}%`,
                    height: height - 8,
                    backgroundColor: d.color ?? FUNNEL_PALETTE[i % FUNNEL_PALETTE.length],
                  }}
                >
                  <span className="truncate px-2 tabular-nums">
                    {formatNumber(d.value)}
                  </span>
                </div>
              </div>
              <span className="w-14 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                {formatPercent(conv)}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export { FunnelChart };
export type { FunnelChartProps };
