"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CheckIcon,
  ChevronDownIcon,
  PackageIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component SkuPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 商品/SKU 选择器：combobox 触发 + 可筛选弹层。
 * / SKU picker — combobox trigger with a filterable popover.
 * @example
 * ```tsx
 * <SkuPicker
 *   value="SKU1"
 *   onChange={setId}
 *   options={[{ value: "SKU1", label: "酱油 500ml", spec: "500ml", price: 12.5 }]}
 * />
 * ```
 */
interface SkuPickerOption {
  value: string;
  label: string;
  /** Barcode or SKU code. / 编码 */
  code?: string;
  /** Specification. / 规格 */
  spec?: string;
  /** Unit. / 单位 */
  unit?: string;
  /** Unit price. / 单价 */
  price?: number;
  disabled?: boolean;
}

interface SkuPickerProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  options?: SkuPickerOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function SkuPicker({
  value,
  onChange,
  options = [],
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: SkuPickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const resolvedPlaceholder =
    placeholder ?? t("skuPicker.placeholder", { defaultValue: "请选择商品" });
  const resolvedSearch =
    searchPlaceholder ??
    t("skuPicker.search", { defaultValue: "搜索商品/SKU" });
  const resolvedEmpty =
    emptyText ?? t("skuPicker.empty", { defaultValue: "无匹配商品" });

  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.code?.toLowerCase().includes(q) ||
        o.spec?.toLowerCase().includes(q),
    );
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
        <PackageIcon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">
          {selected?.label ?? resolvedPlaceholder}
        </span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("skuPicker.clear", { defaultValue: "清除" })}
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
              className="hover:bg-muted rounded p-0.5"
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
          <ul role="listbox" className="max-h-64 overflow-y-auto p-1">
            {filtered.length === 0 && (
              <li className="text-muted-foreground px-2 py-6 text-center text-sm">
                {resolvedEmpty}
              </li>
            )}
            {filtered.map((o) => {
              const isSelected = o.value === value;
              return (
                <li key={o.value} role="option" aria-selected={isSelected}>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    {...(o.disabled !== undefined
                      ? { disabled: o.disabled }
                      : {})}
                    onClick={() => {
                      onChange?.(o.value);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "h-auto w-full justify-start gap-2 rounded-sm px-2 py-1.5 font-normal",
                      isSelected && "bg-accent/50",
                      o.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    <span className="flex-1 truncate">
                      {o.label}
                      {o.spec && (
                        <span className="text-muted-foreground ml-1 text-xs">
                          · {o.spec}
                        </span>
                      )}
                    </span>
                    {o.unit && (
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {o.unit}
                      </span>
                    )}
                    {o.price != null && (
                      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                        {formatCurrency(o.price)}
                      </span>
                    )}
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

export { SkuPicker };
export type { SkuPickerProps, SkuPickerOption };
