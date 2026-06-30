"use client";

import { cn } from "@/lib/utils";

/**
 * @component ApprovalFlow
 * @category business/bill
 * @since 0.7.0
 * @description 审批流程图
 * @keywords approval, flow
 * @example
 * <ApprovalFlow />
 */

interface ApprovalFlowProps {
  nodes: Array<{ id: string; name: string; type: string; status?: string }>;
  edges: Array<{ from: string; to: string }>;
  className?: string;
}

function ApprovalFlow({ className }: ApprovalFlowProps) {
  return (
    <div data-slot="approval-flow" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ApprovalFlow };
export type { ApprovalFlowProps };
