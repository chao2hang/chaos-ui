"use client"
import * as React from "react"
import { cn } from "@chaos_team/chaos-ui/lib"

interface CurrencyInputProps {
  value: number | undefined
  onChange: (value: number | undefined) => void
  currency?: string
  locale?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

function formatCurrencyValue(
  value: number | undefined,
  currency: string,
  locale: string,
): string {
  if (value === undefined || value === null || isNaN(value)) return ""
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function parseCurrencyInput(raw: string): number | undefined {
  const cleaned = raw.replace(/[^\d.-]/g, "")
  if (cleaned === "" || cleaned === "-") return undefined
  const num = parseFloat(cleaned)
  return isNaN(num) ? undefined : num
}

function CurrencyInput({
  value,
  onChange,
  currency = "USD",
  locale = "en-US",
  placeholder,
  disabled,
  className,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = React.useState("")
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    if (!focused) {
      setDisplayValue(formatCurrencyValue(value, currency, locale))
    }
  }, [value, currency, locale, focused])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setDisplayValue(raw)
    const parsed = parseCurrencyInput(raw)
    onChange(parsed)
  }

  const handleFocus = () => {
    setFocused(true)
    if (value !== undefined && !isNaN(value)) {
      setDisplayValue(String(value))
    }
  }

  const handleBlur = () => {
    setFocused(false)
    const parsed = parseCurrencyInput(displayValue)
    onChange(parsed)
    setDisplayValue(formatCurrencyValue(parsed, currency, locale))
  }

  return (
    <div className={cn("relative", className)}>
      <input
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        data-slot="currency-input"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        )}
      />
    </div>
  )
}

CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
export type { CurrencyInputProps }
