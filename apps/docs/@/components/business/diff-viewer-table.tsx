"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, PlusIcon, MinusIcon } from "lucide-react";

export interface DiffRow {
  field: string;
  left: string;
  right: string;
  changed: boolean;
}

interface DiffViewerTableProps extends React.ComponentProps<"div"> {
  rows: DiffRow[];
  leftTitle?: string;
  rightTitle?: string;
  className?: string;
}

function DiffViewerTable({
  rows,
  leftTitle = "修改前",
  rightTitle = "修改后",
  className,
  ...props
}: DiffViewerTableProps) {
  return (
    <div
      data-slot="diff-viewer-table"
      className={cn("rounded-md border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">字段</TableHead>
            <TableHead>{leftTitle}</TableHead>
            <TableHead className="w-[40px]" />
            <TableHead>{rightTitle}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.field}
              className={row.changed ? "bg-yellow-50/50" : ""}
            >
              <TableCell className="text-xs font-medium">{row.field}</TableCell>
              <TableCell
                className={cn(
                  "text-sm",
                  row.changed && "text-destructive line-through",
                )}
              >
                {row.changed && (
                  <MinusIcon className="text-destructive mr-1 inline size-3" />
                )}
                {row.left || "-"}
              </TableCell>
              <TableCell>
                {row.changed && (
                  <ArrowRightIcon className="text-muted-foreground size-3" />
                )}
              </TableCell>
              <TableCell
                className={cn(
                  "text-sm",
                  row.changed && "text-success font-medium",
                )}
              >
                {row.changed && (
                  <PlusIcon className="text-success mr-1 inline size-3" />
                )}
                {row.right || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { DiffViewerTable };
export type { DiffViewerTableProps, DiffRow };
