"use client";
import * as React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
  XIcon,
} from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  keywords?: string[];
  group?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  align?: "start" | "center" | "end";
  clearable?: boolean;
  searchable?: boolean;
  renderOption?: (option: ComboboxOption) => React.ReactNode;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyText,
  disabled,
  className,
  align = "start",
  clearable = true,
  searchable = true,
  renderOption,
}: ComboboxProps) {
  const { t } = useTranslation("ui");
  const [open, setOpen] = React.useState(false);
  const resolvedPlaceholder = placeholder ?? t("combobox.placeholder");
  const resolvedSearchPlaceholder =
    searchPlaceholder ?? t("combobox.searchPlaceholder");
  const resolvedEmptyText = emptyText ?? t("combobox.emptyText");
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              "w-[200px] justify-between font-normal",
              !selected && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <span className="truncate">
          {selected?.label ?? resolvedPlaceholder}
        </span>
        <div className="flex items-center gap-1">
          {clearable && selected && (
            <span
              role="button"
              aria-label={t("combobox.clear")}
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
              className="rounded p-0.5 hover:bg-muted"
            >
              <XIcon className="size-3.5 opacity-60 hover:opacity-100" />
            </span>
          )}
          <ChevronDownIcon className="size-4 opacity-50" />
        </div>
      </PopoverTrigger>
      {open && (
        <PopoverContent align={align} className="w-[var(--anchor-width)] p-0">
          <ComboboxPanel
            options={options}
            value={value}
            onChange={onChange}
            onClose={() => setOpen(false)}
            searchPlaceholder={resolvedSearchPlaceholder}
            searchable={searchable}
            emptyText={resolvedEmptyText}
            {...(renderOption ? { renderOption } : {})}
          />
        </PopoverContent>
      )}
    </Popover>
  );
}

function ComboboxPanel({
  options,
  value,
  onChange,
  onClose,
  searchPlaceholder,
  searchable,
  emptyText,
  renderOption,
}: {
  options: ComboboxOption[];
  value: string | undefined;
  onChange: ((v: string | undefined) => void) | undefined;
  onClose: () => void;
  searchPlaceholder: string;
  searchable: boolean;
  emptyText: string;
  renderOption?: (opt: ComboboxOption) => React.ReactNode;
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
        o.description?.toLowerCase().includes(q) ||
        o.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [options, query]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, ComboboxOption[]>();
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
      {searchable && (
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
      )}
      <div className="max-h-64 overflow-y-auto p-1">
        {grouped.length === 0 && (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            {emptyText}
          </div>
        )}
        {grouped.map(([group, items]) => (
          <div key={group || "_default"}>
            {group && (
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                {group}
              </div>
            )}
            {items.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <Button
                  key={opt.value}
                  variant="ghost"
                  size="sm"
                  {...(opt.disabled !== undefined
                    ? { disabled: opt.disabled }
                    : {})}
                  onClick={() => {
                    onChange?.(opt.value);
                    onClose();
                  }}
                  className={cn(
                    "h-auto w-full justify-start gap-2 rounded-sm px-2 py-1.5 font-normal",
                    isSelected && "bg-accent/50",
                    opt.disabled && "pointer-events-none opacity-50",
                  )}
                >
                  <span className="flex-1 truncate">
                    {renderOption ? renderOption(opt) : opt.label}
                  </span>
                  {isSelected && <CheckIcon className="size-4 shrink-0" />}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
