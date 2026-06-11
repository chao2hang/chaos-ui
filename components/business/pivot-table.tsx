"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export type Aggregation = "sum" | "count" | "avg" | "min" | "max"

interface PivotTableProps<T extends Record<string, unknown>> {
  data: T[]
  rowField: keyof T
  columnField: keyof T
  valueField: keyof T
  aggregation?: Aggregation
  className?: string
  showRowTotal?: boolean
  showColumnTotal?: boolean
  filter?: (row: T) => boolean
  formatValue?: (v: number) => string
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
      return Math.min(...values)
    case "max":
      return Math.max(...values)
  }
}

export function PivotTable<T extends Record<string, unknown>>({
  data,
  rowField,
  columnField,
  valueField,
  aggregation = "sum",
  className,
  showRowTotal = true,
  showColumnTotal = true,
  filter,
  formatValue,
}: PivotTableProps<T>) {
  const [search, setSearch] = React.useState("")

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

  const getCell = (row: string, col: string) => {
    const arr = matrix.cellMap.get(`${row}|${col}`) ?? []
    return aggregate(arr, aggregation)
  }

  const rowTotals = matrix.rows.map((r) => {
    const allValues: number[] = []
    for (const c of matrix.cols) {
      const arr = matrix.cellMap.get(`${r}|${c}`) ?? []
      allValues.push(...arr)
    }
    return aggregate(allValues, aggregation)
  })

  const colTotals = matrix.cols.map((c) => {
    const allValues: number[] = []
    for (const r of matrix.rows) {
      const arr = matrix.cellMap.get(`${r}|${c}`) ?? []
      allValues.push(...arr)
    }
    return aggregate(allValues, aggregation)
  })

  const grandTotal = colTotals.reduce((a, b) => a + b, 0)

  return (
    <Card data-slot="pivot-table" className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {String(rowField)} × {String(columnField)} · {aggregation}
        </CardTitle>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索行..."
          className="h-7 w-48"
        />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="sticky left-0 z-10 bg-muted/30 px-3 py-2 text-left font-medium">
                  {String(rowField)} \ {String(columnField)}
                </th>
                {matrix.cols.map((c) => (
                  <th key={c} className="px-3 py-2 text-right font-medium">
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
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    无数据
                  </td>
                </tr>
              ) : (
                matrix.rows.map((r, ri) => (
                  <tr key={r} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="sticky left-0 z-10 bg-background px-3 py-2 font-medium">
                      {r}
                    </td>
                    {matrix.cols.map((c) => (
                      <td key={c} className="px-3 py-2 text-right tabular-nums">
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
                <tr className="bg-muted/30 font-semibold">
                  <td className="sticky left-0 z-10 bg-muted/30 px-3 py-2">合计</td>
                  {colTotals.map((t, i) => (
                    <td key={i} className="px-3 py-2 text-right tabular-nums">
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
