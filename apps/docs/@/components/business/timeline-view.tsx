"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { formatDate } from "@chaos_team/chaos-ui/lib";
import { ClockIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component TimelineView
 * @category business/charts
 * @since 0.7.0
 * @description 横向时间线视图。按日期纵向排列事件，每个事件含标题与可选描述。
 * @param events 事件列表（id / date / title / description）
 * @example
 * <TimelineView events={[{ id: "e1", date: "2026-06-30", title: "创建账单" }]} />
 */

interface TimelineViewProps {
  events: Array<{
    id: string;
    date: string;
    title: string;
    description?: string;
  }>;
  className?: string;
}

function TimelineView({ events = [], className }: TimelineViewProps) {
  return (
    <ol
      data-slot="timeline-view"
      className={cn("flex flex-col", className)}
      role="list"
    >
      {events.length === 0 ? (
        <li className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
          <ClockIcon className="size-4" />
          暂无事件
        </li>
      ) : (
        events.map((event, idx) => {
          const isLast = idx === events.length - 1;
          return (
            <li key={event.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-[7px] top-4 bottom-0 w-px bg-border"
                  aria-hidden="true"
                />
              )}
              <span
                className="relative z-10 mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <time
                    dateTime={event.date}
                    className="shrink-0 text-xs font-medium text-primary tabular-nums"
                  >
                    {formatDate(event.date)}
                  </time>
                  <h4 className="truncate text-sm font-medium">{event.title}</h4>
                </div>
                {event.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{event.description}</p>
                )}
              </div>
            </li>
          );
        })
      )}
    </ol>
  );
}

export { TimelineView };
export type { TimelineViewProps };
