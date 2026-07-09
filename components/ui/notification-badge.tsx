"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BellIcon } from "@/components/ui/icons";

/**
 * @component NotificationBadge
 * @category ui/feedback
 * @since 0.2.0
 * @description Header notification badge with unread count, supporting dot mode and max overflow display / 头部通知徽章，显示未读数量，支持点模式和超出最大值显示
 * @keywords notification, badge, count, unread, bell
 * @example
 * <NotificationBadge count={5} />
 * <NotificationBadge dot />
 * <NotificationBadge count={120} max={99} />
 */

interface NotificationBadgeProps extends React.ComponentProps<"div"> {
  /** Unread count / 未读数量 */
  count?: number;
  /** Max display before showing "max+" / 超出此值显示 "max+" */
  max?: number;
  /** Show badge when count is 0 / count 为 0 时是否显示 */
  showZero?: boolean;
  /** Show as a dot without number / 显示为无数字的小圆点 */
  dot?: boolean;
  /** Offset [x, y] relative to the bell icon / 相对于铃铛图标的偏移 [x, y] */
  offset?: [number, number];
}

function NotificationBadge({
  count = 0,
  max = 99,
  showZero = false,
  dot = false,
  offset,
  className,
  ...props
}: NotificationBadgeProps) {
  const hasCount = count > 0 || showZero;
  const display = count > max ? `${max}+` : String(count);

  const badgeStyle: React.CSSProperties = offset
    ? { transform: `translate(${offset[0]}px, ${offset[1]}px)` }
    : {};

  return (
    <div
      data-slot="notification-badge"
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      {...props}
    >
      <BellIcon className="text-foreground size-5" />
      {hasCount && (
        <span
          data-slot="notification-badge-count"
          className={cn(
            "ring-background absolute flex items-center justify-center rounded-full bg-red-500 text-[10px] leading-none font-medium text-white ring-2",
            dot ? "size-2" : "min-w-4 px-1 py-0.5",
          )}
          style={
            dot
              ? { ...badgeStyle, right: 0, top: 0 }
              : { ...badgeStyle, right: -4, top: -4 }
          }
        >
          {!dot && display}
        </span>
      )}
    </div>
  );
}

export { NotificationBadge };
export type { NotificationBadgeProps };
