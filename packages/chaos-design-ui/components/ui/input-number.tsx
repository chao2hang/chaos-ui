"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputNumberVariants = cva(
  "flex items-center rounded-md border border-input bg-transparent shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8 text-xs",
        lg: "h-10",
      },
    },
    defaultVariants: { size: "default" },
  },
);

interface InputNumberProps
  extends
    Omit<React.ComponentProps<"input">, "size" | "onChange" | "value">,
    VariantProps<typeof inputNumberVariants> {
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Show stepper buttons */
  showStepper?: boolean;
  /** Allow empty value */
  allowEmpty?: boolean;
  /** Suffix text */
  suffix?: React.ReactNode;
}

function InputNumber({
  className,
  size,
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  showStepper = true,
  allowEmpty = false,
  suffix,
  disabled,
  placeholder,
  ...props
}: InputNumberProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    value?.toString() ?? "",
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setInternalValue(value?.toString() ?? "");
  }, [value]);

  const updateValue = (newValue: number | undefined) => {
    if (newValue !== undefined && (newValue < min || newValue > max)) return;
    onChange?.(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInternalValue(raw);

    if (raw === "" || raw === "-") {
      if (allowEmpty) {
        onChange?.(undefined);
      }
      return;
    }

    const num = Number(raw);
    if (!Number.isNaN(num)) {
      updateValue(num);
    }
  };

  const handleBlur = () => {
    if (internalValue === "" || internalValue === "-") {
      if (!allowEmpty) {
        const clamped = Math.max(min, Math.min(max, 0));
        setInternalValue(clamped.toString());
        onChange?.(clamped);
      }
      return;
    }
    const num = Number(internalValue);
    if (!Number.isNaN(num)) {
      const clamped = Math.max(min, Math.min(max, num));
      setInternalValue(clamped.toString());
      onChange?.(clamped);
    }
  };

  const handleStepUp = () => {
    const current = (value ?? Number(internalValue)) || 0;
    const next = Math.min(max, current + step);
    updateValue(next);
    setInternalValue(next.toString());
    inputRef.current?.focus();
  };

  const handleStepDown = () => {
    const current = (value ?? Number(internalValue)) || 0;
    const next = Math.max(min, current - step);
    updateValue(next);
    setInternalValue(next.toString());
    inputRef.current?.focus();
  };

  return (
    <div
      data-slot="input-number"
      className={cn(inputNumberVariants({ size }), className)}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "placeholder:text-muted-foreground h-full w-full bg-transparent px-3 py-1 outline-none disabled:cursor-not-allowed disabled:opacity-50",
          showStepper && "text-center",
        )}
        {...props}
      />
      {suffix && (
        <span className="text-muted-foreground pr-3 text-sm">{suffix}</span>
      )}
      {showStepper && (
        <div className="border-input flex flex-col border-l">
          <button
            type="button"
            onClick={handleStepUp}
            disabled={disabled || (value ?? 0) >= max}
            className="text-muted-foreground hover:text-foreground flex h-1/2 items-center justify-center px-2 disabled:opacity-30"
            aria-label="Increment"
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleStepDown}
            disabled={disabled || (value ?? 0) <= min}
            className="border-input text-muted-foreground hover:text-foreground flex h-1/2 items-center justify-center border-t px-2 disabled:opacity-30"
            aria-label="Decrement"
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export { InputNumber, inputNumberVariants };
