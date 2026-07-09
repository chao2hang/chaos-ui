"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface YearPickerProps {
  /** Selected date (only year is used) / 选中的日期（仅使用年份） */
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

function formatYear(date: Date): string {
  return String(date.getFullYear());
}

/**
 * @component YearPicker
 * @category ui/data-entry
 * @since 0.2.0
 * @description Year-only picker with year grid and decade navigation / 年份选择器，支持年份网格和年代导航
 * @keywords year, picker, calendar, date, decade
 * @example
 * <YearPicker value={new Date()} onChange={(d) => console.log(d)} />
 */
function YearPicker({
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = "Select year",
  disabled = false,
  readOnly = false,
  allowClear = false,
  size = "default",
  className,
}: YearPickerProps) {
  const [internalValue, setInternalValue] = React.useState<Date | null>(
    defaultValue,
  );
  const [open, setOpen] = React.useState(false);
  const [displayDecadeStart, setDisplayDecadeStart] = React.useState(() => {
    const base = controlledValue ?? defaultValue ?? new Date();
    const year = base ? base.getFullYear() : new Date().getFullYear();
    return Math.floor(year / 12) * 12;
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

  const displayValue = value ? formatYear(value) : "";

  const years = Array.from({ length: 12 }, (_, i) => displayDecadeStart + i);
  const selectedYear = value ? value.getFullYear() : -1;

  const prevDecade = () => setDisplayDecadeStart((y) => y - 12);
  const nextDecade = () => setDisplayDecadeStart((y) => y + 12);

  const handleYearClick = (year: number) => {
    handleChange(new Date(year, 0, 1));
  };

  const decadeLabel = `${displayDecadeStart} – ${displayDecadeStart + 11}`;

  return (
    <div
      data-slot="year-picker"
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
                onClick={prevDecade}
                aria-label="Previous decade"
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <span className="text-sm font-medium">{decadeLabel}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={nextDecade}
                aria-label="Next decade"
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {years.map((year) => {
                const isSelected = year === selectedYear;
                return (
                  <Button
                    key={year}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleYearClick(year)}
                    className="h-8 text-xs"
                  >
                    {year}
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
          aria-label="Clear year"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { YearPicker };
export type { YearPickerProps };
