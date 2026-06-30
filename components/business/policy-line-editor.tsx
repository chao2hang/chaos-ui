"use client";

import { cn } from "@/lib/utils";

/**
 * @component PolicyLineEditor
 * @category business/finance
 * @since 0.7.0
 * @description 政策明细编辑器
 * @keywords policy, line, editor
 * @example
 * <PolicyLineEditor />
 */

interface PolicyLineEditorProps {
  rows: Array<{
    id: string;
    name: string;
    type: string;
    condition: string;
    reward: string;
    quota: number;
    used: number;
  }>;
  onChange?: (rows: unknown[]) => void;
  className?: string;
}

function PolicyLineEditor({ className }: PolicyLineEditorProps) {
  return (
    <div data-slot="policy-line-editor" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PolicyLineEditor };
export type { PolicyLineEditorProps };
