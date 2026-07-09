"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Badge } from "@chaos_team/chaos-ui/ui";
import { Checkbox } from "@chaos_team/chaos-ui/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogBody,
} from "@chaos_team/chaos-ui/ui";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PackageIcon,
  SearchIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A node in the batch tree structure.
 */
interface BatchNode {
  /** Batch ID. */
  id: string;
  /** Batch number. */
  batchNo: string;
  /** Product name. */
  productName?: string;
  /** Quantity. */
  quantity?: number;
  /** Production date (ISO string). */
  productionDate?: string;
  /** Expiry date (ISO string). */
  expiryDate?: string;
  /** Status. */
  status?: "pending" | "in-progress" | "completed" | "expired";
  /** Child batches. */
  children?: BatchNode[];
}

/**
 * Props for the BatchSelector component.
 */
interface BatchSelectorProps {
  /** Batch data tree. */
  data: BatchNode[];
  /** Selected batch IDs. */
  value?: string[];
  /** Selection change handler. */
  onChange?: (ids: string[], nodes: BatchNode[]) => void;
  /** Selection mode. */
  mode?: "single" | "multiple";
  /** Dialog open state. */
  open?: boolean;
  /** Open state handler. */
  onOpenChange?: (open: boolean) => void;
  /** Dialog title. */
  title?: string;
  /** Trigger element. */
  trigger?: React.ReactNode;
  /** Disabled. */
  disabled?: boolean;
  /** Show status badges. */
  showStatus?: boolean;
  /** Show metadata (product, qty, date). */
  showMetadata?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default status colors                                             */
/* ------------------------------------------------------------------ */

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  expired: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function flattenTree(nodes: BatchNode[]): BatchNode[] {
  const result: BatchNode[] = [];
  const walk = (list: BatchNode[]) => {
    for (const node of list) {
      result.push(node);
      if (node.children?.length) walk(node.children);
    }
  };
  walk(nodes);
  return result;
}

function findNodesByIds(nodes: BatchNode[], ids: string[]): BatchNode[] {
  const flat = flattenTree(nodes);
  return flat.filter((n) => ids.includes(n.id));
}

function matchesSearch(node: BatchNode, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    node.batchNo.toLowerCase().includes(q) ||
    (node.productName?.toLowerCase().includes(q) ?? false)
  );
}

function filterTree(nodes: BatchNode[], query: string): BatchNode[] {
  if (!query) return nodes;
  const result: BatchNode[] = [];
  for (const node of nodes) {
    const childrenMatch = node.children
      ? filterTree(node.children, query)
      : [];
    if (matchesSearch(node, query) || childrenMatch.length > 0) {
      result.push({
        ...node,
        children: childrenMatch.length > 0 ? childrenMatch : (node.children ?? []),
      });
    }
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  StatusBadge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const colorClass = STATUS_COLORS[status] ?? "";
  return (
    <Badge variant="secondary" className={cn("text-[10px]", colorClass)}>
      {status}
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/*  BatchTreeNode                                                     */
/* ------------------------------------------------------------------ */

interface BatchTreeNodeProps {
  node: BatchNode;
  depth: number;
  selectedIds: string[];
  expandedIds: Set<string>;
  mode: "single" | "multiple";
  showStatus: boolean;
  showMetadata: boolean;
  onToggleExpand: (id: string) => void;
  onToggleSelect: (node: BatchNode) => void;
}

function BatchTreeNode({
  node,
  depth,
  selectedIds,
  expandedIds,
  mode,
  showStatus,
  showMetadata,
  onToggleExpand,
  onToggleSelect,
}: BatchTreeNodeProps) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedIds.includes(node.id);

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded px-2 py-1 text-sm hover:bg-accent",
          isSelected && "bg-accent",
        )}
        style={{ paddingLeft: depth * 16 + 8 }}
      >
        {/* Expand/collapse chevron */}
        <button
          type="button"
          className="flex size-4 shrink-0 items-center justify-center"
          onClick={() => hasChildren && onToggleExpand(node.id)}
          tabIndex={-1}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDownIcon className="size-3.5" />
            ) : (
              <ChevronRightIcon className="size-3.5" />
            )
          ) : (
            <span className="size-3.5" />
          )}
        </button>

        {/* Selection control */}
        {mode === "multiple" ? (
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(node)}
            aria-label={"Select " + node.batchNo}
          />
        ) : (
          <button
            type="button"
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-full border border-input",
              isSelected && "border-primary bg-primary",
            )}
            onClick={() => onToggleSelect(node)}
            aria-label={"Select " + node.batchNo}
          >
            {isSelected && (
              <span className="size-2 rounded-full bg-primary-foreground" />
            )}
          </button>
        )}

        {/* Batch info */}
        <span className="truncate font-medium">{node.batchNo}</span>
        {showMetadata && node.productName && (
          <span className="truncate text-xs text-muted-foreground">
            {node.productName}
          </span>
        )}
        {showStatus && node.status && <StatusBadge status={node.status} />}
      </div>

      {/* Metadata line (optional, shown inline below the main row) */}
      {showMetadata && isSelected && (
        <div
          className="flex flex-wrap gap-x-4 gap-y-0.5 py-1 pl-2 text-xs text-muted-foreground"
          style={{ paddingLeft: depth * 16 + 48 }}
        >
          {node.quantity != null && (
            <span>Qty: {node.quantity}</span>
          )}
          {node.productionDate && (
            <span>Prod: {node.productionDate}</span>
          )}
          {node.expiryDate && (
            <span>Exp: {node.expiryDate}</span>
          )}
        </div>
      )}

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <BatchTreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              mode={mode}
              showStatus={showStatus}
              showMetadata={showMetadata}
              onToggleExpand={onToggleExpand}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stable empty array to avoid infinite re-renders                   */
