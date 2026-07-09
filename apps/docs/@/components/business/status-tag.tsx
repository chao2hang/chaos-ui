"use client";

import { Badge } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

type Status =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";

const statusConfig: Record<Status, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  pending: { label: "Pending", className: "bg-warning/15 text-warning" },
  approved: { label: "Approved", className: "bg-info/15 text-info" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive" },
  completed: { label: "Completed", className: "bg-success/15 text-success" },
  cancelled: { label: "Cancelled", className: "bg-muted text-muted-foreground line-through" },
};

interface StatusTagProps {
  status: Status | string;
  size?: "sm" | "default";
  /** Custom label — overrides the default status label / 自定义标签文本 */
  label?: string;
}

/**
 * @component StatusTag
 * @category business/ux
 * @since 0.2.0
 * @description Color-coded status badge for workflow states (draft, pending, approved, rejected, completed, cancelled) / 带颜色编码的工作流状态徽章（草稿、待处理、已批准、已拒绝、已完成、已取消）
 * @keywords status, tag, badge, workflow, state
 * @example
 * <StatusTag status="approved" />
 */
function StatusTag({ status, size = "default", label }: StatusTagProps) {
  const key = status.toLowerCase() as Status;
  const config = statusConfig[key] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return (
    <Badge
      data-slot="status-tag"
      className={cn(
        config.className,
        size === "sm" && "h-4 px-1.5 text-[0.65rem]",
      )}
    >
      {label ?? config.label}
    </Badge>
  );
}

export { StatusTag, statusConfig };
export type { Status, StatusTagProps };