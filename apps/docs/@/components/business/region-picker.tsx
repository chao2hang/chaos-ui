"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@chaos_team/chaos-ui/ui";
import {
  CheckIcon,
  ChevronDownIcon,
  MapPinIcon,
  SearchIcon,
  XIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component RegionPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 行政区划选择器（树形级联）：combobox 触发 + 可筛选的树形弹层。
 * / Region picker — combobox trigger with a filterable cascading tree popover.
 * @example
 * ```tsx
 * <RegionPicker
 *   value="R3"
 *   onChange={setId}
 *   options={[
 *     { value: "R1", label: "重庆市" },
 *     { value: "R2", label: "渝中区", parent: "R1" },
 *   ]}
 * />
 * ```
 */
interface RegionPickerOption {
  value: string;
  label: string;
  /** Parent value (forms the cascade). / 父节点 value */
  parent?: string;
  /** Administrative level. / 层级 */
  level?: "province" | "city" | "district";
  disabled?: boolean;
}

interface RegionPickerProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  options?: RegionPickerOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function flatten<T extends RegionPickerOption>(
  options: T[],
): Array<T & { depth: number }> {
  const childrenOf = (parent?: string) =>
    options.filter((o) => (o.parent ?? "") === (parent ?? ""));
  const rows: Array<T & { depth: number }> = [];
  const walk = (parent: string | undefined, depth: number) => {
    for (const o of childrenOf(parent)) {
      rows.push({ ...o, depth });
      walk(o.value, depth + 1);
    }
  };
  walk(undefined, 0);
  return rows;
}

function RegionPicker({
  value,
  onChange,
  options = [],
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: RegionPickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const resolvedPlaceholder =
    placeholder ?? t("regionPicker.placeholder", { defaultValue: "请选择地区" });
  const resolvedSearch =
    searchPlaceholder ?? t("regionPicker.search", { defaultValue: "搜索地区" });
  const resolvedEmpty =
    emptyText ?? t("regionPicker.empty", { defaultValue: "无匹配地区" });

  const selected = options.find((o) => o.value === value);

  const rows = React.useMemo(() => {
    if (!query.trim()) return flatten(options);
    const q = query.trim().toLowerCase();
    const matches = options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
    const keep = new Set<string>();
    for (const m of matches) {
      let cur: string | undefined = m.value;
      while (cur) {
        keep.add(cur);
        const node = options.find((o) => o.value === cur);
        cur = node?.parent;
      }
    }
    return flatten(options)
      .filter((r) => keep.has(r.value))
      .map((r) => ({ ...r, depth: 0 }));
  }, [options, query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            type="button"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            className={cn(
              "w-[200px] justify-between font-normal",
              !selected && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <MapPinIcon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">{selected?.label ?? resolvedPlaceholder}</span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("regionPicker.clear", { defaultValue: "清除" })}
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange?.(undefined);
                }
              }}
              className="rounded p-0.5 hover:bg-muted"
            >
              <XIcon className="size-3.5 opacity-60 hover:opacity-100" />
            </span>
          )}
          <ChevronDownIcon className="size-4 opacity-50" />
        </span>
      </PopoverTrigger>
      {open && (
        <PopoverContent align="start" className="w-[var(--anchor-width)] p-0">
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <SearchIcon className="size-4 shrink-0 opacity-50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={resolvedSearch}
              aria-label={resolvedSearch}
              className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <ul role="tree" className="max-h-64 overflow-y-auto p-1">
            {rows.length === 0 && (
              <li className="px-2 py-6 text-center text-sm text-muted-foreground">
                {resolvedEmpty}
              </li>
            )}
            {rows.map((o) => {
              const isSelected = o.value === value;
              return (
                <li key={o.value} role="treeitem" aria-selected={isSelected}>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    {...(o.disabled !== undefined ? { disabled: o.disabled } : {})}
                    onClick={() => {
                      onChange?.(o.value);
                      setOpen(false);
                      setQuery("");
                    }}
                    style={{ paddingLeft: `${8 + o.depth * 16}px` }}
                    className={cn(
                      "h-auto w-full justify-start gap-2 rounded-sm py-1.5 pr-2 font-normal",
                      isSelected && "bg-accent/50",
                      o.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    <span className="flex-1 truncate">{o.label}</span>
                    {isSelected && <CheckIcon className="size-4 shrink-0" />}
                  </Button>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      )}
    </Popover>
  );
}

export { RegionPicker };
export type { RegionPickerProps, RegionPickerOption };
