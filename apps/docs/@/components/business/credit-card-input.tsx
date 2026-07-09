"use client"
import * as React from "react"
import { cn } from "@chaos_team/chaos-ui/lib"

function luhnCheck(number: string): boolean {
  const digits = number.replace(/\D/g, "")
  if (digits.length === 0) return false
  let sum = 0
  let alternate = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10)
    if (alternate) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alternate = !alternate
  }
  return sum % 10 === 0
}

function validateCreditCard(number: string): boolean {
  const digits = number.replace(/\D/g, "")
  return digits.length >= 13 && digits.length <= 19 && luhnCheck(digits)
}

function formatCardSegments(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16)
  const segments: string[] = []
  for (let i = 0; i < digits.length; i += 4) {
    segments.push(digits.slice(i, i + 4))
  }
  return segments.join(" ")
}

interface CreditCardInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function CreditCardInput({
  value,
  onChange,
  placeholder = "0000 0000 0000 0000",
  disabled,
  className,
}: CreditCardInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const digits = raw.replace(/\D/g, "").slice(0, 16)
    onChange(digits)
  }

  const displayValue = formatCardSegments(value)

  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="cc-number"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={19}
      data-slot="credit-card-input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base font-mono tracking-widest transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
    />
  )
}

CreditCardInput.displayName = "CreditCardInput"

export { CreditCardInput, validateCreditCard }
export type { CreditCardInputProps }
