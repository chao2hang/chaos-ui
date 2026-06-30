"use client";

import { cn } from "@/lib/utils";

/**
 * @component TimelineView
 * @category business/charts
 * @since 0.7.0
 * @description 横向时间线视图
 * @keywords timeline, view
 * @example
 * <TimelineView />
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

function TimelineView({ className }: TimelineViewProps) {
  return (
    <div data-slot="timeline-view" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TimelineView };
export type { TimelineViewProps };
