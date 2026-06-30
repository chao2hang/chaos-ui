"use client";

import { cn } from "@/lib/utils";

/**
 * @component BillTimeline
 * @category business/bill
 * @since 0.7.0
 * @description 单据时间线
 * @keywords bill, timeline
 * @example
 * <BillTimeline />
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

function BillTimeline({ className }: BillTimelineProps) {
  return (
    <div data-slot="bill-timeline" className={cn("", className)}>
      {null}
    </div>
  );
}

export { BillTimeline };
export type { BillTimelineProps };
