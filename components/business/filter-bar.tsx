"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { DatePicker } from "@/components/ui/date-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { NativeSelect } from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

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
  /**
   * Control density for fields + action buttons (issue #46).
   * Default `"sm"` so Input/Select/Button share h-7 in the toolbar row.
   * / 筛选栏密度；默认 sm 与操作按钮同高
   */
  size?: "sm" | "default";
  className?: string;
}

function initialValuesFromFields(
  fields: FilterField[],
): Record<string, unknown> {
  const initial: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.defaultValue !== undefined) initial[f.key] = f.defaultValue;
  }
  return initial;
}

function parseDateValue(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string" && value) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}

function parseRangeValue(
  value: unknown,
): [Date | null, Date | null] | undefined {
  if (!Array.isArray(value) || value.length < 2) return undefined;
  return [parseDateValue(value[0]), parseDateValue(value[1])];
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
  size = "sm",
  className,
}: FilterBarProps) {
  const { t } = useTranslation("ui");
  const [values, setValues] = React.useState<Record<string, unknown>>(() =>
    initialValuesFromFields(fields),
  );
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => onSearch(values);
  const handleReset = () => {
    setValues(initialValuesFromFields(fields));
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
            className="w-full min-w-44 sm:w-auto"
            size={size}
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
      // Empty must stay controlled: Base UI treats value===undefined as uncontrolled,
      // so use null (not undefined / omit) or first selection flips controlled and warns.
      // items={options} so SelectValue can resolve labels when the popup unmounts.
      return (
        <Select
          value={current || null}
          items={field.options}
          onValueChange={(v) =>
            handleChange(field.key, v == null || v === "" ? undefined : v)
          }
        >
          <SelectTrigger className="w-full min-w-44 sm:w-auto" size={size}>
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

    if (field.type === "date-picker") {
      const raw = values[field.key];
      const stringValue =
        typeof raw === "string"
          ? raw
          : raw instanceof Date
            ? `${raw.getFullYear()}-${String(raw.getMonth() + 1).padStart(2, "0")}-${String(raw.getDate()).padStart(2, "0")}`
            : null;
      return (
        <DatePicker
          valueAsString
          size={size}
          value={stringValue}
          placeholder={
            field.placeholder ||
            t("filterBar.datePlaceholder", { defaultValue: field.label })
          }
          onChange={(v) => handleChange(field.key, v ?? undefined)}
          className="w-full sm:w-44"
        />
      );
    }

    if (field.type === "date-range-picker") {
      const range = parseRangeValue(values[field.key]);
      return (
        <DateRangePicker
          presentation="range"
          size={size}
          {...(range ? { value: range } : {})}
          rangePlaceholder={
            field.placeholder ||
            t("filterBar.dateRangePlaceholder", {
              defaultValue: field.label,
            })
          }
          onChange={(next) => {
            if (!next || (!next[0] && !next[1])) {
              handleChange(field.key, undefined);
              return;
            }
            handleChange(field.key, next);
          }}
          className="w-full min-w-56 sm:w-auto"
        />
      );
    }

    // Default: input
    return (
      <Input
        size={size}
        placeholder={
          field.placeholder ||
          t("filterBar.inputPlaceholder", {
            defaultValue: `请输入${field.label}`,
            label: field.label,
          })
        }
        value={String(values[field.key] ?? "")}
        onChange={(e) => handleChange(field.key, e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full sm:w-44"
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
        <Button size={size} onClick={handleSearch} disabled={loading}>
          {t("filterBar.search", { defaultValue: "查询" })}
        </Button>
        <Button
          size={size}
          variant="outline"
          onClick={handleReset}
          disabled={loading}
        >
          {t("filterBar.reset", { defaultValue: "重置" })}
        </Button>

        {collapsible && hiddenCount > 0 && (
          <Button
            size={size}
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? t("filterBar.collapse", { defaultValue: "收起" })
              : t("filterBar.expand", {
                  defaultValue: `展开 (${hiddenCount})`,
                  count: hiddenCount,
                })}
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
