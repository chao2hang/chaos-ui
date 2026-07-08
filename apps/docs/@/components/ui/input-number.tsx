"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * @component InputNumber
 * @category ui/primitives
 * @since 0.2.0
 * @description 数字输入框 / Numeric input with min/max/precision/step/controls
 * @keywords input, number, numeric, step, precision
 * @example
 * <InputNumber min={0} max={100} step={1} precision={2} />
 */

interface InputNumberProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "size" | "defaultValue"> {
  /** Current value / 当前值 */
  value?: number | null;
  /** Default value / 默认值 */
  defaultValue?: number | null;
  /** Minimum value / 最小值 */
  min?: number;
  /** Maximum value / 最大值 */
  max?: number;
  /** Step size / 步长 */
  step?: number;
  /** Decimal precision / 小数精度 */
  precision?: number;
  /** Whether to show up/down controls / 是否显示增减按钮 */
  controls?: boolean;
  /** Whether input is disabled / 是否禁用 */
  disabled?: boolean;
  /** Whether input is read-only / 是否只读 */
  readOnly?: boolean;
  /** Input size / 输入框大小 */
  size?: "sm" | "default" | "lg";
  /**
   * Change callback. When `nullAsUndefined` is true, empty values
   * emit `undefined` instead of `null` — matching typical form state.
   * / 变更回调。开启 nullAsUndefined 后空值返回 undefined 而非 null
   */
  onChange?: (value: number | null | undefined) => void;
  /** Parser to transform display value / 解析函数 */
  parser?: (displayValue: string) => number;
  /** Formatter to format display value / 格式化函数 */
  formatter?: (value: number | undefined) => string;
  /**
   * Emit `undefined` instead of `null` for empty values.
   * Eliminates the `v ?? undefined` boilerplate in form handlers.
   * / 空值返回 undefined 而非 null，消除 v ?? undefined 模板代码
   */
  nullAsUndefined?: boolean;
}

function InputNumber({
  className,
  value: controlledValue,
  defaultValue = null,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision,
  controls = true,
  disabled = false,
  readOnly = false,
  size = "default",
  onChange,
  parser,
  formatter,
  nullAsUndefined = false,
  ...props
}: InputNumberProps) {
  const [internalValue, setInternalValue] = React.useState<number | null>(
    defaultValue,
  );
  const [inputValue, setInputValue] = React.useState<string>("");

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  React.useEffect(() => {
    if (currentValue === null || currentValue === undefined) {
      setInputValue("");
    } else {
      setInputValue(
        formatter ? formatter(currentValue) : String(currentValue),
      );
    }
  }, [currentValue, formatter]);

  const clamp = (val: number): number => {
    return Math.min(Math.max(val, min), max);
  };

  const applyPrecision = (val: number): number => {
    if (precision !== undefined) {
      const factor = Math.pow(10, precision);
      return Math.round(val * factor) / factor;
    }
    return val;
  };

  const updateValue = (val: number | null) => {
    if (val === null || isNaN(val)) {
      if (!isControlled) setInternalValue(null);
      onChange?.(nullAsUndefined ? undefined : null);
      return;
    }
    const clamped = applyPrecision(clamp(val));
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    if (raw === "") {
      updateValue(null);
      return;
    }
    const parsed = parser ? parser(raw) : parseFloat(raw);
    if (!isNaN(parsed)) {
      updateValue(parsed);
    }
  };

  const handleStep = (direction: "up" | "down") => {
    if (disabled || readOnly) return;
    // When there's no current value, start stepping from min (if finite) so
    // that "up" from empty lands at min+step rather than 0+step (which could
    // skip past min when min > 0).
    const fallback = Number.isFinite(min) ? min : 0;
    const base = currentValue ?? fallback;
    const next = direction === "up" ? base + step : base - step;
    updateValue(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleStep("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleStep("down");
    }
    props.onKeyDown?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue !== "" && currentValue !== null) {
      setInputValue(
        formatter ? formatter(currentValue) : String(currentValue),
      );
    }
    props.onBlur?.(e);
  };

  const sizeClass =
    size === "sm" ? "h-7 text-sm" : size === "lg" ? "h-9 text-base" : "h-8 text-sm";

  return (
    <div
      data-slot="input-number"
      className={cn(
        "relative inline-flex w-full items-center",
        disabled && "opacity-50",
        className,
      )}
    >
      <input
        type="text"
        inputMode="decimal"
        disabled={disabled}
        readOnly={readOnly}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={cn(
          "w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-right transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80",
          sizeClass,
          controls && "pr-7",
        )}
        {...props}
      />
      {controls && !readOnly && (
        <div className="absolute right-0 top-0 flex h-full flex-col">
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || (currentValue !== null && currentValue >= max)}
            onClick={() => handleStep("up")}
            className="flex flex-1 items-center justify-center px-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label="Increase"
          >
            <ChevronUp className="size-3" />
          </button>
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || (currentValue !== null && currentValue <= min)}
            onClick={() => handleStep("down")}
            className="flex flex-1 items-center justify-center px-1.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
            aria-label="Decrease"
          >
            <ChevronDown className="size-3" />
          </button>
        </div>
      )}
    </div>
  );
}

export { InputNumber };
export type { InputNumberProps };