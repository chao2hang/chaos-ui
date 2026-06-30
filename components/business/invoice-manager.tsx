"use client";

import { cn } from "@/lib/utils";

/**
 * @component InvoiceManager
 * @category business/finance
 * @since 0.7.0
 * @description 发票管理
 * @keywords invoice, manager
 * @example
 * <InvoiceManager />
 */

interface InvoiceManagerProps {
  invoices: Array<{
    id: string;
    number: string;
    amount: number;
    status: string;
  }>;
  onIssue?: (id: string) => void;
  className?: string;
}

function InvoiceManager({ className }: InvoiceManagerProps) {
  return (
    <div data-slot="invoice-manager" className={cn("", className)}>
      {null}
    </div>
  );
}

export { InvoiceManager };
export type { InvoiceManagerProps };
