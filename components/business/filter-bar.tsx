"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui";

interface FilterField {
  key: string;
  label: string;
  type?: "input" | "select" | "date-picker" | "date-range-picker" | "custom";
  placeholder?: string;
  /** For select type: options */
  options?: { label: string; value: string }[];
  /**
   * Select presentation for `type: "select"`.
   * - `portal` (default): design-system compound Select popover
   * - `native`: browser native select via NativeSelect (dense forms / native a11y)
   */
  selectVariant?: "portal" | "native";
  /** For custom type */
  render?: (
    value: unknown,
    onChange: (key: string, val: unknown) => void,
  ) => React.ReactNode;
  /** Default value */
  defaultValue?: unknown;
}

interface FilterBarProps {
  /** Filter fields definition */
  fields: FilterField[];
  /** Search callback with current filter values */
  onSearch: (values: Record<string, unknown>) => void;
  /** Reset callback */
  onReset?: () => void;
  /** Layout: inline (horizontal) or card */
  layout?: "inline" | "card";
  /** Show collapse/expand for long filter bars (> 4 fields) */
  collapsible?: boolean;
  /** Loading state */
  loading?: boolean;
  /**
   * Default select presentation for fields without `selectVariant`.
   * Defaults to portal (design-system dropdown). / 字段未指定时的默认 select 形态
   */
  selectVariant?: "portal" | "native";
  className?: string;
}

/**
 * 搜索/筛选栏 —— 对标 qxy-mop 所有列表页的 Form layout="inline"。
 *
 * @component FilterBar
 * @category business/crud
 * @since 0.2.0
 */
function FilterBar({
  fields,
  onSearch,
  onReset,
  layout = "inline",
  collapsible = true,
  loading = false,
  selectVariant = "portal",
  className,
}: FilterBarProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    for (const f of fields) {
      if (f.defaultValue !== undefined) initial[f.key] = f.defaultValue;
    }
    return initial;
  });
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => onSearch(values);
  const handleReset = () => {
    setValues({});
    onReset?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // Show first 3 fields when collapsed, all when expanded
  const visibleFields = collapsible && !expanded ? fields.slice(0, 3) : fields;
  const hiddenCount = fields.length - 3;

  const renderField = (field: FilterField) => {
    if (field.render) {
      return field.render(values[field.key], handleChange);
    }

    if (field.type === "select" && field.options) {
      const variant = field.selectVariant ?? selectVariant;
      const current = String(values[field.key] ?? "");
      const placeholder = field.placeholder || field.label;

      if (variant === "native") {
        return (
          <NativeSelect
            className="min-w-44"
            value={current}
            onChange={(e) =>
              handleChange(field.key, e.target.value || undefined)
            }
            options={[
              { value: "", label: placeholder },
              ...field.options.map((opt) => ({
                value: opt.value,
                label: opt.label,
              })),
            ]}
          />
        );
      }

      // Default: compound Select (issue #41) — popover matches design system.
      // Empty selection uses undefined so SelectValue shows placeholder (not a fake option).
      return (
        <Select
          value={current || undefined}
          onValueChange={(v) =>
            handleChange(field.key, v == null || v === "" ? undefined : v)
          }
        >
          <SelectTrigger className="min-w-44" size="default">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    // Default: input
    return (
      <Input
        placeholder={field.placeholder || `请输入${field.label}`}
        value={String(values[field.key] ?? "")}
        onChange={(e) => handleChange(field.key, e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-44"
      />
    );
  };

  const content = (
    <div
      data-slot="filter-bar"
      className={cn(
        "flex flex-wrap items-end gap-3",
        // CUI-LIST-01 / #8: keep horizontal inset when used inside CardContent flush.
        // card layout relies on CardContent padding instead (avoid double pad).
        // Fall back to 1rem when --card-spacing is not defined (outside Card).
        layout === "inline" && "px-[var(--card-spacing,1rem)]",
        className,
      )}
      onKeyDown={handleKeyDown}
    >
      {visibleFields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="text-muted-foreground text-xs font-medium">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={handleSearch} disabled={loading}>
          查询
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          disabled={loading}
        >
          重置
        </Button>

        {collapsible && hiddenCount > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "收起" : `展开 (${hiddenCount})`}
          </Button>
        )}
      </div>
    </div>
  );

  if (layout === "card") {
    return (
      <Card data-slot="filter-bar">
        <CardContent className="pt-4">{content}</CardContent>
      </Card>
    );
  }

  return content;
}

export { FilterBar };
export type { FilterBarProps, FilterField };
