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
  UserIcon,
  XIcon,
} from "@/components/ui/icons";

/**
 * @component EmployeePicker
 * @category Business
 * @since 1.0.0-beta.0
 * @description 员工选择器：combobox 触发 + 可筛选弹层。
 * / Employee picker — combobox trigger with a filterable popover.
 * @example
 * ```tsx
 * <EmployeePicker
 *   value="E1"
 *   onChange={setId}
 *   options={[{ value: "E1", label: "张三", department: "销售部" }]}
 * />
 * ```
 */
interface EmployeePickerOption {
  value: string;
  label: string;
  /** Employee number. / 工号 */
  code?: string;
  /** Department. / 所属部门 */
  department?: string;
  disabled?: boolean;
}

/** Remote fetcher: raw keyword in, options out. Pinyin match is backend-owned. */
type EmployeePickerFetcher = (
  keyword: string,
) => Promise<EmployeePickerOption[]>;

interface EmployeePickerProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  /**
   * Local static options. Used when `fetcher` is omitted, or as seed while
   * remote results are loading.
   */
  options?: EmployeePickerOption[];
  /**
   * Remote search. When set, the popover search input calls this with the raw
   * keyword (debounced). Matching (incl. pinyin) must be implemented by the backend.
   * @example
   * fetcher={async (keyword) => {
   *   const res = await api.searchEmployees({ q: keyword });
   *   return res.list.map((e) => ({ value: e.id, label: e.name, code: e.no }));
   * }}
   */
  fetcher?: EmployeePickerFetcher;
  /** Debounce for `fetcher` in ms (default 300). */
  debounceMs?: number;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

function EmployeePicker({
  value,
  onChange,
  options = [],
  fetcher,
  debounceMs = 300,
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled = false,
  clearable = true,
  className,
}: EmployeePickerProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [remoteOptions, setRemoteOptions] = React.useState<
    EmployeePickerOption[] | null
  >(null);
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  const resolvedPlaceholder =
    placeholder ??
    t("employeePicker.placeholder", { defaultValue: "请选择员工" });
  const resolvedSearch =
    searchPlaceholder ??
    t("employeePicker.search", { defaultValue: "搜索员工" });
  const resolvedEmpty =
    emptyText ?? t("employeePicker.empty", { defaultValue: "无匹配员工" });

  const listSource = fetcher ? (remoteOptions ?? options) : options;
  const selected =
    listSource.find((o) => o.value === value) ??
    options.find((o) => o.value === value);

  React.useEffect(() => {
    if (!open || !fetcher) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    const timer = window.setTimeout(() => {
      void fetcher(query)
        .then((rows) => {
          if (!cancelled) {
            setRemoteOptions(rows);
            setLoading(false);
          }
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            setLoadError(err instanceof Error ? err.message : "加载失败");
            setRemoteOptions([]);
            setLoading(false);
          }
        });
    }, debounceMs);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [open, query, fetcher, debounceMs]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setRemoteOptions(null);
      setLoadError(null);
      setLoading(false);
    }
  }, [open]);

  const filtered = React.useMemo(() => {
    if (fetcher) {
      return remoteOptions ?? options;
    }
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q) ||
        o.code?.toLowerCase().includes(q) ||
        o.department?.toLowerCase().includes(q),
    );
  }, [options, query, fetcher, remoteOptions]);

  return (
    <Popover data-slot="employee-picker" open={open} onOpenChange={setOpen}>
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
        <UserIcon className="size-4 shrink-0 opacity-50" />
        <span className="flex-1 truncate">
          {selected?.label ?? resolvedPlaceholder}
        </span>
        <span className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label={t("employeePicker.clear", { defaultValue: "清除" })}
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
          <ul
            role="listbox"
            className="max-h-64 overflow-y-auto p-1"
            data-slot="employee-picker-list"
          >
            {loading && (
              <li
                className="text-muted-foreground px-2 py-6 text-center text-sm"
                data-slot="employee-picker-loading"
              >
                {t("employeePicker.loading", { defaultValue: "加载中…" })}
              </li>
            )}
            {loadError && !loading && (
              <li
                className="text-destructive px-2 py-6 text-center text-sm"
                data-slot="employee-picker-error"
              >
                {loadError}
              </li>
            )}
            {!loading && !loadError && filtered.length === 0 && (
              <li className="text-muted-foreground px-2 py-6 text-center text-sm">
                {resolvedEmpty}
              </li>
            )}
            {!loading &&
              !loadError &&
              filtered.map((o) => {
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
                        {o.code && (
                          <span className="text-muted-foreground ml-1 text-xs">
                            · {o.code}
                          </span>
                        )}
                      </span>
                      {o.department && (
                        <span className="text-muted-foreground shrink-0 text-xs">
                          {o.department}
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

export { EmployeePicker };
export type {
  EmployeePickerProps,
  EmployeePickerOption,
  EmployeePickerFetcher,
};
