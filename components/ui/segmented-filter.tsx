"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * An option in the segmented filter.
 */
interface SegmentFilterOption {
  /** Option value / 选项值 */
  value: string;
  /** Display label / 显示标签 */
  label: string;
  /** Optional count badge / 可选的计数徽标 */
  count?: number;
  /** Optional icon / 可选的图标 */
  icon?: React.ReactNode;
}

/**
 * Props for the SegmentedFilter component.
 */
interface SegmentedFilterProps {
  /** Filter options / 过滤选项 */
  options: SegmentFilterOption[];
  /** Currently selected value / 当前选中的值 */
  value?: string;
  /** Change callback / 变更回调 */
  onChange?: (value: string) => void;
  /** Additional className / 额外类名 */
  className?: string;
  /** Size variant / 尺寸变体 */
  size?: "sm" | "default" | "lg";
}

/* ------------------------------------------------------------------ */
/*  SegmentedFilter - main export                                     */
/* ------------------------------------------------------------------ */

const sizeMap = {
  sm: "h-7 px-2.5 text-xs",
  default: "h-9 px-3.5 text-sm",
  lg: "h-10 px-4 text-sm",
} as const;

/**
 * @component SegmentedFilter
 * @category ui/data-entry
 * @since 0.2.0
 * @description Segmented filter control for BI/dashboard with optional
 *   count badges and filter semantics. Active segment uses primary
 *   background. / 分段过滤控件，用于 BI/仪表盘，支持可选计数徽标和过滤
 *   语义。激活的分段使用主色背景。
 * @keywords segmented, filter, control, dashboard, bi, tabs, count, badge
 * @example
 * ```tsx
 * <SegmentedFilter
 *   options={[
 *     { value: "all", label: "全部", count: 100 },
 *     { value: "active", label: "活跃", count: 42 },
 *   ]}
 *   value="all"
 *   onChange={(v) => console.log(v)}
 * />
 * ```
 */
function SegmentedFilter({
  options,
  value,
  onChange,
  className,
  size = "default",
}: SegmentedFilterProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    value ?? options[0]?.value ?? "",
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const currentValue = value !== undefined ? value : internalValue;

  const handleSelect = (v: string) => {
    setInternalValue(v);
    onChange?.(v);
  };

  return (
    <div
      data-slot="segmented-filter"
      className={cn(
        "bg-muted/30 inline-flex items-center gap-0.5 rounded-lg border p-0.5",
        className,
      )}
    >
      {options.map((opt) => {
        const isActive = currentValue === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-md border border-transparent font-medium transition-all",
              sizeMap[size],
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={cn(
                  "inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium tabular-nums",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedFilter };
export type { SegmentFilterOption, SegmentedFilterProps };
