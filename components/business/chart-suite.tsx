"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { AreaChart } from "@/components/business/area-chart";
import { BarChart } from "@/components/business/bar-chart";
import { LineChart } from "@/components/business/line-chart";
import { PieChart } from "@/components/business/pie-chart";
import { RadarChart } from "@/components/business/radar-chart";
import { ScatterChart } from "@/components/business/scatter-chart";

/**
 * @component ChartSuite
 * @category business/charts
 * @since 0.7.0
 * @description 图表套件 — dispatches to a concrete chart by `type`, normalizing
 * a generic `data` array via `xField`/`yField`/`series`.
 * @param type Chart kind: line | bar | pie | radar | scatter | area.
 * @param data Generic records (objects with xField/yField/series keys).
 * @param xField Field name for X / label.
 * @param yField Field name for Y / value.
 * @param series Field name used to group records into series (line/bar/radar/area).
 * @param height SVG height in px.
 * @param className Extra classes on the root.
 * @example
 * <ChartSuite type="bar" data={[{label:"Q1",value:30}]} yField="value" xField="label" />
 */

interface ChartSuiteProps {
  type: "line" | "bar" | "pie" | "radar" | "scatter" | "area";
  data: unknown[];
  xField?: string;
  yField?: string;
  series?: string;
  height?: number;
  className?: string;
}

type Record_ = Record<string, unknown>;

function num(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v)
    ? v
    : typeof v === "string"
      ? Number(v)
      : 0;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function ChartSuite({
  type,
  data,
  xField = "x",
  yField = "y",
  series,
  height = 200,
  className,
}: ChartSuiteProps) {
  const rows = data as Record_[];

  // Group rows into named series when `series` is provided.
  const grouped = React.useMemo(() => {
    const map = new Map<string, Record_[]>();
    for (const r of rows) {
      const key = series ? str(r[series]) : "默认";
      const arr = map.get(key);
      if (arr) arr.push(r);
      else map.set(key, [r]);
    }
    return Array.from(map.entries());
  }, [rows, series]);

  const labels = React.useMemo(
    () => grouped[0]?.[1].map((r) => str(r[xField])) ?? [],
    [grouped, xField],
  );

  let body: React.ReactNode;
  if (type === "pie") {
    const pieData = rows.map((r) => ({
      label: str(r[xField]),
      value: num(r[yField]),
    }));
    body = <PieChart data={pieData} />;
  } else if (type === "scatter") {
    const scatterData = rows.map((r) => ({
      x: num(r[xField]),
      y: num(r[yField]),
    }));
    body = (
      <ScatterChart
        data={scatterData}
        xLabel={xField}
        yLabel={yField}
        height={height}
      />
    );
  } else if (type === "radar") {
    const axes = labels.length > 0 ? labels : ["A", "B", "C"];
    const radarSeries = grouped.map(([name, recs]) => ({
      name,
      values: recs.map((r) => num(r[yField])),
    }));
    body = <RadarChart axes={axes} series={radarSeries} />;
  } else if (type === "line") {
    const lineSeries = grouped.map(([name, recs]) => ({
      name,
      values: recs.map((r) => num(r[yField])),
    }));
    body = <LineChart series={lineSeries} labels={labels} height={height} />;
  } else if (type === "area") {
    // Multi-series area chart with gradient fill — renders ALL grouped
    // series as overlapping areas, each with its own SVG gradient.
    const areaSeries = grouped.map(([name, recs]) => ({
      name,
      values: recs.map((r) => num(r[yField])),
    }));
    body = (
      <AreaChart series={areaSeries} labels={labels} height={height} gradient />
    );
  } else {
    // bar
    const barData = rows.map((r) => ({
      label: str(r[xField]),
      value: num(r[yField]),
    }));
    body = <BarChart data={barData} height={height} />;
  }

  return (
    <div
      data-slot="chart-suite"
      className={cn("w-full", className)}
      role="figure"
      aria-label={`图表套件 (${type})，共 ${rows.length} 条数据`}
    >
      {rows.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          暂无数据
        </p>
      ) : (
        body
      )}
      <p className="sr-only">
        {type} 图，{rows.length} 条记录，最大值{" "}
        {formatNumber(Math.max(0, ...rows.map((r) => num(r[yField]))))}
      </p>
    </div>
  );
}

export { ChartSuite };
export type { ChartSuiteProps };
