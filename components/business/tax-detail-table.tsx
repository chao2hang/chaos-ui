"use client";

import { cn } from "@/lib/utils";

/**
 * @component TaxDetailTable
 * @category business/finance
 * @since 0.7.0
 * @description 税务明细表
 * @keywords tax, detail, table
 * @example
 * <TaxDetailTable />
 */

interface TaxDetailTableProps {
  rows: Array<{
    id: string;
    name: string;
    amount: number;
    taxRate: number;
    taxAmount: number;
  }>;
  className?: string;
}

function TaxDetailTable({ className }: TaxDetailTableProps) {
  return (
    <div data-slot="tax-detail-table" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TaxDetailTable };
export type { TaxDetailTableProps };
