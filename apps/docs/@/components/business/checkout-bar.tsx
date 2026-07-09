"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";

export interface CheckoutBarProps {
  /** Total amount to display. */
  total: string | number;
  /** Currency symbol or code. */
  currency?: string;
  /** Checkout button label. Default "Pay Now". */
  payLabel?: string;
  /** Whether the checkout is in a loading/processing state. */
  isLoading?: boolean;
  /** Called when the user clicks the pay button. */
  onPay?: () => void;
  /** Additional class names. */
  className?: string;
}

/**
 * @component CheckoutBar
 * @category business/payment
 * @since 1.1.0
 * @description Fixed-bottom checkout bar displaying total and a pay button / 底部固定收银栏，显示合计金额和支付按钮
 * @keywords checkout, pay, total, cart, purchase
 * @example
 * <CheckoutBar total="¥ 1,299.00" onPay={() => startPayment()} />
 */
function CheckoutBar({
  total,
  currency = "¥",
  payLabel = "Pay Now",
  isLoading,
  onPay,
  className,
}: CheckoutBarProps) {
  return (
    <div
      data-slot="checkout-bar"
      className={cn(
        "bg-background sticky bottom-0 flex items-center justify-between border-t p-4",
        className,
      )}
    >
      <div className="flex items-baseline gap-0.5">
        <span className="text-muted-foreground text-xs">Total</span>
        <span className="text-xl font-bold">
          {currency} {total}
        </span>
      </div>
      <Button size="lg" onClick={onPay} disabled={isLoading}>
        {isLoading ? "Processing..." : payLabel}
      </Button>
    </div>
  );
}

export { CheckoutBar };
