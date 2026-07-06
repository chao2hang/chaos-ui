"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";

interface CrudPageProps extends React.ComponentProps<"div"> {
  title?: string;
  toolbar?: React.ReactNode;
  columns: Array<{
    key: string;
    header: string;
    render?: (row: Record<string, unknown>) => React.ReactNode;
  }>;
  data: Record<string, unknown>[];
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onCreate?: () => void;
  className?: string;
}

function CrudPage({
  title = "数据列表",
  toolbar,
  columns,
  data,
  total = 0,
  page = 1,
  onPageChange,
  onCreate,
  className,
  ...props
}: CrudPageProps) {
  return (
    <div
      data-slot="crud-page"
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {toolbar}
          {onCreate && (
            <Button size="sm" onClick={onCreate}>
              <PlusIcon /> 新建
            </Button>
          )}
        </div>
      </div>
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
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground py-12 text-center"
                >
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
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
      {total > 0 && onPageChange && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">共 {total} 条</p>
          <Pagination
            current={page}
            total={Math.ceil(total / 10)}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export { CrudPage };
export type { CrudPageProps };
