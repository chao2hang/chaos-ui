"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const amountInputVariants = cva(
  "flex items-center rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-8",
        sm: "h-7 text-sm",
        lg: "h-9 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface AmountInputProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onChange" | "value" | "defaultValue"
    >,
    VariantProps<typeof amountInputVariants> {
  /** Controlled value / 受控值 */
  value?: number | null;
  /** Default value / 默认值 */
  defaultValue?: number | null;
  /** Change callback / 变更回调 */
  onChange?: (value: number | null) => void;
  /** Currency symbol prefix / 货币符号前缀 (default: "¥") */
  currency?: string;
  /** Decimal precision / 小数精度 (default: 2) */
  precision?: number;
  /** Minimum value / 最小值 */
  min?: number;
  /** Maximum value / 最大值 */
  max?: number;
  /** Disabled / 是否禁用 */
  disabled?: boolean;
  /** Read-only / 是否只读 */
  readOnly?: boolean;
  /** Placeholder / 占位文本 */
  placeholder?: string;
  /** Locale for number formatting / 数字格式化语言 (default: "zh-CN") */
  locale?: string;
}

/**
 * @component AmountInput
 * @category ui/data-entry
 * @since 0.2.0
 * @description Currency/amount input with thousand separators / 带千位分隔符的金额输入框
 * @keywords amount, currency, input, money, number, thousand
 * @example
 * <AmountInput value={1234.56} onChange={(v) => console.log(v)} />
 * <AmountInput currency="$" precision={2} min={0} />
 */
function AmountInput({
  className,
  value: controlledValue,
  defaultValue = null,
  onChange,
  currency = "¥",
  precision = 2,
  min,
  max,
  disabled = false,
  readOnly = false,
  placeholder = "0.00",
  size = "default",
  locale = "zh-CN",
  ...props
}: AmountInputProps) {
  const [internalValue, setInternalValue] = React.useState<number | null>(
    defaultValue,
  );
  const [inputDisplay, setInputDisplay] = React.useState<string>("");

  const isControlled = controlledValue !== undefined;
  const numericValue = isControlled ? controlledValue : internalValue;

  // Format number for display: "1,234.56"
  const formatDisplay = React.useCallback(
    (num: number | null): string => {
      if (num === null || num === undefined || isNaN(num)) return "";
      return num.toLocaleString(locale, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      });
    },
    [locale, precision],
  );

  // Initialize/refresh display when controlled value changes
  React.useEffect(() => {
    if (isControlled) {
      setInputDisplay(formatDisplay(numericValue));
    }
  }, [isControlled, numericValue, formatDisplay]);

  // Initialize display on mount for uncontrolled
  React.useEffect(() => {
    if (!isControlled && numericValue !== null) {
      setInputDisplay(formatDisplay(numericValue));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Strip everything except digits and decimal point
    const stripped = raw.replace(/[^\d.]/g, "");

    if (stripped === "") {
      setInputDisplay("");
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
      return;
    }

    // Limit to one decimal point
    const parts = stripped.split(".");
    let cleanValue = parts[0] ?? "";
    if (parts.length > 1) {
      // Limit decimal places to precision
      const decimals = parts.slice(1).join("").slice(0, precision);
      cleanValue = `${cleanValue}.${decimals}`;
    }

    const parsed = parseFloat(cleanValue);

    // Apply min/max constraints
    let clamped = parsed;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;

    // Format for display (with thousand separators)
    const display = formatDisplay(clamped);
    setInputDisplay(display);

    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const handleFocus = () => {
    // On focus, show raw number without formatting for easier editing
    if (numericValue !== null && numericValue !== undefined) {
      setInputDisplay(String(numericValue));
    }
  };

  const handleBlur = () => {
    // On blur, reformat with thousand separators
    setInputDisplay(formatDisplay(numericValue));
  };

  return (
    <div
      data-slot="amount-input"
      data-size={size}
      className={cn(
        amountInputVariants({ size }),
        disabled && "pointer-events-none",
        className,
      )}
      {...props}
    >
      <span className="text-muted-foreground flex h-full items-center pl-2.5 text-sm">
        {currency}
      </span>
      <input
        data-slot="amount-input-field"
        type="text"
        value={inputDisplay}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        inputMode="decimal"
        className="placeholder:text-muted-foreground h-full w-full bg-transparent px-1.5 text-sm outline-none"
      />
    </div>
  );
}

export { AmountInput, amountInputVariants };
export type { AmountInputProps };
