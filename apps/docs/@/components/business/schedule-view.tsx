"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  resourceId?: string;
}

interface ScheduleViewProps extends React.HTMLAttributes<HTMLDivElement> {
  events: ScheduleEvent[];
  onEventClick?: (event: ScheduleEvent) => void;
  date?: Date;
  className?: string;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8);

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(base: Date): Date[] {
  const start = getWeekStart(base);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getEventPosition(
  event: ScheduleEvent,
  day: Date,
): { top: number; height: number } | null {
  if (!isSameDay(event.start, day)) return null;
  const startHour = event.start.getHours() + event.start.getMinutes() / 60;
  const endHour = event.end.getHours() + event.end.getMinutes() / 60;
  const clampedStart = Math.max(startHour, HOURS[0]);
  const clampedEnd = Math.min(endHour, HOURS[HOURS.length - 1] + 1);
  if (clampedStart >= clampedEnd) return null;
  const top = (clampedStart - HOURS[0]) * 64;
  const height = (clampedEnd - clampedStart) * 64;
  return { top, height: Math.max(height, 20) };
}

function ScheduleView({
  events,
  onEventClick,
  date = new Date(),
  className,
  ...props
}: ScheduleViewProps) {
  const weekDays = React.useMemo(() => getWeekDays(date), [date]);

  return (
    <div
      data-slot="schedule-view"
      className={cn("bg-card overflow-auto rounded-lg border", className)}
      {...props}
    >
      <div className="bg-muted/50 grid grid-cols-[60px_repeat(7,1fr)] border-b">
        <div className="p-2" />
        {weekDays.map((day, i) => (
          <div key={i} className="p-2 text-center text-sm font-medium">
            <div>{DAY_LABELS[i]}</div>
            <div className="text-muted-foreground text-xs">
              {day.getDate()}/{day.getMonth() + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-[60px_repeat(7,1fr)]">
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <div className="text-muted-foreground h-16 border-r border-b pt-1 pr-2 text-right text-xs">
              {String(hour).padStart(2, "0")}:00
            </div>
            {weekDays.map((_, di) => (
              <div key={di} className="h-16 border-r border-b" />
            ))}
          </React.Fragment>
        ))}

        {weekDays.map((day, di) =>
          events
            .map((evt) => {
              const pos = getEventPosition(evt, day);
              if (!pos) return null;
              return (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => onEventClick?.(evt)}
                  className="absolute right-0.5 left-0.5 overflow-hidden rounded border px-1.5 py-0.5 text-left text-xs leading-tight transition-colors hover:opacity-80"
                  style={{
                    top: pos.top,
                    height: pos.height,
                    gridColumn: di + 2,
                    backgroundColor: evt.color ?? "hsl(var(--primary) / 0.15)",
                    borderColor: evt.color ?? "hsl(var(--primary) / 0.3)",
                  }}
                >
                  <div className="truncate font-medium">{evt.title}</div>
                </button>
              );
            })
            .filter(Boolean),
        )}
      </div>
    </div>
  );
}

ScheduleView.displayName = "ScheduleView";

export { ScheduleView };
export type { ScheduleEvent, ScheduleViewProps };
