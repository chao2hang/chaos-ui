"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { FilterBar } from "@/components/business/filter-bar";
import type { FilterField } from "@/components/business/filter-bar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

/**
 * @component SearchTable
 * @category business/crud
 * @since 0.2.0
 * @description 搜索 + 表格组合(整合 filter-bar + Table + Pagination) / Search table combining filter-bar, table, and pagination
 * @keywords search, table, filter, pagination, crud
 * @example
 * <SearchTable
 *   filterFields={[{ name: 'keyword', label: 'Keyword', type: 'search' }]}
 *   columns={[{ key: 'name', title: 'Name' }]}
 *   dataSource={[{ id: 1, name: 'Alice' }]}
 *   pagination={{ current: 1, pageSize: 10, total: 50 }}
 *   onSearch={handleSearch}
 *   onPageChange={handlePageChange}
 * />
 */

interface SearchTableColumn {
  key: string;
  title: React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: Record<string, unknown>, index: number) => React.ReactNode;
  fixed?: "left" | "right";
}

interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}

interface SearchTableProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Filter field configs / 筛选字段配置 */
  filterFields?: FilterField[] | undefined;
  /** Table columns / 表格列定义 */
  columns: SearchTableColumn[];
  /** Table data / 表格数据 */
  dataSource?: Record<string, unknown>[] | undefined;
  /** Row key field / 行 key 字段 */
  rowKey?: string | undefined;
  /** Pagination config / 分页配置 */
  pagination?: PaginationConfig | false | undefined;
  /** Search callback / 搜索回调 */
  onSearch?: ((values: Record<string, unknown>) => void) | undefined;
  /** Reset callback / 重置回调 */
  onReset?: (() => void) | undefined;
  /** Page change callback / 页码变更回调 */
  onPageChange?: ((page: number, pageSize: number) => void) | undefined;
  /** Loading state / 加载状态 */
  loading?: boolean | undefined;
  /** Empty state text / 空状态文本 */
  emptyText?: string | undefined;
  /** Table size / 表格大小 */
  size?: "sm" | "md" | "lg" | undefined;
  /** Row selection / 行选择 */
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onChange: (keys: (string | number)[]) => void;
  } | undefined;
}

function SearchTable({
  className,
  filterFields,
  columns,
  dataSource = [],
  rowKey = "id",
  pagination,
  onSearch,
  onReset,
  onPageChange,
  loading = false,
  emptyText = "No data",
  size = "md",
  rowSelection,
  ...props
}: SearchTableProps) {
  const sizePadding =
    size === "sm" ? "px-2 py-1.5" : size === "lg" ? "px-4 py-3" : "px-3 py-2";

  const renderPagination = () => {
    if (!pagination || pagination.total === 0) return null;

    const { current, pageSize, total } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return null;

    const pages: (number | "...")[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return (
      <Pagination className="mt-4 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => current > 1 && onPageChange?.(current - 1, pageSize)}
              className={current <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          {pages.map((p, i) =>
            p === "..." ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === current}
                  onClick={() => onPageChange?.(p, pageSize)}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => current < totalPages && onPageChange?.(current + 1, pageSize)}
              className={current >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div
      data-slot="search-table"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {filterFields && filterFields.length > 0 && (
        <FilterBar fields={filterFields} onSearch={onSearch} onReset={onReset} />
      )}

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              {rowSelection && (
                <TableHead className={cn("w-10", sizePadding)}>
                  <input
                    type="checkbox"
                    checked={
                      dataSource.length > 0 &&
                      dataSource.every((row) =>
                        rowSelection.selectedRowKeys.includes(row[rowKey] as string | number),
                      )
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        rowSelection.onChange(
                          dataSource.map((row) => row[rowKey] as string | number),
                        );
                      } else {
                        rowSelection.onChange([]);
                      }
                    }}
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    sizePadding,
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                  )}
                  style={{ width: col.width }}
                >
                  {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {rowSelection && (
                    <TableCell className={sizePadding}>
                      <Skeleton className="size-4" />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.key} className={sizePadding}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : dataSource.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className="py-12 text-center text-muted-foreground"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              dataSource.map((row, index) => {
                const key = row[rowKey] as string | number;
                const isSelected = rowSelection?.selectedRowKeys.includes(key);
                return (
                  <TableRow
                    key={key}
                    data-state={isSelected ? "selected" : undefined}
                    className={cn(isSelected && "bg-primary/5")}
                  >
                    {rowSelection && (
                      <TableCell className={sizePadding}>
                        <input
                          type="checkbox"
                          checked={!!isSelected}
                          onChange={() => {
                            const newKeys = isSelected
                              ? rowSelection.selectedRowKeys.filter((k) => k !== key)
                              : [...rowSelection.selectedRowKeys, key];
                            rowSelection.onChange(newKeys);
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => {
                      const val = row[col.key];
                      return (
                        <TableCell
                          key={col.key}
                          className={cn(
                            sizePadding,
                            col.align === "center" && "text-center",
                            col.align === "right" && "text-right",
                          )}
                        >
                          {col.render ? col.render(val, row, index) : (val as React.ReactNode) ?? "—"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {renderPagination()}
    </div>
  );
}

export { SearchTable };
export type { SearchTableProps, SearchTableColumn, PaginationConfig };
