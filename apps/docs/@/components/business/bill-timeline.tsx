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
function BillTimeline({ events, className }: BillTimelineProps) {
  return (
    <ol data-slot="bill-timeline" className={cn("flex flex-col gap-3", className)}>
      {events.map((e) => (
        <li key={e.id} className="relative flex gap-3 pl-4">
          <span className="absolute left-0 top-1.5 size-2 rounded-full bg-primary" />
          <span className="absolute left-[3px] top-4 h-full w-px bg-border" />
          <div>
            <div className="text-sm font-medium">{e.title}</div>
            {e.description && <div className="text-xs text-muted-foreground">{e.description}</div>}
            <div className="mt-0.5 text-xs text-muted-foreground">{formatDateTime(e.timestamp)}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
export { BillTimeline };
export type { BillTimelineProps };
