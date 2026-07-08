"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export interface CampaignEvent {
  id: string;
  name: string;
  date: string;
  status: "planned" | "active" | "ended";
}

interface CampaignCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  events: CampaignEvent[];
  year?: number;
  month?: number;
  onMonthChange?: (year: number, month: number) => void;
  className?: string;
}

const statusStyles: Record<CampaignEvent["status"], string> = {
  planned: "bg-blue-100 text-blue-800 border-blue-300",
  active: "bg-green-100 text-green-800 border-green-300",
  ended: "bg-gray-100 text-gray-500 border-gray-300",
};

function CampaignCalendar({
  events,
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  onMonthChange,
  className,
  ...props
}: CampaignCalendarProps) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = () => {
    const m = month === 1 ? 12 : month - 1;
    const y = month === 1 ? year - 1 : year;
    onMonthChange?.(y, m);
  };

  const nextMonth = () => {
    const m = month === 12 ? 1 : month + 1;
    const y = month === 12 ? year + 1 : year;
    onMonthChange?.(y, m);
  };

  return (
    <div
      data-slot="campaign-calendar"
      className={cn("space-y-3", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Button size="icon-sm" variant="outline" onClick={prevMonth}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <span className="font-semibold">
          {year}年{month}月
        </span>
        <Button size="icon-sm" variant="outline" onClick={nextMonth}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <div className="text-muted-foreground grid grid-cols-7 gap-1 text-center text-xs font-medium">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`e${i}`} />
        ))}
        {days.map((day) => {
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = events.filter((e) => e.date === dateStr);
          return (
            <div
              key={day}
              className="hover:border-primary/50 min-h-[70px] rounded border p-1 transition-colors"
            >
              <span className="text-muted-foreground text-xs">{day}</span>
              {dayEvents.map((ev) => (
                <Badge
                  key={ev.id}
                  className={cn(
                    "mt-0.5 block truncate text-[10px]",
                    statusStyles[ev.status],
                  )}
                >
                  {ev.name}
                </Badge>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { CampaignCalendar };
export type { CampaignCalendarProps };
