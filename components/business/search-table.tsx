"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  flexRender,
  type SortingState,
  type VisibilityState,
  type ExpandedState,
} from "@tanstack/react-table";

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
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, Eye, ChevronsUpDown, ChevronRight, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

/**
 * SearchTable — @tanstack/react-table powered with sorting, sticky columns,
 * expandable rows, column visibility, resizable columns.
 * Key types use `string` (not `keyof T`) so actions/custom columns just work.
 */

export interface SearchTableColumn<T = Record<string, unknown>> {
  /** Column key — any string including 'actions' / 列标识键名 */
  key: string;
  title: React.ReactNode;
  width?: number | string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  fixed?: "left" | "right";
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  minWidth?: number;
  /** Built-in column type for auto-formatting / 内置列类型自动格式化 */
  type?: "currency" | "percent" | "date";
  /** Currency code for type="currency" / 货币代码 */
  currency?: string;
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}


interface SearchTableProps<T = Record<string, unknown>>
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  filterFields?: FilterField[] | undefined;
  columns: SearchTableColumn<T>[];
  dataSource?: T[];
  rowKey?: string | undefined;
  pagination?: PaginationConfig | false | undefined;
  onSearch?: ((values: Record<string, unknown>) => void) | undefined;
  onReset?: (() => void) | undefined;
  onPageChange?: ((page: number, pageSize: number) => void) | undefined;
  loading?: boolean | undefined;
  emptyText?: string | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onChange: (keys: (string | number)[]) => void;
  } | undefined;
  sortable?: boolean;
  columnVisibility?: boolean;
  expandable?: {
    rowExpand: (row: T) => React.ReactNode;
  };
  resizableColumns?: boolean;
}

// ─── Column visibility dropdown ────────────────────────────────

