"use client";

import { cn } from "@/lib/utils";

/**
 * @component AccountBalance
 * @category business/finance
 * @since 0.7.0
 * @description 账户余额
 * @keywords account, balance
 * @example
 * <AccountBalance />
 */

interface AccountBalanceProps {
  balance: number;
  currency?: string;
  label?: string;
  trend?: number;
  className?: string;
}

function AccountBalance({ className }: AccountBalanceProps) {
  return (
    <div data-slot="account-balance" className={cn("", className)}>
      {null}
    </div>
  );
}

export { AccountBalance };
export type { AccountBalanceProps };
