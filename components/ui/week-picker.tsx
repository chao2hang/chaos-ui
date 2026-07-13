"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

/** ISO week value: year + week number (1–53). */
interface WeekValue {
  /** ISO week-year / ISO 周年 */
  year: number;
  /** ISO week number 1–53 / ISO 周序号 */
  week: number;
}

interface WeekPickerProps {
  /** Selected {year, week} / 选中的 {year, week} */
  value?: WeekValue | null;
  /** Default value / 默认值 */
  defaultValue?: WeekValue | null;
  /**
   * Change callback. Second arg is Monday 00:00 local of the ISO week.
   * / 变更回调；第二参数为该 ISO 周周一 0 点（本地）
   */
  onChange?: (value: WeekValue | null, weekStart?: Date | null) => void;
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

/** Monday of ISO week 1 for a given ISO week-year. */
function isoWeek1Monday(year: number): Date {
  // Jan 4 is always in ISO week 1
  const jan4 = new Date(year, 0, 4);
  const day = jan4.getDay() || 7; // Mon=1 … Sun=7
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - (day - 1));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function weekStartFromValue(v: WeekValue): Date {
  const monday = isoWeek1Monday(v.year);
  monday.setDate(monday.getDate() + (v.week - 1) * 7);
  return monday;
}

function formatWeek(v: WeekValue): string {
  return `${v.year}-W${String(v.week).padStart(2, "0")}`;
}

/** Number of ISO weeks in a week-year (52 or 53). */
function weeksInIsoYear(year: number): number {
  // If Dec 28 is in week 53, year has 53 weeks
  const dec28 = new Date(year, 11, 28);
  // ISO week number of Dec 28
  const jan4 = new Date(year, 0, 4);
  const jan4Day = jan4.getDay() || 7;
  const week1Mon = new Date(jan4);
  week1Mon.setDate(jan4.getDate() - (jan4Day - 1));
  const diff = Math.floor(
    (dec28.getTime() - week1Mon.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );
  return diff + 1 >= 53 ? 53 : 52;
}

/**
 * @component WeekPicker
 * @category ui/data-entry
 * @since 1.6.0
 * @description ISO week picker with year navigation and week grid (1–52/53).
 * Completes the date-granularity family alongside Month/Quarter/Year pickers.
 * / ISO 周选择器，支持年份导航与周网格，补齐月/季/年日期族。
 * @keywords week, picker, calendar, iso, date, period
 * @example
 * <WeekPicker
 *   value={{ year: 2026, week: 28 }}
 *   onChange={(v, start) => console.log(v, start)}
 * />
 */
function WeekPicker({
  value: controlledValue,
  defaultValue = null,
  onChange,
  placeholder = "Select week",
  disabled = false,
  readOnly = false,
  allowClear = false,
  size = "default",
  className,
}: WeekPickerProps) {
  const [internalValue, setInternalValue] = React.useState<WeekValue | null>(
    defaultValue,
  );
  const [open, setOpen] = React.useState(false);
  const [displayYear, setDisplayYear] = React.useState(() => {
    const base = controlledValue ?? defaultValue;
    return base ? base.year : new Date().getFullYear();
  });

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (v: WeekValue | null) => {
    if (!isControlled) setInternalValue(v);
    const start = v ? weekStartFromValue(v) : null;
    onChange?.(v, start);
    if (v) setOpen(false);
  };

  const sizeClass =
    size === "sm"
      ? "h-7 text-sm"
      : size === "lg"
        ? "h-9 text-base"
        : "h-8 text-sm";

  const displayValue = value ? formatWeek(value) : "";
  const weekCount = weeksInIsoYear(displayYear);
  const weeks = Array.from({ length: weekCount }, (_, i) => i + 1);

  const selectedYear = value ? value.year : -1;
  const selectedWeek = value ? value.week : -1;

  return (
    <div
      data-slot="week-picker"
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
                onClick={() => setDisplayYear((y) => y - 1)}
                aria-label="Previous year"
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <span className="text-sm font-medium">{displayYear}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setDisplayYear((y) => y + 1)}
                aria-label="Next year"
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
            <div className="grid max-h-56 grid-cols-4 gap-1 overflow-y-auto">
              {weeks.map((w) => {
                const isSelected =
                  displayYear === selectedYear && w === selectedWeek;
                return (
                  <Button
                    key={w}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleChange({ year: displayYear, week: w })}
                    className="h-8 text-xs"
                  >
                    W{w}
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
          aria-label="Clear week"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { WeekPicker, weekStartFromValue, weeksInIsoYear, formatWeek };
export type { WeekPickerProps, WeekValue };
