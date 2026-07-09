"use client";
import * as React from "react";
import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  BarChart as RBarChart,
  Bar,
  AreaChart as RAreaChart,
  Area,
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@chaos_team/chaos-ui/lib";

const defaultColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

// 品牌色阶梯
const brandColors = [
  "var(--brand-500)",
  "var(--brand-600)",
  "var(--brand-400)",
  "var(--brand-700)",
  "var(--brand-300)",
];

// 状态色
const statusColors = [
  "var(--primary)",
  "var(--success)",
  "var(--warning)",
  "var(--info)",
  "var(--destructive)",
];

type ChartDatum = Record<string, unknown>;

function colorAt(colors: string[], i: number): string {
  return colors[i % colors.length] ?? defaultColors[0] ?? "var(--chart-1)";
}

/**
 * @component ChartContainer
 * @category business/charts
 * @since 0.2.0
 * @description Responsive container wrapper for Recharts charts / Recharts 图表的响应式容器包装
 * @keywords chart, container, responsive, recharts
 * @example
 * <ChartContainer><LineChart data={[]} categories={[]} index="" /></ChartContainer>
 */
function ChartContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("h-[350px] w-full min-w-0", className)}
      data-slot="chart-container"
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

/**
 * @component ChartTooltip
 * @category business/charts
 * @since 0.2.0
 * @description Custom styled tooltip for Recharts with optional value formatter / Recharts 自定义样式悬浮提示，支持值格式化
 * @keywords chart, tooltip, recharts, hover, formatter
 * @example
 * <Tooltip content={<ChartTooltip />} />
 */
function ChartTooltip({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: unknown }>;
  label?: string;
  formatter?: (v: unknown) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover rounded-lg border p-2 text-sm shadow-md">
      <p className="mb-1 font-medium">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-medium">
            {formatter ? formatter(entry.value) : String(entry.value ?? "")}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * @component LineChart
 * @category business/charts
 * @since 0.2.0
 * @description Line chart wrapper around Recharts with branded styling and tooltip support / 基于 Recharts 的折线图封装，品牌配色与悬浮提示
 * @keywords chart, line, trend, recharts, visualization
 * @example
 * <LineChart data={[{ name: "Jan", value: 100 }]} categories={["value"]} index="name" />
 */
function LineChart({
  data,
  categories,
  index,
  colors = defaultColors,
  className,
}: {
  data: ChartDatum[];
  categories: string[];
  index: string;
  colors?: string[];
  className?: string;
}) {
  return (
    <ChartContainer {...(className !== undefined ? { className } : {})}>
      <RLineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="color-mix(in srgb, var(--border) 50%, transparent)"
        />
        <XAxis
          dataKey={index}
          tick={{ fontSize: 12 }}
          stroke="var(--border)"
          tickLine={false}
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="var(--border)"
          tickLine={false}
          className="text-muted-foreground"
        />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        {categories.map((cat, i) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={colorAt(colors, i)}
            strokeWidth={2}
            dot={{ r: 3, fill: colorAt(colors, i) }}
          />
        ))}
      </RLineChart>
    </ChartContainer>
  );
}

/**
 * @component BarChart
 * @category business/charts
 * @since 0.2.0
 * @description Bar chart wrapper around Recharts with optional stacked mode and branded styling / 基于 Recharts 的柱状图封装，支持堆叠模式和品牌配色
 * @keywords chart, bar, stacked, recharts, visualization
 * @example
 * <BarChart data={[{ name: "Q1", sales: 400 }]} categories={["sales"]} index="name" />
 */
function BarChart({
  data,
  categories,
  index,
  colors = defaultColors,
  className,
  stacked = false,
}: {
  data: ChartDatum[];
  categories: string[];
  index: string;
  colors?: string[];
  className?: string;
  stacked?: boolean;
}) {
  return (
    <ChartContainer {...(className !== undefined ? { className } : {})}>
      <RBarChart data={data} barCategoryGap="20%">
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="color-mix(in srgb, var(--border) 50%, transparent)"
        />
        <XAxis
          dataKey={index}
          tick={{ fontSize: 12 }}
          stroke="var(--border)"
          tickLine={false}
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="var(--border)"
          tickLine={false}
          className="text-muted-foreground"
        />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        {categories.map((cat, i) => (
          <Bar
            key={cat}
            dataKey={cat}
            fill={colorAt(colors, i)}
            radius={[4, 4, 0, 0]}
            {...(stacked ? { stackId: "stack" } : {})}
            {...(stacked ? { barSize: 40 } : {})}
          />
        ))}
      </RBarChart>
    </ChartContainer>
  );
}

/**
 * @component AreaChart
 * @category business/charts
 * @since 0.2.0
 * @description Area chart wrapper around Recharts with fill opacity and branded styling / 基于 Recharts 的面积图封装，半透明填充与品牌配色
 * @keywords chart, area, trend, recharts, visualization
 * @example
 * <AreaChart data={[{ name: "Jan", revenue: 2000 }]} categories={["revenue"]} index="name" />
 */
function AreaChart({
  data,
  categories,
  index,
  colors = defaultColors,
  className,
}: {
  data: ChartDatum[];
  categories: string[];
  index: string;
  colors?: string[];
  className?: string;
}) {
  return (
    <ChartContainer {...(className !== undefined ? { className } : {})}>
      <RAreaChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="color-mix(in srgb, var(--border) 50%, transparent)"
        />
        <XAxis
          dataKey={index}
          tick={{ fontSize: 12 }}
          stroke="var(--border)"
          tickLine={false}
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="var(--border)"
          tickLine={false}
          className="text-muted-foreground"
        />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        {categories.map((cat, i) => (
          <Area
            key={cat}
            type="monotone"
            dataKey={cat}
            fill={colorAt(colors, i)}
            fillOpacity={0.15}
            stroke={colorAt(colors, i)}
            strokeWidth={2}
          />
        ))}
      </RAreaChart>
    </ChartContainer>
  );
}

/**
 * @component PieChart
 * @category business/charts
 * @since 0.2.0
 * @description Pie chart wrapper around Recharts with segmented coloring and label support / 基于 Recharts 的饼图封装，分段着色与标签
 * @keywords chart, pie, donut, recharts, visualization
 * @example
 * <PieChart data={[{ name: "Ads", value: 400 }]} category="value" index="name" />
 */
function PieChart({
  data,
  category,
  index,
  colors = defaultColors,
  className,
}: {
  data: ChartDatum[];
  category: string;
  index: string;
  colors?: string[];
  className?: string;
}) {
  return (
    <ChartContainer {...(className !== undefined ? { className } : {})}>
      <RPieChart>
        <Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colorAt(colors, i)} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend />
      </RPieChart>
    </ChartContainer>
  );
}

export {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  ChartContainer,
  ChartTooltip,
  defaultColors,
  brandColors,
  statusColors,
};
