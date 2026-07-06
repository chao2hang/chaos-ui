"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, XIcon } from "lucide-react";

export interface SearchTableColumn {
  key: string;
  header: string;
  render?: (row: Record<string, unknown>) => React.ReactNode;
}

interface SearchTableProps extends React.ComponentProps<"div"> {
  columns: SearchTableColumn[];
  data: Record<string, unknown>[];
  searchKeys?: string[];
  searchPlaceholder?: string;
  className?: string;
}

function SearchTable({
  columns,
  data,
  searchKeys,
  searchPlaceholder = "搜索...",
  className,
  ...props
}: SearchTableProps) {
  const [query, setQuery] = React.useState("");

  const filtered =
    query && searchKeys
      ? data.filter((row) =>
          searchKeys.some((key) => {
            const val = String(row[key] ?? "").toLowerCase();
            return val.includes(query.toLowerCase());
          }),
        )
      : data;

  return (
    <div
      data-slot="search-table"
      className={cn("space-y-3", className)}
      {...props}
    >
      {searchKeys && (
        <div className="relative max-w-xs">
          <SearchIcon className="text-muted-foreground absolute top-2 left-2.5 size-4" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 pr-8 pl-8"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground absolute top-2 right-2"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground py-12 text-center"
                >
                  {query ? "未找到匹配的数据" : "暂无数据"}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render
                        ? col.render(row)
                        : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {query && (
        <p className="text-muted-foreground text-xs">
          共 {filtered.length} 条结果
        </p>
      )}
    </div>
  );
}

export { SearchTable };
export type { SearchTableProps, SearchTableColumn };