/* ------------------------------------------------------------------ */

const EMPTY_ARRAY: string[] = [];

/* ------------------------------------------------------------------ */
/*  BatchSelector - main export                                       */
/* ------------------------------------------------------------------ */

/**
 * @component BatchSelector
 * @category Business
 * @since 1.0.0-beta.0
 * @description Tree-structured selector for manufacturing batch/lot numbers
 *   with metadata display. Opens a dialog with a searchable tree list, expand/collapse
 *   for nested batches, and support for single or multiple selection modes.
 * @example
 * ```tsx
 * <BatchSelector
 *   data={batchTree}
 *   value={selectedIds}
 *   onChange={(ids, nodes) => setSelected(ids)}
 *   mode="multiple"
 * />
 * ```
 */
function BatchSelector({
  data,
  value = EMPTY_ARRAY,
  onChange,
  mode = "multiple",
  title = "Select Batch",
  trigger,
  open: controlledOpen,
  onOpenChange,
  showStatus = true,
  showMetadata = false,
  disabled = false,
  className,
}: BatchSelectorProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const [search, setSearch] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<string[]>(value);
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

  // Sync external value
  React.useEffect(() => {
    setSelectedIds(value);
  }, [value]);

  const filteredData = React.useMemo(
    () => filterTree(data, search),
    [data, search],
  );

  // Auto-expand all when searching
  React.useEffect(() => {
    if (search) {
      const allIds = new Set(flattenTree(data).map((n) => n.id));
      setExpandedIds(allIds);
    }
  }, [search, data]);

  const handleToggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelect = (node: BatchNode) => {
    if (mode === "single") {
      setSelectedIds([node.id]);
    } else {
      setSelectedIds((prev) =>
        prev.includes(node.id)
          ? prev.filter((id) => id !== node.id)
          : [...prev, node.id],
      );
    }
  };

  const handleConfirm = () => {
    const nodes = findNodesByIds(data, selectedIds);
    onChange?.(selectedIds, nodes);
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Revert to external value
    setSelectedIds(value);
    setIsOpen(false);
  };

  const selectedCount = selectedIds.length;

  const defaultTrigger = (
    <Button variant="outline" disabled={disabled} icon={<PackageIcon />}>
      {selectedCount > 0
        ? selectedCount + " batch" + (selectedCount > 1 ? "es" : "") + " selected"
        : "Select Batch"}
    </Button>
  );

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        className={cn(disabled && "pointer-events-none opacity-50")}
        onClick={() => !disabled && setIsOpen(true)}
        data-slot="batch-selector"
      >
        {trigger ?? defaultTrigger}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {isOpen && (
        <DialogContent
          className={cn("sm:max-w-lg", className)}
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogBody className="p-0">
            <div className="flex flex-col min-h-[320px]">
              {/* Search */}
              <div className="relative px-3 pb-2">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-8 pl-8 text-sm"
                  placeholder="Search batch or product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {/* Tree */}
              <div className="max-h-72 overflow-y-auto px-1">
                {filteredData.length === 0 && (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No batches found
                  </div>
                )}
                {filteredData.map((node) => (
                  <BatchTreeNode
                    key={node.id}
                    node={node}
                    depth={0}
                    selectedIds={selectedIds}
                    expandedIds={expandedIds}
                    mode={mode}
                    showStatus={showStatus}
                    showMetadata={showMetadata}
                    onToggleExpand={handleToggleExpand}
                    onToggleSelect={handleToggleSelect}
                  />
                ))}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>OK</Button>
          </DialogFooter>
        </DialogContent>
        )}
      </Dialog>
    </>
  );
}

export { BatchSelector };
export type { BatchSelectorProps, BatchNode };
