"use client";

import { cn } from "@/lib/utils";

/**
 * @component PaymentSchedule
 * @category business/finance
 * @since 0.7.0
 * @description 付款计划
 * @keywords payment, schedule
 * @example
 * <PaymentSchedule />
 */

interface PaymentScheduleProps {
  schedule: Array<{ id: string; date: string; amount: number; status: string }>;
  className?: string;
}

function PaymentSchedule({ className }: PaymentScheduleProps) {
  return (
    <div data-slot="payment-schedule" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PaymentSchedule };
export type { PaymentScheduleProps };
