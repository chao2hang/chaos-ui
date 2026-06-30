"use client";

import { cn } from "@/lib/utils";

/**
 * @component ApprovalActionBar
 * @category business/bill
 * @since 0.7.0
 * @description 审批操作栏
 * @keywords approval, action, bar
 * @example
 * <ApprovalActionBar />
 */

interface ApprovalActionBarProps {
  onApprove?: () => void;
  onReject?: () => void;
  onTransfer?: () => void;
  status?: string;
  loading?: boolean;
  className?: string;
}

function ApprovalActionBar({ className }: ApprovalActionBarProps) {
  return (
    <div data-slot="approval-action-bar" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ApprovalActionBar };
export type { ApprovalActionBarProps };
