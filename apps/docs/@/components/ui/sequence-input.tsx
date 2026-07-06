"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sequenceInputVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      default: "[&>input]:size-10 [&>input]:text-base",
      sm: "[&>input]:size-8 [&>input]:text-sm",
      lg: "[&>input]:size-12 [&>input]:text-lg",
    },
  },
  defaultVariants: { size: "default" },
});

interface SequenceInputProps
  extends
    Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof sequenceInputVariants> {
  /** Number of input slots */
  length?: number;
  /** Current value (string of digits) */
  value?: string;
  /** Called when value changes */
  onChange?: (value: string) => void;
  /** Called when all slots are filled */
  onComplete?: (value: string) => void;
  /** Allowed characters regex */
  pattern?: string;
  /** Input type */
  type?: "text" | "number" | "alphanumeric";
  /** Auto-focus first input */
  autoFocus?: boolean;
  disabled?: boolean;
}

function SequenceInput({
  className,
  size,
  length = 6,
  value = "",
  onChange,
  onComplete,
  pattern = "[a-zA-Z0-9]",
  type = "text",
  autoFocus = false,
  disabled,
  ...props
}: SequenceInputProps) {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const [internalValue, setInternalValue] = React.useState<string[]>(
    Array.from({ length }, (_, i) => value[i] ?? ""),
  );

  React.useEffect(() => {
    setInternalValue(Array.from({ length }, (_, i) => value[i] ?? ""));
  }, [value, length]);

  const handleChange = (index: number, char: string) => {
    if (char && !new RegExp(`^${pattern}$`).test(char)) return;

    const newValue = [...internalValue];
    newValue[index] = char;
    setInternalValue(newValue);

    const joined = newValue.join("");
    onChange?.(joined);

    if (joined.length === length && !newValue.includes("")) {
      onComplete?.(joined);
    }

    // Auto-focus next input
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!internalValue[index] && index > 0) {
        // Move to previous input
        const newValue = [...internalValue];
        newValue[index - 1] = "";
        setInternalValue(newValue);
        onChange?.(newValue.join(""));
        inputsRef.current[index - 1]?.focus();
      } else {
        const newValue = [...internalValue];
        newValue[index] = "";
        setInternalValue(newValue);
        onChange?.(newValue.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").slice(0, length);
    const newValue = [...internalValue];
    for (let i = 0; i < pasted.length; i++) {
      if (new RegExp(`^${pattern}$`).test(pasted[i])) {
        newValue[i] = pasted[i];
      }
    }
    setInternalValue(newValue);
    onChange?.(newValue.join(""));
    const nextEmpty = newValue.findIndex((v) => !v);
    if (nextEmpty >= 0) {
      inputsRef.current[nextEmpty]?.focus();
    } else {
      inputsRef.current[length - 1]?.focus();
    }
  };

  return (
    <div
      data-slot="sequence-input"
      className={cn(sequenceInputVariants({ size }), className)}
      onPaste={handlePaste}
      {...props}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type={type === "number" ? "text" : "text"}
          inputMode={type === "number" ? "numeric" : "text"}
          maxLength={1}
          value={internalValue[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          className={cn(
            "border-input focus-visible:ring-ring rounded-md border bg-transparent text-center shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          )}
          aria-label={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </div>
  );
}

export { SequenceInput, sequenceInputVariants };
