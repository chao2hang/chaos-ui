"use client";
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  CheckIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export interface TransferItem {
  key: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface TransferProps {
  dataSource: TransferItem[];
  targetKeys?: string[];
  onChange?: (targetKeys: string[]) => void;
  titles?: [string, string];
  searchable?: boolean;
  filterOption?: (input: string, item: TransferItem) => boolean;
  render?: (item: TransferItem) => React.ReactNode;
  disabled?: boolean;
  className?: string;
  oneWay?: boolean;
}

const defaultFilter = (input: string, item: TransferItem) =>
  item.label.toLowerCase().includes(input.toLowerCase());

export function Transfer({
  dataSource,
  targetKeys = [],
  onChange,
  titles = ["Source", "Target"],
  searchable = true,
  filterOption = defaultFilter,
  render,
  disabled,
  className,
  oneWay = false,
}: TransferProps) {
  const [selectedSource, setSelectedSource] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [selectedTarget, setSelectedTarget] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [searchLeft, setSearchLeft] = React.useState("");
  const [searchRight, setSearchRight] = React.useState("");

  const source = React.useMemo(
    () => dataSource.filter((d) => !targetKeys.includes(d.key)),
    [dataSource, targetKeys],
  );
  const target = React.useMemo(
    () => dataSource.filter((d) => targetKeys.includes(d.key)),
    [dataSource, targetKeys],
  );

  const filteredSource = React.useMemo(
    () => source.filter((s) => filterOption(searchLeft, s)),
    [source, searchLeft, filterOption],
  );
  const filteredTarget = React.useMemo(
    () => target.filter((s) => filterOption(searchRight, s)),
    [target, searchRight, filterOption],
  );

  const moveToTarget = React.useCallback(() => {
    if (disabled) return;
    const next = Array.from(new Set([...targetKeys, ...selectedSource]));
    onChange?.(next);
    setSelectedSource(new Set());
  }, [disabled, targetKeys, selectedSource, onChange]);

  const moveToSource = React.useCallback(() => {
    if (disabled) return;
    const next = targetKeys.filter((k) => !selectedTarget.has(k));
    onChange?.(next);
    setSelectedTarget(new Set());
  }, [disabled, targetKeys, selectedTarget, onChange]);

  const moveSingleToTarget = React.useCallback(
    (key: string) => {
      if (disabled) return;
      const next = Array.from(new Set([...targetKeys, key]));
      onChange?.(next);
      setSelectedSource((prev) => {
        const s = new Set(prev);
        s.delete(key);
        return s;
      });
    },
    [disabled, targetKeys, onChange],
  );

  const moveSingleToSource = React.useCallback(
    (key: string) => {
      if (disabled) return;
      const next = targetKeys.filter((k) => k !== key);
      onChange?.(next);
      setSelectedTarget((prev) => {
        const s = new Set(prev);
        s.delete(key);
        return s;
      });
    },
    [disabled, targetKeys, onChange],
  );

  const toggleSource = React.useCallback((key: string) => {
    setSelectedSource((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const toggleTarget = React.useCallback((key: string) => {
    setSelectedTarget((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <div
      data-slot="transfer"
      className={cn(
        "flex items-stretch gap-2",
        disabled && "opacity-50",
        className,
      )}
    >
      <TransferPanel
        title={titles[0]}
        items={filteredSource}
        selected={selectedSource}
        onToggle={toggleSource}
        onItemDoubleClick={moveSingleToTarget}
        searchable={searchable}
        searchValue={searchLeft}
        onSearchChange={setSearchLeft}
        render={render}
        disabled={disabled}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={moveToTarget}
          disabled={selectedSource.size === 0 || disabled}
          aria-label="Move to target"
        >
          <ChevronRightIcon />
        </Button>
        {!oneWay && (
          <Button
            variant="outline"
            size="icon"
            onClick={moveToSource}
            disabled={selectedTarget.size === 0 || disabled}
            aria-label="Move to source"
          >
            <ChevronLeftIcon />
          </Button>
        )}
      </div>
      <TransferPanel
        title={titles[1]}
        items={filteredTarget}
        selected={selectedTarget}
        onToggle={toggleTarget}
        onItemDoubleClick={moveSingleToSource}
        searchable={searchable}
        searchValue={searchRight}
        onSearchChange={setSearchRight}
        render={render}
        disabled={disabled}
      />
    </div>
  );
}

function TransferPanel({
  title,
  items,
  selected,
  onToggle,
  onItemDoubleClick,
  searchable,
  searchValue,
  onSearchChange,
  render,
  disabled,
}: {
  title: string;
  items: TransferItem[];
  selected: Set<string>;
  onToggle: (key: string) => void;
  onItemDoubleClick?: (key: string) => void;
  searchable: boolean;
  searchValue: string;
  onSearchChange: (v: string) => void;
  render?: (item: TransferItem) => React.ReactNode;
  disabled?: boolean;
}) {
  const allSelected =
    items.length > 0 && items.every((i) => selected.has(i.key));
  const someSelected = !allSelected && items.some((i) => selected.has(i.key));

  return (
    <div className="flex h-72 w-full flex-col rounded-md border">
      <div className="flex items-center justify-between border-b px-3 py-2 text-sm font-medium">
        <span>{title}</span>
        <span className="text-muted-foreground text-xs">
          {selected.size}/{items.length}
        </span>
      </div>
      {searchable && (
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </div>
      )}
      <div className="flex items-center border-b px-3 py-1.5">
        <button
          type="button"
          aria-label="Select all"
          onClick={() => {
            if (allSelected)
              items.forEach((i) => selected.has(i.key) && onToggle(i.key));
            else items.forEach((i) => !selected.has(i.key) && onToggle(i.key));
          }}
          disabled={disabled || items.length === 0}
          className={cn(
            "flex size-4 items-center justify-center rounded-[4px] border transition-colors",
            allSelected
              ? "border-primary bg-primary text-primary-foreground"
              : someSelected
                ? "border-primary bg-primary/50 text-primary-foreground"
                : "border-input",
          )}
        >
          {allSelected && <CheckIcon className="size-3" />}
          {!allSelected && someSelected && (
            <span className="bg-primary-foreground block h-0.5 w-2" />
          )}
        </button>
        <span className="text-muted-foreground ml-2 text-xs">Select all</span>
      </div>
      <div className="flex-1 overflow-y-auto p-1">
        {items.length === 0 ? (
          <div className="text-muted-foreground px-2 py-6 text-center text-sm">
            No data
          </div>
        ) : (
          items.map((item) => (
            <label
              key={item.key}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                "hover:bg-accent",
                item.disabled && "pointer-events-none opacity-50",
              )}
              onDoubleClick={() => {
                if (!item.disabled && !disabled) {
                  onItemDoubleClick?.(item.key);
                }
              }}
            >
              <Checkbox
                checked={selected.has(item.key)}
                onCheckedChange={() => onToggle(item.key)}
                disabled={item.disabled || disabled}
              />
              <div className="flex-1 truncate">
                {render ? (
                  render(item)
                ) : (
                  <>
                    <div className="truncate">{item.label}</div>
                    {item.description && (
                      <div className="text-muted-foreground truncate text-xs">
                        {item.description}
                      </div>
                    )}
                  </>
                )}
              </div>
            </label>
          ))
        )}
      </div>
    </div>
  );
}
