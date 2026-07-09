"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

interface QuarterValue {
  /** Year / 年份 */
  year: number;
  /** Quarter 1-4 / 季度 1-4 */
  quarter: number;
}

interface QuarterPickerProps {
  /** Selected {year, quarter} / 选中的 {year, quarter} */
  value?: QuarterValue | null;
  /** Default value / 默认值 */
  defaultValue?: QuarterValue | null;
  /** Change callback / 变更回调 */
  onChange?: (value: QuarterValue | null) => void;
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

function formatQuarter(v: QuarterValue): string {
  return `${v.year}-Q${v.quarter}`;
}

/**
 * @component QuarterPicker
 * @category ui/data-entry
 * @since 0.2.0
 * @description Quarter picker with year navigation and Q1-Q4 buttons / 季度选择器，支持年份导航和 Q1-Q4 按钮
 * @keywords quarter, picker, calendar, date, period
 * @example
 * <QuarterPicker
 *   value={{ year: 2024, quarter: 2 }}
 *   onChange={(v) => console.log(v)}
 * />
 */
function QuarterPicker({
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = "Select quarter",
  disabled = false,
  readOnly = false,
  allowClear = false,
  size = "default",
  className,
}: QuarterPickerProps) {
  const [internalValue, setInternalValue] = React.useState<QuarterValue | null>(
    defaultValue,
  );
  const [open, setOpen] = React.useState(false);
  const [displayYear, setDisplayYear] = React.useState(() => {
    const base = controlledValue ?? defaultValue;
    return base ? base.year : new Date().getFullYear();
  });

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (v: QuarterValue | null) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
    if (v) setOpen(false);
  };

  const sizeClass =
    size === "sm"
      ? "h-7 text-sm"
      : size === "lg"
        ? "h-9 text-base"
        : "h-8 text-sm";

  const displayValue = value ? formatQuarter(value) : "";

  const prevYear = () => setDisplayYear((y) => y - 1);
  const nextYear = () => setDisplayYear((y) => y + 1);

  const handleQuarterClick = (quarter: number) => {
    handleChange({ year: displayYear, quarter });
  };

  const selectedYear = value ? value.year : -1;
  const selectedQuarter = value ? value.quarter : -1;

  return (
    <div
      data-slot="quarter-picker"
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
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map((q) => {
                const isSelected =
                  displayYear === selectedYear && q === selectedQuarter;
                return (
                  <Button
                    key={q}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleQuarterClick(q)}
                    className="h-8 text-xs"
                  >
                    Q{q}
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
          aria-label="Clear quarter"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { QuarterPicker };
export type { QuarterPickerProps, QuarterValue };
