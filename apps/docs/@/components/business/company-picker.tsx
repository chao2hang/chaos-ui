"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Building2Icon,
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component CompanyPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 公司选择器（combobox 触发 + 可筛选弹层）。
 * / Company picker — combobox trigger with a filterable popover.
 * @example
 * ```tsx
 * <CompanyPicker
 *   value="C1"
 *   onChange={setId}
 *   options={[{ value: "C1", label: "Acme Co" }]}
 * />
 * ```
 */
interface CompanyPickerOption {
  value: string;
  label: string;
  code?: string;
  disabled?: boolean;
}

interface CompanyPickerProps {
  /** Selected value. / 选中值 */
  value?: string;
  /** Value change callback. / 值变更回调 */
  onChange?: (value: string | undefined) => void;
  /** Options. / 选项 */
  options?: CompanyPickerOption[];
  /** Trigger placeholder. / 占位 */
  placeholder?: string;
  /** Search placeholder. / 搜索占位 */
  searchPlaceholder?: string;
  /** Empty-state text. / 空状态 */
  emptyText?: string;
  /** Disabled. / 禁用 */
  disabled?: boolean;
  /** Allow clearing. / 可清除 */
  clearable?: boolean;
  className?: string;
}

function CompanyPicker({
  value,
  onChange,
  options = [],
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: CompanyPickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const resolvedPlaceholder =
    placeholder ?? t("companyPicker.placeholder", { defaultValue: "请选择公司" });
  const resolvedSearch =
    searchPlaceholder ?? t("companyPicker.search", { defaultValue: "搜索公司" });
  const resolvedEmpty =
    emptyText ?? t("companyPicker.empty", { defaultValue: "无匹配公司" });

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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(undefined);
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
        <Building2Icon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">{selected?.label ?? resolvedPlaceholder}</span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("companyPicker.clear", { defaultValue: "清除" })}
              onClick={handleClear}
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

export { CompanyPicker };
export type { CompanyPickerProps, CompanyPickerOption };
