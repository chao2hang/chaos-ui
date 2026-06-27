"use client";

import * as React from "react";
import { X, RotateCw } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * @component AdminTabs
 * @category layout
 * @since 0.2.0
 * @description 标签页导航(支持右键菜单: 关闭/关闭其他/关闭右侧/关闭全部/刷新) / Tab navigation with context menu
 * @keywords tabs, navigation, admin, multi-tab, context-menu
 * @example
 * <AdminTabs
 *   tabs={[{ key: 'home', label: 'Home', closable: false }]}
 *   activeKey="home"
 *   onChange={(key) => console.log(key)}
 * />
 */

interface TabItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  href?: string;
}

interface AdminTabsProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Tab items / Tab 项列表 */
  tabs?: TabItem[];
  /** Active tab key / 当前激活的 tab key */
  activeKey?: string;
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

type ContextMenuType = "close" | "closeOthers" | "closeToRight" | "closeAll" | "refresh";

function AdminTabs({
  className,
  tabs = [],
  activeKey,
  onChange,
  onClose,
  onCloseAll,
  onCloseOthers,
  onCloseToRight,
  onRefresh,
  ...props
}: AdminTabsProps) {
  const [internalActive, setInternalActive] = React.useState(
    activeKey ?? tabs[0]?.key ?? "",
  );
  const current = activeKey ?? internalActive;

  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
    tabKey: string;
  } | null>(null);

  React.useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleChange = (key: string) => {
    if (activeKey === undefined) setInternalActive(key);
    onChange?.(key);
  };

  const handleClose = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.(key);
  };

  const handleContextMenu = (e: React.MouseEvent, tabKey: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, tabKey });
  };

  const handleMenuAction = (action: ContextMenuType) => {
    if (!contextMenu) return;
    const key = contextMenu.tabKey;
    switch (action) {
      case "close":
        onClose?.(key);
        break;
      case "closeOthers":
        onCloseOthers?.(key);
        break;
      case "closeToRight":
        onCloseToRight?.(key);
        break;
      case "closeAll":
        onCloseAll?.();
        break;
      case "refresh":
        onRefresh?.(key);
        break;
    }
    setContextMenu(null);
  };

  return (
    <div
      data-slot="admin-tabs"
      className={cn(
        "flex items-center gap-1 border-b border-border bg-background px-2",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = current === tab.key;
          const closable = tab.closable !== false;
          return (
            <div
              key={tab.key}
              onClick={() => handleChange(tab.key)}
              onContextMenu={(e) => handleContextMenu(e, tab.key)}
              className={cn(
                "group flex cursor-pointer items-center gap-1.5 border-b-2 px-3 py-2 text-sm transition-colors",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span className="whitespace-nowrap">{tab.label}</span>
              {closable && (
                <button
                  type="button"
                  onClick={(e) => handleClose(tab.key, e)}
                  className="ml-1 shrink-0 rounded p-0.5 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
                  aria-label="Close tab"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Context menu */}
      {contextMenu && (
        <div
          className="fixed z-50 min-w-40 rounded-lg border border-border bg-popover py-1 shadow-md"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted"
            onClick={() => handleMenuAction("refresh")}
          >
            <RotateCw className="size-3.5" /> Refresh
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted"
            onClick={() => handleMenuAction("close")}
          >
            <X className="size-3.5" /> Close
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted"
            onClick={() => handleMenuAction("closeOthers")}
          >
            Close Others
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted"
            onClick={() => handleMenuAction("closeToRight")}
          >
            Close to Right
          </button>
          <button
            className="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted"
            onClick={() => handleMenuAction("closeAll")}
          >
            Close All
          </button>
        </div>
      )}
    </div>
  );
}

export { AdminTabs };
export type { AdminTabsProps, TabItem };
