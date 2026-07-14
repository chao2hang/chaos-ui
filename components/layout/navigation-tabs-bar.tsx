"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import {
  XIcon,
  RefreshCwIcon,
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

/** Movement (px) before pointer gesture becomes a horizontal drag-scroll. */
const DRAG_THRESHOLD_PX = 4;

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

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("button, a, input, textarea, select"));
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
  const { t } = useTranslation("navigation");
  const [internalActive, setInternalActive] = React.useState(
    defaultActiveKey ?? items[0]?.key ?? "",
  );
  const current = controlledActiveKey ?? internalActive;

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const dragRef = React.useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    dragged: false,
  });
  /** Suppress tab activation after a completed drag (click fires after pointerup). */
  const suppressClickRef = React.useRef(false);

  const updateScrollButtons = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  React.useEffect(() => {
    updateScrollButtons();
  }, [items, updateScrollButtons]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      updateScrollButtons();
    });
    ro.observe(el);
    // Content width can change without the scroller box resizing.
    for (const child of Array.from(el.children)) {
      ro.observe(child);
    }
    return () => ro.disconnect();
  }, [items, updateScrollButtons]);

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  const handleChange = (key: string) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (controlledActiveKey === undefined) setInternalActive(key);
    onChange?.(key);
  };

  const handleClose = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.(key);
  };

  const onScrollPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (isInteractiveTarget(e.target)) return;
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      dragged: false,
    };
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // jsdom / unsupported
    }
  };

  const onScrollPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== e.pointerId) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - drag.startX;
    if (!drag.dragged && Math.abs(dx) < DRAG_THRESHOLD_PX) return;
    if (!drag.dragged) {
      drag.dragged = true;
      setIsDragging(true);
    }
    el.scrollLeft = drag.startScrollLeft - dx;
    e.preventDefault();
  };

  const endScrollDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== e.pointerId) return;
    const el = scrollRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    if (drag.dragged) {
      suppressClickRef.current = true;
      // Clear on next macrotask in case no click follows (e.g. pointer left window).
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
    drag.active = false;
    drag.pointerId = -1;
    drag.dragged = false;
    setIsDragging(false);
  };

  const onScrollWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    // Prefer explicit horizontal delta; otherwise map vertical wheel to horizontal.
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;
    const next = el.scrollLeft + delta;
    const clamped = Math.max(0, Math.min(maxScroll, next));
    if (clamped === el.scrollLeft) return;
    el.scrollLeft = clamped;
    e.preventDefault();
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
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="hover:bg-muted text-muted-foreground shrink-0 rounded p-1"
          aria-label={t("tabs.scrollLeft", "Scroll left")}
        >
          <ChevronLeftIcon className="size-4" />
        </button>
      )}
      <div
        ref={scrollRef}
        data-slot="navigation-tabs-bar-scroll"
        onScroll={updateScrollButtons}
        onPointerDown={onScrollPointerDown}
        onPointerMove={onScrollPointerMove}
        onPointerUp={endScrollDrag}
        onPointerCancel={endScrollDrag}
        onWheel={onScrollWheel}
        className={cn(
          "flex flex-1 items-center gap-1 overflow-x-auto select-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        {items.map((tab) => {
          const isActive = current === tab.key;
          const closable = tab.closable !== false;
          return (
            <ContextMenu key={tab.key}>
              <ContextMenuTrigger>
                <div
                  onClick={() => handleChange(tab.key)}
                  onContextMenu={(e) => {
                    if (suppressClickRef.current || dragRef.current.dragged) {
                      e.preventDefault();
                    }
                  }}
                  onAuxClick={(e) => {
                    if (e.button === 1 && tab.closable !== false) {
                      e.stopPropagation();
                      onClose?.(tab.key);
                    }
                  }}
                  className={cn(
                    "group flex cursor-pointer items-center gap-1.5 border-b-2 px-3 py-2 text-sm transition-colors select-none",
                    isActive
                      ? "border-primary bg-primary/5 text-primary"
                      : "text-muted-foreground hover:text-foreground border-transparent",
                  )}
                >
                  {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                  <span className="whitespace-nowrap select-none">
                    {tab.label}
                  </span>
                  {closable && (
                    <button
                      type="button"
                      onClick={(e) => handleClose(tab.key, e)}
                      className="hover:bg-muted ml-1 shrink-0 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={t("tabs.close", "Close tab")}
                    >
                      <XIcon className="size-3" />
                    </button>
                  )}
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => onRefresh?.(tab.key)}>
                  <RefreshCwIcon className="size-3.5" />{" "}
                  {t("tabs.refresh", "Refresh")}
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => onClose?.(tab.key)}>
                  <XIcon className="size-3.5" /> {t("tabs.close", "Close")}
                </ContextMenuItem>
                <ContextMenuItem onClick={() => onCloseOthers?.(tab.key)}>
                  <CopyIcon className="size-3.5" />{" "}
                  {t("tabs.closeOthers", "Close Others")}
                </ContextMenuItem>
                <ContextMenuItem onClick={() => onCloseToRight?.(tab.key)}>
                  {t("tabs.closeToRight", "Close to Right")}
                </ContextMenuItem>
                <ContextMenuItem onClick={() => onCloseAll?.()}>
                  {t("tabs.closeAll", "Close All")}
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
          aria-label={t("tabs.scrollRight", "Scroll right")}
        >
          <ChevronRightIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

export { NavigationTabsBar };
