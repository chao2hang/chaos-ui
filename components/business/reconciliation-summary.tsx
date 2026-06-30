"use client";

import { cn } from "@/lib/utils";

/**
 * @component ReconciliationSummary
 * @category business/finance
 * @since 0.7.0
 * @description 对账汇总
 * @keywords reconciliation, summary
 * @example
 * <ReconciliationSummary />
 */

interface ReconciliationSummaryProps {
  totalAmount: number;
  matchedAmount: number;
  unmatchedAmount: number;
  matchedCount: number;
  unmatchedCount: number;
  className?: string;
}

function ReconciliationSummary({ className }: ReconciliationSummaryProps) {
  return (
    <div data-slot="reconciliation-summary" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ReconciliationSummary };
export type { ReconciliationSummaryProps };
