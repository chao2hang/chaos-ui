"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar as CalendarPrimitive } from "./calendar";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

/**
 * @component DatePicker
 * @category ui/primitives
 * @since 0.2.0
 * @description 单点日期选择器 / Single date picker based on react-day-picker
 * @keywords date, picker, calendar, date-picker
 * @example
 * <DatePicker value={new Date()} onChange={(date) => console.log(date)} />
 * <DatePicker valueAsString value="2026-07-11" onChange={(s) => setDate(s)} />
 */

interface DatePickerBaseProps {
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
  /** Input size / 输入框大小 */
  size?: "sm" | "default" | "lg" | undefined;
  /** Custom trigger / 自定义触发器 */
  trigger?: React.ReactNode | undefined;
  className?: string | undefined;
}

interface DatePickerDateProps extends DatePickerBaseProps {
  /** When true, value/onChange use formatted strings. / 字符串模式 */
  valueAsString?: false | undefined;
  /** Selected date / 选中的日期 */
  value?: Date | null | undefined;
  /** Default value / 默认值 */
  defaultValue?: Date | null | undefined;
  /** Change callback / 变更回调 */
  onChange?: ((date: Date | null) => void) | undefined;
}

interface DatePickerStringProps extends DatePickerBaseProps {
  /** When true, value/onChange use formatted strings. / 字符串模式 */
  valueAsString: true;
  /** Selected date string (format, default yyyy-MM-dd) / 选中日期字符串 */
  value?: string | null | undefined;
  /** Default value string / 默认值字符串 */
  defaultValue?: string | null | undefined;
  /** Change callback with string / 字符串变更回调 */
  onChange?: ((date: string | null) => void) | undefined;
}

type DatePickerProps = DatePickerDateProps | DatePickerStringProps;

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

/** Parse a formatted date string back to Date (supports yyyy/MM/dd tokens). */
function parseDate(
  value: string | null | undefined,
  formatStr?: string,
): Date | null {
  if (!value) return null;
  const fmt = formatStr || "yyyy-MM-dd";
  const tokenRegex = /(yyyy|MM|dd|HH|mm|ss)/g;
  const tokens = [...fmt.matchAll(tokenRegex)].map((m) => m[1]!);
  if (tokens.length === 0) return null;

  // Build a regex that captures each token's digits in order.
  let pattern = "";
  let lastIndex = 0;
  for (const match of fmt.matchAll(tokenRegex)) {
    const token = match[1]!;
    const idx = match.index ?? 0;
    pattern += escapeRegExp(fmt.slice(lastIndex, idx));
    pattern += `(\\d{${token === "yyyy" ? 4 : 2}})`;
    lastIndex = idx + token.length;
  }
  pattern += escapeRegExp(fmt.slice(lastIndex));
  const re = new RegExp(`^${pattern}$`);
  const m = value.match(re);
  if (!m) {
    // Fallback: native Date parse for ISO-like strings
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  let year = 1970;
  let month = 1;
  let day = 1;
  let hour = 0;
  let minute = 0;
  let second = 0;
  tokens.forEach((token, i) => {
    const n = Number(m[i + 1]);
    if (token === "yyyy") year = n;
    else if (token === "MM") month = n;
    else if (token === "dd") day = n;
    else if (token === "HH") hour = n;
    else if (token === "mm") minute = n;
    else if (token === "ss") second = n;
  });
  const d = new Date(year, month - 1, day, hour, minute, second);
  return Number.isNaN(d.getTime()) ? null : d;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function DatePicker(props: DatePickerProps) {
  const {
    format,
    placeholder = "Select date",
    disabled = false,
    readOnly = false,
    allowClear = false,
    locale: _locale,
    disabledDate,
    size = "default",
    trigger,
    className,
  } = props;

  const valueAsString = props.valueAsString === true;
  const controlledValue = props.value;
  const defaultValue = props.defaultValue ?? null;
  const onChange = props.onChange;

  const defaultDate = valueAsString
    ? parseDate(defaultValue as string | null, format)
    : (defaultValue as Date | null);

  const [internalValue, setInternalValue] = React.useState<Date | null>(
    defaultDate,
  );
  const [open, setOpen] = React.useState(false);

  const isControlled = controlledValue !== undefined;
  const controlledDate = valueAsString
    ? parseDate(controlledValue as string | null | undefined, format)
    : (controlledValue as Date | null | undefined);
  const value = isControlled ? (controlledDate ?? null) : internalValue;

  const handleChange = (date: Date | null) => {
    if (!isControlled) setInternalValue(date);
    if (valueAsString) {
      const str = date ? formatDate(date, format) : null;
      (onChange as ((v: string | null) => void) | undefined)?.(str);
    } else {
      (onChange as ((v: Date | null) => void) | undefined)?.(date);
    }
    if (date) setOpen(false);
  };

  const sizeClass =
    size === "sm"
      ? "h-7 text-sm"
      : size === "lg"
        ? "h-9 text-base"
        : "h-8 text-sm";

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
            onSelect={(date: Date | undefined) => handleChange(date ?? null)}
            disabled={disabledDate}
          />
        </PopoverContent>
      </Popover>
      {allowClear && value && !disabled && !readOnly && (
        <button
          type="button"
          onClick={() => handleChange(null)}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
          aria-label="Clear date"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { DatePicker, formatDate, parseDate };
export type { DatePickerProps, DatePickerDateProps, DatePickerStringProps };
