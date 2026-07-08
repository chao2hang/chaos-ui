"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { XIcon, RefreshCwIcon } from "@/components/ui/icons";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

export interface NavigationTabsBarTabItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  href?: string;
}

export interface NavigationTabsBarProps extends Omit<
  React.ComponentProps<"div">,
  "onChange"
> {
  /** Tab items / Tab 项列表 */
  items?: NavigationTabsBarTabItem[];
  /** Active tab key / 当前激活的 tab key */
  activeKey?: string;
  /** Default active tab key (uncontrolled) / 默认激活的 tab key（非受控） */
  defaultActiveKey?: string;
  /** Tab change callback / Tab 切换回调 */
  onChange?: (key: string) => void;
  /** Tab close callback / Tab 关闭回调 */
  onClose?: (key: string) => void;
  /** Close all tabs callback / 关闭全部回调 */
  onCloseAll?: () => void;
  /** Close other tabs callback / 关闭其他回调 */
  onCloseOthers?: (key: string) => void;
  /** Close tabs to the right callback / 关闭右侧回调 */
  onCloseToRight?: (key: string) => void;
  /** Refresh tab callback / 刷新回调 */
  onRefresh?: (key: string) => void;
}

function NavigationTabsBar({
  className,
  items = [],
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  onClose,
  onCloseAll,
  onCloseOthers,
  onCloseToRight,
  onRefresh,
  ...props
}: NavigationTabsBarProps) {
  const [internalActive, setInternalActive] = React.useState(
    defaultActiveKey ?? items[0]?.key ?? "",
  );
  const current = controlledActiveKey ?? internalActive;

  const handleChange = (key: string) => {
    if (controlledActiveKey === undefined) setInternalActive(key);
    onChange?.(key);
  };

  const handleClose = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.(key);
  };

  return (
    <div
      data-slot="navigation-tabs-bar"
      className={cn(
        "border-border bg-background flex items-center gap-1 border-b px-2",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((tab) => {
          const isActive = current === tab.key;
          const closable = tab.closable !== false;
          return (
            <ContextMenu key={tab.key}>
              <ContextMenuTrigger>
                <div
                  onClick={() => handleChange(tab.key)}
                  onAuxClick={(e) => {
                    if (e.button === 1 && tab.closable !== false) {
                      e.stopPropagation();
                      onClose?.(tab.key);
                    }
                  }}
                  className={cn(
                    "group flex cursor-pointer items-center gap-1.5 border-b-2 px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground border-transparent",
                  )}
                >
                  {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                  <span className="whitespace-nowrap">{tab.label}</span>
                  {closable && (
                    <button
                      type="button"
                      onClick={(e) => handleClose(tab.key, e)}
                      className="hover:bg-muted ml-1 shrink-0 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Close tab"
                    >
                      <XIcon className="size-3" />
                    </button>
                  )}
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onSelect={() => onRefresh?.(tab.key)}>
                  <RefreshCwIcon className="size-3.5" /> Refresh
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onSelect={() => onClose?.(tab.key)}>
                  <XIcon className="size-3.5" /> Close
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => onCloseOthers?.(tab.key)}>
                  Close Others
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => onCloseToRight?.(tab.key)}>
                  Close to Right
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => onCloseAll?.()}>
                  Close All
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
    </div>
  );
}

export { NavigationTabsBar };
