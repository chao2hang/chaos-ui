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
      }}
    >
      <div
        ref={groupRef}
        data-slot="resizable-panel-group"
        data-direction={direction}
        className={cn(
          "flex h-full w-full",
          direction === "vertical" ? "flex-col" : "flex-row",
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

  return (
    <div
      data-slot="resizable-panel"
      data-panel-id={panelId}
      data-collapsed={collapsed}
      style={{
        [ctx.direction === "horizontal" ? "width" : "height"]: `${
          collapsed ? collapsedSize : size
        }%`,
      }}
      className={cn("relative overflow-hidden", className)}
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

  // Resolve the panel data for the panel this handle controls
  const resolvePanelData = React.useCallback((): PanelResizeData | null => {
    const panelEl = findPanelElement(ref.current);
    if (!panelEl) return null;
    const id = panelEl.getAttribute("data-panel-id");
    if (!id) return null;
    return ctx.panelDataMap.current.get(id) ?? null;
  }, [ctx]);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const panelData = resolvePanelData();
      if (!panelData) return;

      const direction = ctx.direction;
      const startPos = direction === "horizontal" ? e.clientX : e.clientY;
      const startSize = panelData.size;

      const onMove = (ev: PointerEvent) => {
        const container = ctx.groupRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const total = direction === "horizontal" ? rect.width : rect.height;
        const delta =
          ((direction === "horizontal" ? ev.clientX : ev.clientY) - startPos) /
          total;
        const next = Math.min(
          Math.max(startSize + delta * 100, panelData.minSize),
          panelData.maxSize,
        );
        panelData.setSize(next);
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [ctx, resolvePanelData],
  );

  const onDoubleClick = React.useCallback(() => {
    const panelData = resolvePanelData();
    if (!panelData || !panelData.collapsible) return;
    if (panelData.collapsed) panelData.handleExpand();
    else panelData.handleCollapse();
  }, [resolvePanelData]);

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
          ? "h-full w-px cursor-col-resize"
          : "h-px w-full cursor-row-resize",
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
