"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PencilIcon,
  CheckIcon,
  XIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";

export interface TreeNode {
  id: string;
  [key: string]: unknown;
  children?: TreeNode[];
}

interface EditableTreeTableProps extends React.ComponentProps<"div"> {
  data: TreeNode[];
  columns: Array<{ key: string; header: string; editable?: boolean }>;
  onChange?: (data: TreeNode[]) => void;
  className?: string;
}

function EditableTreeTable({
  data,
  columns,
  onChange,
  className,
  ...props
}: EditableTreeTableProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const [editingCell, setEditingCell] = React.useState<{
    id: string;
    key: string;
  } | null>(null);
  const [editValue, setEditValue] = React.useState("");

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startEdit = (id: string, key: string, currentValue: unknown) => {
    setEditingCell({ id, key });
    setEditValue(String(currentValue ?? ""));
  };

  const saveEdit = () => {
    if (!editingCell) return;
    const updateNode = (nodes: TreeNode[]): TreeNode[] =>
      nodes.map((n) => {
        if (n.id === editingCell.id)
          return { ...n, [editingCell.key]: editValue };
        if (n.children) return { ...n, children: updateNode(n.children) };
        return n;
      });
    onChange?.(updateNode(data));
    setEditingCell(null);
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
      result.push({
        node,
        depth,
        hasChildren: !!(node.children && node.children.length > 0),
      });
      if (node.children && expanded.has(node.id)) {
        result.push(...flatten(node.children, depth + 1));
      }
    }
    return result;
  };

  const flatRows = flatten(data);

  return (
    <div
      data-slot="editable-tree-table"
      className={cn("rounded-md border", className)}
      {...props}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]" />
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {flatRows.map(({ node, depth, hasChildren }) => (
            <TableRow key={node.id}>
              <TableCell>
                {hasChildren ? (
                  <button
                    onClick={() => toggleExpand(node.id)}
                    className="text-muted-foreground"
                  >
                    {expanded.has(node.id) ? (
                      <ChevronDownIcon className="size-4" />
                    ) : (
                      <ChevronRightIcon className="size-4" />
                    )}
                  </button>
                ) : (
                  <span style={{ marginLeft: 16 + depth * 16 }} />
                )}
              </TableCell>
              {columns.map((col) => {
                const isEditing =
                  editingCell?.id === node.id && editingCell.key === col.key;
                return (
                  <TableCell key={col.key} className="group">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-7 w-full"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") setEditingCell(null);
                          }}
                        />
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={saveEdit}
                        >
                          <CheckIcon className="size-3" />
                        </Button>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => setEditingCell(null)}
                        >
                          <XIcon className="size-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            paddingLeft:
                              depth > 0 && col.key === columns[0].key
                                ? depth * 20
                                : 0,
                          }}
                        >
                          {String(node[col.key] ?? "")}
                        </span>
                        {col.editable && (
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100"
                            onClick={() =>
                              startEdit(node.id, col.key, node[col.key])
                            }
                          >
                            <PencilIcon className="size-3" />
                          </Button>
                        )}
                      </div>
                    )}
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

export { EditableTreeTable };
export type { EditableTreeTableProps, TreeNode };
