"use client";

import * as React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  onChange?: (
    value: (string | number)[],
    selectedOptions: CascaderOption[],
  ) => void;
  options: CascaderOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Trigger height: default h-8; sm aligns with Button/SelectTrigger h-7 */
  size?: "sm" | "default";
  /** Display mode / 展示模式 */
  displayRender?: (
    labels: string[],
    selectedOptions: CascaderOption[],
  ) => string;
  /**
   * Fire onChange when selecting a non-leaf (intermediate) level too.
   * / 选择任意层（含中间层）都触发 onChange，而非仅叶子节点
   */
  changeOnSelect?: boolean;
}

function Cascader({
  value = [],
  onChange,
  options,
  placeholder = "Please select",
  disabled = false,
  className,
  size = "default",
  displayRender,
  changeOnSelect = false,
}: CascaderProps) {
  const isSm = size === "sm";
  const [open, setOpen] = React.useState(false);
  const [activeColumns, setActiveColumns] = React.useState<CascaderOption[][]>([
    options,
  ]);

  // Keep latest options in a ref so the effect below doesn't depend on the
  // `options` array reference (inline arrays recreate every render → infinite
  // loop: effect → setActiveColumns → re-render → new options ref → effect).
  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  // Build active columns from value
  React.useEffect(() => {
    const opts = optionsRef.current;
    if (value.length === 0) {
      setActiveColumns([opts]);
      return;
    }
    const cols: CascaderOption[][] = [opts];
    let current = opts;
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
    // Intentionally only depend on `value`; options changes are picked up via
    // the ref (options is typically static; dynamic options should use a `key`
    // to remount). Depending on `options` directly loops on inline arrays.
  }, [value]);

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

  const handleSelect = (colIndex: number, option: CascaderOption) => {
    const newValue = value.slice(0, colIndex);
    newValue[colIndex] = option.value;

    if (option.children?.length) {
      const newCols = activeColumns.slice(0, colIndex + 1);
      newCols.push(option.children);
      setActiveColumns(newCols);
      // changeOnSelect: also emit the value up to this (intermediate) level.
      if (changeOnSelect) {
        onChange?.(
          newValue.slice(0, colIndex + 1),
          getSelectedOptions(newValue.slice(0, colIndex + 1), options),
        );
      }
      // Don't close — user needs to pick the next level
    } else {
      // Leaf node — close and fire onChange
      setActiveColumns(activeColumns.slice(0, colIndex + 1));
      onChange?.(
        newValue.slice(0, colIndex + 1),
        getSelectedOptions(newValue.slice(0, colIndex + 1), options),
      );
      setOpen(false);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      data-slot="cascader"
      data-size={size}
    >
      <PopoverTrigger
        render={
          <button
            type="button"
            disabled={disabled}
            data-size={size}
            className={cn(
              "border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-center justify-between border bg-transparent px-3 text-sm outline-none focus-visible:ring-3",
              isSm
                ? "h-7 rounded-[min(var(--radius-md),10px)]"
                : "h-8 rounded-lg",
              !selectedLabels.length && "text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50",
              className,
            )}
          />
        }
      >
        <span className="truncate" title={displayText || undefined}>
          {displayText}
        </span>
        <ChevronRight className="size-4 rotate-90 opacity-50" />
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
                      "hover:bg-accent flex w-full items-center justify-between px-3 py-2 text-sm",
                      isSelected && "bg-accent font-medium",
                      option.disabled && "pointer-events-none opacity-50",
                    )}
                    onClick={() => handleSelect(colIdx, option)}
                  >
                    <span
                      className="truncate"
                      title={
                        typeof option.label === "string"
                          ? option.label
                          : undefined
                      }
                    >
                      {option.label}
                    </span>
                    {option.children?.length && (
                      <ChevronLeft className="size-3.5 rotate-180 opacity-40" />
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
