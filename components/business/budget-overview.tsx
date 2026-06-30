"use client";

import { cn } from "@/lib/utils";

/**
 * @component BudgetOverview
 * @category business/finance
 * @since 0.7.0
 * @description 预算概览
 * @keywords budget, overview
 * @example
 * <BudgetOverview />
 */

interface BudgetOverviewProps {
  total: number;
  used: number;
  remaining: number;
  categories: Array<{ name: string; budget: number; actual: number }>;
  className?: string;
}

function BudgetOverview({ className }: BudgetOverviewProps) {
  return (
    <div data-slot="budget-overview" className={cn("", className)}>
      {null}
    </div>
  );
}

export { BudgetOverview };
export type { BudgetOverviewProps };
