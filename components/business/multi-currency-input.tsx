"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NativeSelect } from "@/components/ui/native-select";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * @component MultiCurrencyInput
 * @category business/finance
 * @since 1.0.0
 * @description Multi-currency amount input with live exchange rate conversion.
 * Supports currency selection, manual or automatic rate override, and
 * real-time display of the converted base currency amount.
 * @keywords currency, forex, exchange, rate, multi-currency, money, conversion
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Currency definition. */
interface CurrencyOption {
  /** ISO currency code (e.g., "USD", "CNY") */
  code: string;
  /** Currency symbol (e.g., "$", "¥") */
  symbol: string;
  /** Display name */
  name: string;
}

/** Props for MultiCurrencyInput. */
interface MultiCurrencyInputProps {
  /** Amount value in the selected (source) currency */
  value?: number;
  /** Change callback with amount and computed base amount */
  onChange?: (
    amount: number,
    baseAmount: number,
    currency: string,
    rate: number,
  ) => void;
  /** Available currencies (default: common set) */
  currencies?: CurrencyOption[];
  /** Selected currency code */
  currency?: string;
  /** Currency change callback */
  onCurrencyChange?: (code: string) => void;
  /** Base currency code (default: "CNY") */
  baseCurrency?: string;
  /** Exchange rate (1 source = rate base). If not provided, looked up from rates map */
  rate?: number;
  /** Rate override callback */
  onRateChange?: (rate: number) => void;
  /** Exchange rate map: { "USD": 7.25, "EUR": 7.85, ... } */
  rates?: Record<string, number>;
  /** Read-only mode */
  readOnly?: boolean;
  /** Allow manual rate override (default: true) */
  allowRateOverride?: boolean;
  /** Show conversion preview (default: true) */
  showConversion?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Default currencies                                                        */
/* -------------------------------------------------------------------------- */

const DEFAULT_CURRENCIES: CurrencyOption[] = [
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function formatMoney(value: number, symbol: string): string {
  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getCurrencySymbol(currencies: CurrencyOption[], code: string): string {
  return currencies.find((c) => c.code === code)?.symbol ?? code;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function MultiCurrencyInput({
  value = 0,
  onChange,
  currencies = DEFAULT_CURRENCIES,
  currency = "USD",
  onCurrencyChange,
  baseCurrency = "CNY",
  rate,
  onRateChange,
  rates = {},
  readOnly = false,
  allowRateOverride = true,
  showConversion = true,
  placeholder = "0.00",
  className,
}: MultiCurrencyInputProps) {
  /* ---- effective rate ---- */
  const effectiveRate = React.useMemo(() => {
    if (rate != null) return rate;
    if (currency === baseCurrency) return 1;
    return rates[currency] ?? 1;
  }, [rate, currency, baseCurrency, rates]);

  /* ---- computed base amount ---- */
  const baseAmount = React.useMemo(() => {
    return Math.round(value * effectiveRate * 100) / 100;
  }, [value, effectiveRate]);

  /* ---- symbol ---- */
  const sourceSymbol = getCurrencySymbol(currencies, currency);
  const baseSymbol = getCurrencySymbol(currencies, baseCurrency);

  /* ---- handlers ---- */
  const handleAmountChange = (v: string) => {
    const numVal = parseFloat(v) || 0;
    onChange?.(
      numVal,
      Math.round(numVal * effectiveRate * 100) / 100,
      currency,
      effectiveRate,
    );
  };

  const handleCurrencyChange = (code: string) => {
    onCurrencyChange?.(code);
    const newRate = code === baseCurrency ? 1 : (rates[code] ?? effectiveRate);
    onChange?.(value, Math.round(value * newRate * 100) / 100, code, newRate);
  };

  const handleRateChange = (v: string) => {
    const numVal = parseFloat(v) || 0;
    onRateChange?.(numVal);
    onChange?.(value, Math.round(value * numVal * 100) / 100, currency, numVal);
  };

  const isSameCurrency = currency === baseCurrency;

  return (
    <div
      data-slot="multi-currency-input"
      className={cn("space-y-2", className)}
    >
      {/* Main input row */}
      <div className="flex items-stretch gap-2">
        {/* Currency selector */}
        <div className="w-auto shrink-0">
          <NativeSelect
            className="font-medium"
            aria-label="Currency"
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            disabled={readOnly}
            options={currencies.map((c) => ({
              value: c.code,
              label: `${c.code} (${c.symbol})`,
            }))}
          />
        </div>

        {/* Amount input */}
        <div className="relative flex-1">
          <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
            {sourceSymbol}
          </span>
          <Input
            type="number"
            className="pl-8 text-right tabular-nums"
            value={value || ""}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder={placeholder}
            disabled={readOnly}
            aria-label="Amount"
            min={0}
            step="0.01"
          />
        </div>
      </div>

      {/* Rate + conversion */}
      {showConversion && !isSameCurrency && (
        <div className="space-y-1.5">
          {/* Exchange rate */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Exchange Rate:</span>
            <span className="text-muted-foreground">1 {currency} =</span>
            {allowRateOverride && !readOnly ? (
              <Input
                type="number"
                className="h-7 w-24 px-2 text-xs tabular-nums"
                value={effectiveRate}
                onChange={(e) => handleRateChange(e.target.value)}
                aria-label="Exchange rate"
                step="0.0001"
                min={0}
              />
            ) : (
              <span className="text-foreground font-medium tabular-nums">
                {baseSymbol}
                {effectiveRate.toFixed(4)}
              </span>
            )}
            <span className="text-muted-foreground">{baseCurrency}</span>
          </div>

          {/* Conversion result */}
          <div
            className="border-border bg-muted/30 flex items-center gap-2 rounded-md border px-3 py-1.5"
            data-slot="currency-conversion"
          >
            <span className="text-muted-foreground text-sm tabular-nums">
              {formatMoney(value, sourceSymbol)} {currency}
            </span>
            <ArrowRightIcon className="text-muted-foreground size-3.5" />
            <span className="text-foreground text-sm font-semibold tabular-nums">
              {formatMoney(baseAmount, baseSymbol)} {baseCurrency}
            </span>
          </div>
        </div>
      )}

      {/* Same currency note */}
      {showConversion && isSameCurrency && (
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <Badge variant="outline" className="text-[10px]">
            Same currency
          </Badge>
          <span>No conversion needed</span>
        </div>
      )}
    </div>
  );
}

export { MultiCurrencyInput };
export type { MultiCurrencyInputProps, CurrencyOption };
