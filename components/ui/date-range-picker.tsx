"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, ChevronDownIcon, XIcon } from "./icons";
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
  /** Placeholder [start, end] for split presentation / 占位文本（双字段） */
  placeholder?: [string, string];
  /** Placeholder for range presentation (single trigger) / 范围模式占位 */
  rangePlaceholder?: string;
  /**
   * Controlled trigger label for range presentation.
   * When set, overrides the built-in formatted label (used by business presets wrapper).
   */
  rangeLabel?: string;
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
  /**
   * `split` = two single-date fields (default, legacy).
   * `range` = single trigger + range calendar (shared with business presets shell).
   */
  presentation?: "split" | "range";
  /** Months shown in range presentation (default 2) */
  numberOfMonths?: number;
  /** Popover align for range presentation */
  align?: "start" | "center" | "end";
  /** Optional sidebar inside range popover (e.g. presets) */
  sidebar?: React.ReactNode;
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

function toDayPickerRange(
  value: [Date | null, Date | null],
): DateRange | undefined {
  const [from, to] = value;
  if (!from && !to) return undefined;
  const start = from ?? to!;
  return { from: start, ...(to ? { to } : {}) };
}

/**
 * @component DateRangePicker
 * @category ui/data-entry
 * @since 0.2.0
 * @description Date range picker with tuple value `[start, end]`.
 * Use `presentation="range"` for a single-trigger range calendar; ERP presets live in
 * `@chaos_team/chaos-ui/business` DateRangePicker which wraps this component.
 * / 日期范围选择器，value 为元组。`presentation="range"` 为单触发器范围日历；
 * ERP 预设快捷项见 business 层包装组件。
 * @keywords date, range, picker, calendar, period
 * @example
 * <DateRangePicker
 *   value={[new Date(2024, 0, 1), new Date(2024, 11, 31)]}
 *   onChange={([start, end]) => console.log(start, end)}
 * />
 * <DateRangePicker presentation="range" numberOfMonths={2} />
 * @see docs/api-boundaries.md — dual-name map with business DateRangePicker
 */
function DateRangePicker({
  value: controlledValue,
  defaultValue = [null, null],
  onChange,
  format = "yyyy-MM-dd",
  placeholder = ["Start date", "End date"],
  rangePlaceholder = "Pick a date range",
  rangeLabel: rangeLabelProp,
  disabled = false,
  readOnly = false,
  allowClear = false,
  disabledDate,
  size = "default",
  presentation = "split",
  numberOfMonths = 2,
  align = "start",
  sidebar,
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

  if (presentation === "range") {
    const rangeLabel =
      rangeLabelProp ??
      (!start
        ? rangePlaceholder
        : !end
          ? formatDate(start, format)
          : start.getTime() === end.getTime()
            ? formatDate(start, format)
            : `${formatDate(start, format)} - ${formatDate(end, format)}`);

    return (
      <div
        data-slot="date-range-picker"
        data-presentation="range"
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
                  "min-w-[240px] justify-start font-normal",
                  !start && "text-muted-foreground",
                )}
              />
            }
          >
            <CalendarIcon className="size-4 shrink-0" />
            <span className="truncate">{rangeLabel}</span>
            <ChevronDownIcon className="ml-auto size-4 opacity-50" />
          </PopoverTrigger>
          <PopoverContent align={align} className="w-auto p-0">
            <div className="flex">
              {sidebar}
              <CalendarPrimitive
                mode="range"
                selected={toDayPickerRange(value)}
                onSelect={(range: DateRange | undefined) => {
                  if (!range) {
                    handleChange([null, null]);
                    return;
                  }
                  handleChange([range.from ?? null, range.to ?? null]);
                }}
                numberOfMonths={numberOfMonths}
                disabled={disabledDate}
                autoFocus
                required={false}
              />
            </div>
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

  return (
    <div
      data-slot="date-range-picker"
      data-presentation="split"
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
