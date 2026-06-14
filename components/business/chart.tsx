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
import { cn } from "@/lib/utils";

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

function ChartContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("h-[350px] w-full min-w-0", className)}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

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
    <div className="rounded-lg border bg-popover p-2 shadow-md text-sm">
      <p className="font-medium mb-1">{label}</p>
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
