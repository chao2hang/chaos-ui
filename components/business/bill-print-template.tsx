"use client";

import { cn } from "@/lib/utils";

/**
 * @component BillPrintTemplate
 * @category business/print
 * @since 0.7.0
 * @description 单据打印模板
 * @keywords bill, print, template
 * @example
 * <BillPrintTemplate />
 */

interface BillPrintTemplateProps {
  title: string;
  fields: Array<{ label: string; value: string }>;
  lines?: Array<Record<string, string>>;
  className?: string;
}

function BillPrintTemplate({ className }: BillPrintTemplateProps) {
  return (
    <div data-slot="bill-print-template" className={cn("", className)}>
      {null}
    </div>
  );
}

export { BillPrintTemplate };
export type { BillPrintTemplateProps };
