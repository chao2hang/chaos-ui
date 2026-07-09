"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui";

/**
 * @component CalendarView
 * @category business/charts
 * @since 0.7.0
 * @description 日历视图 — month grid with event dots and keyboard-navigable dates.
 * @param events Events keyed by ISO date (`YYYY-MM-DD`).
 * @param onDateSelect Called when a date cell is selected.
 * @param className Extra classes on the root.
 * @example
 * <CalendarView events={[{id:"1",date:"2026-06-15",title:"盘点"}]} />
 */

interface CalendarViewProps {
  events: Array<{ id: string; date: string; title: string; color?: string }>;
  onDateSelect?: (date: string) => void;
  className?: string;
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function toIso(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function eventsByDate(
  events: CalendarViewProps["events"],
): Map<string, CalendarViewProps["events"]> {
  const map = new Map<string, CalendarViewProps["events"]>();
  if (!events || !Array.isArray(events)) return map;
  for (const e of events) {
    const list = map.get(e.date);
    if (list) list.push(e);
    else map.set(e.date, [e]);
  }
  return map;
}

function CalendarView({
  events,
  onDateSelect,
  className,
}: CalendarViewProps) {
  const today = new Date();
  const [cursor, setCursor] = React.useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = React.useState<string | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventMap = React.useMemo(() => eventsByDate(events), [events]);
  const todayIso = toIso(today);

  const cells: Array<{ date: Date | null; iso: string | null }> = [];
  for (let i = 0; i < firstDay; i++) cells.push({ date: null, iso: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, iso: toIso(date) });
  }
  while (cells.length % 7 !== 0) cells.push({ date: null, iso: null });

  const go = (delta: number) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));

  const choose = (iso: string) => {
    setSelected(iso);
    onDateSelect?.(iso);
  };

  const onKeyDown = (
    e: React.KeyboardEvent,
    iso: string | null,
  ) => {
    if (!iso) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(iso);
    }
  };

  const monthLabel = `${year}年${month + 1}月`;

  return (
    <div
      data-slot="calendar-view"
      className={cn("w-full rounded-lg border bg-card p-3 text-sm", className)}
    >
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="上一月"
          className="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted"
          onClick={() => go(-1)}
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <span className="font-medium" aria-live="polite">
          {monthLabel}
        </span>
        <button
          type="button"
          aria-label="下一月"
          className="inline-flex size-7 items-center justify-center rounded-md hover:bg-muted"
          onClick={() => go(1)}
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
      <div
        className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground"
        role="row"
      >
        {WEEKDAYS.map((w) => (
          <span key={w} role="columnheader" className="py-1">
            {w}
          </span>
        ))}
      </div>
      <div
        className="mt-1 grid grid-cols-7 gap-1"
        role="grid"
        aria-label={`${monthLabel} 日历`}
      >
        {cells.map((cell, i) => {
          if (!cell.date || !cell.iso) {
            return <span key={i} role="gridcell" aria-hidden="true" />;
          }
          const iso = cell.iso;
          const dayEvents = eventMap.get(iso) ?? [];
          const isToday = iso === todayIso;
          const isSelected = iso === selected;
          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              tabIndex={0}
              aria-label={`${iso}${dayEvents.length ? `，${dayEvents.length}个事件` : ""}`}
              aria-pressed={isSelected}
              onKeyDown={(e) => onKeyDown(e, iso)}
              onClick={() => choose(iso)}
              className={cn(
                "flex min-h-9 flex-col items-center justify-center rounded-md border border-transparent text-sm tabular-nums hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isToday && "border-primary font-semibold",
                isSelected && "bg-primary text-primary-foreground",
              )}
            >
              {cell.date.getDate()}
              {dayEvents.length > 0 && (
                <span className="mt-0.5 flex gap-0.5" aria-hidden="true">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <span
                      key={ev.id}
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: ev.color ?? "currentColor" }}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {selected && (
        <ul className="mt-3 border-t pt-2" role="list" aria-live="polite">
          {(eventMap.get(selected) ?? []).length === 0 && (
            <li className="text-xs text-muted-foreground">{selected} 无事件</li>
          )}
          {eventMap.get(selected)?.map((ev) => (
            <li
              key={ev.id}
              className="flex items-center gap-1.5 py-0.5 text-xs"
            >
              <span
                className="size-2 rounded-sm"
                style={{ backgroundColor: ev.color ?? "#3b82f6" }}
                aria-hidden="true"
              />
              {ev.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { CalendarView };
export type { CalendarViewProps };
