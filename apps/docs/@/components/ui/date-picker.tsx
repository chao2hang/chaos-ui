"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import {
  Calendar as CalendarPrimitive,
} from "./calendar";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { Button } from "./button";

/**
 * @component DatePicker
 * @category ui/primitives
 * @since 0.2.0
 * @description 单点日期选择器 / Single date picker based on react-day-picker
 * @keywords date, picker, calendar, date-picker
 * @example
 * <DatePicker value={new Date()} onChange={(date) => console.log(date)} />
 */

interface DatePickerProps {
  /** Selected date / 选中的日期 */
  value?: Date | null | undefined;
  /** Default value / 默认值 */
  defaultValue?: Date | null | undefined;
  /** Date format string / 日期格式 */
  format?: string | undefined;
  /** Placeholder text / 占位文本 */
  placeholder?: string | undefined;
  /** Whether picker is disabled / 是否禁用 */
  disabled?: boolean | undefined;
  /** Whether picker is read-only / 是否只读 */
  readOnly?: boolean | undefined;
  /** Whether to show clear button / 是否显示清除按钮 */
  allowClear?: boolean | undefined;
  /** Locale / 语言 */
  locale?: string | undefined;
  /** Disable dates function / 禁用日期函数 */
  disabledDate?: ((date: Date) => boolean) | undefined;
  /** Change callback / 变更回调 */
  onChange?: ((date: Date | null) => void) | undefined;
  /** Input size / 输入框大小 */
  size?: "sm" | "default" | "lg" | undefined;
  /** Custom trigger / 自定义触发器 */
  trigger?: React.ReactNode | undefined;
  className?: string | undefined;
}

function formatDate(date: Date, formatStr?: string): string {
  if (!date) return "";
  const fmt = formatStr || "yyyy-MM-dd";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return fmt
    .replace("yyyy", String(year))
    .replace("MM", month)
    .replace("dd", day)
    .replace("HH", String(date.getHours()).padStart(2, "0"))
    .replace("mm", String(date.getMinutes()).padStart(2, "0"))
    .replace("ss", String(date.getSeconds()).padStart(2, "0"));
}

function DatePicker({
  value: controlledValue,
  defaultValue = null,
  format,
  placeholder = "Select date",
  disabled = false,
  readOnly = false,
  allowClear = false,
  locale: _locale,
  disabledDate,
  onChange,
  size = "default",
  trigger,
  className,
}: DatePickerProps) {
  const [internalValue, setInternalValue] = React.useState<Date | null>(
    defaultValue,
  );
  const [open, setOpen] = React.useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (date: Date | null) => {
    if (!isControlled) setInternalValue(date);
    onChange?.(date);
    if (date) setOpen(false);
  };

  const sizeClass =
    size === "sm" ? "h-7 text-sm" : size === "lg" ? "h-9 text-base" : "h-8 text-sm";

  const displayValue = value ? formatDate(value, format) : "";

  return (
    <div
      data-slot="date-picker"
      className={cn("relative inline-block", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            (trigger as React.ReactElement | undefined) ?? (
              <Button
                variant="outline"
                size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
                disabled={disabled || readOnly}
                className={cn(
                  sizeClass,
                  "w-full justify-start font-normal",
                  !displayValue && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="size-4 shrink-0" />
                {displayValue || placeholder}
              </Button>
            )
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarPrimitive
            mode="single"
            selected={value ?? undefined}
            onSelect={(date: Date | undefined) =>
              handleChange(date ?? null)
            }
            disabled={disabledDate}
          />
        </PopoverContent>
      </Popover>
      {allowClear && value && !disabled && !readOnly && (
        <button
          type="button"
          onClick={() => handleChange(null)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear date"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { DatePicker };
export type { DatePickerProps };
