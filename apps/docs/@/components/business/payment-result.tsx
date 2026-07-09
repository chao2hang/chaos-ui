"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { CheckIcon } from "@chaos_team/chaos-ui/ui-icons";

export interface PaymentResultProps {
  /** Result status. */
  status: "success" | "fail";
  /** Order or transaction ID. */
  orderId?: string;
  /** Amount paid. */
  amount?: string;
  /** Primary action button label. */
  primaryLabel?: string;
  /** Called on primary action click. */
  onPrimary?: () => void;
  /** Secondary action button label. */
  secondaryLabel?: string;
  /** Called on secondary action click. */
  onSecondary?: () => void;
  /** Additional class names. */
  className?: string;
}

/**
 * @component PaymentResult
 * @category business/payment
 * @since 1.1.0
 * @description Payment result page showing success or failure with order details and action buttons / 支付结果页，展示成功/失败状态、订单详情和操作按钮
 * @keywords payment, result, success, fail, order
 * @example
 * <PaymentResult
 *   status="success"
 *   orderId="20260705001"
 *   amount="¥ 299.00"
 *   onPrimary={() => navigate("/orders")}
 * />
 */
function PaymentResult({
  status,
  orderId,
  amount,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  className,
}: PaymentResultProps) {
  const isSuccess = status === "success";

  return (
    <div
      data-slot="payment-result"
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8 text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-16 items-center justify-center rounded-full",
          isSuccess ? "bg-success/20" : "bg-destructive/20",
        )}
      >
        {isSuccess ? (
          <CheckIcon className="text-success size-8" />
        ) : (
          <span className="text-destructive text-3xl font-bold">!</span>
        )}
      </div>

      <h2 className="text-xl font-semibold">
        {isSuccess ? "Payment Successful" : "Payment Failed"}
      </h2>

      <div className="text-muted-foreground space-y-1 text-sm">
        {orderId && <p>Order: {orderId}</p>}
        {amount && <p>Amount: {amount}</p>}
      </div>

      <div className="mt-2 flex gap-3">
        {secondaryLabel && (
          <Button variant="outline" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
        {primaryLabel && <Button onClick={onPrimary}>{primaryLabel}</Button>}
      </div>
    </div>
  );
}

export { PaymentResult };
