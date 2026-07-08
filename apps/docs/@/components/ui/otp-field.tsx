"use client"
import * as React from "react"
import { OTPFieldPreview as OTPFieldPrimitive } from "@base-ui/react/otp-field"

import { cn } from "@/lib/utils"

interface OTPFieldProps
  extends Omit<OTPFieldPrimitive.Root.Props, "children"> {
  length: number
  value?: string
  onValueChange?: (value: string | null) => void
  mask?: boolean
  className?: string
  inputClassName?: string
}

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
            "flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground text-center text-base font-medium shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
        />
      ))}
    </OTPFieldPrimitive.Root>
  )
}

function OTPFieldSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="otp-field-separator"
      className={cn("flex items-center text-muted-foreground/50", className)}
      {...props}
    >
      <OTPFieldPrimitive.Separator>—</OTPFieldPrimitive.Separator>
    </div>
  )
}

export { OTPField, OTPFieldSeparator }
