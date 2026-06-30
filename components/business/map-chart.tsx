"use client";

import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { MapPinIcon } from "@/components/ui";

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

function MapChart({ region, data, className }: MapChartProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div
      data-slot="map-chart"
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-card p-3 text-sm",
        className,
      )}
      role="img"
      aria-label={`${region} 地图，共 ${data.length} 个标记`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">{region}</span>
        <span className="text-xs text-muted-foreground">
          标记 {data.length}
        </span>
      </div>
      <div
        className="relative h-48 w-full overflow-hidden rounded-md bg-[radial-gradient(circle_at_30%_30%,var(--color-muted),transparent_70%)] ring-1 ring-border"
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
              <span className="absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap text-[10px] text-muted-foreground">
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
            <span className="size-2 rounded-sm bg-primary" aria-hidden="true" />
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
