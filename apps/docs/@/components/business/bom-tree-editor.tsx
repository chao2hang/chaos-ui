"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PlusIcon,
  Trash2Icon,
  CopyIcon,
  PackageIcon,
  LayersIcon,
} from "@/components/ui/icons";

/**
 * @component BOMTreeEditor
 * @category business/manufacturing
 * @since 1.0.0
 * @description Bill of Materials tree editor with hierarchical component
 * management, quantity per assembly, unit cost rollup, phantom items,
 * and substitute components. Core ERP component for manufacturing.
 * @keywords bom, bill of materials, tree, manufacturing, erp, assembly, component, rollup
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Type of BOM line item. */
type BOMItemType = "material" | "phantom" | "subassembly" | "service";

/** A single BOM line item. */
interface BOMItem {
  /** Unique item id */
  id: string;
  /** Part/material number */
  partNumber: string;
  /** Part name / description */
  partName: string;
  /** Quantity per parent assembly */
  quantity: number;
  /** Unit of measure (e.g., "pcs", "kg", "m") */
  unit: string;
  /** Unit cost */
  unitCost: number;
  /** Item type */
  type?: BOMItemType;
  /** Is this a phantom item (not physically stocked)? */
  isPhantom?: boolean;
  /** Reference designator (e.g., "R1, R2") */
  reference?: string;
  /** Notes */
  remark?: string;
  /** Child components (for subassemblies) */
  children?: BOMItem[];
}

