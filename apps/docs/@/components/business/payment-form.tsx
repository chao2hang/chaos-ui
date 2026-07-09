"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { validateCreditCard } from "@/components/business/credit-card-input";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine((v) => validateCreditCard(v), "Invalid card number"),
  cardHolder: z.string().min(1, "Cardholder name is required"),
  expiryMonth: z
    .string()
    .min(1, "Required")
    .refine((v) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= 1 && n <= 12;
    }, "Invalid month"),
  expiryYear: z
    .string()
    .min(1, "Required")
    .refine((v) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= 2000 && n <= 2099;
    }, "Invalid year"),
  cvv: z
    .string()
    .min(3, "CVV is required")
    .max(4)
    .regex(/^\d+$/, "Digits only"),
});

type PaymentData = z.infer<typeof paymentSchema>;

interface PaymentFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  onSubmit?: (data: PaymentData) => void;
  className?: string;
}

function PaymentForm({ onSubmit, className, ...props }: PaymentFormProps) {
  const form = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit?.(data);
  });

  return (
    <form
      data-slot="payment-form"
      className={cn("space-y-4", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="space-y-1.5">
        <Label htmlFor="card-number">Card Number</Label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          autoComplete="cc-number"
          {...form.register("cardNumber")}
        />
        {form.formState.errors.cardNumber && (
          <p className="text-destructive text-xs">
            {form.formState.errors.cardNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="card-holder">Cardholder Name</Label>
        <Input
          id="card-holder"
          placeholder="John Doe"
          autoComplete="cc-name"
          {...form.register("cardHolder")}
        />
        {form.formState.errors.cardHolder && (
          <p className="text-destructive text-xs">
            {form.formState.errors.cardHolder.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="expiry-month">Month</Label>
          <Input
            id="expiry-month"
            placeholder="MM"
            inputMode="numeric"
            maxLength={2}
            autoComplete="cc-exp-month"
            {...form.register("expiryMonth")}
          />
          {form.formState.errors.expiryMonth && (
            <p className="text-destructive text-xs">
              {form.formState.errors.expiryMonth.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="expiry-year">Year</Label>
          <Input
            id="expiry-year"
            placeholder="YYYY"
            inputMode="numeric"
            maxLength={4}
            autoComplete="cc-exp-year"
            {...form.register("expiryYear")}
          />
          {form.formState.errors.expiryYear && (
            <p className="text-destructive text-xs">
              {form.formState.errors.expiryYear.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            inputMode="numeric"
            maxLength={4}
            autoComplete="cc-csc"
            {...form.register("cvv")}
          />
          {form.formState.errors.cvv && (
            <p className="text-destructive text-xs">
              {form.formState.errors.cvv.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Submit Payment
      </Button>
    </form>
  );
}

PaymentForm.displayName = "PaymentForm";

export { PaymentForm };
export type { PaymentData, PaymentFormProps };
