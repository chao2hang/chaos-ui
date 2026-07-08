"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

/**
 * @component AttendanceCalendar
 * @category business/hr
 * @since 1.0.0
 * @description Monthly attendance calendar with color-coded status indicators,
 * exception markers, and summary statistics. Supports punch-in/out times
 * display and anomaly highlighting (late, early leave, absent).
 * @keywords attendance, calendar, hr, punch, time, tracking, anomaly
 */

type AttendanceStatus =
  "present" | "absent" | "late" | "leave" | "holiday" | "weekend";

interface AttendanceRecord {
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  workHours?: number;
  note?: string;
}

interface AttendanceCalendarProps {
  year?: number;
  month?: number;
  records: AttendanceRecord[];
  onMonthChange?: (year: number, month: number) => void;
  onDayClick?: (record: AttendanceRecord) => void;
  className?: string;
}

const statusConfig: Record<
  AttendanceStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  present: {
    label: "Present",
    bg: "bg-green-100 dark:bg-green-950/30",
    text: "text-green-700 dark:text-green-400",
    dot: "bg-green-500",
  },
  absent: {
    label: "Absent",
    bg: "bg-red-100 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    dot: "bg-red-500",
  },
  late: {
    label: "Late",
    bg: "bg-yellow-100 dark:bg-yellow-950/30",
    text: "text-yellow-700 dark:text-yellow-400",
    dot: "bg-yellow-500",
  },
  leave: {
    label: "Leave",
    bg: "bg-blue-100 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  holiday: {
    label: "Holiday",
    bg: "bg-purple-100 dark:bg-purple-950/30",
    text: "text-purple-700 dark:text-purple-400",
    dot: "bg-purple-500",
  },
  weekend: {
    label: "Weekend",
    bg: "bg-muted/50",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const days: { date: string | null; day: number }[] = [];
  for (let i = 0; i < startOffset; i++) days.push({ date: null, day: 0 });
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ date: dateStr, day: d });
  }
  return days;
}

function AttendanceCalendar({
  year: propYear,
  month: propMonth,
  records = [],
  onMonthChange,
  onDayClick,
  className,
}: AttendanceCalendarProps) {
  const now = new Date();
  const [year, setYear] = React.useState(propYear ?? now.getFullYear());
  const [month, setMonth] = React.useState(propMonth ?? now.getMonth());

  const recordsMap = React.useMemo(() => {
    const map = new Map<string, AttendanceRecord>();
    for (const r of records) map.set(r.date, r);
    return map;
  }, [records]);

  const days = React.useMemo(
    () => buildCalendarDays(year, month),
    [year, month],
  );
  const monthName = new Date(year, month, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const stats = React.useMemo(() => {
    const counts: Record<AttendanceStatus, number> = {
      present: 0,
      absent: 0,
      late: 0,
      leave: 0,
      holiday: 0,
      weekend: 0,
    };
    for (const r of records) {
      if (
        new Date(r.date).getMonth() === month &&
        new Date(r.date).getFullYear() === year
      ) {
        counts[r.status]++;
      }
    }
    return counts;
  }, [records, month, year]);

  const handlePrevMonth = () => {
    const m = month - 1;
    if (m < 0) {
      setYear(year - 1);
      setMonth(11);
      onMonthChange?.(year - 1, 11);
    } else {
      setMonth(m);
      onMonthChange?.(year, m);
    }
  };

  const handleNextMonth = () => {
    const m = month + 1;
    if (m > 11) {
      setYear(year + 1);
      setMonth(0);
      onMonthChange?.(year + 1, 0);
    } else {
      setMonth(m);
      onMonthChange?.(year, m);
    }
  };

  return (
    <div
      data-slot="attendance-calendar"
      className={cn("border-border bg-card rounded-lg border p-4", className)}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-foreground text-lg font-semibold">{monthName}</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="hover:bg-muted rounded p-1"
            aria-label="Previous month"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="hover:bg-muted rounded p-1"
            aria-label="Next month"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mb-3 flex flex-wrap gap-2">
        {(Object.keys(statusConfig) as AttendanceStatus[]).map((status) => {
          if (stats[status] === 0 && status !== "weekend") return null;
          return (
            <div key={status} className="flex items-center gap-1 text-xs">
              <span
                className={cn("size-2 rounded-full", statusConfig[status].dot)}
              />
              <span className="text-muted-foreground">
                {statusConfig[status].label}
              </span>
              <span className="text-foreground font-medium">
                {stats[status]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-muted-foreground pb-1 text-center text-[10px] font-medium"
          >
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          if (!d.date) return <div key={i} className="h-16" />;
          const record = recordsMap.get(d.date);
          const dayOfWeek = new Date(d.date).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const status: AttendanceStatus =
            record?.status ?? (isWeekend ? "weekend" : "absent");
          const config = statusConfig[status];
          return (
            <button
              key={i}
              type="button"
              data-slot="attendance-day"
              data-status={status}
              onClick={() => record && onDayClick?.(record)}
              className={cn(
                "flex h-16 flex-col items-start rounded-md border p-1 text-left transition-colors",
                config.bg,
                record
                  ? "hover:ring-primary cursor-pointer hover:ring-1"
                  : "cursor-default",
              )}
            >
              <span className={cn("text-xs font-medium", config.text)}>
                {d.day}
              </span>
              {record && (
                <div className="mt-0.5 flex-1 text-[9px]">
                  {record.checkIn && (
                    <div className={config.text}>In: {record.checkIn}</div>
                  )}
                  {record.checkOut && (
                    <div className={config.text}>Out: {record.checkOut}</div>
                  )}
                  {record.note && (
                    <div className={cn("truncate", config.text)}>
                      {record.note}
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { AttendanceCalendar };
export type { AttendanceCalendarProps, AttendanceRecord, AttendanceStatus };
