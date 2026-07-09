"use client";
import * as React from "react";
import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field";

import { cn } from "@/lib/utils";

interface OTPFieldProps extends Omit<OTPFieldPrimitive.Root.Props, "children"> {
  length: number;
  value?: string;
  onValueChange?: (value: string) => void;
  mask?: boolean;
  className?: string;
  inputClassName?: string;
}

/**
 * @component OTPField
 * @category ui/data-entry
 * @since 0.2.0
 * @description One-time password input field with individual character slots / 一次性密码输入字段，每个字符独立输入框
 * @keywords otp, one-time password, verification code, input, token, 2fa
 * @example
 * <OTPField length={6} onValueChange={(v) => console.log(v)} />
 */
function OTPField({
  length,
  value,
  onValueChange,
  mask = false,
  className,
  inputClassName,
  ...props
}: OTPFieldProps) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field"
      length={length}
      value={value}
      onValueChange={(v: string) => onValueChange?.(v)}
      mask={mask}
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      {Array.from({ length }).map((_, i) => (
        <OTPFieldPrimitive.Input
          key={i}
          data-slot="otp-field-input"
          className={cn(
            "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 flex size-9 items-center justify-center rounded-md border text-center text-base font-medium shadow-xs transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName,
          )}
        />
      ))}
    </OTPFieldPrimitive.Root>
  );
}

/**
 * @component OTPFieldSeparator
 * @category ui/data-entry
 * @since 0.2.0
 * @description Visual separator between OTP field groups / OTP字段组之间的视觉分隔符
 * @keywords otp, separator, divider, verification code
 * @example
 * <OTPFieldSeparator />
 */
function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="otp-field-separator"
      className={cn("text-muted-foreground/50 flex items-center", className)}
      {...props}
    >
      <OTPFieldPrimitive.Separator>—</OTPFieldPrimitive.Separator>
    </div>
  );
}

export { OTPField, OTPFieldSeparator };
export { OTPField as OtpField };
