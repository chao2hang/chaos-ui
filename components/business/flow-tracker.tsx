"use client";

import { cn } from "@/lib/utils";

/**
 * @component FlowTracker
 * @category business/bill
 * @since 0.7.0
 * @description 流程跟踪器
 * @keywords flow, tracker
 * @example
 * <FlowTracker />
 */

interface FlowTrackerProps {
  steps: Array<{
    id: string;
    name: string;
    status: "pending" | "active" | "done" | "rejected";
    operator?: string;
    time?: string;
  }>;
  className?: string;
}

function FlowTracker({ className }: FlowTrackerProps) {
  return (
    <div data-slot="flow-tracker" className={cn("", className)}>
      {null}
    </div>
  );
}

export { FlowTracker };
export type { FlowTrackerProps };
