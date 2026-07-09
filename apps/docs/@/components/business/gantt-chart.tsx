"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";

/**
 * @component GanttChart
 * @category business/charts
 * @since 0.7.0
 * @description 甘特图 — task bars positioned over a day-based time axis.
 * @param tasks Tasks with id/name/start/end (ISO date) and optional progress.
 * @param className Extra classes on the root.
 * @example
 * <GanttChart tasks={[{id:"1",name:"设计",start:"2026-06-01",end:"2026-06-05"}]} />
 */

interface GanttChartProps {
  tasks: Array<{
    id: string;
    name: string;
    start: string;
    end: string;
    progress?: number;
  }>;
  className?: string;
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function GanttChart({ tasks, className }: GanttChartProps) {
  const dates = React.useMemo(() => {
    if (tasks.length === 0) return { min: 0, span: 1, start: new Date() };
    const starts = tasks.map((t) => new Date(t.start));
    const ends = tasks.map((t) => new Date(t.end));
    const min = Math.min(...starts.map((d) => d.getTime()));
    const max = Math.max(...ends.map((d) => d.getTime()));
    const start = new Date(min);
    start.setHours(0, 0, 0, 0);
    const span = Math.max(1, daysBetween(start, new Date(max)) + 1);
    return { min, span, start };
  }, [tasks]);

  const colWidth = 28;

  const headerDays = React.useMemo(() => {
    const arr: { label: string; idx: number }[] = [];
    for (let i = 0; i < dates.span; i++) {
      const d = new Date(dates.start);
      d.setDate(d.getDate() + i);
      arr.push({ label: String(d.getDate()), idx: i });
    }
    return arr;
  }, [dates]);

  return (
    <div
      data-slot="gantt-chart"
      className={cn("w-full overflow-x-auto rounded-lg border bg-card p-2 text-sm", className)}
      role="table"
      aria-label={`甘特图，共 ${tasks.length} 个任务`}
    >
      <div role="row" className="flex border-b pb-1" style={{ minWidth: 96 + dates.span * colWidth }}>
        <span role="cell" className="w-24 shrink-0 text-xs text-muted-foreground">
          任务
        </span>
        {headerDays.map((d) => (
          <span
            key={d.idx}
            role="columnheader"
            className="shrink-0 text-center text-[10px] text-muted-foreground"
            style={{ width: colWidth }}
          >
            {d.label}
          </span>
        ))}
      </div>
      {tasks.length === 0 ? (
        <p className="py-4 text-center text-xs text-muted-foreground">无任务</p>
      ) : (
        tasks.map((t) => {
          const s = new Date(t.start);
          s.setHours(0, 0, 0, 0);
          const offset = Math.max(0, daysBetween(dates.start, s));
          const dur = Math.max(1, daysBetween(new Date(t.start), new Date(t.end)) + 1);
          const progress = Math.min(100, Math.max(0, t.progress ?? 0));
          return (
            <div
              key={t.id}
              role="row"
              className="flex items-center border-b py-1"
            >
              <span
                role="cell"
                className="w-24 shrink-0 truncate text-xs"
                title={t.name}
              >
                {t.name}
              </span>
              <div className="relative flex-1" style={{ height: 18 }}>
                <div
                  role="cell"
                  className="absolute top-1/2 -translate-y-1/2 overflow-hidden rounded bg-primary/15 ring-1 ring-primary/40"
                  style={{
                    left: offset * colWidth,
                    width: dur * colWidth,
                  }}
                  title={`${formatDate(t.start)} → ${formatDate(t.end)}`}
                >
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export { GanttChart };
export type { GanttChartProps };
