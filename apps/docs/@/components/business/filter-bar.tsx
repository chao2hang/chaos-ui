"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Card, CardContent } from "@chaos_team/chaos-ui/ui";

interface FilterField {
  key: string;
  label: string;
  type?: "input" | "select" | "date-picker" | "date-range-picker" | "custom";
  placeholder?: string;
  /** For select type: options */
  options?: { label: string; value: string }[];
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
  fields = [],
  onSearch,
  onReset,
  layout = "inline",
  collapsible = true,
  loading = false,
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
      return (
        <select
          className="bg-background h-9 rounded-md border px-3 text-sm"
          value={String(values[field.key] ?? "")}
          onChange={(e) => handleChange(field.key, e.target.value || undefined)}
        >
          <option value="">{field.placeholder || field.label}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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
      className={cn("flex flex-wrap items-end gap-3", className)}
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
