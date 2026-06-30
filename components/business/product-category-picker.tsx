"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  CheckIcon,
  ChevronDownIcon,
  FolderIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component ProductCategoryPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 商品分类选择器（树形）：combobox 触发 + 可筛选的树形弹层。
 * / Product-category picker — combobox trigger with a filterable tree popover.
 * @example
 * ```tsx
 * <ProductCategoryPicker
 *   value="C2"
 *   onChange={setId}
 *   options={[{ value: "C1", label: "食品" }, { value: "C2", label: "调味品", parent: "C1" }]}
 * />
 * ```
 */
interface ProductCategoryPickerOption {
  value: string;
  label: string;
  /** Parent value (forms a tree). / 父节点 value */
  parent?: string;
  disabled?: boolean;
}

interface ProductCategoryPickerProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  options?: ProductCategoryPickerOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function flatten<T extends ProductCategoryPickerOption>(
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

function ProductCategoryPicker({
  value,
  onChange,
  options = [],
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: ProductCategoryPickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const resolvedPlaceholder =
    placeholder ?? t("productCategoryPicker.placeholder", { defaultValue: "请选择商品分类" });
  const resolvedSearch =
    searchPlaceholder ?? t("productCategoryPicker.search", { defaultValue: "搜索分类" });
  const resolvedEmpty =
    emptyText ?? t("productCategoryPicker.empty", { defaultValue: "无匹配分类" });

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
        <FolderIcon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">{selected?.label ?? resolvedPlaceholder}</span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("productCategoryPicker.clear", { defaultValue: "清除" })}
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

export { ProductCategoryPicker };
export type { ProductCategoryPickerProps, ProductCategoryPickerOption };
