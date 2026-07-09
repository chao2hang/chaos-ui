"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  CreditCardIcon,
  BanknoteIcon,
  SmartphoneIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { Label } from "@chaos_team/chaos-ui/ui";

export type PaymentMethod = "card" | "wechat" | "alipay" | "transfer";

export interface PaymentMethodSelectorProps {
  /** Currently selected payment method. */
  value?: PaymentMethod;
  /** Called when the user selects a method. */
  onChange?: (method: PaymentMethod) => void;
  /** Additional class names. */
  className?: string;
}

const methods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: "card", label: "Card", icon: <CreditCardIcon /> },
  { id: "wechat", label: "WeChat", icon: <SmartphoneIcon /> },
  { id: "alipay", label: "Alipay", icon: <SmartphoneIcon /> },
  { id: "transfer", label: "Bank Transfer", icon: <BanknoteIcon /> },
];

/**
 * @component PaymentMethodSelector
 * @category business/payment
 * @since 1.1.0
 * @description Radio-style payment method selector (card, wechat, alipay, transfer) / 支付方式选择器
 * @keywords payment, selector, checkout, wechat, alipay, card
 * @example
 * <PaymentMethodSelector value="wechat" onChange={(m) => setMethod(m)} />
 */
function PaymentMethodSelector({
  value,
  onChange,
  className,
}: PaymentMethodSelectorProps) {
  return (
    <div
      data-slot="payment-method-selector"
      className={cn("grid gap-2", className)}
    >
      <Label className="text-sm font-medium">Payment Method</Label>
      <div className="grid grid-cols-2 gap-2">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange?.(m.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors",
              value === m.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50 hover:bg-muted",
            )}
          >
            {m.icon}
            <span>{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { PaymentMethodSelector };
