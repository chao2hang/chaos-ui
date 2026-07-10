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
  UsersIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component CustomerPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 客户选择器（含经销商/终端）combobox 触发 + 可筛选弹层。
 * / Customer picker — combobox trigger with a filterable popover.
 * @example
 * ```tsx
 * <CustomerPicker
 *   value="C1"
 *   onChange={setId}
 *   options={[{ value: "C1", label: "Acme Co", type: "distributor" }]}
 * />
 * ```
 */
interface CustomerPickerOption {
  value: string;
  label: string;
  /** Customer type: distributor / terminal. / 客户类型 */
  type?: "distributor" | "terminal" | "other";
  /** Contact person. / 联系人 */
  contact?: string;
  disabled?: boolean;
}

interface CustomerPickerProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  options?: CustomerPickerOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function CustomerPicker({
  value,
  onChange,
  options = [],
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: CustomerPickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const resolvedPlaceholder =
    placeholder ??
    t("customerPicker.placeholder", { defaultValue: "请选择客户" });
  const resolvedSearch =
    searchPlaceholder ??
    t("customerPicker.search", { defaultValue: "搜索客户" });
  const resolvedEmpty =
    emptyText ?? t("customerPicker.empty", { defaultValue: "无匹配客户" });

  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.contact?.toLowerCase().includes(q) ||
        o.type?.toLowerCase().includes(q),
    );
  }, [options, query]);

  const typeLabel = (type?: string) => {
    if (type === "distributor") return "经销商";
    if (type === "terminal") return "终端";
    return null;
  };

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
        <UsersIcon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">
          {selected?.label ?? resolvedPlaceholder}
        </span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("customerPicker.clear", { defaultValue: "清除" })}
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
              const tp = typeLabel(o.type);
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
                      {o.contact && (
                        <span className="text-muted-foreground ml-1 text-xs">
                          · {o.contact}
                        </span>
                      )}
                    </span>
                    {tp && (
                      <span className="text-muted-foreground shrink-0 text-xs">
                        {tp}
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

export { CustomerPicker };
export type { CustomerPickerProps, CustomerPickerOption };
