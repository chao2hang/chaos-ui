"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  PlusIcon,
  Trash2Icon,
  GripVerticalIcon,
  SaveIcon,
  UndoIcon,
  RedoIcon,
  EyeIcon,
  LayoutGridIcon,
  TableIcon,
  BarChart3Icon,
  FileTextIcon,
  ChevronDownIcon,
  SettingsIcon,
} from "@/components/ui/icons"

/** Widget type identifiers for the dashboard designer */
type DashboardWidgetType =
  | "kpi"
  | "chart-line"
  | "chart-bar"
  | "chart-pie"
  | "chart-donut"
  | "table"
  | "text"
  | "filter"

/** A single widget on the dashboard canvas */
interface DashboardWidget {
  id: string
  type: DashboardWidgetType
  title: string
  x: number
  y: number
  w: number
  h: number
  config: Record<string, unknown>
}

/** Filter definition for the dashboard */
interface DashboardFilter {
  id: string
  label: string
  type: "date-range" | "select" | "search"
  options?: Array<{ label: string; value: string }>
}

/** Full dashboard configuration */
interface DashboardConfig {
  widgets: DashboardWidget[]
  filters?: DashboardFilter[]
}

interface DashboardDesignerProps {
  /** Current dashboard configuration */
  config?: DashboardConfig
  /** Config change handler */
  onChange?: (config: DashboardConfig) => void
  /** Save handler */
  onSave?: (config: DashboardConfig) => void
  /** Preview mode toggle */
  onPreview?: (config: DashboardConfig) => void
  /** Available widget types to add */
  availableWidgets?: DashboardWidgetType[]
  /** Custom widget renderer for preview */
  renderWidget?: (widget: DashboardWidget) => React.ReactNode
  /** Grid columns (default: 12) */
  columns?: number
  /** Read-only mode */
  readOnly?: boolean
  className?: string
}

const ALL_WIDGET_TYPES: DashboardWidgetType[] = [
  "kpi", "chart-line", "chart-bar", "chart-pie", "chart-donut", "table", "text", "filter",
]

const WIDGET_TYPE_META: Record<DashboardWidgetType, { label: string; icon: React.ReactNode; defaultW: number; defaultH: number; defaultConfig: Record<string, unknown> }> = {
  kpi:          { label: "KPI",          icon: <LayoutGridIcon />,  defaultW: 3, defaultH: 2, defaultConfig: { value: "0", unit: "" } },
  "chart-line": { label: "Line Chart",   icon: <BarChart3Icon />,   defaultW: 6, defaultH: 4, defaultConfig: { chartType: "line" } },
  "chart-bar":  { label: "Bar Chart",    icon: <BarChart3Icon />,   defaultW: 6, defaultH: 4, defaultConfig: { chartType: "bar" } },
  "chart-pie":  { label: "Pie Chart",    icon: <BarChart3Icon />,   defaultW: 4, defaultH: 4, defaultConfig: { chartType: "pie" } },
  "chart-donut":{ label: "Donut Chart",  icon: <BarChart3Icon />,   defaultW: 4, defaultH: 4, defaultConfig: { chartType: "donut" } },
  table:        { label: "Table",        icon: <TableIcon />,       defaultW: 6, defaultH: 4, defaultConfig: { columnCount: 5 } },
  text:         { label: "Text",         icon: <FileTextIcon />,        defaultW: 4, defaultH: 2, defaultConfig: { text: "" } },
  filter:       { label: "Filter",       icon: <SettingsIcon />,    defaultW: 3, defaultH: 1, defaultConfig: { filterType: "select" } },
}

const HISTORY_LIMIT = 20

