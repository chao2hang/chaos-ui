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
  ReceiptIcon,
  SearchIcon,
  XIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component CostCenterPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 成本中心选择器（combobox 触发 + 可筛选弹层）。
 * / Cost center picker — combobox trigger with a filterable popover.
 * @example
 * ```tsx
 * <CostCenterPicker
 *   value="CC1"
 *   onChange={setId}
 *   options={[{ value: "CC1", label: "华东成本中心" }]}
 * />
 * ```
 */
interface CostCenterPickerOption {
  value: string;
  label: string;
  code?: string;
  disabled?: boolean;
}

interface CostCenterPickerProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  options?: CostCenterPickerOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function CostCenterPicker({
  value,
  onChange,
  options = [],
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: CostCenterPickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const resolvedPlaceholder =
    placeholder ?? t("costCenterPicker.placeholder", { defaultValue: "请选择成本中心" });
  const resolvedSearch =
    searchPlaceholder ?? t("costCenterPicker.search", { defaultValue: "搜索成本中心" });
  const resolvedEmpty =
    emptyText ?? t("costCenterPicker.empty", { defaultValue: "无匹配成本中心" });

  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.code?.toLowerCase().includes(q),
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
        <ReceiptIcon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">{selected?.label ?? resolvedPlaceholder}</span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("costCenterPicker.clear", { defaultValue: "清除" })}
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
          <ul role="listbox" className="max-h-64 overflow-y-auto p-1">
            {filtered.length === 0 && (
              <li className="px-2 py-6 text-center text-sm text-muted-foreground">
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
                    {...(o.disabled !== undefined ? { disabled: o.disabled } : {})}
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

export { CostCenterPicker };
export type { CostCenterPickerProps, CostCenterPickerOption };
