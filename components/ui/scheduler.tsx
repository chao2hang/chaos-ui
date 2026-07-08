"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SchedulerEvent {
  /** Unique event id / 事件唯一标识 */
  id: string;
  /** Event title / 事件标题 */
  title: string;
  /** Start time (ISO or Date) / 开始时间 */
  start: Date;
  /** End time (ISO or Date) / 结束时间 */
  end: Date;
  /** Event color / 事件颜色 */
  color?: string;
  /** Optional description / 描述 */
  description?: string;
  /** Whether all-day event / 全天事件 */
  allDay?: boolean;
  /** Arbitrary metadata / 额外数据 */
  meta?: Record<string, unknown>;
}

type ViewMode = "day" | "week";

interface SchedulerProps {
  /** Events to display / 事件列表 */
  events?: SchedulerEvent[];
  /** Current view date / 当前视图日期 */
  date?: Date;
  /** Default view mode / 默认视图模式 */
  defaultView?: ViewMode;
  /** View mode (controlled) / 受控视图模式 */
  view?: ViewMode;
  /** Called when view changes / 视图变更回调 */
  onViewChange?: (view: ViewMode) => void;
  /** Called when date changes / 日期变更回调 */
  onDateChange?: (date: Date) => void;
  /** Called when an event is clicked / 事件点击回调 */
  onEventClick?: (event: SchedulerEvent) => void;
  /** Called when a time slot is clicked / 时间槽点击回调 */
  onSlotClick?: (start: Date, end: Date) => void;
  /** Start hour (0-23) / 开始小时 */
  startHour?: number;
  /** End hour (0-23) / 结束小时 */
  endHour?: number;
  /** Hour slot height (px) / 每小时高度 */
  hourHeight?: number;
  /** Additional class / 额外类名 */
  className?: string;
  /** Locale for day names / 星期名称语言 */
  locale?: "zh" | "en";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const DAY_NAMES_ZH = ["日", "一", "二", "三", "四", "五", "六"];
const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Scheduler({
  events = [],
  date: controlledDate,
  defaultView = "week",
  view: controlledView,
  onViewChange,
  onDateChange,
  onEventClick,
  onSlotClick,
  startHour = 7,
  endHour = 20,
  hourHeight = 60,
  className,
  locale = "zh",
}: SchedulerProps) {
  const dayNames = locale === "zh" ? DAY_NAMES_ZH : DAY_NAMES_EN;

  // Date state
  const [internalDate, setInternalDate] = React.useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const currentDate = controlledDate ?? internalDate;

  // View state
  const [internalView, setInternalView] = React.useState<ViewMode>(defaultView);
  const view = controlledView ?? internalView;

  const updateDate = (d: Date) => {
    if (!controlledDate) setInternalDate(d);
    onDateChange?.(d);
  };

  const updateView = (v: ViewMode) => {
    if (!controlledView) setInternalView(v);
    onViewChange?.(v);
  };

  // Navigation
  const navigateDate = (direction: -1 | 1) => {
    const d = new Date(currentDate);
    if (view === "day") {
      d.setDate(d.getDate() + direction);
    } else {
      d.setDate(d.getDate() + direction * 7);
    }
    updateDate(d);
  };

  const goToToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    updateDate(d);
  };

