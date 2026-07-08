"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const maskedInputVariants = cva(
  "flex items-center rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-8 px-2.5",
        sm: "h-7 px-2 text-sm",
        lg: "h-9 px-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface MaskedInputProps
  extends
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "onChange" | "value"
    >,
    VariantProps<typeof maskedInputVariants> {
  /** Controlled value (raw, unmasked) / 受控值（原始值，不带掩码） */
  value?: string;
  /** Default value / 默认值 */
  defaultValue?: string;
  /** Change callback, returns raw value / 变更回调，返回原始值 */
  onChange?: (value: string) => void;
  /** Mask pattern: # = digit, A = letter, * = any, other chars are literals / 掩码模式：# = 数字，A = 字母，* = 任意，其他字符为字面量 */
  mask: string;
  /** Placeholder / 占位文本 */
  placeholder?: string;
  /** Disabled / 是否禁用 */
  disabled?: boolean;
  /** Read-only / 是否只读 */
  readOnly?: boolean;
  /** Show mask placeholder as guide / 是否显示掩码占位引导 (default: true) */
  guide?: boolean;
  /** Keep character positions when deleting / 删除时保留字符位置 (default: false) */
  keepCharPositions?: boolean;
}

/**
 * @component MaskedInput
 * @category ui/data-entry
 * @since 0.2.0
 * @description Format-masked input for ID cards, bank cards, IP addresses, etc. / 格式化掩码输入框，适用于身份证、银行卡、IP 地址等
 * @keywords mask, input, format, pattern, card
 * @example
 * <MaskedInput mask="####-####-####-####" placeholder="Bank card" />
 * <MaskedInput mask="###.###.###.###" guide={false} />
 */
function MaskedInput({
  className,
  value: controlledValue,
  defaultValue = "",
  onChange,
  mask,
  placeholder,
  disabled = false,
  readOnly = false,
  guide = true,
  keepCharPositions = false,
  size = "default",
  ...props
}: MaskedInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const rawValue = isControlled ? controlledValue : internalValue;

  /** Apply mask to a raw string, producing the formatted display */
  const applyMask = React.useCallback(
    (raw: string): string => {
      let result = "";
      let rawIdx = 0;
      for (let i = 0; i < mask.length && rawIdx < raw.length; i++) {
        const maskChar = mask[i];
        const inputChar = raw[rawIdx] ?? "";
        if (maskChar === "#") {
          if (/\d/.test(inputChar)) {
            result += inputChar;
            rawIdx++;
          } else {
            // skip non-matching input char
            rawIdx++;
            i--;
          }
        } else if (maskChar === "A") {
          if (/[a-zA-Z]/.test(inputChar)) {
            result += inputChar;
            rawIdx++;
          } else {
            rawIdx++;
            i--;
          }
        } else if (maskChar === "*") {
          result += inputChar;
          rawIdx++;
        } else {
          // literal character
          result += maskChar;
          if (inputChar === maskChar) {
            rawIdx++;
          }
        }
      }
      return result;
    },
    [mask],
  );

  /** Extract raw value (without literals) from a masked display string */
  const extractRaw = React.useCallback(
    (masked: string): string => {
      let raw = "";
      for (let i = 0; i < masked.length; i++) {
        const maskChar = i < mask.length ? mask[i] : null;
        const char = masked[i] ?? "";
        if (maskChar === "#") {
          if (/\d/.test(char)) raw += char;
        } else if (maskChar === "A") {
          if (/[a-zA-Z]/.test(char)) raw += char;
        } else if (maskChar === "*") {
          raw += char;
        }
        // skip literals
      }
      return raw;
    },
    [mask],
  );

  const displayValue = React.useMemo(() => {
    if (!rawValue) return "";
    return applyMask(rawValue);
  }, [rawValue, applyMask]);

  const guideValue = React.useMemo(() => {
    if (!guide || !mask) return "";
    return mask.replace(/[#A*]/g, "_");
  }, [guide, mask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Extract raw value from the displayed input (strip literal mask chars)
    const newRaw = extractRaw(inputValue);
    if (!isControlled) setInternalValue(newRaw);
    onChange?.(newRaw);
  };

  return (
    <div
      data-slot="masked-input"
      data-size={size}
      className={cn(
        maskedInputVariants({ size }),
        disabled && "pointer-events-none",
        className,
      )}
    >
      <input
        ref={inputRef}
        data-slot="masked-input-field"
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder ?? (guide ? guideValue : undefined)}
        disabled={disabled}
        readOnly={readOnly}
        className="placeholder:text-muted-foreground h-full w-full bg-transparent text-sm outline-none"
        {...props}
      />
    </div>
  );
}

export { MaskedInput, maskedInputVariants };
export type { MaskedInputProps };
