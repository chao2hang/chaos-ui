"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

type Direction = "horizontal" | "vertical"

interface ResizablePanelGroupContext {
  direction: Direction
  registerPanel: (id: string, panel: PanelStore) => void
  unregisterPanel: (id: string) => void
  getPanel: (id: string) => PanelStore | undefined
}

export interface PanelStore {
  getSize: () => number
  setSize: (n: number) => void
  minSize: number
  maxSize: number
  collapsed: boolean
  collapsedSize: number
  collapsible: boolean
  collapse: () => void
  expand: () => void
}

const ResizableContext = React.createContext<ResizablePanelGroupContext | null>(null)

function useResizable() {
  const ctx = React.useContext(ResizableContext)
  if (!ctx) throw new Error("Resizable components must be used within ResizablePanelGroup")
  return ctx
}

function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { direction?: Direction }) {
  const panelsRef = React.useRef(new Map<string, PanelStore>())

  const registerPanel = React.useCallback((id: string, panel: PanelStore) => {
    panelsRef.current.set(id, panel)
  }, [])

  const unregisterPanel = React.useCallback((id: string) => {
    panelsRef.current.delete(id)
  }, [])

  const getPanel = React.useCallback((id: string) => panelsRef.current.get(id), [])

  const contextValue = React.useMemo(
    () => ({ direction, registerPanel, unregisterPanel, getPanel }),
    [direction, registerPanel, unregisterPanel, getPanel]
  )

  return (
    <ResizableContext.Provider value={contextValue}>
      <div
        data-slot="resizable-panel-group"
        data-direction={direction}
        className={cn(
          "flex h-full w-full",
          direction === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  )
}

interface ResizablePanelProps extends React.ComponentProps<"div"> {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  collapsible?: boolean
  collapsedSize?: number
  onCollapse?: () => void
  onExpand?: () => void
  onResize?: (size: number) => void
}

const PanelIdContext = React.createContext<string | null>(null)

function ResizablePanel({
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  collapsible = false,
  collapsedSize = 0,
  onCollapse,
  onExpand,
  onResize,
  className,
  children,
  style,
  ...props
}: ResizablePanelProps) {
  const ctx = useResizable()
  const generatedId = React.useId()
  const panelIdRef = React.useRef(`panel-${generatedId}`)
  const panelId = panelIdRef.current
  const [size, setSizeState] = React.useState(defaultSize)
  const [collapsed, setCollapsed] = React.useState(false)
  const sizeRef = React.useRef(size)
  sizeRef.current = size
  const collapsedRef = React.useRef(collapsed)
  collapsedRef.current = collapsed

  const onCollapseRef = React.useRef(onCollapse)
  onCollapseRef.current = onCollapse
  const onExpandRef = React.useRef(onExpand)
  onExpandRef.current = onExpand

  const setSize = React.useCallback(
    (v: number) => {
      const clamped = Math.min(Math.max(v, minSize), maxSize)
      setSizeState(clamped)
    },
    [minSize, maxSize]
  )

  const collapse = React.useCallback(() => {
    setCollapsed(true)
    onCollapseRef.current?.()
  }, [])

  const expand = React.useCallback(() => {
    setCollapsed(false)
    onExpandRef.current?.()
  }, [])

  const store = React.useMemo<PanelStore>(
    () => ({
      getSize: () => (collapsedRef.current ? collapsedSize : sizeRef.current),
      setSize,
      minSize,
      maxSize,
      collapsed,
      collapsedSize,
      collapsible,
      collapse,
      expand,
    }),
    [setSize, minSize, maxSize, collapsed, collapsedSize, collapsible, collapse, expand]
  )

  React.useEffect(() => {
    ctx.registerPanel(panelId, store)
    return () => ctx.unregisterPanel(panelId)
  }, [ctx, panelId, store])

  React.useEffect(() => {
    onResize?.(collapsed ? collapsedSize : size)
  }, [size, collapsed, collapsedSize, onResize])

  const effectiveSize = collapsed ? collapsedSize : size

  return (
    <PanelIdContext.Provider value={panelId}>
      <div
        data-slot="resizable-panel"
        data-panel-id={panelId}
        data-collapsed={collapsed}
        style={{ flexBasis: `${effectiveSize}%`, flexGrow: 0, flexShrink: 0, ...style }}
        className={cn("relative overflow-hidden", className)}
      >
        {children}
      </div>
    </PanelIdContext.Provider>
  )
}

function ResizableHandle({
  withHandle = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { withHandle?: boolean }) {
  const ctx = useResizable()
  const { direction } = ctx
  const ref = React.useRef<HTMLDivElement>(null)
  const startPos = React.useRef(0)
  const startSize = React.useRef(0)
  const targetPanelRef = React.useRef<PanelStore | null>(null)

  const ctxRef = React.useRef(ctx)
  ctxRef.current = ctx
  const dirRef = React.useRef(direction)
  dirRef.current = direction

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      const handleEl = ref.current
      const currentCtx = ctxRef.current
      const currentDir = dirRef.current
      if (!handleEl) return
      const prevEl = handleEl.previousElementSibling as HTMLElement | null
      const nextEl = handleEl.nextElementSibling as HTMLElement | null
      if (!prevEl || !nextEl) return
      const prevId = prevEl.getAttribute("data-panel-id")
      const nextId = nextEl.getAttribute("data-panel-id")
      if (!prevId || !nextId) return
      const prevStore = currentCtx.getPanel(prevId)
      const nextStore = currentCtx.getPanel(nextId)
      if (!prevStore || !nextStore) return

      startPos.current = currentDir === "horizontal" ? e.clientX : e.clientY
      const startPrev = prevStore.getSize()
      const startNext = nextStore.getSize()
      const container = handleEl.parentElement
      if (!container) return

      const onMove = (ev: PointerEvent) => {
        const rect = container.getBoundingClientRect()
        const total = currentDir === "horizontal" ? rect.width : rect.height
        const delta = ((currentDir === "horizontal" ? ev.clientX : ev.clientY) - startPos.current) / total
        const deltaPct = delta * 100
        const newPrev = Math.min(Math.max(startPrev + deltaPct, prevStore.minSize), prevStore.maxSize)
        const actualDelta = newPrev - startPrev
        const newNext = startNext - actualDelta
        const clampedNext = Math.min(Math.max(newNext, nextStore.minSize), nextStore.maxSize)
        const finalPrev = startPrev + actualDelta - (clampedNext - newNext)
        const finalClampedPrev = Math.min(Math.max(finalPrev, prevStore.minSize), prevStore.maxSize)
        prevStore.setSize(finalClampedPrev)
        nextStore.setSize(clampedNext)
      }

      const onUp = () => {
        document.removeEventListener("pointermove", onMove)
        document.removeEventListener("pointerup", onUp)
      }

      document.addEventListener("pointermove", onMove)
      document.addEventListener("pointerup", onUp)
    },
    [],
  )

  const onDoubleClick = React.useCallback(() => {
    const panelEl = ref.current?.previousElementSibling as HTMLElement | null
    if (!panelEl) return
    const panelId = panelEl.getAttribute("data-panel-id")
    if (!panelId) return
    const store = ctxRef.current.getPanel(panelId)
    if (!store?.collapsible) return
    if (store.collapsed) store.expand()
    else store.collapse()
  }, [])

  return (
    <div
      ref={ref}
      data-slot="resizable-handle"
      data-direction={direction}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      className={cn(
        "relative flex shrink-0 items-center justify-center bg-border transition-colors hover:bg-primary/50 active:bg-primary",
        direction === "horizontal"
          ? "w-px h-full cursor-col-resize"
          : "h-px w-full cursor-row-resize",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "z-10 flex items-center justify-center rounded-sm border bg-background shadow-xs",
            direction === "horizontal" ? "h-6 w-2.5" : "h-2.5 w-6"
          )}
        >
          <div
            className={cn(
              "rounded-sm bg-muted-foreground/50",
              direction === "horizontal" ? "h-3 w-0.5" : "h-0.5 w-3"
            )}
          />
        </div>
      )}
    </div>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
