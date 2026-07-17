"use client";
// native-select-exception: compact hour/minute stepper inside popover footer

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { Calendar as CalendarPrimitive } from "./calendar";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { formatDate, parseDate } from "./date-picker";

/**
 * @component DateTimePicker
 * @category ui/data-entry
 * @since 1.14.0
 * @description 日期+时间组合选择器，单触发器内同时选日期与时分，对齐 Ecology
 * WeaDatePicker+WeaTimePicker 组合场景。支持 Date 或字符串受控。
 * / Combined date + time picker with a single trigger, aligning with Ecology
 * WeaDateGroup. Supports Date or ISO/formatted string values.
 * @keywords datetime, date, time, picker, calendar
 * @example
 * ```tsx
 * <DateTimePicker value={new Date()} onChange={(d) => setDate(d)} />
 * <DateTimePicker valueAsString value="2026-07-17 09:30" onChange={setStr} />
 * ```
 */

interface DateTimePickerBaseProps {
  /** Date format (default `yyyy-MM-dd HH:mm`). / 日期时间格式 */
  format?: string;
  /** Placeholder. / 占位文本 */
  placeholder?: string;
  /** Disabled. / 是否禁用 */
  disabled?: boolean;
  /** Read-only. / 是否只读 */
  readOnly?: boolean;
  /** Show the time portion (default true). / 是否显示时间部分 */
  showTime?: boolean;
  /** Minute step for the time selector (default 1). / 分钟步进 */
  step?: 1 | 5 | 10 | 15 | 30;
  /** Locale. / 语言 */
  locale?: string;
  /** Disable dates function. / 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** Input size. / 输入框大小 */
  size?: "sm" | "default" | "lg";
  /** Custom trigger. / 自定义触发器 */
  trigger?: React.ReactNode;
  className?: string;
}

interface DateTimePickerDateProps extends DateTimePickerBaseProps {
  valueAsString?: false;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
}

interface DateTimePickerStringProps extends DateTimePickerBaseProps {
  valueAsString: true;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (date: string | null) => void;
}

type DateTimePickerProps = DateTimePickerDateProps | DateTimePickerStringProps;

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function DateTimePicker(props: DateTimePickerProps) {
  const { t } = useTranslation("ui");
  const {
    format,
    placeholder = t("dateTimePicker.placeholder", {
      defaultValue: "选择日期时间",
    }),
    disabled = false,
    readOnly = false,
    showTime = true,
    step = 1,
    locale: _locale,
    disabledDate,
    size = "default",
    trigger,
    className,
  } = props;

  const valueAsString = props.valueAsString === true;
  const fmt = format ?? (showTime ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd");
  const controlledValue = props.value;
  const defaultValue = props.defaultValue ?? null;
  const onChange = props.onChange;

  const defaultDate = valueAsString
    ? parseDate(defaultValue as string | null, fmt)
    : (defaultValue as Date | null);

  const [internalValue, setInternalValue] = React.useState<Date | null>(
    defaultDate,
  );
  const [open, setOpen] = React.useState(false);
  // Working time (hour/minute) edited in the popover footer
  const [hour, setHour] = React.useState(0);
  const [minute, setMinute] = React.useState(0);

  const isControlled = controlledValue !== undefined;
  const controlledDate = valueAsString
    ? parseDate(controlledValue as string | null | undefined, fmt)
    : (controlledValue as Date | null | undefined);
  const value = isControlled ? (controlledDate ?? null) : internalValue;

  const snapMinute = React.useCallback(
    (m: number) => {
      if (step <= 1) return m;
      return Math.min(59, Math.round(m / step) * step);
    },
    [step],
  );

  // Sync working time when value/open changes; snap minutes to `step` grid.
  React.useEffect(() => {
    if (value) {
      setHour(value.getHours());
      setMinute(snapMinute(value.getMinutes()));
    }
  }, [value, open, snapMinute]);

  const commit = (date: Date | null) => {
    if (!isControlled) setInternalValue(date);
    if (valueAsString) {
      const str = date ? formatDate(date, fmt) : null;
      (onChange as ((v: string | null) => void) | undefined)?.(str);
    } else {
      (onChange as ((v: Date | null) => void) | undefined)?.(date);
    }
  };

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return;
    const next = new Date(day);
    if (showTime) {
      next.setHours(hour, snapMinute(minute), 0, 0);
    } else {
      next.setHours(0, 0, 0, 0);
    }
    commit(next);
    if (!showTime) setOpen(false);
  };

  const handleTimeChange = (h: number, m: number) => {
    const snapped = snapMinute(m);
    setHour(h);
    setMinute(snapped);
    if (value) {
      const next = new Date(value);
      next.setHours(h, snapped, 0, 0);
      commit(next);
    }
  };

  const sizeClass =
    size === "sm"
      ? "h-7 text-sm"
      : size === "lg"
        ? "h-9 text-base"
        : "h-8 text-sm";

  const displayValue = value ? formatDate(value, fmt) : "";

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 / step }, (_, i) => i * step);

  return (
    <div
      data-slot="date-time-picker"
      className={cn("relative block w-full", className)}
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
            onSelect={handleDaySelect}
            disabled={disabledDate}
          />
          {showTime && (
            <div className="flex items-center justify-end gap-2 border-t p-3">
              <span className="text-muted-foreground text-xs">
                {t("dateTimePicker.time", { defaultValue: "时间" })}
              </span>
              <select
                value={hour}
                onChange={(e) =>
                  handleTimeChange(Number(e.target.value), minute)
                }
                className="border-input bg-background h-8 rounded-md border px-1 text-sm"
                aria-label={t("dateTimePicker.hour", { defaultValue: "时" })}
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {pad(h)}
                  </option>
                ))}
              </select>
              <span className="text-muted-foreground">:</span>
              <select
                value={
                  minutes.includes(minute)
                    ? minute
                    : (minutes.find((m) => m >= minute) ??
                      minutes[minutes.length - 1] ??
                      0)
                }
                onChange={(e) => handleTimeChange(hour, Number(e.target.value))}
                className="border-input bg-background h-8 rounded-md border px-1 text-sm"
                aria-label={t("dateTimePicker.minute", { defaultValue: "分" })}
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {pad(m)}
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                className="ml-2 h-7"
                onClick={() => setOpen(false)}
              >
                {t("dateTimePicker.confirm", { defaultValue: "确定" })}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DateTimePicker };
export type {
  DateTimePickerProps,
  DateTimePickerDateProps,
  DateTimePickerStringProps,
};
