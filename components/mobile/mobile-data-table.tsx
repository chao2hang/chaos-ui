"use client";

import { Card, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";
import * as React from "react";

interface MobileColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  primary?: boolean;
}

interface MobileDataTableProps<T> {
  columns: MobileColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
}

function MobileDataTable<T>({
  columns,
  data,
  onRowClick,
  className,
}: MobileDataTableProps<T>) {
  if (!columns?.length || !data) return null;
  const primaryColumn = columns.find((col) => col.primary) ?? columns[0];
  if (!primaryColumn) return null;
  const secondaryColumns = columns.filter(
    (col) => col.key !== primaryColumn.key,
  );

  return (
    <div className={cn("space-y-2", className)}>
      {data.map((row, rowIndex) => (
        <Card
          key={rowIndex}
          className={cn(
            "hover:bg-muted/50 cursor-pointer transition-colors",
            onRowClick && "active:bg-muted",
          )}
          onClick={() => onRowClick?.(row)}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">
                {primaryColumn.render
                  ? primaryColumn.render(row)
                  : String(
                      (row as Record<string, unknown>)[primaryColumn.key] ?? "",
                    )}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {secondaryColumns.map((col) => (
                <div
                  key={col.key}
                  className="text-muted-foreground flex items-center gap-1 text-xs"
                >
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
  );
}

export { MobileDataTable };
export type { MobileColumn, MobileDataTableProps };
