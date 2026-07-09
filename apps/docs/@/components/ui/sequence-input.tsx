"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

/**
 * @component SequenceInput
 * @category ui/form
 * @since 0.7.0
 * @description 编号输入框 — 带前缀/后缀和自动补零的编号输入。
 * / Sequence input — with prefix/suffix and auto-zero-fill.
 * @keywords sequence, number, input, code, prefix, zero-fill
 * @example
 * <SequenceInput prefix="ORD-" zeroFill={4} value="123" onChange={setVal} />
 */
interface SequenceInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "onChange"
> {
  /** Prefix prepended to the value / 前缀 */
  prefix?: string;
  /** Suffix appended to the value / 后缀 */
  suffix?: string;
  /** Zero-fill length (0 = disabled) / 补零位数 */
  zeroFill?: number;
  /** Value change callback — receives the full sequence string / 值变更回调 */
  onChange?: (value: string) => void;
  /** Raw numeric/text value (without prefix/suffix) / 原始值 */
  value?: string;
}

function SequenceInput({
  prefix = "",
  suffix = "",
  zeroFill = 0,
  value = "",
  onChange,
  className,
  ...props
}: SequenceInputProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    if (zeroFill > 0 && /^\d+$/.test(raw)) {
      raw = raw.padStart(zeroFill, "0");
    }
    onChange?.(raw);
  };

  return (
    <div
      data-slot="sequence-input"
      className={cn(
        "border-input bg-background flex items-center rounded-md border",
        "focus-within:ring-ring/50 focus-within:ring-2",
        className,
      )}
    >
      {prefix && (
        <span className="text-muted-foreground px-2 text-sm select-none">
          {prefix}
        </span>
      )}
      <Input
        type="text"
        value={value}
        onChange={handleInput}
        className="border-0 shadow-none focus-visible:ring-0"
        {...props}
      />
      {suffix && (
        <span className="text-muted-foreground px-2 text-sm select-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

export { SequenceInput };
export type { SequenceInputProps };
