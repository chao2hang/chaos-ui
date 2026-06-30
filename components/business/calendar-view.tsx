"use client";

import { cn } from "@/lib/utils";

/**
 * @component CalendarView
 * @category business/charts
 * @since 0.7.0
 * @description 日历视图
 * @keywords calendar, view
 * @example
 * <CalendarView />
 */

interface CalendarViewProps {
  events: Array<{ id: string; date: string; title: string; color?: string }>;
  onDateSelect?: (date: string) => void;
  className?: string;
}

function CalendarView({ className }: CalendarViewProps) {
  return (
    <div data-slot="calendar-view" className={cn("", className)}>
      {null}
    </div>
  );
}

export { CalendarView };
export type { CalendarViewProps };
