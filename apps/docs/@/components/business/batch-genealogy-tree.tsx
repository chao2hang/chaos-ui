"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @component BatchGenealogyTree
 * @category business/manufacturing
 * @since 1.0.0
 * @description Batch genealogy / traceability tree showing parent-child
 * relationships between raw material lots, intermediate batches, and
 * finished goods. Supports forward and backward traceability.
 * @keywords batch, genealogy, traceability, lot,追溯, mes, manufacturing, tree
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Batch node in the genealogy tree. */
interface BatchNode {
  /** Unique batch / lot number. */
  batchNo: string;
  /** Product code or name. */
  product: string;
  /** Batch type. */
  type: "raw" | "wip" | "finished" | "scrap";
  /** Quantity. */
  quantity: number;
  /** Unit. */
  unit: string;
  /** Production date (ISO). */
  date: string;
  /** Operator / supervisor. */
  operator?: string;
  /** Status. */
  status?: "released" | "quarantine" | "rejected";
  /** Child batches (components used). */
  children?: BatchNode[];
}

/** Props for BatchGenealogyTree. */
interface BatchGenealogyTreeProps {
  /** Root batch node. */
  root: BatchNode;
  /** Traceability direction. */
  direction?: "forward" | "backward";
  /** Batch click handler. */
  onBatchClick?: (node: BatchNode) => void;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const typeConfig: Record<
  string,
  { label: string; color: string; badge: string; icon: string }
> = {
  raw: {
    label: "Raw Material",
    color: "border-blue-300 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    icon: "📦",
  },
  wip: {
    label: "WIP",
    color: "border-amber-300 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    icon: "⚙️",
  },
  finished: {
    label: "Finished",
    color: "border-emerald-300 dark:border-emerald-800",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    icon: "✅",
  },
  scrap: {
    label: "Scrap",
    color: "border-rose-300 dark:border-rose-800",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    icon: "🗑️",
  },
};

const statusConfig: Record<string, { label: string; className: string }> = {
  released: {
    label: "Released",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  quarantine: {
    label: "Quarantine",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  },
};

/** Count all nodes recursively. */
function countNodes(node: BatchNode): number {
  let count = 1;
  for (const child of node.children ?? []) {
    count += countNodes(child);
  }
  return count;
}

/* -------------------------------------------------------------------------- */
/*  Node rendering                                                            */
/* -------------------------------------------------------------------------- */

function BatchNodeCard({
  node,
  onBatchClick,
  isRoot,
}: {
  node: BatchNode;
  onBatchClick?: (node: BatchNode) => void;
  isRoot?: boolean;
}) {
  const typeInfo = typeConfig[node.type] ?? typeConfig.wip ?? typeConfig.wip;
  const statusInfo = node.status ? statusConfig[node.status] : null;

  // Guard against undefined (shouldn't happen with valid types, but satisfies TS)
  if (!typeInfo) return null;

  return (
    <div
      data-slot="batch-node"
      data-batch-no={node.batchNo}
      onClick={() => onBatchClick?.(node)}
      className={cn(
        "bg-card inline-block min-w-[200px] cursor-pointer rounded-lg border-2 p-3 shadow-sm transition-shadow hover:shadow-md",
        typeInfo.color,
        isRoot && "ring-primary ring-2 ring-offset-2",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-base">{typeInfo.icon}</span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-medium",
            typeInfo.badge,
          )}
        >
          {typeInfo.label}
        </span>
      </div>

      {/* Batch number */}
      <div className="text-foreground mt-1.5 font-mono text-sm font-bold">
        {node.batchNo}
      </div>

      {/* Product */}
      <div className="text-muted-foreground text-sm">{node.product}</div>

      {/* Details */}
      <div className="text-muted-foreground mt-1.5 space-y-0.5 text-xs">
        <div className="flex items-center justify-between">
          <span>Qty:</span>
          <span className="text-foreground font-medium tabular-nums">
            {node.quantity.toLocaleString()} {node.unit}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Date:</span>
          <span className="text-foreground">{node.date}</span>
        </div>
        {node.operator && (
          <div className="flex items-center justify-between">
            <span>Operator:</span>
            <span className="text-foreground">{node.operator}</span>
          </div>
        )}
      </div>

      {/* Status badge */}
      {statusInfo && (
        <div className="mt-1.5">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              statusInfo.className,
            )}
          >
            {statusInfo.label}
          </span>
        </div>
      )}
    </div>
  );
}

/** Recursively render tree nodes with connectors. */
function renderTree(
  node: BatchNode,
  onBatchClick?: (node: BatchNode) => void,
  isRoot = false,
): React.ReactNode {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div data-slot="tree-level" className="flex flex-col items-center">
      <BatchNodeCard
        node={node}
        {...(onBatchClick ? { onBatchClick } : {})}
        isRoot={isRoot}
      />

      {hasChildren && (
        <>
          {/* Vertical connector down */}
          <div className="bg-border h-6 w-px" />

          {/* Horizontal connector for siblings */}
          <div className="relative flex justify-center gap-6">
            {/* Horizontal line above children */}
            {node.children!.length > 1 && (
              <div
                className="bg-border absolute top-0 h-px"
                style={{
                  left: "12%",
                  right: "12%",
                }}
              />
            )}

            {/* Each child with its own vertical connector up */}
            {node.children!.map((child, i) => (
              <div
                key={`${child.batchNo}-${i}`}
                className="flex flex-col items-center"
              >
                <div className="bg-border h-6 w-px" />
                {renderTree(child, onBatchClick)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function BatchGenealogyTree({
  root = {} as BatchNode,
  direction = "backward",
  onBatchClick,
  className,
}: BatchGenealogyTreeProps) {
  const totalNodes = countNodes(root);

  return (
    <div
      data-slot="batch-genealogy-tree"
      className={cn(
        "border-border bg-card space-y-4 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground text-lg font-semibold">
            Batch Genealogy
          </h3>
          <Badge variant="outline" className="text-xs">
            {direction === "backward" ? "↑ Backward Trace" : "↓ Forward Trace"}
          </Badge>
        </div>
        <span className="text-muted-foreground text-sm">
          {totalNodes} batch{totalNodes > 1 ? "es" : ""} in tree
        </span>
      </div>

      {/* Tree container with horizontal scroll */}
      <div className="overflow-x-auto py-4">
        <div className="flex min-w-fit justify-center">
          {renderTree(root, onBatchClick, true)}
        </div>
      </div>

      {/* Legend */}
      <div className="border-border flex flex-wrap items-center gap-3 border-t pt-3">
        {Object.entries(typeConfig).map(([key, info]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="text-sm">{info.icon}</span>
            <span className="text-muted-foreground text-xs">{info.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { BatchGenealogyTree };
export type { BatchGenealogyTreeProps, BatchNode };
