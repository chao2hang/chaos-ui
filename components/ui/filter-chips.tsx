"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { FilterIcon, XIcon } from "./icons";

interface FilterChip {
  /** Unique identifier / 唯一标识 */
  id: string;
  /** Label text / 标签文本 */
  label: string;
  /** Value text / 值文本 */
  value?: React.ReactNode;
  /** Chip color / 颜色 */
  color?: "default" | "primary" | "success" | "warning" | "error" | "info";
}

interface FilterChipsProps extends React.ComponentProps<"div"> {
  /** Active filter chips / 活动筛选条件列表 */
  filters?: FilterChip[];
  /** Remove a single filter by id / 移除单个筛选条件 */
  onRemove?: (id: string) => void;
  /** Clear all filters / 清除全部筛选条件 */
  onClear?: () => void;
  /** Max chips to display before collapsing / 最大显示数量 */
  maxDisplay?: number;
}

const chipColorMap: Record<string, string> = {
  default: "bg-muted text-muted-foreground border-muted",
  primary: "bg-primary/10 text-primary border-primary/20",
  success:
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-900",
  warning:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  error:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
  info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
};

/**
 * @component FilterChips
 * @category ui/data-display
 * @since 0.2.0
 * @description Active filter condition chips bar, each chip shows label:value with remove button / 活动筛选条件 chips 条，每个 chip 显示 label:value 并带移除按钮
 * @keywords filter, chips, conditions, active, 筛选, 条件
 * @example
 * <FilterChips
 *   filters={[{ id: "1", label: "Status", value: "Active" }]}
 *   onRemove={(id) => console.log(id)}
 *   onClear={() => console.log("clear")}
 * />
 */
function FilterChips({
  className,
  filters = [],
  onRemove,
  onClear,
  maxDisplay = 10,
  ...props
}: FilterChipsProps) {
  const [expanded, setExpanded] = React.useState(false);

  if (filters.length === 0) return null;

  const visible = expanded ? filters : filters.slice(0, maxDisplay);
  const overflow = filters.length - maxDisplay;

  return (
    <div
      data-slot="filter-chips"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      {...props}
    >
      <FilterIcon className="text-muted-foreground size-3.5 shrink-0" />
      {visible.map((chip) => {
        const colorClass =
          chipColorMap[chip.color ?? "default"] ?? chipColorMap.default;
        return (
          <span
            key={chip.id}
            data-slot="filter-chip"
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
              colorClass,
            )}
          >
            <span className="text-muted-foreground">{chip.label}:</span>
            <span>{chip.value}</span>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(chip.id)}
                className="ml-0.5 shrink-0 rounded-sm p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
                aria-label={`Remove ${chip.label}`}
              >
                <XIcon className="size-3" />
              </button>
            )}
          </span>
        );
      })}
      {overflow > 0 && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-muted-foreground hover:text-foreground rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors"
        >
          +{overflow} more
        </button>
      )}
      {expanded && overflow > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-muted-foreground hover:text-foreground rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors"
        >
          Collapse
        </button>
      )}
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-muted-foreground hover:text-destructive rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

export { FilterChips };
export type { FilterChip, FilterChipsProps };
