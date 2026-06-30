import { cn } from "@/lib/utils";

/**
 * @component SettlementStatusTag
 * @category business/finance
 * @since 0.7.0
 * @description 结算状态标签
 * @keywords settlement, status, tag
 * @example
 * <SettlementStatusTag />
 */

interface SettlementStatusTagProps {
  status: "unsettled" | "partial" | "settled" | "overdue";
  className?: string;
}

function SettlementStatusTag({ className }: SettlementStatusTagProps) {
  return (
    <div data-slot="settlement-status-tag" className={cn("", className)}>
      {null}
    </div>
  );
}

export { SettlementStatusTag };
export type { SettlementStatusTagProps };