/** Props for BOMTreeEditor. */
interface BOMTreeEditorProps {
  /** BOM items (tree structure) */
  items: BOMItem[];
  /** Change callback */
  onChange?: (items: BOMItem[]) => void;
  /** Read-only mode */
  readOnly?: boolean;
  /** Show cost rollup column */
  showCostRollup?: boolean;
  /** Currency symbol (default: "¥") */
  currencySymbol?: string;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function generateId(): string {
  return `bom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatCost(value: number, symbol: string): string {
  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Calculate total cost of a BOM item including all children. */
function calcTotalCost(item: BOMItem): number {
  const selfCost = item.quantity * item.unitCost;
  if (!item.children || item.children.length === 0) return selfCost;
  const childrenCost = item.children.reduce(
    (sum, c) => sum + calcTotalCost(c),
    0,
  );
  return selfCost + (item.isPhantom ? 0 : childrenCost);
}

/** Count total descendants of a BOM item. */
function countDescendants(item: BOMItem): number {
  if (!item.children || item.children.length === 0) return 0;
  return item.children.reduce((sum, c) => sum + 1 + countDescendants(c), 0);
}

/** Deep clone a BOM item tree with new ids. */
function cloneBOMItem(item: BOMItem): BOMItem {
  return {
    ...item,
    id: generateId(),
    partNumber: `${item.partNumber}-COPY`,
    children: item.children?.map(cloneBOMItem) ?? [],
  };
}

/** Update an item in the tree by id. */
function updateItemInTree(
  items: BOMItem[],
  id: string,
  updater: (item: BOMItem) => BOMItem,
): BOMItem[] {
  return items.map((item) => {
    if (item.id === id) return updater(item);
    if (item.children) {
      return {
        ...item,
        children: updateItemInTree(item.children, id, updater),
      };
    }
    return item;
  });
}

/** Remove an item from the tree by id. */
function removeItemFromTree(items: BOMItem[], id: string): BOMItem[] {
  return items
    .filter((item) => item.id !== id)
    .map((item) => {
      if (item.children) {
        return { ...item, children: removeItemFromTree(item.children, id) };
      }
      return item;
    });
}

/** Add a child to a parent item by id. */
function addChildToItem(
  items: BOMItem[],
  parentId: string,
  child: BOMItem,
): BOMItem[] {
  return items.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        children: [...(item.children ?? []), child],
      };
    }
    if (item.children) {
      return {
        ...item,
        children: addChildToItem(item.children, parentId, child),
      };
    }
    return item;
  });
}

/* -------------------------------------------------------------------------- */
/*  Flat row for rendering                                                    */
/* -------------------------------------------------------------------------- */

interface FlatBOMRow {
  item: BOMItem;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  totalCost: number;
  descendantCount: number;
}

function flattenBOM(
  items: BOMItem[],
  expanded: Set<string>,
  depth = 0,
): FlatBOMRow[] {
  const result: FlatBOMRow[] = [];
  for (const item of items) {
    const hasChildren = !!item.children && item.children.length > 0;
    const isExpanded = expanded.has(item.id);
    result.push({
      item,
      depth,
      hasChildren,
      isExpanded,
      totalCost: calcTotalCost(item),
      descendantCount: countDescendants(item),
    });
    if (hasChildren && isExpanded) {
      result.push(...flattenBOM(item.children!, expanded, depth + 1));
    }
  }
  return result;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function BOMTreeEditor({
  items = [],
  onChange,
  readOnly = false,
  showCostRollup = true,
  currencySymbol = "¥",
  className,
}: BOMTreeEditorProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(
    () => new Set(items.filter((i) => i.children?.length).map((i) => i.id)),
  );

  // Re-sync expanded when items change
  React.useEffect(() => {
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const item of items) {
        if (item.children?.length && !next.has(item.id)) {
          // Don't auto-expand, just keep existing
        }
      }
      return next;
    });
  }, [items]);

  const flatRows = React.useMemo(
    () => flattenBOM(items, expanded),
    [items, expanded],
  );

  const grandTotal = React.useMemo(
    () => items.reduce((sum, item) => sum + calcTotalCost(item), 0),
    [items],
  );

  /* ---- handlers ---- */
  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFieldChange = (
    id: string,
    field: keyof BOMItem,
    value: string | number | boolean,
  ) => {
    if (!onChange) return;
    onChange(
      updateItemInTree(items, id, (item) => {
        if (field === "quantity" || field === "unitCost") {
          return {
            ...item,
            [field]: typeof value === "string" ? parseFloat(value) || 0 : value,
          };
        }
        return { ...item, [field]: value };
      }),
    );
  };

  const handleAddChild = (parentId: string) => {
    if (!onChange) return;
    const newChild: BOMItem = {
      id: generateId(),
      partNumber: "",
      partName: "",
      quantity: 1,
      unit: "pcs",
      unitCost: 0,
      type: "material",
    };
    onChange(addChildToItem(items, parentId, newChild));
    setExpanded((prev) => new Set(prev).add(parentId));
  };

  const handleAddRoot = () => {
    if (!onChange) return;
    const newItem: BOMItem = {
      id: generateId(),
      partNumber: "",
      partName: "",
      quantity: 1,
      unit: "pcs",
      unitCost: 0,
      type: "material",
    };
    onChange([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    if (!onChange) return;
    onChange(removeItemFromTree(items, id));
  };

  const handleDuplicate = (id: string) => {
    if (!onChange) return;
    const findAndClone = (items: BOMItem[]): BOMItem[] => {
      for (const item of items) {
        if (item.id === id) {
          return [...items, cloneBOMItem(item)];
        }
        if (item.children) {
          const result = findAndClone(item.children);
          if (result !== item.children) {
            return items.map((i) =>
              i.id === item.id ? { ...i, children: result } : i,
            );
          }
        }
      }
      return items;
    };
    onChange(findAndClone(items));
  };

  const typeBadgeMap: Record<
    BOMItemType,
    {
      label: string;
      variant: "default" | "secondary" | "outline" | "destructive";
    }
  > = {
    material: { label: "Material", variant: "default" },
    phantom: { label: "Phantom", variant: "outline" },
    subassembly: { label: "Sub-assembly", variant: "secondary" },
    service: { label: "Service", variant: "destructive" },
  };

  return (
    <div data-slot="bom-tree-editor" className={cn("space-y-3", className)}>
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-10" />
              <TableHead className="min-w-[120px]">Part Number</TableHead>
              <TableHead className="min-w-[160px]">Part Name</TableHead>
              <TableHead className="w-20 text-right">Qty</TableHead>
              <TableHead className="w-16">Unit</TableHead>
              <TableHead className="w-24 text-right">Unit Cost</TableHead>
              {showCostRollup && (
                <TableHead className="w-28 text-right">Total Cost</TableHead>
              )}
              <TableHead className="w-20">Type</TableHead>
              <TableHead className="min-w-[100px]">Reference</TableHead>
              {!readOnly && (
                <TableHead className="w-24 text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {flatRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={readOnly ? 9 : 10}
                  className="text-muted-foreground py-8 text-center"
                >
                  No BOM items. Click "Add Component" to start.
                </TableCell>
              </TableRow>
            ) : (
              flatRows.map((row) => {
                const {
                  item,
                  depth,
                  hasChildren,
                  isExpanded,
                  totalCost,
                  descendantCount,
                } = row;
                const type = item.type ?? "material";
                return (
                  <TableRow
                    key={item.id}
                    data-slot="bom-tree-row"
                    data-depth={depth}
                    className={cn(
                      depth > 0 && "bg-muted/5",
                      item.isPhantom && "opacity-70",
                    )}
                  >
                    {/* Expand/collapse */}
                    <TableCell>
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="hover:bg-muted inline-flex size-5 items-center justify-center rounded"
                          aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                          {isExpanded ? (
                            <ChevronDownIcon className="size-4" />
                          ) : (
                            <ChevronRightIcon className="size-4" />
                          )}
                        </button>
                      ) : (
                        <span className="inline-flex size-5 items-center justify-center">
                          {item.isPhantom ? (
                            <LayersIcon className="text-muted-foreground size-3" />
                          ) : (
                            <PackageIcon className="text-muted-foreground size-3" />
                          )}
                        </span>
                      )}
                    </TableCell>

                    {/* Part Number */}
                    <TableCell style={{ paddingLeft: 8 + depth * 20 }}>
                      {readOnly ? (
                        <span className="font-mono text-sm">
                          {item.partNumber || "—"}
                        </span>
                      ) : (
                        <Input
                          className="h-8 font-mono text-sm"
                          value={item.partNumber}
                          onChange={(e) =>
                            handleFieldChange(
                              item.id,
                              "partNumber",
                              e.target.value,
                            )
                          }
                          placeholder="P-0001"
                          aria-label="Part number"
                        />
                      )}
                    </TableCell>

                    {/* Part Name */}
                    <TableCell>
                      {readOnly ? (
                        <span className="text-sm">{item.partName || "—"}</span>
                      ) : (
                        <Input
                          className="h-8 text-sm"
                          value={item.partName}
                          onChange={(e) =>
                            handleFieldChange(
                              item.id,
                              "partName",
                              e.target.value,
                            )
                          }
                          placeholder="Component name"
                          aria-label="Part name"
                        />
                      )}
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="text-right">
                      {readOnly ? (
                        <span className="text-sm tabular-nums">
                          {item.quantity}
                        </span>
                      ) : (
                        <Input
                          type="number"
                          className="h-8 text-right tabular-nums"
                          value={item.quantity}
                          onChange={(e) =>
                            handleFieldChange(
                              item.id,
                              "quantity",
                              e.target.value,
                            )
                          }
                          aria-label="Quantity"
                          min={0}
                          step="0.01"
                        />
                      )}
                    </TableCell>

                    {/* Unit */}
                    <TableCell>
                      {readOnly ? (
                        <span className="text-sm">{item.unit}</span>
                      ) : (
                        <Input
                          className="h-8 text-sm"
                          value={item.unit}
                          onChange={(e) =>
                            handleFieldChange(item.id, "unit", e.target.value)
                          }
                          aria-label="Unit"
                        />
                      )}
                    </TableCell>

                    {/* Unit Cost */}
                    <TableCell className="text-right">
                      {readOnly ? (
                        <span className="text-sm tabular-nums">
                          {formatCost(item.unitCost, currencySymbol)}
                        </span>
                      ) : (
                        <Input
                          type="number"
                          className="h-8 text-right tabular-nums"
                          value={item.unitCost}
                          onChange={(e) =>
                            handleFieldChange(
                              item.id,
                              "unitCost",
                              e.target.value,
                            )
                          }
                          aria-label="Unit cost"
                          min={0}
                          step="0.01"
                        />
                      )}
                    </TableCell>

                    {/* Total Cost (rollup) */}
                    {showCostRollup && (
                      <TableCell
                        className="text-right text-sm font-medium tabular-nums"
                        data-slot="bom-total-cost"
                      >
                        {formatCost(totalCost, currencySymbol)}
                        {descendantCount > 0 && (
                          <span className="text-muted-foreground ml-1 text-[10px]">
                            ({descendantCount} sub)
                          </span>
                        )}
                      </TableCell>
                    )}

                    {/* Type */}
                    <TableCell>
                      <Badge
                        variant={typeBadgeMap[type].variant}
                        className="text-[10px]"
                      >
                        {typeBadgeMap[type].label}
                      </Badge>
                    </TableCell>

                    {/* Reference */}
                    <TableCell>
                      {readOnly ? (
                        <span className="text-sm">{item.reference || "—"}</span>
                      ) : (
                        <Input
                          className="h-8 text-sm"
                          value={item.reference ?? ""}
                          onChange={(e) =>
                            handleFieldChange(
                              item.id,
                              "reference",
                              e.target.value,
                            )
                          }
                          placeholder="R1, R2"
                          aria-label="Reference designator"
                        />
                      )}
                    </TableCell>

                    {/* Actions */}
                    {!readOnly && (
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-0.5">
                          {hasChildren || item.type === "subassembly" ? (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleAddChild(item.id)}
                              className="text-muted-foreground hover:text-foreground"
                              aria-label="Add child component"
                              title="Add child"
                            >
                              <PlusIcon className="size-3.5" />
                            </Button>
                          ) : null}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDuplicate(item.id)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="Duplicate item"
                            title="Duplicate"
                          >
                            <CopyIcon className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleRemove(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Remove item"
                            title="Remove"
                          >
                            <Trash2Icon className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>

          {/* Grand total */}
          {items.length > 0 && showCostRollup && (
            <TableBody>
              <TableRow className="bg-muted/50 border-t-2 font-semibold">
                <TableCell
                  colSpan={showCostRollup ? 6 : 5}
                  className="text-right text-sm"
                >
                  Grand Total:
                </TableCell>
                <TableCell
                  className="text-primary text-right text-sm tabular-nums"
                  data-slot="bom-grand-total"
                >
                  {formatCost(grandTotal, currencySymbol)}
                </TableCell>
                <TableCell colSpan={readOnly ? 2 : 3} />
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>

      {!readOnly && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAddRoot}>
            <PlusIcon className="mr-1 size-4" />
            Add Component
          </Button>
        </div>
      )}
    </div>
  );
}

export { BOMTreeEditor };
export { BOMTreeEditor as BomTreeEditor };
export type { BOMTreeEditorProps, BOMItem, BOMItemType };
