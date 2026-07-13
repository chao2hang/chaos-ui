import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2Icon,
  ClockIcon,
  AlertTriangleIcon,
  CircleIcon,
} from "@/components/ui/icons";
import { ColorTag } from "@/components/business/color-tag";

/**
 * @component SettlementStatusTag
 * @category business/finance
 * @since 0.7.0
 * @description 结算状态标签。基于 ColorTag，附带状态图标。
 * @param status 结算状态：unsettled / partial / settled / overdue
 * @example
 * <SettlementStatusTag status="settled" />
 * @see ColorTag, StatusBadge
 */

interface SettlementStatusTagProps {
  status: "unsettled" | "partial" | "settled" | "overdue";
  className?: string;
}

const STATUS_MAP: Record<
  SettlementStatusTagProps["status"],
  {
    label: string;
    icon: React.ReactNode;
    color: "muted" | "warning" | "success" | "error";
  }
> = {
  unsettled: {
    label: "未结算",
    icon: <CircleIcon className="size-3" />,
    color: "muted",
  },
  partial: {
    label: "部分结算",
    icon: <ClockIcon className="size-3" />,
    color: "warning",
  },
  settled: {
    label: "已结算",
    icon: <CheckCircle2Icon className="size-3" />,
    color: "success",
  },
  overdue: {
    label: "逾期",
    icon: <AlertTriangleIcon className="size-3" />,
    color: "error",
  },
};

function SettlementStatusTag({ status, className }: SettlementStatusTagProps) {
  const config = STATUS_MAP[status];
  return (
    <ColorTag
      data-slot="settlement-status-tag"
      role="status"
      color={config.color}
      size="sm"
      className={cn("gap-1 rounded-full", className)}
    >
      {config.icon}
      {config.label}
    </ColorTag>
  );
}

export { SettlementStatusTag };
export type { SettlementStatusTagProps };
