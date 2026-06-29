"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { Skeleton } from "@/components/ui"

interface ColumnDef {
  key: string
  title: string
  dataIndex?: string
  width?: number | string
  render?: (value: unknown, record: Record<string, unknown>, index: number) => React.ReactNode
  ellipsis?: boolean
  align?: "left" | "center" | "right"
  fixed?: "left" | "right"
}

interface SearchTableProps {
  columns: ColumnDef[]
  dataSource: Record<string, unknown>[]
  rowKey?: string
  loading?: boolean
  pagination?: false | {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  } | undefined
  emptyText?: string
  /** Callback when a row is clicked */
  onRow?: (record: Record<string, unknown>, index: number) => {
    onClick?: () => void
    [key: string]: unknown
  }
  className?: string
}

/**
 * 搜索 + 表格组合（不含弹窗）。
 * 对标 qxy-mop 所有列表页的标准布局。
 *
 * @component SearchTable
 * @category business/crud
 * @since 0.2.0
 */
function SearchTable({
  columns,
  dataSource,
  rowKey = "id",
  loading = false,
  pagination,
  emptyText = "暂无数据",
  onRow,
  className,
}: SearchTableProps) {
  const alignClass: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const getValue = (record: Record<string, unknown>, col: ColumnDef) => {
    const key = col.dataIndex || col.key
    return record[key]
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={alignClass[col.align || "left"]}
                  style={{ width: col.width, minWidth: col.width }}
                >
                  {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, ri) => (
                <TableRow key={ri}>
                  {columns.map((_, ci) => (
                    <TableCell key={ci}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : dataSource.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center text-muted-foreground"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              dataSource.map((record, rowIndex) => {
                const rowProps = onRow?.(record, rowIndex)
                return (
                  <TableRow
                    key={String(record[rowKey] || rowIndex)}
                    className={cn(rowProps?.onClick && "cursor-pointer hover:bg-muted/50")}
                    onClick={rowProps?.onClick}
                  >
                    {columns.map((col) => {
                      const value = getValue(record, col)
                      const content = col.render
                        ? col.render(value, record, rowIndex)
                        : value != null
                          ? String(value)
                          : "-"

                      return (
                        <TableCell
                          key={col.key}
                          className={cn(
                            alignClass[col.align || "left"],
                            col.ellipsis && "truncate max-w-0",
                          )}
                        >
                          {content}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            共 {pagination.total} 条
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.current <= 1}
              onClick={() =>
                pagination.onChange(pagination.current - 1, pagination.pageSize)
              }
            >
              上一页
            </Button>
            {Array.from(
              { length: Math.ceil(pagination.total / pagination.pageSize) },
              (_, i) => i + 1,
            )
              .slice(
                Math.max(0, pagination.current - 3),
                Math.min(
                  Math.ceil(pagination.total / pagination.pageSize),
                  pagination.current + 2,
                ),
              )
              .map((page) => (
                <Button
                  key={page}
                  variant={page === pagination.current ? "default" : "outline"}
                  size="sm"
                  onClick={() => pagination.onChange(page, pagination.pageSize)}
                >
                  {page}
                </Button>
              ))}
            <Button
              variant="outline"
              size="sm"
              disabled={
                pagination.current >=
                Math.ceil(pagination.total / pagination.pageSize)
              }
              onClick={() =>
                pagination.onChange(pagination.current + 1, pagination.pageSize)
              }
            >
              下一页
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { SearchTable }
export type { SearchTableProps, ColumnDef }
