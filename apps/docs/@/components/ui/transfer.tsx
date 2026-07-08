"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  CheckIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

/**
 * @component Transfer
 * @category ui/data-entry
 * @since 0.2.0
 * @description Dual-panel shuttle component for moving items between source and target lists. Supports search, select-all, one-way mode, i18n, disabled state, and custom render functions. / 双栏穿梭框，支持搜索、全选、单向模式、国际化、禁用状态和自定义渲染。
 * @keywords transfer, shuttle, dual-panel, selection, move, assign
 * @example
 * <Transfer
 *   dataSource={items}
 *   targetKeys={selected}
 *   onChange={setSelected}
 *   titles={["Available", "Selected"]}
 * />
 */

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
  titles: titlesProp,
  searchable = true,
  filterOption = defaultFilter,
  render,
  disabled,
  className,
  oneWay = false,
}: TransferProps) {
  const { t } = useTranslation("transfer");
  const titles = titlesProp ?? [
    t("transfer.sourceTitle"),
    t("transfer.targetTitle"),
  ];
  const [selectedSource, setSelectedSource] = React.useState<string[]>([]);
  const [selectedTarget, setSelectedTarget] = React.useState<string[]>([]);
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

  const filteredSource = source.filter((s) => filterOption(searchLeft, s));
  const filteredTarget = target.filter((s) => filterOption(searchRight, s));

  const moveToTarget = () => {
    if (disabled) return;
    const next = Array.from(new Set([...targetKeys, ...selectedSource]));
    onChange?.(next);
    setSelectedSource([]);
  };

  const moveToSource = () => {
    if (disabled) return;
    const next = targetKeys.filter((k) => !selectedTarget.includes(k));
    onChange?.(next);
    setSelectedTarget([]);
  };

  const moveItemToTarget = (key: string) => {
    if (disabled) return;
    onChange?.(Array.from(new Set([...targetKeys, key])));
    setSelectedSource((prev) =>
      prev.filter((selectedKey) => selectedKey !== key),
    );
  };

  const moveItemToSource = (key: string) => {
    if (disabled || oneWay) return;
    onChange?.(targetKeys.filter((targetKey) => targetKey !== key));
    setSelectedTarget((prev) =>
      prev.filter((selectedKey) => selectedKey !== key),
    );
  };

  const toggleSource = (key: string) => {
    setSelectedSource((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const toggleAllSource = (select: boolean) => {
    setSelectedSource(select ? filteredSource.map((i) => i.key) : []);
  };

  const toggleTarget = (key: string) => {
    setSelectedTarget((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const toggleAllTarget = (select: boolean) => {
    setSelectedTarget(select ? filteredTarget.map((i) => i.key) : []);
  };

  return (
    <div
      data-slot="transfer"
      className={cn(
        "flex min-w-0 flex-col gap-2 sm:flex-row sm:items-stretch",
        disabled && "opacity-50",
        className,
      )}
    >
      <TransferPanel
        title={titles[0]}
        items={filteredSource}
        selected={selectedSource}
        onToggle={toggleSource}
        onToggleAll={toggleAllSource}
        searchable={searchable}
        searchValue={searchLeft}
        onSearchChange={setSearchLeft}
        {...(render ? { render } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        onMoveItem={moveItemToTarget}
      />
      <div className="flex flex-row items-center justify-center gap-2 sm:flex-col">
        <Button
          variant="outline"
          size="icon"
          onClick={moveToTarget}
          disabled={selectedSource.length === 0 || disabled}
          aria-label={t("transfer.moveToTarget")}
        >
          <ChevronRightIcon className="rotate-90 sm:rotate-0" />
        </Button>
        {!oneWay && (
          <Button
            variant="outline"
            size="icon"
            onClick={moveToSource}
            disabled={selectedTarget.length === 0 || disabled}
            aria-label={t("transfer.moveToSource")}
          >
            <ChevronLeftIcon className="rotate-90 sm:rotate-0" />
          </Button>
        )}
      </div>
      <TransferPanel
        title={titles[1]}
        items={filteredTarget}
        selected={selectedTarget}
        onToggle={toggleTarget}
        onToggleAll={toggleAllTarget}
        searchable={searchable}
        searchValue={searchRight}
        onSearchChange={setSearchRight}
        {...(render ? { render } : {})}
        {...(disabled !== undefined ? { disabled } : {})}
        {...(oneWay ? {} : { onMoveItem: moveItemToSource })}
      />
    </div>
  );
}

function TransferPanel({
  title,
  items,
  selected,
  onToggle,
  onToggleAll,
  searchable,
  searchValue,
  onSearchChange,
  render,
  disabled,
  onMoveItem,
}: {
  title: string;
  items: TransferItem[];
  selected: string[];
  onToggle: (key: string) => void;
  /** Select/clear all items at once (avoids N×setState from forEach toggle). */
  onToggleAll?: (select: boolean) => void;
  searchable: boolean;
  searchValue: string;
  onSearchChange: (v: string) => void;
  render?: (item: TransferItem) => React.ReactNode;
  disabled?: boolean;
  onMoveItem?: (key: string) => void;
}) {
  const { t } = useTranslation("transfer");
  const allSelected =
    items.length > 0 && items.every((i) => selected.includes(i.key));
  const someSelected = items.some((i) => selected.includes(i.key));

  const moveItem = (item: TransferItem) => {
    if (disabled || item.disabled) return;
    onMoveItem?.(item.key);
  };

  return (
    <div className="flex h-72 w-full min-w-0 flex-col rounded-md border">
      <div className="flex items-center justify-between border-b px-3 py-2 text-sm font-medium">
        <span>{title}</span>
        <span className="text-muted-foreground text-xs">
          {selected.length}/{items.length}
        </span>
      </div>
      {searchable && (
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("transfer.search")}
            className="h-7 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
          />
        </div>
      )}
      <div className="flex items-center border-b px-3 py-1.5">
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={t("transfer.selectAll")}
          {...(disabled !== undefined
            ? { disabled: disabled || items.length === 0 }
            : { disabled: items.length === 0 })}
          className={cn(
            "size-4 rounded-[4px] border p-0",
            allSelected
              ? "border-primary bg-primary text-primary-foreground hover:bg-primary/80"
              : someSelected
                ? "border-primary bg-primary/50 text-primary-foreground hover:bg-primary/50"
                : "border-input",
          )}
          onClick={() => onToggleAll?.(!allSelected)}
        >
          {allSelected && <CheckIcon className="size-3" />}
          {!allSelected && someSelected && (
            <span className="bg-primary-foreground block h-0.5 w-2" />
          )}
        </Button>
        <span className="text-muted-foreground ml-2 text-xs">
          {t("transfer.selectAll")}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-1">
        {items.length === 0 ? (
          <div className="text-muted-foreground px-2 py-6 text-center text-sm">
            {t("transfer.noData")}
          </div>
        ) : (
          items.map((item) => (
            <label
              key={item.key}
              onDoubleClick={() => moveItem(item)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                "hover:bg-accent",
                item.disabled && "pointer-events-none opacity-50",
              )}
            >
              <Checkbox
                checked={selected.includes(item.key)}
                onCheckedChange={() => onToggle(item.key)}
                disabled={item.disabled || disabled}
              />
              <div className="min-w-0 flex-1 truncate">
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
