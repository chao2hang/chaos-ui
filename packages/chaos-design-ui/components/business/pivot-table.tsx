"use client"
import * as React from "react"
import { SearchIcon, XIcon, Table2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type Aggregation = "sum" | "count" | "avg" | "min" | "max"

const AGG_LABELS: Record<Aggregation, string> = {
  sum: "Sum",
  count: "Count",
  avg: "Average",
  min: "Min",
  max: "Max",
}

interface PivotTableProps<T extends Record<string, unknown>> {
  data: T[]
  rowField: keyof T
  columnField: keyof T
  valueField: keyof T
  aggregation?: Aggregation
  onAggregationChange?: (agg: Aggregation) => void
  className?: string
  showRowTotal?: boolean
  showColumnTotal?: boolean
  filter?: (row: T) => boolean
  formatValue?: (v: number) => string
  heatmap?: boolean
  emptyLabel?: string
  searchPlaceholder?: string
}

function aggregate(values: number[], type: Aggregation): number {
  if (values.length === 0) return 0
  switch (type) {
    case "sum":
      return values.reduce((a, b) => a + b, 0)
    case "count":
      return values.length
    case "avg":
      return values.reduce((a, b) => a + b, 0) / values.length
    case "min":
      return values.reduce((a, b) => Math.min(a, b), Infinity)
    case "max":
      return values.reduce((a, b) => Math.max(a, b), -Infinity)
  }
}

export function PivotTable<T extends Record<string, unknown>>({
  data,
  rowField,
  columnField,
  valueField,
  aggregation: aggregationProp = "sum",
  onAggregationChange,
  className,
  showRowTotal = true,
  showColumnTotal = true,
  filter,
  formatValue,
  heatmap,
  emptyLabel = "No data",
  searchPlaceholder = "Search rows...",
}: PivotTableProps<T>) {
  const [aggregationInternal, setAggregationInternal] = React.useState<Aggregation>(aggregationProp)
  const aggregation = onAggregationChange ? aggregationProp : aggregationInternal
  const setAggregation = onAggregationChange ?? setAggregationInternal
  const [search, setSearch] = React.useState("")
  const [scrolled, setScrolled] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = scrollRef.current?.querySelector("[data-radix-scroll-area-viewport]") as HTMLElement | null
    if (!el) return
    const handler = () => setScrolled(el.scrollLeft > 0)
    el.addEventListener("scroll", handler)
    handler()
    return () => el.removeEventListener("scroll", handler)
  }, [])

  const filtered = React.useMemo(() => {
    let result = data
    if (filter) result = result.filter(filter)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((r) => String(r[rowField]).toLowerCase().includes(q))
    }
    return result
  }, [data, filter, rowField, search])

  const matrix = React.useMemo(() => {
    const rowSet = new Set<string>()
    const colSet = new Set<string>()
    for (const r of filtered) {
      rowSet.add(String(r[rowField]))
      colSet.add(String(r[columnField]))
    }
    const rows = Array.from(rowSet).sort()
    const cols = Array.from(colSet).sort()
    const cellMap = new Map<string, number[]>()
    for (const r of filtered) {
      const key = `${r[rowField]}|${r[columnField]}`
      const arr = cellMap.get(key) ?? []
      const v = r[valueField]
      arr.push(typeof v === "number" ? v : Number(v) || 0)
      cellMap.set(key, arr)
    }
    return { rows, cols, cellMap }
  }, [filtered, rowField, columnField, valueField])

  const format = formatValue ?? ((v) => v.toLocaleString("zh-CN", { maximumFractionDigits: 2 }))

  const cellValues = React.useMemo(() => {
    const map = new Map<string, number>()
    for (const r of matrix.rows) {
      for (const c of matrix.cols) {
        const arr = matrix.cellMap.get(`${r}|${c}`) ?? []
        map.set(`${r}|${c}`, aggregate(arr, aggregation))
      }
    }
    return map
  }, [matrix, aggregation])

  const getCell = (row: string, col: string) =>
    cellValues.get(`${row}|${col}`) ?? 0

  const rowTotals = React.useMemo(() =>
    matrix.rows.map((r) =>
      aggregate(
        matrix.cols.flatMap((c) => matrix.cellMap.get(`${r}|${c}`) ?? []),
        aggregation,
      ),
    ), [matrix, aggregation])

  const colTotals = React.useMemo(() =>
    matrix.cols.map((c) =>
      aggregate(
        matrix.rows.flatMap((r) => matrix.cellMap.get(`${r}|${c}`) ?? []),
        aggregation,
      ),
    ), [matrix, aggregation])

  const grandTotal = colTotals.reduce((a, b) => a + b, 0)

  const heatmapRange = React.useMemo(() => {
    if (!heatmap || cellValues.size === 0) return { min: 0, max: 1 }
    let min = Infinity
    let max = -Infinity
    for (const v of cellValues.values()) {
      if (v < min) min = v
      if (v > max) max = v
    }
    return { min, max }
  }, [heatmap, cellValues])

  const heatmapColor = (value: number) => {
    if (heatmapRange.max === heatmapRange.min) return ""
    const ratio = (value - heatmapRange.min) / (heatmapRange.max - heatmapRange.min)
    const alpha = Math.round(ratio * 40 + 5)
    return `rgba(var(--primary), ${alpha / 100})`
  }

  return (
    <Card data-slot="pivot-table" className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">
            {String(rowField)} × {String(columnField)}
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            <Select value={aggregation} onValueChange={(v) => setAggregation(v as Aggregation)}>
              <SelectTrigger className="h-6 w-20 gap-0 border-0 bg-muted/50 px-2 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(AGG_LABELS) as [Aggregation, string][]).map(([k, v]) => (
                  <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-7 w-48 pl-7 pr-6 text-xs"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <XIcon className="size-3" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea ref={scrollRef}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th
                  className={cn(
                    "sticky left-0 z-10 px-3 py-2 text-left font-medium",
                    "bg-muted/30",
                    scrolled && "shadow-[2px_0_4px_-2px_rgba(0,0,0,0.15)]",
                  )}
                >
                  {String(rowField)} \ {String(columnField)}
                </th>
                {matrix.cols.map((c) => (
                  <th key={c} className="px-3 py-2 text-right font-medium tabular-nums">
                    {c}
                  </th>
                ))}
                {showColumnTotal && (
                  <th className="bg-muted/50 px-3 py-2 text-right font-medium">合计</th>
                )}
              </tr>
            </thead>
            <tbody>
              {matrix.rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={matrix.cols.length + (showColumnTotal ? 2 : 1)}
                    className="px-3 py-10 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Table2Icon className="size-8 opacity-30" />
                      <span className="text-sm">{emptyLabel}</span>
                    </div>
                  </td>
                </tr>
              ) : (
                matrix.rows.map((r, ri) => (
                  <tr
                    key={r}
                    className="border-b last:border-0 hover:bg-muted/20 even:bg-muted/5"
                  >
                    <td
                      className={cn(
                        "sticky left-0 z-10 px-3 py-2 font-medium",
                        "bg-background",
                        ri % 2 === 0 ? "bg-background" : "bg-muted/5",
                        "group-hover:bg-muted/20",
                        scrolled && "shadow-[2px_0_4px_-2px_rgba(0,0,0,0.15)]",
                      )}
                    >
                      {r}
                    </td>
                    {matrix.cols.map((c) => (
                      <td
                        key={c}
                        className="px-3 py-2 text-right tabular-nums transition-colors"
                        style={
                          heatmap && heatmapRange.max > heatmapRange.min
                            ? { backgroundColor: heatmapColor(getCell(r, c)) }
                            : undefined
                        }
                      >
                        {format(getCell(r, c))}
                      </td>
                    ))}
                    {showColumnTotal && (
                      <td className="bg-muted/30 px-3 py-2 text-right font-semibold tabular-nums">
                        {format(rowTotals[ri])}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
            {showRowTotal && matrix.rows.length > 0 && (
              <tfoot>
                <tr className="border-t bg-muted/30 font-semibold">
                  <td
                    className={cn(
                      "sticky left-0 z-10 px-3 py-2",
                      "bg-muted/30",
                      scrolled && "shadow-[2px_0_4px_-2px_rgba(0,0,0,0.15)]",
                    )}
                  >
	                  Total
	                </td>
	                  {colTotals.map((t, i) => (
	                    <td key={matrix.cols[i]} className="px-3 py-2 text-right tabular-nums">
                      {format(t)}
                    </td>
                  ))}
                  {showColumnTotal && (
                    <td className="bg-muted/50 px-3 py-2 text-right tabular-nums">
                      {format(grandTotal)}
                    </td>
                  )}
                </tr>
              </tfoot>
            )}
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}