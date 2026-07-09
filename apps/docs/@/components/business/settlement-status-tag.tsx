import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { CheckCircle2Icon, ClockIcon, AlertTriangleIcon, CircleIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component SettlementStatusTag
 * @category business/finance
 * @since 0.7.0
 * @description 结算状态标签。根据状态渲染对应颜色与图标的内联标签。
 * @param status 结算状态：unsettled（未结算）/ partial（部分结算）/ settled（已结算）/ overdue（逾期）
 * @example
 * <SettlementStatusTag status="settled" />
 */

interface SettlementStatusTagProps {
  status: "unsettled" | "partial" | "settled" | "overdue";
  className?: string;
}

const STATUS_MAP: Record<
  SettlementStatusTagProps["status"],
  { label: string; icon: React.ReactNode; className: string }
> = {
  unsettled: {
    label: "未结算",
    icon: <CircleIcon />,
    className: "bg-muted text-muted-foreground",
  },
  partial: {
    label: "部分结算",
    icon: <ClockIcon />,
    className: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  settled: {
    label: "已结算",
    icon: <CheckCircle2Icon />,
    className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  overdue: {
    label: "逾期",
    icon: <AlertTriangleIcon />,
    className: "bg-destructive/10 text-destructive",
  },
};

function SettlementStatusTag({ status, className }: SettlementStatusTagProps) {
  const config = STATUS_MAP[status];
  return (
    <span
      data-slot="settlement-status-tag"
      role="status"
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

export { SettlementStatusTag };
export type { SettlementStatusTagProps };
