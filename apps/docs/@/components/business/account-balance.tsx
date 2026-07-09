"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatCurrency } from "@chaos_team/chaos-ui/lib";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "@chaos_team/chaos-ui/ui";
/**
 * @component AccountBalance
 * @category business/finance
 * @since 0.7.0
 * @description 账户余额
 */
interface AccountBalanceProps {
  balance: number;
  currency?: string;
  label?: string;
  trend?: number;
  className?: string;
}
function AccountBalance({
  balance,
  currency = "CNY",
  label = "账户余额",
  trend,
  className,
}: AccountBalanceProps) {
  const positive = (trend ?? 0) >= 0;
  return (
    <div
      data-slot="account-balance"
      className={cn(
        "bg-card flex flex-col gap-1 rounded-lg border p-4",
        className,
      )}
    >
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-2xl font-semibold tabular-nums">
        {formatCurrency(balance, currency)}
      </span>
      {trend !== undefined && (
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            positive ? "text-emerald-600" : "text-red-600",
          )}
          aria-label={`趋势 ${trend}%`}
        >
          {positive ? (
            <ArrowUpRightIcon className="size-3.5" />
          ) : (
            <ArrowDownRightIcon className="size-3.5" />
          )}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
  );
}
export { AccountBalance };
export type { AccountBalanceProps };
