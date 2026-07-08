"use client";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/format";
/**
 * @component BillTimeline
 * @category business/bill
 * @since 0.7.0
 * @description 单据时间线
 */
interface BillTimelineProps {
  events: Array<{
    id: string;
    title: string;
    description?: string;
    timestamp: string;
    status?: string;
  }>;
  className?: string;
}
function BillTimeline({ events = [], className }: BillTimelineProps) {
  return (
    <ol
      data-slot="bill-timeline"
      className={cn("flex flex-col gap-3", className)}
    >
      {events.map((e) => (
        <li key={e.id} className="relative flex gap-3 pl-4">
          <span className="bg-primary absolute top-1.5 left-0 size-2 rounded-full" />
          <span className="bg-border absolute top-4 left-[3px] h-full w-px" />
          <div>
            <div className="text-sm font-medium">{e.title}</div>
            {e.description && (
              <div className="text-muted-foreground text-xs">
                {e.description}
              </div>
            )}
            <div className="text-muted-foreground mt-0.5 text-xs">
              {formatDateTime(e.timestamp)}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
export { BillTimeline };
export type { BillTimelineProps };
