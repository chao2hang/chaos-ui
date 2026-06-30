"use client";

import { cn } from "@/lib/utils";

/**
 * @component PerformanceRankTable
 * @category business/dashboard
 * @since 0.7.0
 * @description 业绩排名表
 * @keywords performance, rank, table
 * @example
 * <PerformanceRankTable />
 */

interface PerformanceRankTableProps {
  rows: Array<{
    id: string;
    rank: number;
    name: string;
    amount: number;
    growth?: number;
  }>;
  className?: string;
}

function PerformanceRankTable({ className }: PerformanceRankTableProps) {
  return (
    <div data-slot="performance-rank-table" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PerformanceRankTable };
export type { PerformanceRankTableProps };
