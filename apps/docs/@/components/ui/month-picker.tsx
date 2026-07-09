"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface MonthPickerProps {
  /** Selected date (only month/year are used) / 选中的日期（仅使用月份/年份） */
  value?: Date | null;
  /** Default value / 默认值 */
  defaultValue?: Date | null;
  /** Change callback / 变更回调 */
  onChange?: (value: Date | null) => void;
  /** Placeholder text / 占位文本 */
  placeholder?: string;
  /** Disabled / 是否禁用 */
  disabled?: boolean;
  /** Read-only / 是否只读 */
  readOnly?: boolean;
  /** Whether to show clear button / 是否显示清除按钮 */
  allowClear?: boolean;
  /** Input size / 输入框大小 */
  size?: "sm" | "default" | "lg";
  className?: string;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatMonth(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

/**
 * @component MonthPicker
 * @category ui/data-entry
 * @since 0.2.0
 * @description Month-only picker with year navigation and month grid / 月份选择器，支持年份导航和月份网格
 * @keywords month, picker, calendar, date
 * @example
 * <MonthPicker value={new Date()} onChange={(d) => console.log(d)} />
 */
function MonthPicker({
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = "Select month",
  disabled = false,
  readOnly = false,
  allowClear = false,
  size = "default",
  className,
}: MonthPickerProps) {
  const [internalValue, setInternalValue] = React.useState<Date | null>(
    defaultValue,
  );
  const [open, setOpen] = React.useState(false);
  const [displayYear, setDisplayYear] = React.useState(() => {
    const base = controlledValue ?? defaultValue ?? new Date();
    return base ? base.getFullYear() : new Date().getFullYear();
  });

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (date: Date | null) => {
    if (!isControlled) setInternalValue(date);
    onChange?.(date);
    if (date) setOpen(false);
  };

  const sizeClass =
    size === "sm"
      ? "h-7 text-sm"
      : size === "lg"
        ? "h-9 text-base"
        : "h-8 text-sm";

  const displayValue = value ? formatMonth(value) : "";

  const handleMonthClick = (month: number) => {
    handleChange(new Date(displayYear, month, 1));
  };

  const prevYear = () => setDisplayYear((y) => y - 1);
  const nextYear = () => setDisplayYear((y) => y + 1);

  const selectedYear = value ? value.getFullYear() : -1;
  const selectedMonth = value ? value.getMonth() : -1;

  return (
    <div
      data-slot="month-picker"
      className={cn("relative inline-block", className)}
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
                "w-full justify-start font-normal",
                !displayValue && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="size-4 shrink-0" />
              {displayValue || placeholder}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={prevYear}
                aria-label="Previous year"
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <span className="text-sm font-medium">{displayYear}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={nextYear}
                aria-label="Next year"
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {monthNames.map((name, idx) => {
                const isSelected =
                  displayYear === selectedYear && idx === selectedMonth;
                return (
                  <Button
                    key={idx}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleMonthClick(idx)}
                    className="h-8 text-xs"
                  >
                    {name}
                  </Button>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {allowClear && value && !disabled && !readOnly && (
        <button
          type="button"
          onClick={() => handleChange(null)}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
          aria-label="Clear month"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { MonthPicker };
export type { MonthPickerProps };
