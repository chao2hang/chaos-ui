"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import { cn } from "@/lib/utils";
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
  SearchIcon,
  TruckIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component DistributorPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 经销商选择器：combobox 触发 + 可筛选弹层。
 * / Distributor picker — combobox trigger with a filterable popover.
 * @example
 * ```tsx
 * <DistributorPicker
 *   value="D1"
 *   onChange={setId}
 *   options={[{ value: "D1", label: "华东经销A", region: "华东" }]}
 * />
 * ```
 */
interface DistributorPickerOption {
  value: string;
  label: string;
  code?: string;
  /** Region. / 所属区域 */
  region?: string;
  disabled?: boolean;
}

interface DistributorPickerProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  options?: DistributorPickerOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function DistributorPicker({
  value,
  onChange,
  options = [],
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: DistributorPickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const resolvedPlaceholder =
    placeholder ??
    t("distributorPicker.placeholder", { defaultValue: "请选择经销商" });
  const resolvedSearch =
    searchPlaceholder ??
    t("distributorPicker.search", { defaultValue: "搜索经销商" });
  const resolvedEmpty =
    emptyText ?? t("distributorPicker.empty", { defaultValue: "无匹配经销商" });

  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.code?.toLowerCase().includes(q) ||
        o.region?.toLowerCase().includes(q),
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
        <TruckIcon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">
          {selected?.label ?? resolvedPlaceholder}
        </span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("distributorPicker.clear", {
                defaultValue: "清除",
              })}
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
                    <span className="flex-1 truncate">{o.label}</span>
                    {o.region && (
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {o.region}
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

export { DistributorPicker };
export type { DistributorPickerProps, DistributorPickerOption };