function generateId(): string {
  return `dw_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/** Find the next available Y position below existing widgets */
function findNextPosition(
  widgets: DashboardWidget[],
  _w: number,
  _columns: number,
): { x: number; y: number } {
  if (widgets.length === 0) return { x: 0, y: 0 }
  const maxY = Math.max(...widgets.map((wid) => wid.y + wid.h))
  return { x: 0, y: maxY }
}

/** Full dashboard layout designer where users can customize their dashboard. */
export function DashboardDesigner({
  config: controlledConfig,
  onChange,
  onSave,
  onPreview,
  availableWidgets = ALL_WIDGET_TYPES,
  renderWidget,
  columns = 12,
  readOnly = false,
  className,
}: DashboardDesignerProps) {
  const defaultConfig: DashboardConfig = { widgets: [], filters: [] }

  const [internalConfig, setInternalConfig] = React.useState<DashboardConfig>(defaultConfig)
  const config = controlledConfig ?? internalConfig
  const widgets = config.widgets

  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [history, setHistory] = React.useState<DashboardConfig[]>([])
  const [future, setFuture] = React.useState<DashboardConfig[]>([])
  const [previewMode, setPreviewMode] = React.useState(false)

  const selectedWidget = widgets.find((w) => w.id === selectedId) ?? null

  function pushHistory(next: DashboardConfig) {
    setHistory((prev) => [...prev.slice(-(HISTORY_LIMIT - 1)), config])
    setFuture([])
    onChange?.(next)
    if (controlledConfig === undefined) {
      setInternalConfig(next)
    }
  }

  function updateConfig(next: DashboardConfig) {
    onChange?.(next)
    if (controlledConfig === undefined) {
      setInternalConfig(next)
    }
  }

  function handleAddWidget(type: DashboardWidgetType) {
    const meta = WIDGET_TYPE_META[type]
    if (!meta) return
    const pos = findNextPosition(widgets, meta.defaultW, columns)
    const newWidget: DashboardWidget = {
      id: generateId(),
      type,
      title: meta.label,
      x: pos.x,
      y: pos.y,
      w: meta.defaultW,
      h: meta.defaultH,
      config: { ...meta.defaultConfig },
    }
    const next: DashboardConfig = { ...config, widgets: [...widgets, newWidget] }
    pushHistory(next)
    setSelectedId(newWidget.id)
  }

  function handleDeleteWidget(id: string) {
    const next: DashboardConfig = {
      ...config,
      widgets: widgets.filter((w) => w.id !== id),
    }
    pushHistory(next)
    if (selectedId === id) {
      setSelectedId(null)
      setSheetOpen(false)
    }
  }

  function handleUpdateWidget(id: string, patch: Partial<DashboardWidget>) {
    const next: DashboardConfig = {
      ...config,
      widgets: widgets.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    }
    updateConfig(next)
  }

  function handleUpdateConfig(id: string, configPatch: Record<string, unknown>) {
    const next: DashboardConfig = {
      ...config,
      widgets: widgets.map((w) =>
        w.id === id ? { ...w, config: { ...w.config, ...configPatch } } : w,
      ),
    }
    updateConfig(next)
  }

  function handleUndo() {
    if (history.length === 0) return
    const prev = history[history.length - 1]!
    setHistory((h) => h.slice(0, -1))
    setFuture((f) => [...f.slice(-(HISTORY_LIMIT - 1)), config])
    updateConfig(prev)
  }

  function handleRedo() {
    if (future.length === 0) return
    const next = future[future.length - 1]!
    setFuture((f) => f.slice(0, -1))
    setHistory((h) => [...h.slice(-(HISTORY_LIMIT - 1)), config])
    updateConfig(next)
  }

  function handleSelectWidget(id: string) {
    setSelectedId(id)
    if (!readOnly) {
      setSheetOpen(true)
    }
  }

  const CELL_W_PCT = 100 / columns
  const ROW_H = 60
  const isEditing = !readOnly && !previewMode

  // Preview mode rendering
  if (previewMode) {
    return (
      <div
        data-slot="dashboard-designer"
        data-preview="true"
        className={cn("flex flex-col border border-border bg-background rounded-lg overflow-hidden", className)}
      >
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span className="text-sm font-medium">Preview</span>
          <Button
            size="sm"
            variant="outline"
            className="ml-auto"
            onClick={() => setPreviewMode(false)}
            data-testid="exit-preview-button"
          >
            Exit Preview
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="relative" style={{ minHeight: 400 }}>
            {widgets.map((widget) => (
              <div
                key={widget.id}
                data-slot="dashboard-designer-widget"
                data-widget-id={widget.id}
                data-widget-type={widget.type}
                className="absolute rounded-lg border border-border bg-card"
                style={{
                  left: `${widget.x * CELL_W_PCT}%`,
                  top: widget.y * ROW_H,
                  width: `${widget.w * CELL_W_PCT}%`,
                  height: widget.h * ROW_H,
                }}
              >
                <Card className="h-full border-0 ring-0">
                  <CardHeader className="py-1.5 px-2">
                    <CardTitle className="text-xs">{widget.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center text-muted-foreground text-xs px-2 pb-2">
                    {renderWidget ? renderWidget(widget) : <span>{widget.type}</span>}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="dashboard-designer"
      className={cn("flex flex-col border border-border bg-background rounded-lg overflow-hidden", className)}
    >
      {/* Toolbar */}
      <div
        data-slot="dashboard-designer-toolbar"
        className="flex items-center gap-2 border-b border-border px-3 py-2"
      >
        {isEditing && (
          <>
            <Button
              size="sm"
              variant="outline"
              disabled={history.length === 0}
              onClick={handleUndo}
              data-testid="undo-button"
            >
              <UndoIcon /> Undo
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={future.length === 0}
              onClick={handleRedo}
              data-testid="redo-button"
            >
              <RedoIcon /> Redo
            </Button>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button size="sm" variant="outline" data-testid="add-widget-button" />}
              >
                <PlusIcon /> Add Widget <ChevronDownIcon className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {availableWidgets.map((type) => {
                  const meta = WIDGET_TYPE_META[type]
                  if (!meta) return null
                  return (
                    <DropdownMenuItem
                      key={type}
                      data-testid={`catalog-${type}`}
                      onClick={() => handleAddWidget(type)}
                    >
                      <span className="mr-2 [&_svg]:size-4">{meta.icon}</span>
                      {meta.label}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          {onPreview && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setPreviewMode(true)
                onPreview(config)
              }}
              data-testid="preview-button"
            >
              <EyeIcon /> Preview
            </Button>
          )}
          {onSave && !readOnly && (
            <Button
              size="sm"
              onClick={() => onSave(config)}
              data-testid="save-button"
            >
              <SaveIcon /> Save
            </Button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div
        data-slot="dashboard-designer-canvas"
        className="flex-1 overflow-auto p-4"
      >
        <div
          className="relative"
          style={{
            minHeight: 500,
            backgroundImage: isEditing
              ? "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)"
              : undefined,
            backgroundSize: `${CELL_W_PCT}% ${ROW_H}px`,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedId(null)
              setSheetOpen(false)
            }
          }}
        >
          {widgets.length === 0 && (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground text-sm">
              {isEditing ? "Click \"Add Widget\" to get started" : "No widgets configured"}
            </div>
          )}
          {widgets.map((widget) => {
            const isSelected = widget.id === selectedId
            const meta = WIDGET_TYPE_META[widget.type]
            return (
              <div
                key={widget.id}
                data-slot="dashboard-designer-widget"
                data-widget-id={widget.id}
                data-widget-type={widget.type}
                className={cn(
                  "absolute rounded-lg border bg-card transition-shadow",
                  isSelected
                    ? "ring-2 ring-primary border-primary z-10"
                    : "border-border hover:border-primary/40",
                )}
                style={{
                  left: `${widget.x * CELL_W_PCT}%`,
                  top: widget.y * ROW_H,
                  width: `${widget.w * CELL_W_PCT}%`,
                  height: widget.h * ROW_H,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectWidget(widget.id)
                }}
              >
                <Card className="h-full border-0 ring-0">
                  <CardHeader className="flex-row items-center gap-1 py-1.5 px-2">
                    {isEditing && (
                      <GripVerticalIcon className="size-3.5 text-muted-foreground shrink-0 cursor-grab" />
                    )}
                    <CardTitle className="text-xs truncate flex-1">
                      {widget.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] px-1 shrink-0">
                      {meta?.label ?? widget.type}
                    </Badge>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteWidget(widget.id)
                        }}
                        data-testid={`delete-widget-${widget.id}`}
                        className="shrink-0"
                      >
                        <Trash2Icon className="size-3" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center text-muted-foreground text-xs px-2 pb-2">
                    {renderWidget ? (
                      renderWidget(widget)
                    ) : (
                      <WidgetPlaceholder type={widget.type} config={widget.config} />
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      {/* Property panel as Sheet */}
      {isEditing && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="right" className="w-80 p-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle>Widget Properties</SheetTitle>
            </SheetHeader>
            {selectedWidget && (
              <ScrollArea className="flex-1">
                <div className="space-y-3 p-4">
                  <div>
                    <label className="text-xs text-muted-foreground" htmlFor="dd-title">Title</label>
                    <Input
                      id="dd-title"
                      data-testid="property-title"
                      value={selectedWidget.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleUpdateWidget(selectedWidget.id, { title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-x">X</label>
                      <Input
                        id="dd-x"
                        type="number"
                        data-testid="property-x"
                        min={0}
                        max={columns - selectedWidget.w}
                        value={selectedWidget.x}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateWidget(selectedWidget.id, { x: Math.max(0, Number(e.target.value)) })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-y">Y</label>
                      <Input
                        id="dd-y"
                        type="number"
                        data-testid="property-y"
                        min={0}
                        value={selectedWidget.y}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateWidget(selectedWidget.id, { y: Math.max(0, Number(e.target.value)) })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-w">W</label>
                      <Input
                        id="dd-w"
                        type="number"
                        data-testid="property-w"
                        min={1}
                        max={columns}
                        value={selectedWidget.w}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateWidget(selectedWidget.id, { w: Math.min(columns, Math.max(1, Number(e.target.value))) })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-h">H</label>
                      <Input
                        id="dd-h"
                        type="number"
                        data-testid="property-h"
                        min={1}
                        value={selectedWidget.h}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateWidget(selectedWidget.id, { h: Math.max(1, Number(e.target.value)) })
                        }
                      />
                    </div>
                  </div>
                  <Separator />
                  {/* Type-specific config */}
                  {(selectedWidget.type === "chart-line" || selectedWidget.type === "chart-bar" || selectedWidget.type === "chart-pie" || selectedWidget.type === "chart-donut") && (
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-charttype">Chart Type</label>
                      <select
                        id="dd-charttype"
                        data-testid="property-chart-type"
                        className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
                        value={String(selectedWidget.config.chartType ?? selectedWidget.type.replace("chart-", ""))}
                        onChange={(e) =>
                          handleUpdateConfig(selectedWidget.id, { chartType: e.target.value })
                        }
                      >
                        <option value="line">Line</option>
                        <option value="bar">Bar</option>
                        <option value="pie">Pie</option>
                        <option value="donut">Donut</option>
                        <option value="area">Area</option>
                      </select>
                    </div>
                  )}
                  {selectedWidget.type === "kpi" && (
                    <>
                      <div>
                        <label className="text-xs text-muted-foreground" htmlFor="dd-kpi-value">Value</label>
                        <Input
                          id="dd-kpi-value"
                          data-testid="property-kpi-value"
                          value={String(selectedWidget.config.value ?? "")}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateConfig(selectedWidget.id, { value: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground" htmlFor="dd-kpi-unit">Unit</label>
                        <Input
                          id="dd-kpi-unit"
                          data-testid="property-kpi-unit"
                          value={String(selectedWidget.config.unit ?? "")}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleUpdateConfig(selectedWidget.id, { unit: e.target.value })
                          }
                        />
                      </div>
                    </>
                  )}
                  {selectedWidget.type === "table" && (
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-colcount">Column Count</label>
                      <Input
                        id="dd-colcount"
                        type="number"
                        data-testid="property-column-count"
                        min={1}
                        value={Number(selectedWidget.config.columnCount ?? 5)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateConfig(selectedWidget.id, { columnCount: Number(e.target.value) })
                        }
                      />
                    </div>
                  )}
                  {selectedWidget.type === "text" && (
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-text">Text</label>
                      <Input
                        id="dd-text"
                        data-testid="property-text"
                        value={String(selectedWidget.config.text ?? "")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleUpdateConfig(selectedWidget.id, { text: e.target.value })
                        }
                      />
                    </div>
                  )}
                  {selectedWidget.type === "filter" && (
                    <div>
                      <label className="text-xs text-muted-foreground" htmlFor="dd-filter-type">Filter Type</label>
                      <select
                        id="dd-filter-type"
                        data-testid="property-filter-type"
                        className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
                        value={String(selectedWidget.config.filterType ?? "select")}
                        onChange={(e) =>
                          handleUpdateConfig(selectedWidget.id, { filterType: e.target.value })
                        }
                      >
                        <option value="date-range">Date Range</option>
                        <option value="select">Select</option>
                        <option value="search">Search</option>
                      </select>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

/** Internal placeholder renderer for widget types */
function WidgetPlaceholder({ type, config }: { type: DashboardWidgetType; config: Record<string, unknown> }) {
  if (type === "kpi") {
    return (
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">{String(config.value ?? "0")}</div>
        <div className="text-[10px]">{String(config.unit ?? "")}</div>
      </div>
    )
  }
  if (type === "text") {
    return <p className="text-left w-full truncate">{String(config.text ?? "Text content")}</p>
  }
  if (type === "table") {
    return (
      <div className="w-full space-y-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-2 rounded bg-muted" />
        ))}
      </div>
    )
  }
  if (type.startsWith("chart-")) {
    return (
      <div className="flex items-end gap-1 h-10">
        {[60, 80, 45, 90, 70].map((h, i) => (
          <div key={i} className="w-3 rounded-t bg-primary/40" style={{ height: `${h}%` }} />
        ))}
      </div>
    )
  }
  if (type === "filter") {
    return (
      <div className="flex items-center gap-1 text-[10px]">
        <SettingsIcon className="size-3" />
        <span>{String(config.filterType ?? "Filter")}</span>
      </div>
    )
  }
  return <span className="text-muted-foreground">{type}</span>
}

export type {
  DashboardWidgetType,
  DashboardWidget,
  DashboardFilter,
  DashboardConfig,
  DashboardDesignerProps,
}
