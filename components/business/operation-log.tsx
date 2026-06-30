"use client";

import { cn } from "@/lib/utils";

/**
 * @component OperationLog
 * @category business/bill
 * @since 0.7.0
 * @description 操作日志列表
 * @keywords operation, log
 * @example
 * <OperationLog />
 */

interface OperationLogProps {
  logs: Array<{
    id: string;
    action: string;
    operator: string;
    timestamp: string;
    detail?: string;
  }>;
  className?: string;
}

function OperationLog({ className }: OperationLogProps) {
  return (
    <div data-slot="operation-log" className={cn("", className)}>
      {null}
    </div>
  );
}

export { OperationLog };
export type { OperationLogProps };
