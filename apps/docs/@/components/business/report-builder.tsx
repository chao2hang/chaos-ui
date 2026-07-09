"use client"

import * as React from "react"
import { cn } from "@chaos_team/chaos-ui/lib"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@chaos_team/chaos-ui/ui"
import { Button } from "@chaos_team/chaos-ui/ui"
import { Input } from "@chaos_team/chaos-ui/ui"
import { Badge } from "@chaos_team/chaos-ui/ui"
import { ScrollArea } from "@chaos_team/chaos-ui/ui"
import { Separator } from "@chaos_team/chaos-ui/ui"
import {
  PlusIcon,
  Trash2Icon,
  GripVerticalIcon,
  SaveIcon,
  UndoIcon,
  RedoIcon,
  TableIcon,
  BarChart3Icon,
  FileTextIcon,
  ImageIcon,
  LayoutGridIcon,
  EyeIcon,
} from "@chaos_team/chaos-ui/ui-icons"

/** Widget type identifiers for the report builder */
type ReportWidgetType = "table" | "chart" | "kpi" | "text" | "image"

/** A single widget placed on the report canvas */
interface ReportWidget {
  id: string
  type: ReportWidgetType
  /** Widget title */
  title: string
  /** Position in grid (12-column layout) */
  x: number
  y: number
  /** Size in grid units */
  w: number
  h: number
  /** Widget-specific config */
  config: Record<string, unknown>
}

/** Definition describing an available widget type in the palette */
interface ReportWidgetDefinition {
  type: ReportWidgetType
  label: string
  icon: React.ReactNode
  /** Default width/height when added to canvas */
  defaultW: number
  defaultH: number
  /** Default config */
  defaultConfig?: Record<string, unknown>
}

interface ReportBuilderProps {
  /** Current widgets on the canvas */
  widgets?: ReportWidget[]
  /** Widget change handler */
  onChange?: (widgets: ReportWidget[]) => void
  /** Available widget types */
  definitions?: ReportWidgetDefinition[]
  /** Save handler */
  onSave?: (widgets: ReportWidget[]) => void
  /** Preview handler */
  onPreview?: (widgets: ReportWidget[]) => void
  /** Custom property editor for selected widget */
  renderPropertyEditor?: (
    widget: ReportWidget,
    onUpdate: (config: Record<string, unknown>) => void,
  ) => React.ReactNode
  /** Grid column count (default: 12) */
  columns?: number
  /** Canvas height */
  canvasHeight?: number
  /** Read-only mode */
  readOnly?: boolean
  className?: string
}

const DEFAULT_DEFINITIONS: ReportWidgetDefinition[] = [
  { type: "table", label: "Table", icon: <TableIcon />, defaultW: 6, defaultH: 4, defaultConfig: { columnCount: 5 } },
  { type: "chart", label: "Chart", icon: <BarChart3Icon />, defaultW: 6, defaultH: 4, defaultConfig: { chartType: "bar" } },
  { type: "kpi", label: "KPI", icon: <LayoutGridIcon />, defaultW: 3, defaultH: 2, defaultConfig: { value: "0", unit: "" } },
  { type: "text", label: "Text", icon: <FileTextIcon />, defaultW: 4, defaultH: 2, defaultConfig: { text: "" } },
  { type: "image", label: "Image", icon: <ImageIcon />, defaultW: 4, defaultH: 3, defaultConfig: { src: "" } },
]

const HISTORY_LIMIT = 20

