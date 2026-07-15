"use client";
import * as React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Input } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  maxCount?: number;
  maxSelected?: number;
  clearable?: boolean;
  /**
   * Trigger height. default keeps min-h-9 (existing product choice);
   * sm uses min-h-7 to align with Button/SelectTrigger toolbar height.
   */
  size?: "sm" | "default";
}

/**
 * @component MultiSelect
 * @category business/picker
 * @since 0.2.0
 * @description Multi-select dropdown with search, grouped options, badge overflow, and clearable selection / 多选下拉组件，支持搜索、分组选项、标记溢出和可清除选择
 * @keywords multi, select, dropdown, search, picker, tags
 * @example
 * <MultiSelect options={[{ value: "1", label: "Option 1" }]} value={selected} onChange={setSelected} />
 */
export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled,
  className,
  maxCount = 3,
  maxSelected,
  clearable = true,
  size = "default",
}: MultiSelectProps) {
  const { t } = useTranslation("ui");
  const isSm = size === "sm";
  const [open, setOpen] = React.useState(false);
  const resolvedPlaceholder = placeholder ?? t("multiSelect.placeholder");
  const resolvedSearchPlaceholder =
    searchPlaceholder ?? t("multiSelect.searchPlaceholder");
  const resolvedEmptyText = emptyText ?? t("multiSelect.emptyText");
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange?.(value.filter((v) => v !== val));
    } else {
      if (maxSelected && value.length >= maxSelected) return;
      onChange?.([...value, val]);
    }
  };

  const visibleValues = value.slice(0, maxCount);
  const overflow = value.length - maxCount;

  return (
    <Popover
      data-slot="multi-select"
      data-size={size}
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            data-size={size}
            className={cn(
              "h-auto w-full justify-between font-normal",
              isSm ? "min-h-7 py-0.5" : "min-h-9",
              value.length === 0 && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <div className="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
          {value.length === 0 ? (
            <span>{resolvedPlaceholder}</span>
          ) : (
            <>
              {visibleValues.map((v) => {
                const opt = options.find((o) => o.value === v);
                return (
                  <Badge
                    key={v}
                    variant="secondary"
                    className="h-5 gap-0.5 pr-0.5 text-xs"
                  >
                    <span className="max-w-[80px] truncate">
                      {opt?.label ?? v}
                    </span>
                    <button
                      type="button"
                      aria-label={t("multiSelect.remove")}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(v);
                      }}
                      className="hover:bg-muted inline-flex size-3.5 shrink-0 items-center justify-center rounded-full opacity-60 hover:opacity-100"
                    >
                      <XIcon className="size-2.5" />
                    </button>
                  </Badge>
                );
              })}
              {overflow > 0 && (
                <Badge variant="secondary" className="h-5 text-xs">
                  +{overflow}
                </Badge>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          {clearable && value.length > 0 && (
            <button
              type="button"
              aria-label={t("multiSelect.clearAll")}
              onClick={(e) => {
                e.stopPropagation();
                onChange?.([]);
              }}
              className="hover:bg-muted inline-flex size-5 shrink-0 items-center justify-center rounded-full opacity-50 hover:opacity-100"
            >
              <XIcon className="size-3" />
            </button>
          )}
          <ChevronDownIcon className="size-4 opacity-50" />
        </div>
      </PopoverTrigger>
      {open && (
        <PopoverContent className="w-[var(--anchor-width)] p-0" align="start">
          <MultiSelectPanel
            options={options}
            value={value}
            onToggle={toggle}
            searchPlaceholder={resolvedSearchPlaceholder}
            emptyText={resolvedEmptyText}
          />
        </PopoverContent>
      )}
    </Popover>
  );
}

function MultiSelectPanel({
  options,
  value,
  onToggle,
  searchPlaceholder,
  emptyText,
}: {
  options: MultiSelectOption[];
  value: string[];
  onToggle: (val: string) => void;
  searchPlaceholder: string;
  emptyText: string;
}) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = React.useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.description?.toLowerCase().includes(q),
    );
  }, [options, query]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, MultiSelectOption[]>();
    for (const opt of filtered) {
      const key = opt.group ?? "";
      const arr = map.get(key) ?? [];
      arr.push(opt);
      map.set(key, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <div className="max-h-64 overflow-y-auto p-1">
        {grouped.length === 0 && (
          <div className="text-muted-foreground px-2 py-6 text-center text-sm">
            {emptyText}
          </div>
        )}
        {grouped.map(([group, items]) => (
          <div key={group || "_default"}>
            {group && (
              <div className="text-muted-foreground px-2 py-1 text-xs font-medium">
                {group}
              </div>
            )}
            {items.map((opt) => {
              const isSelected = value.includes(opt.value);
              return (
                <Button
                  key={opt.value}
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={opt.disabled}
                  onClick={() => onToggle(opt.value)}
                  className={cn(
                    "flex h-auto w-full cursor-default items-center justify-start gap-2 rounded-sm px-2 py-1.5 text-left text-sm font-normal outline-hidden select-none",
                    "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    opt.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input",
                    )}
                  >
                    {isSelected && <CheckIcon className="size-3" />}
                  </span>
                  <span className="flex-1 truncate">
                    {opt.label}
                    {opt.description && (
                      <span className="text-muted-foreground ml-2 text-xs">
                        {opt.description}
                      </span>
                    )}
                  </span>
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
