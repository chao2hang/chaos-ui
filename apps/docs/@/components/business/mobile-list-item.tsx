"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { ChevronRightIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component MobileListItem
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端列表项 — 标题 + 副标题 + 尾部区域，可点击。
 * @keywords mobile, list, item
 * @param title 主标题（必填）。
 * @param subtitle 副标题/描述文字。
 * @param trailing 尾部自定义内容（如徽标、状态文字）。
 * @param onClick 点击回调；提供时整行变为可聚焦按钮，Enter/Space 触发。
 * @example
 * <MobileListItem title="张三" subtitle="销售部" onClick={() => open(id)} />
 */

interface MobileListItemProps {
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function MobileListItem({
  title,
  subtitle,
  trailing,
  onClick,
  className,
}: MobileListItemProps) {
  const interactive = typeof onClick === "function";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      data-slot="mobile-list-item"
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={interactive ? title : undefined}
      className={cn(
        "flex min-h-12 items-center gap-3 px-4 py-2 text-sm",
        interactive &&
          "hover:bg-muted focus-visible:bg-muted cursor-pointer focus-visible:outline-none",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{title}</div>
        {subtitle ? (
          <div className="text-muted-foreground truncate text-xs">
            {subtitle}
          </div>
        ) : null}
      </div>
      {trailing ? (
        <div className="text-muted-foreground shrink-0">{trailing}</div>
      ) : null}
      {interactive ? (
        <ChevronRightIcon
          className="text-muted-foreground size-4 shrink-0"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

export { MobileListItem };
export type { MobileListItemProps };
