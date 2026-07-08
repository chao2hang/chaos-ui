"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/ui/icons";

/**
 * @component MobilePicker
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端选择器 — 单列滚轮式选项列表，点击选中并支持键盘上下移动。
 * @keywords mobile, picker
 * @param options 可选项集合，含 label 与 value。
 * @param value 当前选中值；未提供时默认选中第一项。
 * @param onChange 选中项变化回调，参数为新值。
 * @example
 * <MobilePicker options={[{label:"A",value:"a"},{label:"B",value:"b"}]} value="a" onChange={set} />
 */

interface MobilePickerProps {
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

function MobilePicker({
  options = [],
  value,
  onChange,
  className,
}: MobilePickerProps) {
  const selected = value ?? options[0]?.value;
  const listboxId = React.useId();

  const focusSelected = React.useCallback(() => {
    const idx = options.findIndex((o) => o.value === selected);
    const node = document.getElementById(`${listboxId}-opt-${idx}`);
    if (node && typeof node.scrollIntoView === "function") {
      node.scrollIntoView({ block: "nearest" });
    }
  }, [listboxId, options, selected]);

  React.useEffect(() => {
    focusSelected();
  }, [focusSelected]);

  const move = (delta: number) => {
    const idx = options.findIndex((o) => o.value === selected);
    const next = options[idx + delta];
    if (next) onChange?.(next.value);
  };

  return (
    <div
      data-slot="mobile-picker"
      className={cn(
        "bg-popover relative h-48 [scrollbar-width:none] overflow-y-auto rounded-md border [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      role="listbox"
      aria-label="选择器"
      id={listboxId}
      onKeyDown={(event) => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          move(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          move(-1);
        }
      }}
      tabIndex={0}
    >
      <div className="from-popover pointer-events-none sticky top-0 z-10 h-[calc(50%-1.25rem)] bg-gradient-to-b to-transparent" />
      <ul className="flex flex-col">
        {options.map((opt, idx) => {
          const isSelected = opt.value === selected;
          return (
            <li
              key={opt.value}
              id={`${listboxId}-opt-${idx}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => onChange?.(opt.value)}
              className={cn(
                "flex h-10 cursor-pointer items-center justify-center text-sm transition-colors",
                isSelected
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isSelected ? (
                <span className="flex items-center gap-1.5">
                  <CheckIcon className="size-4" aria-hidden="true" />
                  {opt.label}
                </span>
              ) : (
                opt.label
              )}
            </li>
          );
        })}
      </ul>
      <div className="from-popover pointer-events-none sticky bottom-0 z-10 h-[calc(50%-1.25rem)] bg-gradient-to-t to-transparent" />
      {/* Selection highlight band */}
      <div
        className="bg-accent/40 pointer-events-none absolute inset-x-0 top-1/2 z-0 h-10 -translate-y-1/2 border-y"
        aria-hidden="true"
      />
    </div>
  );
}

export { MobilePicker };
export type { MobilePickerProps };
