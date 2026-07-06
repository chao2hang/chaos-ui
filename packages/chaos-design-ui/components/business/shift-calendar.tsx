"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export interface Shift {
  id: string;
  employee: string;
  date: string;
  shift: "morning" | "afternoon" | "night" | "off";
}

interface ShiftCalendarProps extends React.ComponentProps<"div"> {
  shifts: Shift[];
  year?: number;
  month?: number;
  onMonthChange?: (year: number, month: number) => void;
  className?: string;
}

const shiftColors: Record<Shift["shift"], string> = {
  morning: "bg-blue-100 text-blue-800",
  afternoon: "bg-orange-100 text-orange-800",
  night: "bg-purple-100 text-purple-800",
  off: "bg-gray-100 text-gray-500",
};

const shiftLabels: Record<Shift["shift"], string> = {
  morning: "早",
  afternoon: "中",
  night: "晚",
  off: "休",
};

function ShiftCalendar({
  shifts,
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  onMonthChange,
  className,
  ...props
}: ShiftCalendarProps) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    const newMonth = month === 1 ? 12 : month - 1;
    const newYear = month === 1 ? year - 1 : year;
    onMonthChange?.(newYear, newMonth);
  };

  const nextMonth = () => {
    const newMonth = month === 12 ? 1 : month + 1;
    const newYear = month === 12 ? year + 1 : year;
    onMonthChange?.(newYear, newMonth);
  };

  return (
    <div
      data-slot="shift-calendar"
      className={cn("space-y-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Button size="icon-sm" variant="outline" onClick={prevMonth}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <span className="text-sm font-semibold">
          {year}年{month}月
        </span>
        <Button size="icon-sm" variant="outline" onClick={nextMonth}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div
            key={d}
            className="text-muted-foreground py-1 text-xs font-medium"
          >
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayShifts = shifts.filter((s) => s.date === dateStr);
          return (
            <div
              key={day}
              className="min-h-[60px] rounded border p-1 text-left"
            >
              <span className="text-muted-foreground text-xs">{day}</span>
              <div className="mt-0.5 space-y-0.5">
                {dayShifts.slice(0, 3).map((s) => (
                  <Badge
                    key={s.id}
                    className={cn(
                      "h-auto px-1 py-0 text-[10px]",
                      shiftColors[s.shift],
                    )}
                  >
                    {s.employee.slice(0, 2)} {shiftLabels[s.shift]}
                  </Badge>
                ))}
                {dayShifts.length > 3 && (
                  <span className="text-muted-foreground text-[10px]">
                    +{dayShifts.length - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ShiftCalendar };
export type { ShiftCalendarProps, Shift };
