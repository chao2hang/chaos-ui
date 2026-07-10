"use client";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, ChevronDownIcon } from "@/components/ui/icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button, Calendar } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  numberOfMonths?: number;
  disabled?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
  presets?: boolean;
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

/**
 * @component DateRangePicker
 * @category business/picker
 * @since 0.2.0
 * @description Calendar-based date range picker with preset ranges and multi-month view / 基于日历的日期范围选择器，支持预设范围和多月视图
 * @keywords date, range, picker, calendar, preset
 * @example
 * <DateRangePicker value={range} onChange={setRange} />
 */
export function DateRangePicker({
  value,
  onChange,
  placeholder,
  numberOfMonths = 2,
  disabled,
  align = "start",
  className,
  presets = true,
}: DateRangePickerProps) {
  const { t } = useTranslation("transfer");
  const [open, setOpen] = React.useState(false);
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value?.from && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <CalendarIcon />
        <span className="truncate">{label}</span>
        <ChevronDownIcon className="ml-auto size-4 opacity-50" />
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto p-0">
        <div className="flex">
          {presets && (
            <div className="flex w-[140px] flex-col gap-1 border-r p-3">
              {DEFAULT_PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    onChange?.(preset.getRange());
                    setOpen(false);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          )}
          <Calendar
            mode="range"
            selected={value}
            {...(onChange ? { onSelect: onChange } : { onSelect: () => {} })}
            numberOfMonths={numberOfMonths}
            autoFocus
            required={false}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