function generateId(): string {
  return `w_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/** Find the next available Y position below existing widgets */
function findNextPosition(
  widgets: ReportWidget[],
  _w: number,
  _columns: number,
): { x: number; y: number } {
  if (widgets.length === 0) return { x: 0, y: 0 }
  const maxY = Math.max(...widgets.map((wid) => wid.y + wid.h))
  return { x: 0, y: maxY }
}

/** Lightweight drag-and-drop report designer for building custom query reports. */
export function ReportBuilder({
  widgets: controlledWidgets,
  onChange,
  definitions = DEFAULT_DEFINITIONS,
  onSave,
  onPreview,
  renderPropertyEditor,
  columns = 12,
  canvasHeight = 600,
  readOnly = false,
  className,
}: ReportBuilderProps) {
  const [internalWidgets, setInternalWidgets] = React.useState<ReportWidget[]>([])
  const widgets = controlledWidgets ?? internalWidgets

  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [history, setHistory] = React.useState<ReportWidget[][]>([])
  const [future, setFuture] = React.useState<ReportWidget[][]>([])

  const selectedWidget = widgets.find((w) => w.id === selectedId) ?? null

  function pushHistory(next: ReportWidget[]) {
    setHistory((prev) => [...prev.slice(-(HISTORY_LIMIT - 1)), widgets])
    setFuture([])
    onChange?.(next)
    if (controlledWidgets === undefined) {
      setInternalWidgets(next)
    }
  }

  function updateWidgets(next: ReportWidget[]) {
    onChange?.(next)
    if (controlledWidgets === undefined) {
      setInternalWidgets(next)
    }
  }

  function handleAddWidget(def: ReportWidgetDefinition) {
    if (readOnly) return
    const pos = findNextPosition(widgets, def.defaultW, columns)
    const newWidget: ReportWidget = {
      id: generateId(),
      type: def.type,
      title: def.label,
      x: pos.x,
      y: pos.y,
      w: def.defaultW,
      h: def.defaultH,
      config: { ...(def.defaultConfig ?? {}) },
    }
    pushHistory([...widgets, newWidget])
    setSelectedId(newWidget.id)
  }

  function handleDeleteWidget(id: string) {
    if (readOnly) return
    pushHistory(widgets.filter((w) => w.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  function handleUpdateWidget(id: string, patch: Partial<ReportWidget>) {
    const next = widgets.map((w) => (w.id === id ? { ...w, ...patch } : w))
    updateWidgets(next)
  }

  function handleUpdateConfig(id: string, configPatch: Record<string, unknown>) {
    const next = widgets.map((w) =>
      w.id === id ? { ...w, config: { ...w.config, ...configPatch } } : w,
    )
    updateWidgets(next)
  }

  function handleUndo() {
    if (history.length === 0) return
    const prev = history[history.length - 1]!
    setHistory((h) => h.slice(0, -1))
    setFuture((f) => [...f.slice(-(HISTORY_LIMIT - 1)), widgets])
    updateWidgets(prev)
  }

  function handleRedo() {
    if (future.length === 0) return
    const next = future[future.length - 1]!
    setFuture((f) => f.slice(0, -1))
    setHistory((h) => [...h.slice(-(HISTORY_LIMIT - 1)), widgets])
    updateWidgets(next)
  }

  const CELL_W_PCT = 100 / columns
  const ROW_H = 60

  return (
    <div
      data-slot="report-builder"
      className={cn("flex h-full min-h-[500px] flex-col border border-border bg-background rounded-lg overflow-hidden", className)}
    >
      {/* Toolbar */}
      <div
        data-slot="report-builder-toolbar"
        className="flex items-center gap-2 border-b border-border px-3 py-2"
      >
        {!readOnly && (
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
          </>
        )}
        <div className="ml-auto flex items-center gap-2">
          {onPreview && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPreview(widgets)}
              data-testid="preview-button"
            >
              <EyeIcon /> Preview
            </Button>
          )}
          {onSave && !readOnly && (
            <Button
              size="sm"
              onClick={() => onSave(widgets)}
              data-testid="save-button"
            >
              <SaveIcon /> Save
            </Button>
          )}
        </div>
      </div>

      {/* 3-panel body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: widget palette */}
        {!readOnly && (
          <div
            data-slot="report-builder-palette"
            className="w-52 shrink-0 border-r border-border"
          >
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Widgets
            </div>
            <ScrollArea className="h-[calc(100%-2rem)]">
              <div className="flex flex-col gap-1.5 p-2">
                {definitions.map((def) => (
                  <button
                    key={def.type}
                    type="button"
                    onClick={() => handleAddWidget(def)}
                    data-testid={`palette-${def.type}`}
                    className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-2 text-sm text-left transition-colors hover:bg-muted cursor-pointer"
                  >
                    <span className="text-muted-foreground [&_svg]:size-4">
                      {def.icon}
                    </span>
                    <span>{def.label}</span>
                    <PlusIcon className="ml-auto size-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Center: canvas */}
        <div
          data-slot="report-builder-canvas"
          className="flex-1 overflow-auto"
        >
          <div
            className="relative"
            style={{
              minHeight: canvasHeight,
              backgroundImage:
                "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: `${CELL_W_PCT}% ${ROW_H}px`,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedId(null)
            }}
          >
            {widgets.map((widget) => {
              const isSelected = widget.id === selectedId
              return (
                <div
                  key={widget.id}
                  data-slot="report-builder-widget"
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
                    setSelectedId(widget.id)
                  }}
                >
                  <Card className="h-full border-0 ring-0">
                    <CardHeader className="flex-row items-center gap-1 py-1.5 px-2">
                      <GripVerticalIcon className="size-3.5 text-muted-foreground shrink-0 cursor-grab" />
                      <CardTitle className="text-xs truncate flex-1">
                        {widget.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-[10px] px-1 shrink-0">
                        {widget.type}
                      </Badge>
                      {!readOnly && (
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
                      {widget.type === "kpi" && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {String(widget.config.value ?? "0")}
                          </div>
                          <div className="text-[10px]">{String(widget.config.unit ?? "")}</div>
                        </div>
                      )}
                      {widget.type === "text" && (
                        <p className="text-left w-full truncate">
                          {String(widget.config.text ?? "Text content")}
                        </p>
                      )}
                      {widget.type === "table" && (
                        <div className="w-full space-y-1">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-2 rounded bg-muted" />
                          ))}
                        </div>
                      )}
                      {widget.type === "chart" && (
                        <div className="flex items-end gap-1 h-10">
                          {[60, 80, 45, 90, 70].map((h, i) => (
                            <div
                              key={i}
                              className="w-3 rounded-t bg-primary/40"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      )}
                      {widget.type === "image" && (
                        <ImageIcon className="size-8 text-muted-foreground/40" />
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right panel: properties */}
        {selectedWidget && !readOnly && (
          <div
            data-slot="report-builder-properties"
            className="w-64 shrink-0 border-l border-border overflow-y-auto"
          >
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
              Properties
              <Button
                variant="ghost"
                size="icon-xs"
                className="ml-auto"
                onClick={() => setSelectedId(null)}
                data-testid="close-properties"
              >
                <Trash2Icon className="size-3" />
              </Button>
            </div>
            <Separator />
            <div className="space-y-3 p-3">
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="rb-title">Title</label>
                <Input
                  id="rb-title"
                  data-testid="property-title"
                  value={selectedWidget.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleUpdateWidget(selectedWidget.id, { title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="rb-x">X</label>
                  <Input
                    id="rb-x"
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
                  <label className="text-xs text-muted-foreground" htmlFor="rb-y">Y</label>
                  <Input
                    id="rb-y"
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
                  <label className="text-xs text-muted-foreground" htmlFor="rb-w">W</label>
                  <Input
                    id="rb-w"
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
                  <label className="text-xs text-muted-foreground" htmlFor="rb-h">H</label>
                  <Input
                    id="rb-h"
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
              {selectedWidget.type === "table" && (
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="rb-colcount">Column Count</label>
                  <Input
                    id="rb-colcount"
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
              {selectedWidget.type === "chart" && (
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="rb-charttype">Chart Type</label>
                  <select
                    id="rb-charttype"
                    data-testid="property-chart-type"
                    className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
                    value={String(selectedWidget.config.chartType ?? "bar")}
                    onChange={(e) =>
                      handleUpdateConfig(selectedWidget.id, { chartType: e.target.value })
                    }
                  >
                    <option value="bar">Bar</option>
                    <option value="line">Line</option>
                    <option value="pie">Pie</option>
                    <option value="area">Area</option>
                  </select>
                </div>
              )}
              {selectedWidget.type === "text" && (
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="rb-text">Text</label>
                  <Input
                    id="rb-text"
                    data-testid="property-text"
                    value={String(selectedWidget.config.text ?? "")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateConfig(selectedWidget.id, { text: e.target.value })
                    }
                  />
                </div>
              )}
              {selectedWidget.type === "kpi" && (
                <>
                  <div>
                    <label className="text-xs text-muted-foreground" htmlFor="rb-kpi-value">Value</label>
                    <Input
                      id="rb-kpi-value"
                      data-testid="property-kpi-value"
                      value={String(selectedWidget.config.value ?? "")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleUpdateConfig(selectedWidget.id, { value: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground" htmlFor="rb-kpi-unit">Unit</label>
                    <Input
                      id="rb-kpi-unit"
                      data-testid="property-kpi-unit"
                      value={String(selectedWidget.config.unit ?? "")}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleUpdateConfig(selectedWidget.id, { unit: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
              {selectedWidget.type === "image" && (
                <div>
                  <label className="text-xs text-muted-foreground" htmlFor="rb-img-src">Image URL</label>
                  <Input
                    id="rb-img-src"
                    data-testid="property-image-src"
                    value={String(selectedWidget.config.src ?? "")}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleUpdateConfig(selectedWidget.id, { src: e.target.value })
                    }
                  />
                </div>
              )}
              {/* Custom property editor */}
              {renderPropertyEditor && (
                <>
                  <Separator />
                  {renderPropertyEditor(selectedWidget, (configPatch) =>
                    handleUpdateConfig(selectedWidget.id, configPatch),
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export type {
  ReportWidgetType,
  ReportWidget,
  ReportWidgetDefinition,
  ReportBuilderProps,
}
