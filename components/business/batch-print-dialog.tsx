"use client";

import { cn } from "@/lib/utils";

/**
 * @component BatchPrintDialog
 * @category business/print
 * @since 0.7.0
 * @description 批量打印弹窗
 * @keywords batch, print, dialog
 * @example
 * <BatchPrintDialog />
 */

interface BatchPrintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Array<{ id: string; title: string }>;
  onPrint?: (ids: string[]) => void;
  className?: string;
}

function BatchPrintDialog({ className }: BatchPrintDialogProps) {
  return (
    <div data-slot="batch-print-dialog" className={cn("", className)}>
      {null}
    </div>
  );
}

export { BatchPrintDialog };
export type { BatchPrintDialogProps };
