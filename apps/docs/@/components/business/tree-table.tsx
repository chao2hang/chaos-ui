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
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react";

export interface TreeNode {
  id: string;
  [key: string]: unknown;
  children?: TreeNode[];
}

interface TreeTableProps extends React.ComponentProps<"div"> {
  data: TreeNode[];
  columns: Array<{
    key: string;
    header: string;
    render?: (node: TreeNode) => React.ReactNode;
  }>;
  className?: string;
  defaultExpanded?: boolean;
}

function TreeTable({
  data,
  columns,
  className,
  defaultExpanded = false,
  ...props
}: TreeTableProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(() => {
    if (!defaultExpanded) return new Set();
    const ids = new Set<string>();
    const walk = (nodes: TreeNode[]) => {
      for (const n of nodes) {
        ids.add(n.id);
        if (n.children) walk(n.children);
      }
    };
    walk(data);
    return ids;
  });

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const flatten = (
    nodes: TreeNode[],
    depth = 0,
  ): Array<{ node: TreeNode; depth: number; hasChildren: boolean }> => {
    const result: Array<{
      node: TreeNode;
      depth: number;
      hasChildren: boolean;
    }> = [];
    for (const node of nodes) {
      const hasChildren = !!(node.children && node.children.length > 0);
      result.push({ node, depth, hasChildren });
      if (hasChildren && expanded.has(node.id)) {
        result.push(...flatten(node.children!, depth + 1));
      }
    }
    return result;
  };

  const flatRows = flatten(data);

  return (
    <div
      data-slot="tree-table"
      className={cn("rounded-md border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={col.key} className={i === 0 ? "pl-6" : ""}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {flatRows.map(({ node, depth, hasChildren }) => (
            <TableRow key={node.id}>
              {columns.map((col, ci) => {
                if (ci === 0) {
                  return (
                    <TableCell key={col.key} className="pl-6">
                      <div
                        className="flex items-center gap-1"
                        style={{ paddingLeft: depth * 20 }}
                      >
                        {hasChildren ? (
                          <button
                            onClick={() => toggle(node.id)}
                            className="text-muted-foreground shrink-0"
                          >
                            {expanded.has(node.id) ? (
                              <ChevronDownIcon className="size-4" />
                            ) : (
                              <ChevronRightIcon className="size-4" />
                            )}
                          </button>
                        ) : (
                          <span className="w-4 shrink-0" />
                        )}
                        <span className="text-sm">
                          {col.render
                            ? col.render(node)
                            : String(node[col.key] ?? "")}
                        </span>
                      </div>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={col.key} className="text-sm">
                    {col.render
                      ? col.render(node)
                      : String(node[col.key] ?? "")}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { TreeTable };
export type { TreeTableProps, TreeNode };
