"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  XIcon,
  RotateCwIcon,
  CopyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface TabInfo {
  /** Unique tab key / 唯一标识 */
  key: string;
  /** Tab label / 标签标题 */
  label: React.ReactNode;
  /** Whether the tab is closable (default: true) / 是否可关闭（默认 true） */
  closable?: boolean;
  /** Optional icon / 可选图标 */
  icon?: React.ReactNode;
}

interface MultiTabManagerProps extends Omit<
  React.ComponentProps<"div">,
  "onContextMenu"
> {
  /** Tab list / 标签列表 */
  tabs?: TabInfo[];
  /** Active tab key / 当前激活的标签 key */
  activeKey?: string;
  /** Tab click callback / 标签点击回调 */
  onTabClick?: (key: string) => void;
  /** Tab close callback / 关闭标签回调 */
  onTabClose?: (key: string) => void;
  /** Close other tabs callback / 关闭其他标签回调 */
  onTabCloseOthers?: (key: string) => void;
  /** Close tabs to the right callback / 关闭右侧标签回调 */
  onTabCloseRight?: (key: string) => void;
  /** Refresh tab callback / 刷新标签回调 */
  onTabRefresh?: (key: string) => void;
  /** Close all tabs callback / 关闭所有标签回调 */
  onTabCloseAll?: () => void;
}

/**
 * @component MultiTabManager
 * @category layout/navigation
 * @since 0.2.0
 * @description Enhanced tab manager with right-click context menu, middle-click close, scroll buttons for overflow, and cache integration / 增强的标签管理器，支持右键菜单、中键关闭、溢出滚动按钮和缓存集成
 * @keywords tabs, multi-tab, context-menu, navigation, scroll
 * @example
 * <MultiTabManager
 *   tabs={[{ key: "home", label: "Home" }]}
 *   activeKey="home"
 *   onTabClick={(k) => console.log(k)}
 * />
 */
function MultiTabManager({
  className,
  tabs = [],
  activeKey,
  onTabClick,
  onTabClose,
  onTabCloseOthers,
  onTabCloseRight,
  onTabRefresh,
  onTabCloseAll,
  ...props
}: MultiTabManagerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollButtons = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  React.useEffect(() => {
    updateScrollButtons();
  }, [tabs, updateScrollButtons]);

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  const handleClose = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onTabClose?.(key);
  };

  return (
    <div
      data-slot="multi-tab-manager"
      className={cn(
        "border-border bg-background flex items-center gap-1 border-b px-2",
        className,
      )}
      {...props}
    >
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="hover:bg-muted text-muted-foreground shrink-0 rounded p-1"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className="flex flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => {
          const isActive = activeKey === tab.key;
          const closable = tab.closable !== false;
          return (
            <ContextMenu key={tab.key}>
              <ContextMenuTrigger>
                <div
                  onClick={() => onTabClick?.(tab.key)}
                  onAuxClick={(e) => {
                    if (e.button === 1 && closable) {
                      e.stopPropagation();
                      onTabClose?.(tab.key);
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
                <ContextMenuItem onClick={() => onTabRefresh?.(tab.key)}>
                  <RotateCwIcon className="size-3.5" /> Refresh
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => onTabClose?.(tab.key)}>
                  <XIcon className="size-3.5" /> Close
                </ContextMenuItem>
                <ContextMenuItem onClick={() => onTabCloseOthers?.(tab.key)}>
                  <CopyIcon className="size-3.5" /> Close Others
                </ContextMenuItem>
                <ContextMenuItem onClick={() => onTabCloseRight?.(tab.key)}>
                  Close to Right
                </ContextMenuItem>
                <ContextMenuItem onClick={() => onTabCloseAll?.()}>
                  Close All
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="hover:bg-muted text-muted-foreground shrink-0 rounded p-1"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

export { MultiTabManager };
export type { TabInfo, MultiTabManagerProps };
