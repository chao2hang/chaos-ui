"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/ui/icons";

/**
 * @component NativeSelect
 * @category ui/data-entry
 * @since 0.8.0
 * @description Styled native HTML `<select>` matching Chaos UI Select visual style. Ideal for mobile, SSR, and non-JS fallback scenarios. / 样式化的原生 HTML `<select>`，匹配 Chaos UI Select 视觉风格，适合移动端、SSR 和非 JS 降级场景。
 * @keywords select, native, dropdown, form, html-select, mobile
 * @example
 * <NativeSelect
 *   options={[{ value: "us", label: "United States" }]}
 *   placeholder="Select country"
 * />
 */

interface NativeSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface NativeSelectGroup {
  label: string;
  options: NativeSelectOption[];
}

interface NativeSelectProps extends Omit<
  React.ComponentProps<"select">,
  "size"
> {
  /** Flat options or grouped options / 扁平选项或分组选项 */
  options?: (NativeSelectOption | NativeSelectGroup)[];
  /** Placeholder option text / 占位选项文本 */
  placeholder?: string;
  /** Size variant / 尺寸变体 */
  size?: "sm" | "default";
  /** Whether to show error styling / 是否显示错误样式 */
  error?: boolean;
}

function isGroup(
  opt: NativeSelectOption | NativeSelectGroup,
): opt is NativeSelectGroup {
  return "options" in opt;
}

export function NativeSelect({
  options = [],
  placeholder,
  size = "default",
  error,
  disabled,
  className,
  children,
  ...props
}: NativeSelectProps) {
  return (
    <div data-slot="native-select" className="relative flex w-full min-w-0">
      <select
        data-size={size}
        disabled={disabled}
        className={cn(
          "border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex w-full min-w-0 appearance-none items-center justify-between gap-1.5 rounded-lg border bg-transparent py-1 pr-8 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive ring-destructive/20 ring-3",
          size === "default" && "h-8",
          size === "sm" && "h-7 text-xs",
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => {
          if (isGroup(opt)) {
            return (
              <optgroup key={opt.label} label={opt.label}>
                {opt.options.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            );
          }
          return (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          );
        })}
        {children}
      </select>
      <ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2" />
    </div>
  );
}

export type { NativeSelectProps, NativeSelectOption, NativeSelectGroup };
