"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MobileColumn<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  primary?: boolean
}

interface MobileDataTableProps<T> {
  columns: MobileColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  className?: string
}

function MobileDataTable<T>({ columns, data, onRowClick, className }: MobileDataTableProps<T>) {
  const primaryColumn = columns.find((col) => col.primary) || columns[0]
  const secondaryColumns = columns.filter((col) => col.key !== primaryColumn.key)

  return (
    <div className={cn("space-y-2", className)}>
      {data.map((row, rowIndex) => (
        <Card
          key={rowIndex}
          className={cn(
            "cursor-pointer transition-colors hover:bg-muted/50",
            onRowClick && "active:bg-muted"
          )}
          onClick={() => onRowClick?.(row)}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">
                {primaryColumn.render
                  ? primaryColumn.render(row)
                  : String((row as Record<string, unknown>)[primaryColumn.key] ?? "")}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {secondaryColumns.map((col) => (
                <div key={col.key} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-medium">{col.header}:</span>
                  <span>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export { MobileDataTable }
export type { MobileColumn, MobileDataTableProps }
