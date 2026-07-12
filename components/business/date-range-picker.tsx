"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DateRangePicker as UiDateRangePicker,
  type DateRangePickerProps as UiDateRangePickerProps,
} from "@/components/ui/date-range-picker";

/**
 * Business / ERP date-range value shape (react-day-picker DateRange).
 * Distinct from UI tuple `[Date | null, Date | null]` — see docs/api-boundaries.md.
 */
interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  numberOfMonths?: number;
  disabled?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
  /** Show preset shortcuts (default true) / 显示预设快捷项 */
  presets?: boolean;
  size?: UiDateRangePickerProps["size"];
}

function getPresets(
  t: ReturnType<typeof useTranslation>["t"],
): Array<{ label: string; getRange: () => DateRange }> {
  return [
    {
      label: t("dateRangePicker.today"),
      getRange: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return { from: today, to: today };
      },
    },
    {
      label: t("dateRangePicker.yesterday"),
      getRange: () => {
        const y = new Date();
        y.setDate(y.getDate() - 1);
        y.setHours(0, 0, 0, 0);
        return { from: y, to: y };
      },
    },
    {
      label: t("dateRangePicker.last7Days"),
      getRange: () => {
        const to = new Date();
        to.setHours(23, 59, 59, 999);
        const from = new Date();
        from.setDate(from.getDate() - 6);
        from.setHours(0, 0, 0, 0);
        return { from, to };
      },
    },
    {
      label: t("dateRangePicker.last30Days"),
      getRange: () => {
        const to = new Date();
        to.setHours(23, 59, 59, 999);
        const from = new Date();
        from.setDate(from.getDate() - 29);
        from.setHours(0, 0, 0, 0);
        return { from, to };
      },
    },
    {
      label: t("dateRangePicker.thisMonth"),
      getRange: () => {
        const now = new Date();
        const from = new Date(now.getFullYear(), now.getMonth(), 1);
        const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { from, to };
      },
    },
    {
      label: t("dateRangePicker.lastMonth"),
      getRange: () => {
        const now = new Date();
        const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const to = new Date(now.getFullYear(), now.getMonth(), 0);
        return { from, to };
      },
    },
  ];
}

function toTuple(range: DateRange | undefined): [Date | null, Date | null] {
  if (!range) return [null, null];
  return [range.from ?? null, range.to ?? null];
}

function fromTuple(tuple: [Date | null, Date | null]): DateRange | undefined {
  const [from, to] = tuple;
  if (!from && !to) return undefined;
  // DateRange requires `from`; use epoch-less empty via earliest of the two.
  const start = from ?? to!;
  return { from: start, ...(to ? { to } : {}) };
}

/**
 * @component DateRangePicker
 * @category business/picker
 * @since 0.2.0
 * @description ERP date range picker with `{ from, to }` value + presets.
 * Wraps UI `DateRangePicker` (`presentation="range"`) — does **not** change the
 * public value shape. Also exported as `PresetDateRangePicker`.
 * / ERP 日期范围选择器（DateRange + 预设），内部包装 UI 范围日历，1.x 不改 value 形状。
 * @keywords date, range, picker, calendar, preset
 * @example
 * <DateRangePicker value={range} onChange={setRange} />
 * @see docs/api-boundaries.md
 */
function DateRangePicker({
  value,
  onChange,
  placeholder,
  numberOfMonths = 2,
  disabled,
  align = "start",
  className,
  presets = true,
  size = "default",
}: DateRangePickerProps) {
  const { t } = useTranslation("transfer");
  const resolvedPlaceholder = placeholder ?? t("dateRangePicker.placeholder");
  const DEFAULT_PRESETS = React.useMemo(() => getPresets(t), [t]);

  const label = React.useMemo(() => {
    if (!value?.from) return resolvedPlaceholder;
    if (!value.to) return formatDate(value.from, { dateStyle: "medium" });
    if (value.from.getTime() === value.to.getTime()) {
      return formatDate(value.from, { dateStyle: "medium" });
    }
    return `${formatDate(value.from, { dateStyle: "medium" })} - ${formatDate(value.to, { dateStyle: "medium" })}`;
  }, [value, resolvedPlaceholder]);

  const sidebar = presets ? (
    <div className="flex w-[140px] flex-col gap-1 border-r p-3">
      {DEFAULT_PRESETS.map((preset) => (
        <Button
          key={preset.label}
          variant="ghost"
          size="sm"
          className="justify-start"
          type="button"
          onClick={() => {
            onChange?.(preset.getRange());
          }}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  ) : null;

  return (
    <UiDateRangePicker
      presentation="range"
      value={toTuple(value)}
      onChange={(tuple) => onChange?.(fromTuple(tuple))}
      rangePlaceholder={resolvedPlaceholder}
      rangeLabel={label}
      numberOfMonths={numberOfMonths}
      align={align}
      size={size}
      className={cn("w-[300px] [&>button]:w-full", className)}
      {...(disabled !== undefined ? { disabled } : {})}
      {...(sidebar ? { sidebar } : {})}
    />
  );
}

/**
 * Preferred discoverability alias for the business preset range picker.
 * Same component as `DateRangePicker` (business).
 */
const PresetDateRangePicker = DateRangePicker;

export { DateRangePicker, PresetDateRangePicker, toTuple, fromTuple };
export type { DateRangePickerProps };
