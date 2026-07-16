"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowMenuItem } from "@/components/ui/row-context-menu";

/**
 * @component RowActionsMenu
 * @category ui/overlay
 * @since 1.9.0
 * @description Click-triggered row actions menu for table/list action columns.
 *   Composes DropdownMenu with a default link/sm「操作」trigger. Prefer over
 *   flat link buttons when actions overflow the column (issue #52).
 *   / 列表操作列「点击展开全部操作」菜单；操作多时替代平铺 link 按钮
 * @keywords row, actions, menu, table, dropdown, 操作列
 * @example
 * <RowActionsMenu
 *   items={[
 *     { key: "edit", label: "编辑", onClick: openEdit },
 *     { key: "delete", label: "删除", danger: true, onClick: onDelete },
 *   ]}
 * />
 */

interface RowActionsMenuProps {
  /** Action items / 操作项 */
  items: RowMenuItem[];
  /** Trigger label (default 操作) / 触发器文案 */
  triggerLabel?: string;
  /** Custom trigger element / 自定义触发节点 */
  trigger?: React.ReactNode;
  /** Menu content align / 对齐 */
  align?: "start" | "center" | "end";
  /** Menu side / 弹出方向 */
  side?: "top" | "bottom" | "left" | "right";
  /** Trigger button size / 触发器尺寸 */
  size?: "default" | "xs" | "sm" | "lg";
  /** Fallback when item has no onClick / 无 item.onClick 时的回退 */
  onItemSelect?: (item: RowMenuItem) => void;
  /** Root className */
  className?: string;
  /** Menu content className */
  contentClassName?: string;
  /** Empty items placeholder (optional) */
  emptyContent?: React.ReactNode;
  /** Disable the whole menu */
  disabled?: boolean;
}

function RowActionsMenu({
  items = [],
  triggerLabel = "操作",
  trigger,
  align = "end",
  side = "bottom",
  size = "sm",
  onItemSelect,
  className,
  contentClassName,
  emptyContent,
  disabled = false,
}: RowActionsMenuProps) {
  const actionable = items.filter((item) => !item.separator);
  const isEmpty = actionable.length === 0;
  const menuDisabled = disabled || isEmpty;

  const handleSelect = (item: RowMenuItem) => {
    if (item.disabled || item.separator) return;
    if (item.onClick) {
      item.onClick();
      return;
    }
    onItemSelect?.(item);
  };

  return (
    <div data-slot="row-actions-menu" className={cn("inline-flex", className)}>
      <DropdownMenu disabled={menuDisabled}>
        {trigger != null ? (
          <DropdownMenuTrigger
            disabled={menuDisabled}
            className="inline-flex outline-none"
          >
            {trigger}
          </DropdownMenuTrigger>
        ) : (
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="link"
                size={size}
                disabled={menuDisabled}
                className="h-auto px-0"
                data-slot="row-actions-menu-trigger"
              />
            }
          >
            {triggerLabel}
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent
          align={align}
          side={side}
          className={cn("min-w-36", contentClassName)}
        >
          {isEmpty
            ? (emptyContent ?? (
                <div className="text-muted-foreground px-2 py-1.5 text-sm">
                  无可用操作
                </div>
              ))
            : items.map((item, index) => {
                if (item.separator) {
                  return (
                    <DropdownMenuSeparator key={`${item.key}-sep-${index}`} />
                  );
                }
                return (
                  <DropdownMenuItem
                    key={item.key}
                    variant={item.danger ? "destructive" : "default"}
                    disabled={item.disabled}
                    onClick={() => handleSelect(item)}
                  >
                    {item.icon != null && (
                      <span className="shrink-0 [&_svg]:size-3.5">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </DropdownMenuItem>
                );
              })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { RowActionsMenu };
export type { RowActionsMenuProps };
