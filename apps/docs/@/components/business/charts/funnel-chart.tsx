"use client";
import * as React from "react";
import { ChartFrame } from "./chart-frame";
import { PALETTE, type BaseChartProps } from "./types";

export function FunnelChart({
  data = [],
  xKey = "name",
  yKey = "value",
  height,
  loading,
  empty,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps) {
  const sorted = React.useMemo(
    () => [...data].sort((a, b) => Number(b[yKey]) - Number(a[yKey])),
    [data, yKey],
  );
  const max = Math.max(...sorted.map((d) => Number(d[yKey])), 1);
  return (
    <ChartFrame
      data={data}
      loading={loading}
      empty={empty}
      height={height}
      enableExport={enableExport}
      enableFullscreen={enableFullscreen}
      className={className}
    >
      <div
        className="flex w-full flex-col gap-1"
        style={{ height: height ?? 320 }}
      >
        {sorted.map((row, i) => {
          const value = Number(row[yKey]);
          const width = (value / max) * 100;
          return (
            <div key={String(row[xKey])} className="flex items-center gap-3">
              <div className="text-muted-foreground w-24 truncate text-sm">
                {String(row[xKey])}
              </div>
              <div className="relative h-9 flex-1 overflow-hidden rounded">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${width}%`,
                    backgroundColor: PALETTE[i % PALETTE.length],
                  }}
                />
              </div>
              <div className="w-16 text-right text-sm tabular-nums">
                {value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}
