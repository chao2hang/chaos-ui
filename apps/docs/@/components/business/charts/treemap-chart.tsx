"use client";
import * as React from "react";
import { ChartFrame } from "./chart-frame";
import { PALETTE, type BaseChartProps } from "./types";

export function TreemapChart({
  data = [],
  xKey = "name",
  yKey = "value",
  height = 320,
  loading,
  empty,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps) {
  const total = data.reduce((sum, d) => sum + Number(d[yKey]), 0);
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
      <div className="flex w-full overflow-hidden rounded" style={{ height }}>
        {data.map((d, i) => {
          const value = Number(d[yKey]);
          const width = (value / total) * 100;
          return (
            <div
              key={String(d[xKey])}
              className="flex flex-col items-center justify-center p-2 text-xs font-medium text-white transition-all"
              style={{
                width: `${width}%`,
                backgroundColor: PALETTE[i % PALETTE.length],
              }}
              title={`${d[xKey]}: ${value}`}
            >
              <div className="truncate">{String(d[xKey])}</div>
              <div className="opacity-80">{value.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}
