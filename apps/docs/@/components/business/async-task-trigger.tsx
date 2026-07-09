"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { RefreshCwIcon } from "@chaos_team/chaos-ui/ui";
/**
 * @component AsyncTaskTrigger
 * @category business/dashboard
 * @since 0.7.0
 * @description 异步任务触发器
 */
interface AsyncTaskTriggerProps {
taskType: string;
  params?: Record<string, unknown>;
  onComplete?: (result: unknown) => void;
  children?: React.ReactNode;
  className?: string;
}
function AsyncTaskTrigger({ taskType, params, onComplete, children, className }: AsyncTaskTriggerProps) {
  const [loading, setLoading] = React.useState(false);
  const run = React.useCallback(() => {
    setLoading(true);
    Promise.resolve(onComplete?.({ taskType, params })).finally(() => setLoading(false));
  }, [taskType, params, onComplete]);
  return (
    <div data-slot="async-task-trigger" className={cn("inline-flex items-center gap-2", className)}>
      <Button onClick={run} disabled={loading}>
        <RefreshCwIcon className={cn("size-4", loading && "animate-spin")} />
        {children ?? "执行任务"}
      </Button>
    </div>
  );
}
export { AsyncTaskTrigger };
export type { AsyncTaskTriggerProps };
