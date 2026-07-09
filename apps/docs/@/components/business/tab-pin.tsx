"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { PinIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component TabPin
 * @category business/ux
 * @since 0.7.0
 * @description 标签页固定。可固定 / 取消固定单个标签页，固定后展示高亮图钉状态。
 * @param id 标签页标识
 * @param label 标签页标题
 * @param pinned 是否已固定
 * @param onPin 点击固定 / 取消固定回调，携带标签页 id
 * @example
 * <TabPin id="tab-1" label="销售订单" pinned onPin={(id) => {}} />
 */

interface TabPinProps {
  id: string;
  label: string;
  pinned?: boolean;
  onPin?: (id: string) => void;
  className?: string;
}

function TabPin({ id, label, pinned = false, onPin, className }: TabPinProps) {
  const handleClick = () => onPin?.(id);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPin?.(id);
    }
  };

  return (
    <div
      data-slot="tab-pin"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-card px-2 py-1 text-sm",
        pinned && "border-primary bg-primary/5 text-primary",
        className,
      )}
    >
      <span className="max-w-[10rem] truncate" title={label}>
        {label}
      </span>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-pressed={pinned}
        aria-label={pinned ? `取消固定 ${label}` : `固定 ${label}`}
        className={cn(
          "inline-flex size-5 items-center justify-center rounded outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
          pinned
            ? "text-primary hover:bg-primary/10"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <PinIcon className={cn("size-3.5", pinned && "fill-current")} />
      </button>
    </div>
  );
}

export { TabPin };
export type { TabPinProps };
