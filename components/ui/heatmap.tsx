"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A single data point in the heatmap.
 */
interface HeatmapPoint {
  /** Date string in YYYY-MM-DD format / YYYY-MM-DD 格式的日期字符串 */
  date: string;
  /** Value for the cell / 单元格的值 */
  value: number;
}

/**
 * Props for the Heatmap component.
 */
interface HeatmapProps {
  /** Data points for the heatmap / 热力图数据点 */
  data: HeatmapPoint[];
  /** Start date (YYYY-MM-DD) / 起始日期 */
  startDate?: string;
  /** End date (YYYY-MM-DD) / 结束日期 */
  endDate?: string;
  /** Color scale array (default: green scale) / 颜色梯度数组 */
  colorScale?: string[];
  /** Additional className / 额外类名 */
  className?: string;
  /** Callback when a cell is clicked / 单元格点击回调 */
  onCellClick?: (point: HeatmapPoint) => void;
  /** Cell size in pixels (default: 12) / 单元格大小 */
  cellSize?: number;
  /** Gap between cells in pixels (default: 2) / 单元格间距 */
  gap?: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseDate(s: string): Date {
  const parts = s.split("-").map(Number);
  const y = parts[0] ?? 0;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  return new Date(y, m - 1, d);
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getWeeks(startDate: Date, endDate: Date): Date[][] {
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  // Align to start of week (Sunday)
  const start = new Date(startDate);
  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  const cursor = new Date(start);
  while (cursor <= endDate) {
    currentWeek.push(new Date(cursor));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }
  return weeks;
}

function getIntensityColor(
  value: number,
  max: number,
  colorScale: string[],
): string {
  if (value === 0 || max === 0) return colorScale[0] ?? "";
  const ratio = value / max;
  const idx = Math.min(
    Math.ceil(ratio * (colorScale.length - 1)),
    colorScale.length - 1,
  );
  return colorScale[idx] ?? "";
}

const DEFAULT_COLOR_SCALE = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

/* ------------------------------------------------------------------ */
/*  Heatmap - main export                                             */
/* ------------------------------------------------------------------ */

/**
 * @component Heatmap
 * @category ui/data-visualization
 * @since 0.2.0
 * @description Generic GitHub-style calendar heatmap with week columns,
 *   day rows, month labels, and day labels. Color intensity scales with
 *   value thresholds. / 通用 GitHub 风格日历热力图，包含周列、日行、月份标签
 *   和星期标签，颜色强度根据数值阈值渐变。
 * @keywords heatmap, calendar, contribution, grid, chart, github
 * @example
 * ```tsx
 * <Heatmap
 *   data={[{ date: "2024-01-01", value: 3 }]}
 *   startDate="2024-01-01"
 *   endDate="2024-03-01"
 *   onCellClick={(p) => console.log(p)}
 * />
 * ```
 */
function Heatmap({
  data,
  startDate,
  endDate,
  colorScale = DEFAULT_COLOR_SCALE,
  className,
  onCellClick,
  cellSize = 12,
  gap = 2,
}: HeatmapProps) {
  const dataMap = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const point of data) {
      map.set(point.date, point.value);
    }
    return map;
  }, [data]);

  const max = React.useMemo(
    () => Math.max(1, ...data.map((d) => d.value)),
    [data],
  );

  const { weeks, monthLabels } = React.useMemo(() => {
    const today = new Date();
    const end = endDate ? parseDate(endDate) : today;
    const start = startDate
      ? parseDate(startDate)
      : new Date(end.getTime() - 365 * 24 * 60 * 60 * 1000);

    const ws = getWeeks(start, end);

    // Compute month labels
    const labels: { month: number; x: number }[] = [];
    let lastMonth = -1;
    ws.forEach((week, wIdx) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const month = firstDay.getMonth();
      if (month !== lastMonth) {
        labels.push({ month, x: wIdx });
        lastMonth = month;
      }
    });

    return { weeks: ws, monthLabels: labels };
  }, [startDate, endDate]);

  const totalWidth = weeks.length * (cellSize + gap);
  const labelHeight = 16;
  const leftLabelWidth = 28;

  return (
    <div data-slot="heatmap" className={cn("overflow-x-auto", className)}>
      <div
        className="inline-block"
        style={{ minWidth: totalWidth + leftLabelWidth }}
      >
        {/* Month labels */}
        <div
          className="relative flex"
          style={{ height: labelHeight, paddingLeft: leftLabelWidth }}
        >
          {monthLabels.map(({ month, x }) => (
            <span
              key={month + "-" + x}
              className="text-muted-foreground absolute text-xs"
              style={{ left: leftLabelWidth + x * (cellSize + gap) }}
            >
              {MONTH_LABELS[month] ?? ""}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Day labels on the left */}
          <div
            className="flex shrink-0 flex-col"
            style={{ width: leftLabelWidth }}
          >
            {DAY_LABELS.map((day, idx) => (
              <div
                key={day}
                className="text-muted-foreground flex items-center text-xs"
                style={{ height: cellSize + gap }}
              >
                {idx % 2 === 1 ? day : ""}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col" style={{ gap }}>
                {week.map((date, dIdx) => {
                  const dateStr = formatDate(date);
                  const value = dataMap.get(dateStr) ?? 0;
                  const color = getIntensityColor(value, max, colorScale);
                  const point: HeatmapPoint = { date: dateStr, value };
                  return (
                    <div
                      key={dIdx}
                      className="cursor-pointer rounded-sm transition-transform hover:scale-110"
                      style={{
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: color,
                      }}
                      title={`${dateStr}: ${value}`}
                      onClick={() => onCellClick?.(point)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          className="text-muted-foreground mt-2 flex items-center justify-end gap-1 text-xs"
          style={{ paddingLeft: leftLabelWidth }}
        >
          <span className="mr-1">Less</span>
          {colorScale.map((color, idx) => (
            <div
              key={idx}
              className="rounded-sm"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: color,
              }}
            />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  );
}

export { Heatmap };
export type { HeatmapPoint, HeatmapProps };
