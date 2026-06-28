"use client";

import * as React from "react";
import { Search, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputSearch } from "@/components/ui/input-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRangePicker } from "@/components/business/date-range-picker";

/**
 * @component FilterBar
 * @category business/crud
 * @since 0.2.0
 * @description 搜索/筛选栏(支持多种字段类型,响应式折叠) / Search filter bar with multiple field types and responsive collapse
 * @keywords filter, search, bar, crud, query
 * @example
 * <FilterBar
 *   fields={[
 *     { name: 'keyword', label: 'Keyword', type: 'search' },
 *     { name: 'status', label: 'Status', type: 'select', options: [{ label: 'Active', value: '1' }] },
 *   ]}
 *   onSearch={(values) => console.log(values)}
 * />
 */

type FilterFieldType = "input" | "search" | "select" | "date" | "dateRange";

interface FilterFieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface FilterField {
  /** Field name / 字段名 */
  name: string;
  /** Field label / 字段标签 */
  label: string;
  /** Field type / 字段类型 */
  type?: FilterFieldType;
  /** Options for select / Select 选项 */
  options?: FilterFieldOption[];
  /** Placeholder / 占位文本 */
  placeholder?: string;
  /** Default value / 默认值 */
  defaultValue?: string | number;
  /** Field width / 字段宽度 */
  width?: number | string;
  /** Whether field is disabled / 是否禁用 */
  disabled?: boolean;
}

interface FilterBarProps extends React.ComponentProps<"div"> {
  /** Filter field configs / 筛选字段配置 */
  fields: FilterField[];
  /** Search callback / 搜索回调 */
  onSearch?: ((values: Record<string, unknown>) => void) | undefined;
  /** Reset callback / 重置回调 */
  onReset?: (() => void) | undefined;
  /** Layout style / 布局样式 */
  layout?: "inline" | "card";
  /** Number of fields visible before collapse / 折叠前可见字段数 */
  defaultVisibleCount?: number;
  /** Whether to show reset button / 是否显示重置按钮 */
  showReset?: boolean;
  /** Whether to show search button / 是否显示搜索按钮 */
  showSearch?: boolean;
  /** Initial values / 初始值 */
  initialValues?: Record<string, unknown>;
}

function FilterBar({
  className,
  fields,
  onSearch,
  onReset,
  layout = "inline",
  defaultVisibleCount,
  showReset = true,
  showSearch = true,
  initialValues,
  ...props
}: FilterBarProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(
    () => {
      const defaults: Record<string, unknown> = {};
      fields.forEach((f) => {
        defaults[f.name] =
          initialValues?.[f.name] ?? f.defaultValue ?? "";
      });
      return defaults;
    },
  );
  const [expanded, setExpanded] = React.useState(false);

  const showCollapse = defaultVisibleCount !== undefined && fields.length > defaultVisibleCount;
  const visibleFields = showCollapse && !expanded
    ? fields.slice(0, defaultVisibleCount)
    : fields;

  const handleChange = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch?.(values);
  };

  const handleReset = () => {
    const resetValues: Record<string, unknown> = {};
    fields.forEach((f) => {
      resetValues[f.name] = f.defaultValue ?? "";
    });
    setValues(resetValues);
    onReset?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const renderField = (field: FilterField) => {
    const val = values[field.name];

    switch (field.type) {
      case "search":
        return (
          <InputSearch
            placeholder={field.placeholder ?? `Search ${field.label}`}
            value={val as string}
            onChange={(value) => handleChange(field.name, value)}
            onSearch={handleSearch}
            disabled={field.disabled}
            className="w-full"
          />
        );

      case "select":
        return (
          <Select
            value={val !== undefined && val !== "" ? String(val) : undefined}
            onValueChange={(v) => handleChange(field.name, v)}
            disabled={field.disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={field.placeholder ?? `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem
                  key={String(opt.value)}
                  value={String(opt.value)}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <DatePicker
            value={val as Date | undefined}
            onChange={(date) => handleChange(field.name, date)}
            disabled={field.disabled}
            className="w-full"
          />
        );

      case "dateRange":
        return (
          <DateRangePicker
            value={(val as { from?: Date; to?: Date } | undefined) as any}
            onChange={(range) => handleChange(field.name, range)}
            disabled={field.disabled ?? false}
            className="w-full"
          />
        );

      default:
        return (
          <Input
            placeholder={field.placeholder ?? `Enter ${field.label}`}
            value={val as string}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={field.disabled}
            className="w-full"
          />
        );
    }
  };

  return (
    <div
      data-slot="filter-bar"
      className={cn(
        "rounded-lg border border-border bg-background p-4",
        layout === "card" && "shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap items-end gap-3">
        {visibleFields.map((field) => (
          <div
            key={field.name}
            className="flex flex-col gap-1"
            style={{ width: field.width ?? 200 }}
          >
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              {field.label}
            </label>
            {renderField(field)}
          </div>
        ))}

        <div className="flex items-center gap-2 pb-0.5">
          {showSearch && (
            <Button type="button" size="sm" onClick={handleSearch}>
              <Search className="size-4" />
              Search
            </Button>
          )}
          {showReset && (
            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          )}
          {showCollapse && (
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  Collapse <ChevronUp className="size-4" />
                </>
              ) : (
                <>
                  Expand <ChevronDown className="size-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { FilterBar };
export type { FilterBarProps, FilterField, FilterFieldOption, FilterFieldType };
