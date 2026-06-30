"use client";

import { cn } from "@/lib/utils";

/**
 * @component PoolTrackerTable
 * @category business/dashboard
 * @since 0.7.0
 * @description 资金池跟踪表
 * @keywords pool, tracker, table
 * @example
 * <PoolTrackerTable />
 */

interface PoolTrackerTableProps {
  pools: Array<{
    id: string;
    name: string;
    total: number;
    used: number;
    available: number;
  }>;
  className?: string;
}

function PoolTrackerTable({ className }: PoolTrackerTableProps) {
  return (
    <div data-slot="pool-tracker-table" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PoolTrackerTable };
export type { PoolTrackerTableProps };