function ColumnVisibilityDropdown({ table }: { table: ReturnType<typeof useReactTable> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="ml-auto">
            <Eye className="size-4" />
            Columns
            <ChevronsUpDown className="size-3" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-48">
        {table.getAllLeafColumns().filter(c => c.id !== "__selection__" && c.id !== "__expand__").map((column) => (
          <DropdownMenuItem
            key={column.id}
            className="cursor-pointer"
            onClick={() => column.toggleVisibility()}
          >
            <span className={cn(column.getIsVisible() ? "opacity-100" : "opacity-40")}>
              {column.id}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Format helpers ────────────────────────────────────────────

function formatCurrency(value: unknown, currency?: string) {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: currency ?? "CNY",
    minimumFractionDigits: 2,
  }).format(num);
}

function formatPercent(value: unknown) {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "—";
  return `${num}%`;
}

function autoFormat(value: unknown, col: SearchTableColumn<any>) {
  if (col.type === "currency") return formatCurrency(value, col.currency);
  if (col.type === "percent") return formatPercent(value);
  if (col.type === "date") {
    const d = value instanceof Date ? value : new Date(value as string | number);
    return isNaN(d.getTime()) ? String(value ?? "—") : d.toLocaleDateString("zh-CN");
  }
  return (value as React.ReactNode) ?? "—";
}

// ─── Main component ────────────────────────────────────────────

function SearchTable<T = Record<string, unknown>>({
  className,
  filterFields,
  columns,
  dataSource = [] as T[],
  rowKey = "id",
  pagination,
  onSearch,
  onReset,
  onPageChange,
  loading = false,
  emptyText = "No data",
  size = "md",
  rowSelection,
  sortable = false,
  columnVisibility = false,
  expandable,
  resizableColumns = false,
  ...props
}: SearchTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [visibility, setVisibility] = React.useState<VisibilityState>(() => {
    const v: VisibilityState = {};
    columns.forEach((col) => {
      if (col.visible === false) v[col.key] = false;
    });
    return v;
  });
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [columnSizing, setColumnSizing] = React.useState<Record<string, number>>({});

  // Build tanstack column defs
  const tanstackColumns = React.useMemo(
    () =>
      columns.map((col) => ({
        id: col.key,
        accessorKey: col.key,
        header: col.title,
        size: typeof col.width === "number" ? col.width : 150,
        minSize: col.minWidth ?? 60,
        enableSorting: sortable || !!col.sortable,
        cell: (info: any) =>
          col.render
            ? col.render(info.getValue(), info.row.original as T, info.row.index)
            : autoFormat(info.getValue(), col),
      })),
    [columns, sortable],
  );

  const table = useReactTable({
    data: dataSource,
    columns: tanstackColumns as any,
    state: {
      sorting,
      columnVisibility: visibility,
      expanded,
      columnSizing,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setVisibility,
    onExpandedChange: setExpanded,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    ...(sortable ? { getSortedRowModel: getSortedRowModel() } : {}),
    ...(expandable ? { getExpandedRowModel: getExpandedRowModel() } : {}),
    enableSorting: sortable,
    columnResizeMode: "onChange" as const,
    enableColumnResizing: resizableColumns,
  } as any);

  const sizePadding =
    size === "sm" ? "px-2 py-1.5" : size === "lg" ? "px-4 py-3" : "px-3 py-2";

  const getColumnStyle = (col: SearchTableColumn<T>) => {
    const style: React.CSSProperties = {};
    const w = columnSizing[col.key] ?? col.width;
    if (w) style.width = w;
    if (col.fixed === "left") {
      style.position = "sticky"; style.left = 0; style.zIndex = 2; style.background = "inherit";
    } else if (col.fixed === "right") {
      style.position = "sticky"; style.right = 0; style.zIndex = 2; style.background = "inherit";
    }
    if (col.type === "currency" || col.type === "percent" || col.align === "right") {
      style.textAlign = "right";
    }
    return style;
  };

  // Pagination rendering
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
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) pages.push(i);
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
              <PaginationItem key={`e-${i}`}><PaginationEllipsis /></PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === current} onClick={() => onPageChange?.(p, pageSize)} className="cursor-pointer">{p}</PaginationLink>
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

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <div data-slot="search-table" className={cn("flex flex-col gap-4", className)} {...props}>
      {filterFields && filterFields.length > 0 && (
        <FilterBar fields={filterFields} onSearch={onSearch} onReset={onReset} />
      )}
      {columnVisibility && (
        <div className="flex items-center justify-end">
          <ColumnVisibilityDropdown table={table} />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/30">
                {expandable && <TableHead className={cn("w-10", sizePadding)} />}
                {rowSelection && (
                  <TableHead className={cn("w-10", sizePadding)}>
                    <input
                      type="checkbox"
                      checked={dataSource.length > 0 && dataSource.every((row) => rowSelection.selectedRowKeys.includes((row as any)[rowKey] as string | number))}
                      onChange={(e) => {
                        rowSelection.onChange(
                          e.target.checked
                            ? dataSource.map((row) => (row as any)[rowKey] as string | number)
                            : []
                        );
                      }}
                    />
                  </TableHead>
                )}
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
                        col?.type === "currency" && "text-right",
                        "relative",
                      )}
                      style={col ? getColumnStyle(col) : undefined}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <span className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          sort === "asc" ? <ArrowUp className="size-3" /> :
                          sort === "desc" ? <ArrowDown className="size-3" /> :
                          <ArrowUpDown className="size-3 opacity-40" />
                        )}
                      </span>
                      {resizableColumns && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-primary/30",
                            header.column.getIsResizing() && "bg-primary/50",
                          )}
                        />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`s-${i}`}>
                  {expandable && <TableCell className={sizePadding}><Skeleton className="size-4" /></TableCell>}
                  {rowSelection && <TableCell className={sizePadding}><Skeleton className="size-4" /></TableCell>}
                  {columns.map((col) => <TableCell key={col.key} className={sizePadding}><Skeleton className="h-4 w-full" /></TableCell>)}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0)} className="py-12 text-center text-muted-foreground">{emptyText}</TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const record = row.original as any;
                const key = record[rowKey] as string | number;
                const isSelected = rowSelection?.selectedRowKeys.includes(key);
                const isExpanded = row.getIsExpanded();
                return (
                  <React.Fragment key={key}>
                    <TableRow data-state={isSelected ? "selected" : undefined} className={cn(isSelected && "bg-primary/5")}>
                      {expandable && (
                        <TableCell className={cn(sizePadding, "w-10")}>
                          <button type="button" onClick={row.getToggleExpandedHandler()} className="flex items-center justify-center">
                            {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                          </button>
                        </TableCell>
                      )}
                      {rowSelection && (
                        <TableCell className={sizePadding}>
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            onChange={() => {
                              rowSelection.onChange(
                                isSelected
                                  ? rowSelection.selectedRowKeys.filter((k) => k !== key)
                                  : [...rowSelection.selectedRowKeys, key]
                              );
                            }}
                          />
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
                              col?.type === "currency" && "text-right tabular-nums",
                            )}
                            style={col ? getColumnStyle(col) : undefined}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {expandable && isExpanded && (
                      <TableRow>
                        <TableCell colSpan={columns.length + (rowSelection ? 1 : 0) + 1} className="bg-muted/20 px-8 py-4">
                          {expandable.rowExpand(row.original as T)}
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

      {renderPagination()}
    </div>
  );
}

export { SearchTable };
export type { SearchTableProps };
