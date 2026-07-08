"use client";
import * as React from "react";
import ReactECharts from "echarts-for-react";
import { ChartFrame } from "./chart-frame";
import { PALETTE, type BaseChartProps } from "./types";
import { buildSankeyOption } from "./sankey";

export function SankeyChart({
  data = [],
  xKey = "source",
  yKey = "target",
  valueKey = "value",
  height = 320,
  loading,
  empty,
  enableExport,
  enableFullscreen,
  className,
}: BaseChartProps & { valueKey?: string }) {
  const option = React.useMemo(
    () => buildSankeyOption(data, xKey, yKey, valueKey, [...PALETTE], height),
    [data, xKey, yKey, valueKey, height],
  );

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
      <ReactECharts
        option={option}
        notMerge
        lazyUpdate
        autoResize
        style={{ height, width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </ChartFrame>
  );
}
