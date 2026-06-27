"use client";

import * as React from "react";
import { CheckCircle2, Clock, FileEdit, XCircle, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * @component BizStatusTag
 * @category business/status
 * @since 0.2.0
 * @description 业务状态标签(标准化 DRAFT/PENDING/APPROVED/REJECTED 四态) / Business status tag with standardized status enum
 * @keywords status, tag, bill, approval, draft, pending, approved, rejected
 * @example
 * <BizStatusTag status="pending" />
 * <BizStatusTag status="approved" size="lg" />
 */

type BizStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "rejected_mid";

interface BizStatusTagProps extends React.ComponentProps<"span"> {
  /** Business status / 业务状态 */
  status: BizStatus;
  /** Tag size / 标签大小 */
  size?: "sm" | "md" | "lg";
  /** Whether to show icon / 是否显示图标 */
  showIcon?: boolean;
  /** Custom label (overrides default) / 自定义标签文本 */
  label?: string;
  /** Whether to show dot instead of icon / 是否显示圆点 */
  dot?: boolean;
}

const statusConfig: Record<
  BizStatus,
  { label: string; color: string; dot: string; icon: React.ElementType }
> = {
  draft: {
    label: "Draft",
    color:
      "bg-muted text-muted-foreground border-muted",
    dot: "bg-muted-foreground",
    icon: FileEdit,
  },
  pending: {
    label: "Pending",
    color:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
    dot: "bg-blue-500",
    icon: Clock,
  },
  approved: {
    label: "Approved",
    color:
      "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900",
    dot: "bg-green-500",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    color:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
    dot: "bg-red-500",
    icon: XCircle,
  },
  rejected_mid: {
    label: "Rejected",
    color:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-900",
    dot: "bg-orange-500",
    icon: AlertCircle,
  },
};

const sizeConfig: Record<
  NonNullable<BizStatusTagProps["size"]>,
  string
> = {
  sm: "px-1.5 py-0.5 text-xs gap-1",
  md: "px-2 py-0.5 text-xs gap-1.5",
  lg: "px-2.5 py-1 text-sm gap-1.5",
};

function BizStatusTag({
  className,
  status,
  size = "md",
  showIcon = true,
  label,
  dot = false,
  ...props
}: BizStatusTagProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      data-slot="biz-status-tag"
      className={cn(
        "inline-flex items-center rounded-md border font-medium",
        config.color,
        sizeConfig[size],
        className,
      )}
      {...props}
    >
      {dot ? (
        <span
          className={cn("size-1.5 rounded-full", config.dot)}
          aria-hidden="true"
        />
      ) : showIcon ? (
        <Icon className="size-3 shrink-0" aria-hidden="true" />
      ) : null}
      {label ?? config.label}
    </span>
  );
}

export { BizStatusTag };
export type { BizStatusTagProps, BizStatus };
