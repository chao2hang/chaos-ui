"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { CheckIcon, XIcon, SendIcon } from "@chaos_team/chaos-ui/ui";
/**
 * @component ApprovalActionBar
 * @category business/bill
 * @since 0.7.0
 * @description 审批操作栏
 */
interface ApprovalActionBarProps {
  onApprove?: () => void;
  onReject?: () => void;
  onTransfer?: () => void;
  status?: string;
  loading?: boolean;
  className?: string;
}
function ApprovalActionBar({
  onApprove,
  onReject,
  onTransfer,
  status,
  loading,
  className,
}: ApprovalActionBarProps) {
  return (
    <div
      data-slot="approval-action-bar"
      className={cn(
        "bg-card flex items-center gap-2 rounded-lg border p-3",
        className,
      )}
    >
      {status && (
        <span className="text-muted-foreground mr-auto text-sm">
          当前状态：{status}
        </span>
      )}
      {onTransfer && (
        <Button variant="outline" onClick={onTransfer} disabled={loading}>
          <SendIcon className="size-4" />
          转交
        </Button>
      )}
      {onReject && (
        <Button variant="destructive" onClick={onReject} disabled={loading}>
          <XIcon className="size-4" />
          驳回
        </Button>
      )}
      {onApprove && (
        <Button onClick={onApprove} disabled={loading}>
          <CheckIcon className="size-4" />
          通过
        </Button>
      )}
    </div>
  );
}
export { ApprovalActionBar };
export type { ApprovalActionBarProps };
