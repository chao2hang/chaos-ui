"use client";

import { cn } from "@/lib/utils";

/**
 * @component WriteoffFlow
 * @category business/finance
 * @since 0.7.0
 * @description 核销流程图
 * @keywords writeoff, flow
 * @example
 * <WriteoffFlow />
 */

interface WriteoffFlowProps {
  steps: Array<{ id: string; name: string; status: string; amount?: number }>;
  className?: string;
}

function WriteoffFlow({ className }: WriteoffFlowProps) {
  return (
    <div data-slot="writeoff-flow" className={cn("", className)}>
      {null}
    </div>
  );
}

export { WriteoffFlow };
export type { WriteoffFlowProps };
