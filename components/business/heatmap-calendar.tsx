"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface HeatmapCalendarProps extends React.ComponentProps<"div"> {
  data: Array<{ date: string | Date; value: number }>;
  startDate?: Date;
  endDate?: Date;
  weekStartsOn?: 0 | 1;
  cellSize?: number;
  gap?: number;
  levels?: number;
  className?: string;
  legendClassName?: string;
  showLegend?: boolean;
  colorStops?: [string, string, string, string, string];
}

function formatISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function startOfDay(d: Date) {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

function buildMatrix(
  data: Map<string, number>,
  start: Date,
  end: Date,
  weekStartsOn: 0 | 1,
): { week: number; day: number; date: Date; value: number }[] {
  const map: { week: number; day: number; date: Date; value: number }[] = [];
  const firstSunday = new Date(start);
  const startDay = firstSunday.getDay();
  const offsetToWeekStart = (startDay - weekStartsOn + 7) % 7;
  firstSunday.setDate(firstSunday.getDate() - offsetToWeekStart);
  let week = 0;
  const cursor = new Date(firstSunday);
  while (cursor <= end || cursor.getDay() !== weekStartsOn) {
    const inRange = cursor >= start && cursor <= end;
    if (inRange) {
      const key = formatISO(cursor);
      const value = data.get(key) ?? 0;
      map.push({ week, day: cursor.getDay(), date: new Date(cursor), value });
    }
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === weekStartsOn) week++;
    if (cursor.getFullYear() > end.getFullYear() + 1) break;
  }
  return map;
}

export function HeatmapCalendar({
  data,
  startDate,
  endDate,
  weekStartsOn = 0,
  cellSize = 12,
  gap = 2,
  levels = 5,
  className,
  showLegend = true,
  colorStops,
}: HeatmapCalendarProps) {
  const { t } = useTranslation("chart");
  const [now] = React.useState(() => Date.now());
  const start = startOfDay(
    startDate ?? new Date(now - 365 * 24 * 60 * 60 * 1000),
  );
  const end = startOfDay(endDate ?? new Date(now));
  const map = React.useMemo(() => {
    const m = new Map<string, number>();
    for (const d of data) {
      m.set(
        formatISO(d.date instanceof Date ? d.date : new Date(d.date)),
        d.value,
      );
    }
    return m;
  }, [data]);

  const matrix = React.useMemo(
    () => buildMatrix(map, start, end, weekStartsOn),
    [map, start, end, weekStartsOn],
  );

  const max = Math.max(1, ...data.map((d) => d.value));
  const totalWeeks = matrix.reduce((acc, m) => Math.max(acc, m.week), 0) + 1;

  const getLevel = (v: number) => {
    if (v <= 0) return 0;
    return Math.min(levels, Math.max(1, Math.ceil((v / max) * levels)));
  };

  const palette = colorStops ?? [
    "#ebedf0",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39",
  ];

  const getColor = (level: number) => {
    if (level === 0) return "var(--hm-0, " + palette[0] + ")";
    return "var(--hm-" + level + ", " + palette[level] + ")";
  };

  const monthLabels = React.useMemo(() => {
    const labels: { x: number; label: string }[] = [];
    let lastMonth = -1;
    matrix.forEach((m) => {
      const month = m.date.getMonth();
      if (month !== lastMonth && m.day === weekStartsOn) {
        labels.push({
          x: m.week * (cellSize + gap),
          label: t("heatmapCalendar.monthLabel", {
            count: m.date.getMonth() + 1,
          }),
        });
        lastMonth = month;
      }
    });
    return labels;
  }, [matrix, cellSize, gap, weekStartsOn, t]);

  const dayLabels =
    weekStartsOn === 0
      ? [
          "",
          t("heatmapCalendar.day.mon"),
          "",
          t("heatmapCalendar.day.wed"),
          "",
          t("heatmapCalendar.day.fri"),
          "",
        ]
      : [
          t("heatmapCalendar.day.sun"),
          "",
          t("heatmapCalendar.day.tue"),
          "",
          t("heatmapCalendar.day.thu"),
          "",
          t("heatmapCalendar.day.sat"),
        ];

  return (
    <div
      data-slot="heatmap-calendar"
      className={cn("inline-block", className)}
      style={
        {
          "--hm-0": palette[0],
          "--hm-1": palette[1],
          "--hm-2": palette[2],
          "--hm-3": palette[3],
          "--hm-4": palette[4],
          "--hm-5": palette[4],
        } as React.CSSProperties
      }
    >
      <div className="flex" style={{ gap }}>
        <div
          className="flex flex-col text-[0.6rem] text-muted-foreground"
          style={{ gap, paddingTop: cellSize + gap + 4 }}
        >
          {dayLabels.map((d, i) => (
            <div
              key={i}
              style={{ height: cellSize, lineHeight: `${cellSize}px` }}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="relative mb-1 h-4 text-[0.6rem] text-muted-foreground">
            {monthLabels.map((m, i) => (
              <span key={i} className="absolute" style={{ left: m.x }}>
                {m.label}
              </span>
            ))}
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${totalWeeks}, ${cellSize}px)`,
              gridAutoRows: cellSize,
              gap,
            }}
          >
            {matrix.map((m) => {
              const level = getLevel(m.value);
              return (
                <div
                  key={`${m.week}-${m.day}`}
                  className="rounded-sm"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: getColor(level),
                  }}
                  title={`${formatISO(m.date)}: ${m.value}`}
                />
              );
            })}
          </div>
        </div>
      </div>
      {showLegend && (
        <div className="mt-2 flex items-center justify-end gap-1 text-[0.6rem] text-muted-foreground">
          <span>{t("heatmapCalendar.less")}</span>
          {Array.from({ length: levels }).map((_, i) => (
            <span
              key={i}
              className="inline-block rounded-sm"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: getColor(i),
              }}
            />
          ))}
          <span>{t("heatmapCalendar.more")}</span>
        </div>
      )}
    </div>
  );
}
