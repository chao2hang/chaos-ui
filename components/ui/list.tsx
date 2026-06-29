"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component List
 * @category ui/data-display
 * @since 0.5.0
 * @description General-purpose list component. Unlike VirtualList which
 * only does virtual scrolling, this provides a standard list with header,
 * items, footer, and layout options.
 * / 通用列表组件，提供标准列表布局（非虚拟滚动）
 * @example
 * <List bordered>
 *   <ListHeader>Notifications</ListHeader>
 *   <ListItem extra={<Badge />}>New order received</ListItem>
 *   <ListItem extra={<Badge />}>Payment confirmed</ListItem>
 *   <ListFooter>View all</ListFooter>
 * </List>
 */

interface ListProps extends React.ComponentProps<"div"> {
  /** Show border between items / 是否显示分割线 */
  bordered?: boolean;
  /** Layout direction / 排列方向 */
  direction?: "vertical" | "horizontal";
  /** Size variant / 尺寸 */
  size?: "sm" | "default" | "lg";
}

function List({
  bordered = false,
  direction = "vertical",
  size = "default",
  className,
  children,
  ...props
}: ListProps) {
  return (
    <div
      data-slot="list"
      data-size={size}
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
        size === "sm" && "text-xs",
        size === "lg" && "text-base",
        bordered && "divide-y divide-border rounded-lg border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface ListHeaderProps extends React.ComponentProps<"div"> {}

function ListHeader({ className, ...props }: ListHeaderProps) {
  return (
    <div
      data-slot="list-header"
      className={cn(
        "flex items-center px-3 py-2 font-medium text-sm text-foreground",
        className,
      )}
      {...props}
    />
  );
}

interface ListItemProps extends React.ComponentProps<"div"> {
  /** Left-side avatar/icon / 左侧头像图标 */
  avatar?: React.ReactNode;
  /** Main content / 主要内容 */
  children?: React.ReactNode;
  /** Description text / 描述文字 */
  description?: React.ReactNode;
  /** Right-side extra content / 右侧额外内容 */
  extra?: React.ReactNode;
  /** Click handler makes item clickable / 点击事件，设置后变为可点击 */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function ListItem({
  avatar,
  children,
  description,
  extra,
  onClick,
  className,
  ...props
}: ListItemProps) {
  return (
    <div
      data-slot="list-item"
      className={cn(
        "flex items-center gap-3 px-3 py-2.5",
        onClick && "cursor-pointer hover:bg-muted transition-colors",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        {children && (
          <div className="text-sm font-medium truncate">{children}</div>
        )}
        {description && (
          <div className="text-xs text-muted-foreground truncate">
            {description}
          </div>
        )}
      </div>
      {extra && <div className="shrink-0 text-sm text-muted-foreground">{extra}</div>}
    </div>
  );
}

interface ListFooterProps extends React.ComponentProps<"div"> {}

function ListFooter({ className, ...props }: ListFooterProps) {
  return (
    <div
      data-slot="list-footer"
      className={cn(
        "flex items-center justify-center px-3 py-2 text-sm text-primary hover:bg-muted transition-colors cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

export { List, ListHeader, ListItem, ListFooter };
export type { ListProps, ListItemProps, ListHeaderProps, ListFooterProps };
