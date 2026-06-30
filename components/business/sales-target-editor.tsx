"use client";

import { cn } from "@/lib/utils";

/**
 * @component SalesTargetEditor
 * @category business/finance
 * @since 0.7.0
 * @description 销售目标编辑表
 * @keywords sales, target, editor
 * @example
 * <SalesTargetEditor />
 */

interface SalesTargetEditorProps {
  rows: Array<{
    id: string;
    year: number;
    region: string;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    annual: number;
  }>;
  onChange?: (rows: unknown[]) => void;
  className?: string;
}

function SalesTargetEditor({ className }: SalesTargetEditorProps) {
  return (
    <div data-slot="sales-target-editor" className={cn("", className)}>
      {null}
    </div>
  );
}

export { SalesTargetEditor };
export type { SalesTargetEditorProps };
