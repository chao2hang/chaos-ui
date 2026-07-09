"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

/**
 * @component DataTable
 * @category business/data
 * @since 0.2.0
 * @description Lightweight data table (no filter bar, no pagination).
 * Powered by @tanstack/react-table.
 * @keywords table, data, display, sort
 */

interface Column<T> {
  /** Column key / 列标识 */
  key: string;
  title: React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  fixed?: "left" | "right";
  sortable?: boolean;
}

interface DataTableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  dataSource?: T[];
  rowKey?: keyof T & string;
  loading?: boolean;
  emptyText?: string;
  size?: "sm" | "md" | "lg";
  /** Enable column sorting / 启用列排序 */
  sortable?: boolean;
  /** Enable row expansion / 启用展开行 */
  expandable?: {
    rowExpand: (row: T) => React.ReactNode;
  };
  className?: string;
}

function DataTable<T = Record<string, unknown>>({
  columns = [],
  dataSource = [] as T[],
  rowKey = "id" as keyof T & string,
  loading = false,
  emptyText = "No data",
  size = "md",
  sortable = false,
  expandable,
  className,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const tanstackColumns = React.useMemo(
    () => () =>
      columns.map((col) => ({
        id: col.key,
        accessorKey: col.key as string,
        header: col.title,
        size: typeof col.width === "number" ? col.width : 150,
        enableSorting: sortable || !!col.sortable,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- tanstack CellContext typing conflicts with our generic Column<T>
        cell: (info: any) =>
          col.render
            ? col.render(info.getValue(), info.row.original, info.row.index)
            : ((info.getValue() as React.ReactNode) ?? "—"),
      })),
    [columns, sortable],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ColumnDef<T> accessorKey typing workaround
  ) as any;

  const table = useReactTable({
    data: dataSource,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: tanstackColumns as any,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    ...(sortable ? { getSortedRowModel: getSortedRowModel() } : {}),
    enableSorting: sortable,
  });

  const sizePadding =
    size === "sm" ? "px-2 py-1.5" : size === "lg" ? "px-4 py-3" : "px-3 py-2";

  return (
    <div
      data-slot="data-table"
      className={cn(
        "border-border overflow-x-auto rounded-lg border",
        className,
      )}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/30">
              {expandable && <TableHead className={cn("w-10", sizePadding)} />}
              {headerGroup.headers.map((header) => {
                const col = columns.find((c) => c.key === header.id);
                const canSort = header.column.getCanSort();
                const sort = header.column.getIsSorted();
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      sizePadding,
                      col?.align === "center" && "text-center",
                      col?.align === "right" && "text-right",
                      canSort && "cursor-pointer select-none",
                      col?.fixed && "sticky z-[2] bg-inherit",
                      col?.fixed === "left" && "left-0",
                      col?.fixed === "right" && "right-0",
                    )}
                    style={col?.width ? { width: col.width } : undefined}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <span className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {canSort &&
                        (sort === "asc" ? (
                          <ArrowUp className="size-3" />
                        ) : sort === "desc" ? (
                          <ArrowDown className="size-3" />
                        ) : (
                          <ArrowUpDown className="size-3 opacity-40" />
                        ))}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {expandable && (
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
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (expandable ? 1 : 0)}
                className="text-muted-foreground py-12 text-center"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => {
              const record = row.original as Record<string, unknown>;
              // Fall back to row index when rowKey is missing/undefined so rows
              // don't share an undefined React key (which breaks diffing/sort/expand).
              const key = (record[rowKey] ?? row.index) as string | number;
              const isExpanded = expanded[String(key)] ?? false;
              return (
                <React.Fragment key={key}>
                  <TableRow>
                    {expandable && (
                      <TableCell className={cn(sizePadding, "w-10")}>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded(
                              (prev) =>
                                ({
                                  ...prev,
                                  [String(key)]: !isExpanded,
                                }) as Record<string, boolean>,
                            )
                          }
                          className="flex items-center justify-center"
                        >
                          {isExpanded ? "▼" : "▶"}
                        </button>
                      </TableCell>
                    )}
                    {row.getVisibleCells().map((cell) => {
                      const col = columns.find((c) => c.key === cell.column.id);
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            sizePadding,
                            col?.align === "center" && "text-center",
                            col?.align === "right" && "text-right",
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {expandable && isExpanded && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="bg-muted/20 px-8 py-4"
                      >
                        {expandable.rowExpand(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { DataTable };
export type { Column };
