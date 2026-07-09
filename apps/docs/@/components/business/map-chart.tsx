"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";
import { MapPinIcon } from "@chaos_team/chaos-ui/ui";

/**
 * @component MapChart
 * @category business/charts
 * @since 0.7.0
 * @description 地图 — styled placeholder region with absolutely-positioned
 * markers (no real geo dependency). Markers are distributed in a deterministic
 * grid so layout is stable.
 * @param region Region label shown in the header.
 * @param data Named markers with a value (size scales with value).
 * @param className Extra classes on the root.
 * @example
 * <MapChart region="华东" data={[{name:"上海",value:90},{name:"杭州",value:60}]} />
 */

interface MapChartProps {
  region: string;
  data: Array<{ name: string; value: number }>;
  className?: string;
}

function MapChart({ region = "", data = [], className }: MapChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div
      data-slot="map-chart"
      className={cn(
        "bg-card flex flex-col gap-2 rounded-lg border p-3 text-sm",
        className,
      )}
      role="img"
      aria-label={`${region} 地图，共 ${data.length} 个标记`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{region}</span>
        <span className="text-muted-foreground text-xs">
          标记 {data.length}
        </span>
      </div>
      <div
        className="ring-border relative h-48 w-full overflow-hidden rounded-md bg-[radial-gradient(circle_at_30%_30%,var(--muted),transparent_70%)] ring-1"
        role="presentation"
      >
        {data.map((d, i) => {
          const cols = Math.ceil(Math.sqrt(data.length));
          const col = i % cols;
          const row = Math.floor(i / cols);
          const left = ((col + 0.5) / cols) * 100;
          const top = ((row + 0.5) / Math.ceil(data.length / cols)) * 100;
          const size = 14 + (d.value / max) * 20;
          return (
            <div
              key={d.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <MapPinIcon
                className="text-primary"
                style={{ width: size, height: size }}
                aria-hidden="true"
              />
              <span className="text-muted-foreground absolute top-full left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap">
                {d.name}
              </span>
              <span className="sr-only">
                {d.name}: {formatNumber(d.value)}
              </span>
            </div>
          );
        })}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs" role="list">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-1">
            <span className="bg-primary size-2 rounded-sm" aria-hidden="true" />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="tabular-nums">{formatNumber(d.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { MapChart };
export type { MapChartProps };
