"use client";

import { cn } from "@/lib/utils";

/**
 * @component ResourceSchedule
 * @category business/charts
 * @since 0.7.0
 * @description 资源调度视图
 * @keywords resource, schedule
 * @example
 * <ResourceSchedule />
 */

interface ResourceScheduleProps {
  resources: Array<{ id: string; name: string }>;
  bookings: Array<{
    resourceId: string;
    start: string;
    end: string;
    title: string;
  }>;
  className?: string;
}

function ResourceSchedule({ className }: ResourceScheduleProps) {
  return (
    <div data-slot="resource-schedule" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ResourceSchedule };
export type { ResourceScheduleProps };
