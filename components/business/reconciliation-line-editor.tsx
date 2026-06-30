"use client";

import { cn } from "@/lib/utils";

/**
 * @component ReconciliationLineEditor
 * @category business/finance
 * @since 0.7.0
 * @description 对账明细编辑器
 * @keywords reconciliation, line, editor
 * @example
 * <ReconciliationLineEditor />
 */

interface ReconciliationLineEditorProps {
  rows: Array<{
    id: string;
    distributor: string;
    orderAmount: number;
    deduction: number;
    netAmount: number;
  }>;
  onChange?: (rows: unknown[]) => void;
  className?: string;
}

function ReconciliationLineEditor({
  className,
}: ReconciliationLineEditorProps) {
  return (
    <div data-slot="reconciliation-line-editor" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ReconciliationLineEditor };
export type { ReconciliationLineEditorProps };
