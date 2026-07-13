"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Direction = "horizontal" | "vertical";

interface PanelResizeData {
  size: number;
  setSize: (n: number) => void;
  minSize: number;
  maxSize: number;
  collapsible: boolean;
  collapsed: boolean;
  collapsedSize: number;
  handleCollapse: () => void;
  handleExpand: () => void;
}

interface ResizableGroupContextValue {
  direction: Direction;
  registerPanel: (id: string, data: PanelResizeData) => void;
  unregisterPanel: (id: string) => void;
  panelDataMap: React.MutableRefObject<Map<string, PanelResizeData>>;
  groupRef: React.RefObject<HTMLDivElement | null>;
  setDragging: (dragging: boolean) => void;
}

const ResizableContext = React.createContext<ResizableGroupContextValue | null>(
  null,
);

function useResizableGroup() {
  const ctx = React.useContext(ResizableContext);
  if (!ctx)
    throw new Error(
      "Resizable components must be used within ResizablePanelGroup",
    );
  return ctx;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

/**
 * @component ResizablePanelGroup
 * @category ui/layout
 * @since 0.2.0
 * @description Container that manages resizable panel groups with drag handles in horizontal or vertical orientation / 可调整大小的面板组容器，支持水平和垂直方向的拖拽分隔
 * @keywords resizable, panel, layout, split, drag, resize
 * @example
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={30}>
 *     <ResizableHandle />
 *   </ResizablePanel>
 *   <ResizablePanel defaultSize={70} />
 * </ResizablePanelGroup>
 */
function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { direction?: Direction }) {
  const groupRef = React.useRef<HTMLDivElement>(null);
  const panelDataMap = React.useRef(new Map<string, PanelResizeData>());
  const [dragging, setDragging] = React.useState(false);

  const registerPanel = React.useCallback(
    (id: string, data: PanelResizeData) => {
      panelDataMap.current.set(id, data);
    },
    [],
  );

  const unregisterPanel = React.useCallback((id: string) => {
    panelDataMap.current.delete(id);
  }, []);

  return (
    <ResizableContext.Provider
      value={{
        direction,
        registerPanel,
        unregisterPanel,
        panelDataMap,
        groupRef,
        setDragging,
      }}
    >
      <div
        ref={groupRef}
        data-slot="resizable-panel-group"
        data-direction={direction}
        data-dragging={dragging ? "true" : "false"}
        className={cn(
          "flex h-full w-full",
          direction === "vertical" ? "flex-col" : "flex-row",
          dragging && "select-none",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
}

interface ResizablePanelProps extends React.ComponentProps<"div"> {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  onCollapse?: () => void;
  onExpand?: () => void;
  onResize?: (size: number) => void;
}

/**
 * @component ResizablePanel
 * @category ui/layout
 * @since 0.2.0
 * @description A resizable panel within a ResizablePanelGroup with configurable size constraints and collapsible support / 可调整大小的面板，支持尺寸约束和折叠功能
 * @keywords resizable, panel, collapsible, min-size, max-size, layout
 * @example
 * <ResizablePanel defaultSize={50} minSize={20} maxSize={80} collapsible>
 *   Content
 * </ResizablePanel>
 */
function ResizablePanel({
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  collapsible = false,
  collapsedSize = 0,
  className,
  children,
  onResize,
  onCollapse,
  onExpand,
  ...props
}: ResizablePanelProps) {
  const ctx = useResizableGroup();
  const [size, setSize] = React.useState(defaultSize);
  const [collapsed, setCollapsed] = React.useState(false);
  const panelId = React.useId();

  const handleCollapse = React.useCallback(() => {
    setCollapsed(true);
    onCollapse?.();
  }, [onCollapse]);

  const handleExpand = React.useCallback(() => {
    setCollapsed(false);
    onExpand?.();
  }, [onExpand]);

  // Register / update panel resize data so handles between panels can find us
  React.useEffect(() => {
    ctx.registerPanel(panelId, {
      size,
      setSize,
      minSize,
      maxSize,
      collapsible,
      collapsed,
      collapsedSize,
      handleCollapse,
      handleExpand,
    });
    return () => ctx.unregisterPanel(panelId);
  }, [
    ctx,
    panelId,
    size,
    minSize,
    maxSize,
    collapsible,
    collapsed,
    collapsedSize,
    handleCollapse,
    handleExpand,
  ]);

  React.useEffect(() => {
    onResize?.(collapsed ? collapsedSize : size);
  }, [size, collapsed, collapsedSize, onResize]);

  const flexSize = collapsed ? collapsedSize : size;

  return (
    <div
      data-slot="resizable-panel"
      data-panel-id={panelId}
      data-collapsed={collapsed}
      style={{
        flexGrow: flexSize,
        flexShrink: 1,
        flexBasis: 0,
      }}
      className={cn("relative min-h-0 min-w-0 overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Find the panel element associated with a handle.
 *
 * 1. If the handle is *inside* a panel, the parent element will have
 *    `data-panel-id`.
 * 2. If the handle is *between* panels (a sibling), walk backwards through
 *    previous siblings until we find an element with `data-panel-id`.
 */
function findPanelElement(handle: HTMLElement | null): HTMLElement | null {
  if (!handle) return null;

  // Case 1: handle is inside a panel
  const parent = handle.parentElement;
  if (parent?.hasAttribute("data-panel-id")) return parent;

  // Case 2: handle is between panels — find previous sibling panel
  let prev = handle.previousElementSibling as HTMLElement | null;
  while (prev && !prev.hasAttribute("data-panel-id")) {
    prev = prev.previousElementSibling as HTMLElement | null;
  }
  return prev;
}

/**
 * Find the secondary panel that shares space with the primary panel.
 * - Handle between panels: next sibling with data-panel-id after the handle.
 * - Handle inside primary: walk next siblings of the primary panel.
 */
function findSecondaryPanelElement(
  handle: HTMLElement | null,
  primary: HTMLElement | null,
): HTMLElement | null {
  if (!handle || !primary) return null;

  const parent = handle.parentElement;
  const handleInsidePrimary = parent === primary;

  if (handleInsidePrimary) {
    let next = primary.nextElementSibling as HTMLElement | null;
    while (next && !next.hasAttribute("data-panel-id")) {
      next = next.nextElementSibling as HTMLElement | null;
    }
    return next;
  }

  let next = handle.nextElementSibling as HTMLElement | null;
  while (next && !next.hasAttribute("data-panel-id")) {
    next = next.nextElementSibling as HTMLElement | null;
  }
  return next;
}

/**
 * @component ResizableHandle
 * @category ui/layout
 * @since 0.2.0
 * @description Draggable handle separating resizable panels with double-click collapse/expand support. Can be placed between panels or inside a panel. / 可拖拽的分隔手柄，支持双击折叠/展开面板。可放在面板之间或面板内部。
 * @keywords resizable, handle, drag, divider, splitter, collapse
 * @example
 * <ResizableHandle withHandle />
 */
function ResizableHandle({
  withHandle = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { withHandle?: boolean }) {
  const ctx = useResizableGroup();
  const ref = React.useRef<HTMLDivElement>(null);

  const resolvePair = React.useCallback((): {
    primary: PanelResizeData;
    secondary: PanelResizeData | null;
  } | null => {
    const primaryEl = findPanelElement(ref.current);
    if (!primaryEl) return null;
    const primaryId = primaryEl.getAttribute("data-panel-id");
    if (!primaryId) return null;
    const primary = ctx.panelDataMap.current.get(primaryId);
    if (!primary) return null;

    const secondaryEl = findSecondaryPanelElement(ref.current, primaryEl);
    const secondaryId = secondaryEl?.getAttribute("data-panel-id");
    const secondary =
      secondaryId != null
        ? (ctx.panelDataMap.current.get(secondaryId) ?? null)
        : null;

    return { primary, secondary };
  }, [ctx]);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const pair = resolvePair();
      if (!pair) return;

      const direction = ctx.direction;
      const startPos = direction === "horizontal" ? e.clientX : e.clientY;
      const startPrimary = pair.primary.size;
      const startSecondary = pair.secondary?.size ?? null;
      const pairTotal =
        startSecondary != null ? startPrimary + startSecondary : null;

      ctx.setDragging(true);

      const target = e.currentTarget as HTMLElement;
      try {
        target.setPointerCapture(e.pointerId);
      } catch {
        // ignore if capture unsupported
      }

      const onMove = (ev: PointerEvent) => {
        const container = ctx.groupRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const total = direction === "horizontal" ? rect.width : rect.height;
        if (total <= 0) return;

        const delta =
          ((direction === "horizontal" ? ev.clientX : ev.clientY) - startPos) /
          total;
        let nextPrimary = startPrimary + delta * 100;

        nextPrimary = clamp(
          nextPrimary,
          pair.primary.minSize,
          pair.primary.maxSize,
        );

        if (pair.secondary && pairTotal != null) {
          // Keep secondary within its min/max while preserving pair total
          const minPrimary = pairTotal - pair.secondary.maxSize;
          const maxPrimary = pairTotal - pair.secondary.minSize;
          nextPrimary = clamp(
            nextPrimary,
            Math.max(pair.primary.minSize, minPrimary),
            Math.min(pair.primary.maxSize, maxPrimary),
          );
          const nextSecondary = pairTotal - nextPrimary;
          pair.primary.setSize(nextPrimary);
          pair.secondary.setSize(nextSecondary);
        } else {
          pair.primary.setSize(nextPrimary);
        }
      };

      const onUp = (ev: PointerEvent) => {
        ctx.setDragging(false);
        try {
          target.releasePointerCapture(ev.pointerId);
        } catch {
          // ignore
        }
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [ctx, resolvePair],
  );

  const onDoubleClick = React.useCallback(() => {
    const pair = resolvePair();
    if (!pair || !pair.primary.collapsible) return;
    if (pair.primary.collapsed) pair.primary.handleExpand();
    else pair.primary.handleCollapse();
  }, [resolvePair]);

  const direction = ctx.direction;

  return (
    <div
      ref={ref}
      data-slot="resizable-handle"
      data-direction={direction}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      className={cn(
        "bg-border hover:bg-primary/50 active:bg-primary relative flex shrink-0 items-center justify-center transition-colors",
        direction === "horizontal"
          ? "h-full w-px cursor-col-resize after:absolute after:inset-y-0 after:left-1/2 after:w-3 after:-translate-x-1/2"
          : "h-px w-full cursor-row-resize after:absolute after:inset-x-0 after:top-1/2 after:h-3 after:-translate-y-1/2",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "bg-background z-10 flex items-center justify-center rounded-sm border shadow-xs",
            direction === "horizontal" ? "h-6 w-2.5" : "h-2.5 w-6",
          )}
        >
          <div
            className={cn(
              "bg-muted-foreground/50 rounded-sm",
              direction === "horizontal" ? "h-3 w-0.5" : "h-0.5 w-3",
            )}
          />
        </div>
      )}
    </div>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
