"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@/components/ui/icons";

export interface MobileCheckoutProps {
  /** Total amount string. */
  total: string;
  /** Item count. */
  itemCount?: number;
  /** Pay button label. */
  payLabel?: string;
  /** Whether payment is in progress. */
  isLoading?: boolean;
  /** Called when user taps pay. */
  onPay?: () => void;
  /** Called when user taps back. */
  onBack?: () => void;
  /** Additional class names. */
  className?: string;
}

/**
 * @component MobileCheckout
 * @category mobile/payment
 * @since 1.1.0
 * @description Mobile-optimized checkout page shell with back button, item count, total, and pay action / 移动端收银页面，含返回、商品数、合计、支付按钮
 * @keywords mobile, checkout, pay, cart, purchase
 * @example
 * <MobileCheckout total="¥ 299.00" itemCount={3} onPay={handlePay} onBack={goBack} />
 */
function MobileCheckout({
  total,
  itemCount,
  payLabel = "Pay Now",
  isLoading,
  onPay,
  onBack,
  className,
}: MobileCheckoutProps) {
  return (
    <div
      data-slot="mobile-checkout"
      className={cn("flex h-full flex-col", className)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-3">
        {onBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onBack}
            aria-label="Back"
          >
            <ChevronLeftIcon />
          </Button>
        )}
        <h1 className="text-lg font-semibold">Checkout</h1>
        {itemCount !== undefined && (
          <span className="text-muted-foreground text-sm">
            {itemCount} items
          </span>
        )}
      </div>

      {/* Content area — consumer fills via children */}
      <div className="flex-1 overflow-auto" />

      {/* Fixed bottom bar */}
      <div className="bg-background sticky bottom-0 border-t px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Total</span>
          <span className="text-xl font-bold">{total}</span>
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={onPay}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : payLabel}
        </Button>
      </div>
    </div>
  );
}

export { MobileCheckout };
