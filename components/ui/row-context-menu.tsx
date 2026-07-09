"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A menu item in the row context menu.
 */
interface RowMenuItem {
  /** Unique item key / 唯一项键 */
  key: string;
  /** Display label / 显示标签 */
  label: string;
  /** Optional icon / 可选图标 */
  icon?: React.ReactNode;
  /** Danger style (red text) / 危险样式（红色文字） */
  danger?: boolean;
  /** Disabled state / 禁用状态 */
  disabled?: boolean;
  /** Render as a separator divider / 渲染为分隔线 */
  separator?: boolean;
}

/**
 * Props for the RowContextMenu component.
 */
interface RowContextMenuProps {
  /** Menu items / 菜单项 */
  items: RowMenuItem[];
  /** Callback when an item is selected / 选中菜单项回调 */
  onItemSelect?: (item: RowMenuItem) => void;
  /** Child element to wrap / 包裹的子元素 */
  children: React.ReactNode;
  /** Additional className / 额外类名 */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  RowContextMenu - main export                                       */
/* ------------------------------------------------------------------ */

/**
 * @component RowContextMenu
 * @category ui/overlay
 * @since 0.2.0
 * @description Table/list row right-click context menu wrapper. Wraps any
 *   element and shows a context menu at cursor position on right-click.
 *   Items support icons, danger style, disabled state, and separators.
 *   Closes on click outside or Escape. / 表格/列表行右键上下文菜单包裹器。
 *   包裹任意元素，右键时在光标位置显示上下文菜单。菜单项支持图标、危险样式、
 *   禁用状态和分隔线。点击外部或 Escape 键关闭。
 * @keywords context-menu, row, right-click, table, list, overlay
 * @example
 * ```tsx
 * <RowContextMenu
 *   items={[
 *     { key: "edit", label: "编辑" },
 *     { key: "delete", label: "删除", danger: true },
 *   ]}
 *   onItemSelect={(item) => console.log(item)}
 * >
 *   <div>Right-click me</div>
 * </RowContextMenu>
 * ```
 */
function RowContextMenu({
  items = [],
  onItemSelect,
  children,
  className,
}: RowContextMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const menuRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  const handleClickOutside = React.useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  const handleEscape = React.useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [open, handleClickOutside, handleEscape]);

  const handleItemClick = (item: RowMenuItem) => {
    if (item.disabled || item.separator) return;
    onItemSelect?.(item);
    setOpen(false);
  };

  // Adjust position to keep menu within viewport
  const adjustedPosition = React.useMemo(() => {
    if (!open) return position;
    const menuWidth = 180;
    const menuHeight = items.length * 32 + 16;
    const { innerWidth, innerHeight } = window;
    return {
      x: Math.min(position.x, innerWidth - menuWidth - 8),
      y: Math.min(position.y, innerHeight - menuHeight - 8),
    };
  }, [open, position, items.length]);

  return (
    <div
      ref={containerRef}
      data-slot="row-context-menu"
      className={cn("relative", className)}
      onContextMenu={handleContextMenu}
    >
      {children}
      {open && (
        <div
          ref={menuRef}
          data-slot="row-context-menu-popup"
          className="bg-popover text-popover-foreground ring-foreground/10 fixed z-50 min-w-40 rounded-lg p-1 shadow-md ring-1"
          style={{ left: adjustedPosition.x, top: adjustedPosition.y }}
        >
          {items.map((item, idx) => {
            if (item.separator) {
              return (
                <div
                  key={item.key + idx}
                  className="bg-border my-1 h-px"
                  data-slot="row-context-menu-separator"
                />
              );
            }
            return (
              <button
                key={item.key}
                type="button"
                disabled={item.disabled}
                className={cn(
                  "focus:bg-accent focus:text-accent-foreground flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors outline-none",
                  item.disabled && "cursor-not-allowed opacity-50",
                  item.danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "hover:bg-muted",
                )}
                onClick={() => handleItemClick(item)}
              >
                {item.icon && (
                  <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
                )}
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { RowContextMenu };
export type { RowMenuItem, RowContextMenuProps };
