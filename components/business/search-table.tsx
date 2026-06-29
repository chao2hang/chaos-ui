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

interface ColumnDef<T = Record<string, unknown>> {
  key: string
  title: string
  dataIndex?: keyof T & string
  width?: number | string
  /**
   * Cell renderer. `value` is typed as `T[keyof T]` (the union of field values)
   * so consumers don't need `as` casts for the common case.
   * / 单元格渲染，value 类型为 T 的字段值联合，减少 as 断言
   */
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode
  ellipsis?: boolean
  align?: "left" | "center" | "right"
  fixed?: "left" | "right"
}

interface SearchTableProps<T = Record<string, unknown>> {
  columns: ColumnDef<T>[]
  dataSource: T[]
  rowKey?: keyof T & string
  loading?: boolean
  pagination?: false | {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  } | undefined
  emptyText?: string
  /** Callback when a row is clicked */
  onRow?: (record: T, index: number) => {
    onClick?: () => void
    [key: string]: unknown
  }
  className?: string
}

/**
 * 搜索 + 表格组合（不含弹窗）。
 * 对标 qxy-mop 所有列表页的标准布局。
 *
 * 泛型 `<T>` 让 columns/render/dataSource 类型联动，消除消费方的 `as` 断言：
 *
 * ```tsx
 * const cols: ColumnDef<Company>[] = [
 *   { key: "isActive", title: "状态", render: (v) => v },
 * ]
 * <SearchTable<Company> columns={cols} dataSource={companies} />
 * ```
 *
 * @component SearchTable
 * @category business/crud
 * @since 0.2.0
 */
function SearchTable<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  dataSource,
  rowKey = "id",
  loading = false,
  pagination,
  emptyText = "暂无数据",
  onRow,
  className,
}: SearchTableProps<T>) {
  const alignClass: Record<string, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  const getValue = (record: T, col: ColumnDef<T>) => {
    const key = (col.dataIndex || col.key) as keyof T
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
