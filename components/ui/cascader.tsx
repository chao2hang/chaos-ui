"use client";

import * as React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

/**
 * @component Cascader
 * @category ui/select
 * @since 0.5.0
 * @description Cascade selection (department / region / category). / 级联选择器
 * @keywords cascader, cascade, select, hierarchy, tree
 * @example
 * <Cascader
 *   options={regionData}
 *   value={["CN", "BJ", "HD"]}
 *   onChange={(path) => setSelected(path)}
 * />
 */

interface CascaderOption {
  value: string | number;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

interface CascaderProps {
  value?: (string | number)[];
  onChange?: (value: (string | number)[], selectedOptions: CascaderOption[]) => void;
  options: CascaderOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Display mode / 展示模式 */
  displayRender?: (labels: string[], selectedOptions: CascaderOption[]) => string;
}

function Cascader({
  value = [],
  onChange,
  options,
  placeholder = "Please select",
  disabled = false,
  className,
  displayRender,
}: CascaderProps) {
  const [open, setOpen] = React.useState(false);
  const [activeColumns, setActiveColumns] = React.useState<CascaderOption[][]>([options]);

  // Build active columns from value
  React.useEffect(() => {
    if (value.length === 0) {
      setActiveColumns([options]);
      return;
    }
    const cols: CascaderOption[][] = [options];
    let current = options;
    for (const v of value) {
      const found = current.find((o) => o.value === v);
      if (found?.children) {
        cols.push(found.children);
        current = found.children;
      } else {
        break;
      }
    }
    setActiveColumns(cols);
  }, [value, options]);

  // Get selected labels
  const selectedLabels = React.useMemo(() => {
    const labels: string[] = [];
    let current = options;
    for (const v of value) {
      const found = current.find((o) => o.value === v);
      if (found) {
        labels.push(found.label);
        current = found.children ?? [];
      } else {
        break;
      }
    }
    return labels;
  }, [value, options]);

  const displayText = displayRender
    ? displayRender(selectedLabels, getSelectedOptions(value, options))
    : selectedLabels.join(" / ") || placeholder;

  const handleSelect = (
    colIndex: number,
    option: CascaderOption,
  ) => {
    const newValue = value.slice(0, colIndex);
    newValue[colIndex] = option.value;

    if (option.children?.length) {
      const newCols = activeColumns.slice(0, colIndex + 1);
      newCols.push(option.children);
      setActiveColumns(newCols);
      // Don't close — user needs to pick the next level
    } else {
      // Leaf node — close and fire onChange
      setActiveColumns(activeColumns.slice(0, colIndex + 1));
      onChange?.(newValue.slice(0, colIndex + 1), getSelectedOptions(newValue.slice(0, colIndex + 1), options));
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 text-sm",
              !selectedLabels.length && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed",
              className,
            )}
          />
        }
      >
        <span className="truncate">{displayText}</span>
        <ChevronRight className="size-4 opacity-50 rotate-90" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <div className="flex min-w-[480px]">
          {activeColumns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="max-h-60 min-w-[160px] overflow-y-auto border-r last:border-r-0"
            >
              {col.map((option) => {
                const isSelected = value[colIdx] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-accent",
                      isSelected && "bg-accent font-medium",
                      option.disabled && "opacity-50 pointer-events-none",
                    )}
                    onClick={() => handleSelect(colIdx, option)}
                  >
                    <span className="truncate">{option.label}</span>
                    {option.children?.length && (
                      <ChevronLeft className="size-3.5 opacity-40 rotate-180" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function getSelectedOptions(
  value: (string | number)[],
  options: CascaderOption[],
): CascaderOption[] {
  const result: CascaderOption[] = [];
  let current = options;
  for (const v of value) {
    const found = current.find((o) => o.value === v);
    if (found) {
      result.push(found);
      current = found.children ?? [];
    } else {
      break;
    }
  }
  return result;
}

export { Cascader };
export type { CascaderProps, CascaderOption };