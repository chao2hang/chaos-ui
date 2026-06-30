"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component AsyncTaskTrigger
 * @category business/dashboard
 * @since 0.7.0
 * @description 异步任务触发器
 * @keywords async, task, trigger
 * @example
 * <AsyncTaskTrigger />
 */

interface AsyncTaskTriggerProps {
  taskType: string;
  params?: Record<string, unknown>;
  onComplete?: (result: unknown) => void;
  children?: React.ReactNode;
  className?: string;
}

function AsyncTaskTrigger({ className }: AsyncTaskTriggerProps) {
  return (
    <div data-slot="async-task-trigger" className={cn("", className)}>
      {null}
    </div>
  );
}

export { AsyncTaskTrigger };
export type { AsyncTaskTriggerProps };