  // Get visible days
  const visibleDays = React.useMemo(() => {
    const days: Date[] = [];
    const start = new Date(currentDate);

    if (view === "day") {
      days.push(new Date(start));
    } else {
      // Go to Sunday (start of week)
      const dayOfWeek = start.getDay();
      const weekStart = new Date(start);
      weekStart.setDate(start.getDate() - dayOfWeek);
      for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        days.push(d);
      }
    }
    return days;
  }, [currentDate, view]);

  // Format header date range
  const formatHeaderRange = (): string => {
    if (view === "day") {
      const d = visibleDays[0];
      if (!d) return "";
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();
      const dn = dayNames[d.getDay()];
      return `${y}年${m}月${day}日 ${dn}`;
    }
    // Week range
    const first = visibleDays[0]!;
    const last = visibleDays[6]!;
    return `${first.getMonth() + 1}/${first.getDate()} — ${last.getMonth() + 1}/${last.getDate()}  ${first.getFullYear()}`;
  };

  // Is today
  const isToday = (d: Date): boolean => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  // Current time indicator position
  const getCurrentTimePosition = (): number | null => {
    const now = new Date();
    const today = visibleDays.find(
      (d) =>
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear(),
    );
    if (!today) return null;

    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const startMinutes = startHour * 60;
    if (minutesSinceMidnight < startMinutes) return null;

    const totalMinutes = (endHour - startHour) * 60;
    const elapsedMinutes = minutesSinceMidnight - startMinutes;
    return (elapsedMinutes / totalMinutes) * 100;
  };

  // Position an event
  const getEventStyle = (
    event: SchedulerEvent,
    colIdx: number,
  ): React.CSSProperties => {
    const startMins = event.start.getHours() * 60 + event.start.getMinutes();
    const endMins = event.end.getHours() * 60 + event.end.getMinutes();
    const totalMins = (endHour - startHour) * 60;
    const startOffsetMins = startMins - startHour * 60;
    const durationMins = endMins - startMins;

    const top = Math.max(0, (startOffsetMins / totalMins) * 100);
    const height = Math.max(4, (durationMins / totalMins) * 100);

    const colCount = view === "week" ? 7 : 1;
    const colWidth = 100 / colCount;

    return {
      top: `${top}%`,
      height: `${height}%`,
      left: `${colIdx * colWidth}%`,
      width: `${colWidth}%`,
      backgroundColor: event.color ?? "var(--color-primary, #3b82f6)",
    };
  };

  // Filter events for visible days
  const filterEventsForDay = (day: Date): SchedulerEvent[] => {
    return events.filter((event) => {
      if (event.allDay) {
        const eventStart = new Date(event.start);
        eventStart.setHours(0, 0, 0, 0);
        const eventEnd = new Date(event.end);
        eventEnd.setHours(23, 59, 59, 999);
        return day.getTime() >= eventStart.getTime() && day.getTime() <= eventEnd.getTime();
      }
      return (
        event.start.getDate() === day.getDate() &&
        event.start.getMonth() === day.getMonth() &&
        event.start.getFullYear() === day.getFullYear()
      );
    });
  };

  const currentTimePos = getCurrentTimePosition();
  const visibleHours = HOURS.slice(startHour, endHour + 1);

  return (
    <div
      data-slot="scheduler"
      className={cn(
        "flex flex-col rounded-lg border bg-background",
        className,
      )}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 border-b px-3 py-2">
        {/* Today button */}
        <button
          type="button"
          onClick={goToToday}
          className={cn(
            "rounded-md border border-input px-2.5 py-1 text-xs font-medium",
            "hover:bg-muted transition-colors",
          )}
        >
          今天
        </button>

        {/* Navigation */}
        <button
          type="button"
          onClick={() => navigateDate(-1)}
          className="rounded p-1 text-muted-foreground hover:text-foreground"
          title="上一个"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => navigateDate(1)}
          className="rounded p-1 text-muted-foreground hover:text-foreground"
          title="下一个"
        >
          <ChevronRightIcon className="size-4" />
        </button>

        {/* Date display */}
        <h3 className="text-sm font-semibold">{formatHeaderRange()}</h3>

        {/* View toggle */}
        <div className="ml-auto flex rounded-md border border-input">
          <button
            type="button"
            onClick={() => updateView("day")}
            className={cn(
              "rounded-l-md px-3 py-1 text-xs font-medium transition-colors",
              view === "day"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            日
          </button>
          <button
            type="button"
            onClick={() => updateView("week")}
            className={cn(
              "rounded-r-md border-l border-input px-3 py-1 text-xs font-medium transition-colors",
              view === "week"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            周
          </button>
        </div>
      </div>

      {/* Day headers (week view) */}
      {view === "week" && (
        <div
          className="grid shrink-0 border-b bg-muted/30"
          style={{ gridTemplateColumns: "48px repeat(7, 1fr)" }}
        >
          <div className="border-r px-1 py-1 text-center text-[10px] text-muted-foreground" />
          {visibleDays.map((day, i) => (
            <div
              key={i}
              className={cn(
                "border-r px-1 py-1 text-center last:border-r-0",
                isToday(day) && "bg-primary/5",
              )}
            >
              <div className="text-xs text-muted-foreground">
                {dayNames[day.getDay()]}
              </div>
              <div
                className={cn(
                  "text-sm font-semibold",
                  isToday(day) && "text-primary",
                )}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All-day events */}
      {events.some((e) => e.allDay) && (
        <div className="shrink-0 border-b bg-muted/10 px-2 py-1">
          <span className="text-[10px] font-medium text-muted-foreground">全天</span>
          <div className="mt-0.5 flex flex-wrap gap-1">
            {events
              .filter((e) => e.allDay)
              .map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onEventClick?.(event)}
                  className={cn(
                    "truncate rounded px-2 py-0.5 text-xs font-medium text-white",
                  )}
                  style={{ backgroundColor: event.color ?? "var(--color-primary, #3b82f6)" }}
                >
                  {event.title}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="relative" style={{ minHeight: (endHour - startHour) * hourHeight }}>
          {/* Time labels */}
          {visibleHours.map((hour) => (
            <div
              key={hour}
              className="absolute left-0 w-12 text-right text-[10px] text-muted-foreground -translate-y-1/2"
              style={{ top: ((hour - startHour) / (endHour - startHour)) * 100 + "%" }}
            >
              {String(hour).padStart(2, "0")}:00
            </div>
          ))}

          {/* Time grid lines */}
          {visibleHours.map((hour) => (
            <div
              key={`line-${hour}`}
              className="absolute left-12 right-0 border-t border-border/40"
              style={{ top: ((hour - startHour) / (endHour - startHour)) * 100 + "%" }}
            />
          ))}

          {/* Day/week columns */}
          <div
            className="ml-12 grid h-full"
            style={{
              gridTemplateColumns: `repeat(${view === "week" ? 7 : 1}, 1fr)`,
            }}
          >
            {visibleDays.map((day, dayIdx) => {
              const dayEvents = filterEventsForDay(day);
              return (
                <div
                  key={dayIdx}
                  className={cn(
                    "relative border-r border-border/40 last:border-r-0",
                    isToday(day) && "bg-primary/[0.02]",
                  )}
                  onClick={(e) => {
                    // Detect click position as time
                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top;
                    const totalHeight = rect.height;
                    const ratio = y / totalHeight;
                    const totalMins = (endHour - startHour) * 60;
                    const clickMins = startHour * 60 + ratio * totalMins;
                    const clickHour = Math.floor(clickMins / 60);
                    const clickMin = Math.round(clickMins % 60);

                    const slotStart = new Date(day);
                    slotStart.setHours(clickHour, clickMin, 0, 0);
                    const slotEnd = new Date(slotStart);
                    slotEnd.setHours(slotEnd.getHours() + 1);
                    onSlotClick?.(slotStart, slotEnd);
                  }}
                >
                  {/* Events */}
                  {dayEvents
                    .filter((e) => !e.allDay)
                    .map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                        className={cn(
                          "absolute left-0.5 right-0.5 overflow-hidden rounded px-1.5 py-0.5",
                          "text-xs font-medium text-white transition-shadow hover:shadow-md",
                        )}
                        style={getEventStyle(event, 0)}
                      >
                        <div className="truncate">{event.title}</div>
                        <div className="truncate text-[10px] opacity-80">
                          {formatEventTime(event)}
                        </div>
                      </button>
                    ))}

                  {/* All-day events */}
                  {dayEvents
                    .filter((e) => e.allDay)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="absolute left-0.5 right-0.5 top-0 z-10 rounded-tr px-1 text-[10px] font-medium text-white"
                        style={{
                          backgroundColor: event.color ?? "var(--color-primary, #3b82f6)",
                          height: 20,
                        }}
                      >
                        <span className="truncate">{event.title}</span>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>

          {/* Current time indicator */}
          {currentTimePos != null && (
            <div
              className="absolute left-12 right-0 z-20 pointer-events-none"
              style={{ top: `${currentTimePos}%` }}
            >
              <div className="relative flex items-center">
                <div className="size-2 -translate-x-1 rounded-full bg-red-500" />
                <div className="h-px flex-1 bg-red-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatEventTime(event: SchedulerEvent): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(event.start.getHours())}:${pad(event.start.getMinutes())} — ${pad(event.end.getHours())}:${pad(event.end.getMinutes())}`;
}

export { Scheduler };
export type { SchedulerProps, SchedulerEvent, ViewMode };
