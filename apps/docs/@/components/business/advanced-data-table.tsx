"use client";

/**
 * @deprecated Use SearchTable or DataTable instead — they are now powered by @tanstack/react-table
 * and support sorting, filtering, sticky columns, expandable rows, and column visibility.
 * AdvancedDataTable is kept for backward compatibility and will be removed in a future version.
 */

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Checkbox } from "@/components/ui";
import { Badge } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import {
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Columns3Icon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/icons";

interface ColumnDef {
  key: string;
  header: string;
  accessor?: (row: Record<string, unknown>) => unknown;
  render?: (row: Record<string, unknown>) => React.ReactNode;
}

interface AdvancedDataTableProps {
  columns: ColumnDef[];
  data: Record<string, unknown>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (row: Record<string, unknown>) => void;
  emptyVariant?: "default" | "search" | "error" | "network";
  className?: string;
}

/**
 * @component AdvancedDataTable
 * @category business/data
 * @since 0.2.0
 * @description Searchable, sortable, paginated data table with row selection and column visibility controls / 支持搜索、排序、分页、行选择和列可见性控制的数据表格
 * @keywords data-table, pagination, sorting, filtering, column-visibility, selection
 * @example
 * <AdvancedDataTable columns={[{ key: "name", header: "Name" }]} data={[{ name: "Item" }]} />
 */
function AdvancedDataTable({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Search...",
  pageSize: defaultPageSize = 10,
  onRowClick,
  emptyVariant = "default",
  className,
}: AdvancedDataTableProps) {
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState("asc");
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [visibleCols, setVisibleCols] = React.useState<Set<string>>(
    () => new Set(columns.map((c) => c.key)),
  );
  const pageSize = defaultPageSize;

  const filtered = React.useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = col.accessor
          ? col.accessor(row)
          : (row as Record<string, unknown>)[col.key];
        return String(val ?? "")
          .toLowerCase()
          .includes(q);
      }),
    );
  }, [data, search, columns]);

  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const col = columns.find((c) => c.key === sortKey);
      const va = col?.accessor
        ? col.accessor(a as Record<string, unknown>)
        : (a as Record<string, unknown>)[sortKey!];
      const vb = col?.accessor
        ? col.accessor(b as Record<string, unknown>)
        : (b as Record<string, unknown>)[sortKey!];
      if (va == null) return 1;
      if (vb == null) return -1;
      const cmp = String(va).localeCompare(String(vb), undefined, {
        numeric: true,
      });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir, columns]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const visibleColumns = columns.filter((c) => visibleCols.has(c.key));

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  };

  const toggleAll = (): void => {
    if (selected.size === paged.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paged.map((_, i) => i)));
    }
  };

  const toggleRow = (index: number) => {
    const next = new Set(selected);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setSelected(next);
  };

  return (
    <div data-slot="advanced-data-table" className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        {searchable && (
          <div className="relative max-w-sm flex-1">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="h-8 pl-8"
            />
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
            <Columns3Icon className="mr-1 size-4" />
            Columns
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col.key}
                checked={visibleCols.has(col.key)}
                onCheckedChange={() => {
                  const next = new Set(visibleCols);
                  if (next.has(col.key)) next.delete(col.key);
                  else next.add(col.key);
                  setVisibleCols(next);
                }}
              >
                {col.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {selected.size > 0 && (
          <Badge variant="secondary">{selected.size} selected</Badge>
        )}
      </div>

      {paged.length === 0 ? (
        <EmptyState variant={emptyVariant} />
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={
                        selected.size === paged.length && paged.length > 0
                      }
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  {visibleColumns.map((col) => (
                    <TableHead key={col.key}>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="hover:text-foreground h-auto px-0 py-0 font-medium"
                        onClick={() => toggleSort(col.key as string)}
                      >
                        {col.header}
                        {sortKey === col.key ? (
                          sortDir === "asc" ? (
                            <ArrowUpIcon className="size-3" />
                          ) : (
                            <ArrowDownIcon className="size-3" />
                          )
                        ) : (
                          <ArrowUpDownIcon className="size-3 opacity-40" />
                        )}
                      </Button>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((row: Record<string, unknown>, ri: number) => (
                  <TableRow
                    key={ri}
                    className={cn(onRowClick && "cursor-pointer")}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.has(ri)}
                        onCheckedChange={() => toggleRow(ri)}
                      />
                    </TableCell>
                    {visibleColumns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render
                          ? col.render(row as Record<string, unknown>)
                          : String(
                              (col.accessor
                                ? col.accessor(row as Record<string, unknown>)
                                : (row as Record<string, unknown>)[col.key]) ??
                                "",
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span>{sorted.length} row(s) total</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { AdvancedDataTable };
export type { ColumnDef, AdvancedDataTableProps };
