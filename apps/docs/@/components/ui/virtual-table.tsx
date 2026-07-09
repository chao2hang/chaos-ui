"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@/lib/utils";

interface ColumnDef<T> {
  key: string;
  header: string;
  width?: number | string;
  accessor?: (row: T) => unknown;
  render?: (row: T) => React.ReactNode;
}

interface VirtualTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  estimateRowHeight: number;
  overscan?: number;
  height: number;
  width?: number | string;
  className?: string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
}

/**
 * @component VirtualTable
 * @category ui/layout
 * @since 0.2.0
 * @description High-performance virtualized table with sticky header, column definitions, and row click support / 基于 TanStack Virtual 的高性能虚拟表格，支持固定表头、列定义和行点击
 * @keywords virtual, table, grid, scroll, performance, 虚拟表格
 * @example
 * <VirtualTable
 *   columns={[
 *     { key: "name", header: "Name", width: 200 },
 *     { key: "status", header: "Status", render: (row) => <Badge>{row.status}</Badge> },
 *   ]}
 *   data={rows}
 *   estimateRowHeight={40}
 *   height={400}
 *   onRowClick={(row) => console.log(row)}
 * />
 */
function VirtualTable<T>({
  columns,
  data,
  estimateRowHeight,
  overscan = 5,
  height,
  width = "100%",
  className,
  onRowClick,
  loading = false,
  loadingComponent,
  emptyComponent,
}: VirtualTableProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  // TanStack Virtual returns imperative helpers that React Compiler cannot safely memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowHeight,
    overscan,
  });

  const gridTemplateColumns = React.useMemo(
    () =>
      columns
        .map((c) =>
          typeof c.width === "number" ? `${c.width}px` : (c.width ?? "1fr"),
        )
        .join(" "),
    [columns],
  );

  if (data.length === 0 && !loading) {
    return (
      emptyComponent || (
        <div className="text-muted-foreground flex items-center justify-center p-8">
          No data
        </div>
      )
    );
  }

  return (
    <div
      ref={parentRef}
      data-slot="virtual-table"
      className={cn(
        "bg-background relative w-full overflow-auto rounded-md border text-sm",
        className,
      )}
      style={{ height, width }}
    >
      <div
        data-slot="virtual-table-header"
        role="row"
        className="bg-background text-foreground sticky top-0 z-10 grid border-b font-medium"
        style={{ gridTemplateColumns }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            role="columnheader"
            data-slot="virtual-table-head"
            className="flex h-10 items-center px-2 whitespace-nowrap"
          >
            {column.header}
          </div>
        ))}
      </div>

      <div
        data-slot="virtual-table-body"
        style={{
          position: "relative",
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const row = data[virtualItem.index]!;
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              data-slot="virtual-table-row"
              ref={(node) => virtualizer.measureElement(node)}
              role="row"
              className={cn(
                "hover:bg-muted/50 absolute left-0 grid w-full border-b transition-colors",
                onRowClick && "cursor-pointer",
              )}
              style={{
                transform: `translateY(${virtualItem.start}px)`,
                height: `${virtualItem.size}px`,
                gridTemplateColumns,
              }}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => {
                const content = column.render
                  ? column.render(row)
                  : String(
                      column.accessor
                        ? column.accessor(row)
                        : ((row as Record<string, unknown>)[column.key] ?? ""),
                    );
                return (
                  <div
                    key={column.key}
                    role="cell"
                    data-slot="virtual-table-cell"
                    className="flex items-center px-2 whitespace-nowrap"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {loading && loadingComponent && (
        <div className="flex items-center justify-center p-4">
          {loadingComponent}
        </div>
      )}
    </div>
  );
}

export { VirtualTable };
export type { ColumnDef, VirtualTableProps };
