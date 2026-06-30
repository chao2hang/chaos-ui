"use client";

import { cn } from "@/lib/utils";

/**
 * @component InvoiceSummary
 * @category business/finance
 * @since 0.7.0
 * @description 发票汇总
 * @keywords invoice, summary
 * @example
 * <InvoiceSummary />
 */

interface InvoiceSummaryProps {
  total: number;
  issued: number;
  pending: number;
  amount: number;
  className?: string;
}

function InvoiceSummary({ className }: InvoiceSummaryProps) {
  return (
    <div data-slot="invoice-summary" className={cn("", className)}>
      {null}
    </div>
  );
}

export { InvoiceSummary };
export type { InvoiceSummaryProps };
