"use client";
// native-select-exception: compact year/period index selects inside popover

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

/**
 * @component PeriodPicker
 * @category ui/data-entry
 * @since 1.14.0
 * @description 会计期间选择器（年/季/月），输出期间键与起止日期，对齐 Ecology
 * WeaPeriod。适合预算、销售期间等场景。 / Accounting period picker (year/quarter/month)
 * outputting a period key plus start/end dates, aligning with Ecology WeaPeriod.
 * @keywords period, fiscal, quarter, month, year, accounting
 * @example
 * ```tsx
 * <PeriodPicker
 *   value={{ granularity: 'month', year: 2026, index: 7 }}
 *   onChange={({ periodKey, start, end }) => ...}
 * />
 * ```
 */

export type PeriodGranularity = "year" | "quarter" | "month";

export interface PeriodValue {
  granularity: PeriodGranularity;
  year: number;
  /** 1-based quarter (1-4) or month (1-12). Ignored for `year`. */
  index?: number;
}

export interface PeriodRange {
  periodKey: string;
  start: Date;
  end: Date;
}

export interface PeriodPickerProps {
  value?: PeriodValue;
  onChange?: (range: PeriodRange, value: PeriodValue) => void;
  granularity?: PeriodGranularity;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "default";
  className?: string;
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Compute start/end/periodKey for a period value. */
export function resolvePeriod(value: PeriodValue): PeriodRange {
  const { granularity, year, index } = value;
  if (granularity === "year") {
    return {
      periodKey: `${year}`,
      start: new Date(year, 0, 1),
      end: new Date(year, 11, 31, 23, 59, 59, 999),
    };
  }
  if (granularity === "quarter") {
    const q = index ?? 1;
    const startMonth = (q - 1) * 3;
    return {
      periodKey: `${year}-Q${q}`,
      start: new Date(year, startMonth, 1),
      end: new Date(year, startMonth + 3, 0, 23, 59, 59, 999),
    };
  }
  // month
  const m = index ?? 1;
  return {
    periodKey: `${year}-${pad(m)}`,
    start: new Date(year, m - 1, 1),
    end: new Date(year, m, 0, 23, 59, 59, 999),
  };
}

function formatPeriodLabel(value: PeriodValue): string {
  const { granularity, year, index } = value;
  if (granularity === "year") return `${year}年`;
  if (granularity === "quarter") return `${year}年 Q${index ?? 1}`;
  return `${year}年${index ?? 1}月`;
}

function PeriodPicker({
  value,
  onChange,
  granularity: granularityProp = "month",
  placeholder,
  disabled = false,
  size = "default",
  className,
}: PeriodPickerProps) {
  const { t } = useTranslation("ui");

  const [open, setOpen] = React.useState(false);
  const [granularity, setGranularity] = React.useState<PeriodGranularity>(
    value?.granularity ?? granularityProp,
  );
  const baseYear = React.useMemo(() => new Date().getFullYear(), []);
  const [year, setYear] = React.useState(value?.year ?? baseYear);
  const [index, setIndex] = React.useState(
    value?.index ?? new Date().getMonth() + 1,
  );
  const [committed, setCommitted] = React.useState<PeriodValue | null>(
    value ?? null,
  );

  // Sync internal state when controlled value changes
  React.useEffect(() => {
    if (value) {
      setGranularity(value.granularity);
      setYear(value.year);
      setIndex(value.index ?? 1);
      setCommitted(value);
    }
  }, [value]);

  const currentValue: PeriodValue = {
    granularity,
    year,
    ...(granularity === "year" ? {} : { index }),
  };

  const displaySource = value ?? committed;
  const displayLabel = displaySource ? formatPeriodLabel(displaySource) : "";
  const resolvedPlaceholder =
    placeholder ?? t("periodPicker.placeholder", { defaultValue: "选择期间" });

  const years = React.useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => baseYear - 5 + i);
  }, [baseYear]);

  const indexOptions: { value: number; label: string }[] =
    granularity === "quarter"
      ? [1, 2, 3, 4].map((q) => ({ value: q, label: `Q${q}` }))
      : granularity === "month"
        ? Array.from({ length: 12 }, (_, i) => ({
            value: i + 1,
            label: `${i + 1}月`,
          }))
        : [];

  const handleConfirm = () => {
    const range = resolvePeriod(currentValue);
    setCommitted(currentValue);
    onChange?.(range, currentValue);
    setOpen(false);
  };

  const sizeClass = size === "sm" ? "h-7 text-sm" : "h-8 text-sm";

  return (
    <div
      data-slot="period-picker"
      className={cn("relative block w-full", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size={size === "sm" ? "sm" : "default"}
              disabled={disabled}
              className={cn(
                sizeClass,
                "w-full justify-start font-normal",
                !displayLabel && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="size-4 shrink-0" />
              {displayLabel || resolvedPlaceholder}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-3" align="start">
          <div className="flex flex-col gap-3">
            {/* granularity switch */}
            <div className="flex items-center gap-1">
              {(["year", "quarter", "month"] as PeriodGranularity[]).map(
                (g) => (
                  <Button
                    key={g}
                    size="sm"
                    variant={granularity === g ? "default" : "outline"}
                    className="h-7"
                    onClick={() => {
                      setGranularity(g);
                      if (g === "year")
                        setIndex(undefined as unknown as number);
                      else if (g === "quarter") setIndex(1);
                      else setIndex(new Date().getMonth() + 1);
                    }}
                  >
                    {g === "year"
                      ? t("periodPicker.year", { defaultValue: "年" })
                      : g === "quarter"
                        ? t("periodPicker.quarter", { defaultValue: "季" })
                        : t("periodPicker.month", { defaultValue: "月" })}
                  </Button>
                ),
              )}
            </div>

            {/* year select */}
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground w-10 text-xs">
                {t("periodPicker.yearLabel", { defaultValue: "年份" })}
              </span>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="border-input bg-background h-8 flex-1 rounded-md border px-2 text-sm"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* index select (quarter/month) */}
            {granularity !== "year" && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-10 text-xs">
                  {granularity === "quarter"
                    ? t("periodPicker.quarterLabel", { defaultValue: "季度" })
                    : t("periodPicker.monthLabel", { defaultValue: "月份" })}
                </span>
                <select
                  value={index}
                  onChange={(e) => setIndex(Number(e.target.value))}
                  className="border-input bg-background h-8 flex-1 rounded-md border px-2 text-sm"
                >
                  {indexOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-end">
              <Button size="sm" className="h-7" onClick={handleConfirm}>
                {t("periodPicker.confirm", { defaultValue: "确定" })}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { PeriodPicker };
