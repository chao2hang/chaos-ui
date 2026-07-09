"use client";

import * as React from "react";
import { CalendarIcon, XIcon } from "./icons";
import { Calendar as CalendarPrimitive } from "./calendar";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface DateRangePickerProps {
  /** Selected range [start, end] / 选中的日期范围 */
  value?: [Date | null, Date | null];
  /** Default value / 默认值 */
  defaultValue?: [Date | null, Date | null];
  /** Change callback / 变更回调 */
  onChange?: (value: [Date | null, Date | null]) => void;
  /** Date format string / 日期格式 (default: "yyyy-MM-dd") */
  format?: string;
  /** Placeholder [start, end] / 占位文本 */
  placeholder?: [string, string];
  /** Disabled / 是否禁用 */
  disabled?: boolean;
  /** Read-only / 是否只读 */
  readOnly?: boolean;
  /** Whether to show clear button / 是否显示清除按钮 */
  allowClear?: boolean;
  /** Disable dates function / 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** Input size / 输入框大小 */
  size?: "sm" | "default" | "lg";
  className?: string;
}

function formatDate(date: Date, formatStr: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return formatStr
    .replace("yyyy", String(year))
    .replace("MM", month)
    .replace("dd", day);
}

/**
 * @component DateRangePicker
 * @category ui/data-entry
 * @since 0.2.0
 * @description Date range picker with start and end date selection / 日期范围选择器，支持开始和结束日期选择
 * @keywords date, range, picker, calendar, period
 * @example
 * <DateRangePicker
 *   value={[new Date(2024, 0, 1), new Date(2024, 11, 31)]}
 *   onChange={([start, end]) => console.log(start, end)}
 * />
 */
function DateRangePicker({
  value: controlledValue,
  defaultValue = [null, null],
  onChange,
  format = "yyyy-MM-dd",
  placeholder = ["Start date", "End date"],
  disabled = false,
  readOnly = false,
  allowClear = false,
  disabledDate,
  size = "default",
  className,
}: DateRangePickerProps) {
  const [internalValue, setInternalValue] =
    React.useState<[Date | null, Date | null]>(defaultValue);
  const [open, setOpen] = React.useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const [start, end] = value;

  const sizeClass =
    size === "sm"
      ? "h-7 text-sm"
      : size === "lg"
        ? "h-9 text-base"
        : "h-8 text-sm";

  const handleChange = (newRange: [Date | null, Date | null]) => {
    if (!isControlled) setInternalValue(newRange);
    onChange?.(newRange);
  };

  const handleClear = () => {
    handleChange([null, null]);
  };

  const startDisplay = start ? formatDate(start, format) : "";
  const endDisplay = end ? formatDate(end, format) : "";

  return (
    <div
      data-slot="date-range-picker"
      className={cn("relative inline-flex items-center gap-1", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              disabled={disabled || readOnly}
              className={cn(
                sizeClass,
                "justify-start font-normal",
                !startDisplay && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="size-4 shrink-0" />
              {startDisplay || placeholder[0]}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarPrimitive
            mode="single"
            selected={start ?? undefined}
            onSelect={(date: Date | undefined) => {
              if (!date) return;
              const newEnd = end ?? date;
              const newStart = date;
              handleChange(
                newStart <= newEnd ? [newStart, newEnd] : [newStart, null],
              );
            }}
            disabled={disabledDate}
          />
        </PopoverContent>
      </Popover>

      <span className="text-muted-foreground">—</span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              disabled={disabled || readOnly}
              className={cn(
                sizeClass,
                "justify-start font-normal",
                !endDisplay && "text-muted-foreground",
              )}
            >
              {endDisplay || placeholder[1]}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarPrimitive
            mode="single"
            selected={end ?? undefined}
            onSelect={(date: Date | undefined) => {
              if (!date) return;
              const newStart = start ?? date;
              const newEnd = date;
              handleChange(
                newStart <= newEnd ? [newStart, newEnd] : [null, newEnd],
              );
            }}
            disabled={disabledDate}
          />
        </PopoverContent>
      </Popover>

      {allowClear && (start || end) && !disabled && !readOnly && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground ml-1 shrink-0"
          aria-label="Clear date range"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export { DateRangePicker };
export type { DateRangePickerProps };
