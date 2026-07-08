"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Direction = "horizontal" | "vertical";

interface ResizablePanelGroupContext {
  direction: Direction;
  registerPanel: (id: string, size: number) => void;
  panels: { id: string; size: number }[];
}

const ResizableContext = React.createContext<ResizablePanelGroupContext | null>(
  null,
);

function useResizable() {
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
  const [panels, setPanels] = React.useState<{ id: string; size: number }[]>(
    [],
  );

  const registerPanel = React.useCallback((id: string, size: number) => {
    setPanels((prev) => {
      // Deduplicate by id (not size) so panels with the same defaultSize
      // are all registered.
      if (prev.some((p) => p.id === id)) return prev;
      return [...prev, { id, size }];
    });
  }, []);

  return (
    <ResizableContext.Provider value={{ direction, panels, registerPanel }}>
      <div
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
  ...props
}: ResizablePanelProps) {
  const ctx = useResizable();
  const [size, setSize] = React.useState(defaultSize);
  const [collapsed, setCollapsed] = React.useState(false);
  const panelId = React.useId();

  React.useEffect(() => {
    ctx.registerPanel(panelId, defaultSize);
  }, [ctx, panelId, defaultSize]);

  const { onResize, onCollapse, onExpand } = props;
  React.useEffect(() => {
    onResize?.(collapsed ? collapsedSize : size);
  }, [size, collapsed, collapsedSize, onResize]);

  const handleCollapse = React.useCallback(() => {
    setCollapsed(true);
    onCollapse?.();
  }, [onCollapse]);

  const handleExpand = React.useCallback(() => {
    setCollapsed(false);
    onExpand?.();
  }, [onExpand]);

  return (
    <ResizablePanelHandleProvider
      value={{
        size,
        setSize,
        minSize,
        maxSize,
        collapsed,
        collapsedSize,
        collapsible,
        handleCollapse,
        handleExpand,
        direction: ctx.direction,
      }}
    >
      <div
        data-slot="resizable-panel"
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
    </ResizablePanelHandleProvider>
  );
}

interface HandleContext {
  size: number;
  setSize: (n: number) => void;
  minSize: number;
  maxSize: number;
  collapsed: boolean;
  collapsedSize: number;
  collapsible: boolean;
  handleCollapse: () => void;
  handleExpand: () => void;
  direction: Direction;
}

const ResizableHandleContext = React.createContext<HandleContext | null>(null);

function ResizablePanelHandleProvider({
  value,
  children,
}: {
  value: HandleContext;
  children: React.ReactNode;
}) {
  return (
    <ResizableHandleContext.Provider value={value}>
      {children}
    </ResizableHandleContext.Provider>
  );
}

function useResizableHandle() {
  const ctx = React.useContext(ResizableHandleContext);
  if (!ctx) throw new Error("Handle must be used within ResizablePanel");
  return ctx;
}

/**
 * @component ResizableHandle
 * @category ui/layout
 * @since 0.2.0
 * @description Draggable handle separating resizable panels with double-click collapse/expand support / 可拖拽的分隔手柄，支持双击折叠/展开面板
 * @keywords resizable, handle, drag, divider, splitter, collapse
 * @example
 * <ResizableHandle withHandle />
 */
function ResizableHandle({
  withHandle = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { withHandle?: boolean }) {
  const {
    size,
    setSize,
    minSize,
    maxSize,
    collapsed,
    collapsible,
    handleCollapse,
    handleExpand,
    direction,
  } = useResizableHandle();
  const startPos = React.useRef(0);
  const startSize = React.useRef(size);
  const ref = React.useRef<HTMLDivElement>(null);

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      startPos.current = direction === "horizontal" ? e.clientX : e.clientY;
      startSize.current = size;

      const onMove = (ev: PointerEvent) => {
        const container = ref.current?.parentElement?.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const total = direction === "horizontal" ? rect.width : rect.height;
        const delta =
          ((direction === "horizontal" ? ev.clientX : ev.clientY) -
            startPos.current) /
          total;
        const next = Math.min(
          Math.max(startSize.current + delta * 100, minSize),
          maxSize,
        );
        setSize(next);
      };

      const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
      };

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
    },
    [direction, minSize, maxSize, setSize, size],
  );

  const onDoubleClick = () => {
    if (!collapsible) return;
    if (collapsed) handleExpand();
    else handleCollapse();
  };

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
