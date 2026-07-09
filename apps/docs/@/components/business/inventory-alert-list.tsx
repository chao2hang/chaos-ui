"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Skeleton } from "@chaos_team/chaos-ui/ui";
import { EmptyState } from "@chaos_team/chaos-ui/ui";
import { ChevronDownIcon } from "@chaos_team/chaos-ui/ui-icons";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

/** Alert severity levels for inventory items. */
export type AlertSeverity = "critical" | "warning" | "info" | "normal";

/** A recent transaction for expandable detail. */
export interface InventoryTransaction {
  /** Transaction date */
  date: string;
  /** Transaction type */
  type: "in" | "out";
  /** Quantity */
  quantity: number;
  /** Reference number */
  reference?: string;
}

/** A single inventory alert item. */
export interface InventoryAlertItem {
  /** Item ID */
  id: string;
  /** Item name */
  name: string;
  /** Item code/SKU */
  code?: string;
  /** Current quantity */
  currentQty: number;
  /** Safety stock level */
  safetyStock?: number;
  /** Maximum stock level */
  maxStock?: number;
  /** Unit */
  unit?: string;
  /** Alert severity */
  severity: AlertSeverity;
  /** Alert message */
  message?: string;
  /** Trend data (last 7 days quantities) */
  trend?: number[];
  /** Warehouse name */
  warehouse?: string;
  /** Last updated date */
  lastUpdated?: string;
  /** Recent transactions for expandable detail */
  recentTransactions?: InventoryTransaction[];
}

/** Props for the InventoryAlertList component. */
export interface InventoryAlertListProps {
  /** Alert items */
  items: InventoryAlertItem[];
  /** Active filter tab */
  activeTab?: "all" | "critical" | "warning" | "info" | "normal";
  /** Tab change handler */
  onTabChange?: (tab: string) => void;
  /** Item click handler */
  onItemClick?: (item: InventoryAlertItem) => void;
  /** Reorder button click handler */
  onReorder?: (item: InventoryAlertItem) => void;
  /** Loading state */
  loading?: boolean;
  /** Show trend sparklines */
  showTrend?: boolean;
  /** Show expandable transaction details */
  showTransactions?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

type FilterTab = "all" | AlertSeverity;

const severityConfig: Record<
  AlertSeverity,
  { label: string; rowBg: string; badgeClass: string }
> = {
  critical: {
    label: "Critical",
    rowBg: "bg-red-50 dark:bg-red-950/10",
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  },
  warning: {
    label: "Warning",
    rowBg: "bg-yellow-50 dark:bg-yellow-950/10",
    badgeClass:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  },
  info: {
    label: "Info",
    rowBg: "",
    badgeClass:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  },
  normal: {
    label: "Normal",
    rowBg: "",
    badgeClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
};

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" },
  { key: "normal", label: "Normal" },
];

/* -------------------------------------------------------------------------- */
/*  Sparkline                                                                 */
/* -------------------------------------------------------------------------- */

function InlineSparkline({
  data,
  width = 80,
  height = 24,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const yAt = (v: number) => height - ((v - min) / range) * height;
  const points = data.map((v, i) => `${i * stepX},${yAt(v)}`).join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="text-foreground"
      data-testid="sparkline"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Inventory alert list with severity filtering, trend sparklines, expandable
 * transaction details, and reorder actions for warehouse management.
 */
function InventoryAlertList({
  items = [],
  activeTab: controlledTab,
  onTabChange,
  onItemClick,
  onReorder,
  loading = false,
  showTrend = false,
  showTransactions = false,
  className,
}: InventoryAlertListProps) {
  const [internalTab, setInternalTab] = React.useState<FilterTab>("all");
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

  const activeTab = controlledTab ?? internalTab;

  const handleTabChange = (tab: FilterTab) => {
    if (!controlledTab) setInternalTab(tab);
    onTabChange?.(tab);
  };

  const filteredItems = React.useMemo(() => {
    if (activeTab === "all") return items;
    return items.filter((item) => item.severity === activeTab);
  }, [items, activeTab]);

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const item of items) {
      c[item.severity] = (c[item.severity] ?? 0) + 1;
    }
    return c;
  }, [items]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* ---------- loading skeleton ---------- */
  if (loading) {
    return (
      <div
        data-slot="inventory-alert-list"
        className={cn("space-y-3", className)}
      >
        <div className="bg-muted/50 flex gap-1 rounded-lg p-1">
          {filterTabs.map((tab) => (
            <Skeleton key={tab.key} className="h-8 w-20" />
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="inventory-alert-list"
      className={cn("space-y-3", className)}
    >
      {/* Filter tabs */}
      <div
        data-testid="filter-tabs"
        className="bg-muted/50 flex gap-1 rounded-lg p-1"
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabChange(tab.key)}
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
            <span className="text-muted-foreground text-xs">
              ({counts[tab.key] ?? 0})
            </span>
          </button>
        ))}
      </div>

      {/* Table or empty */}
      {filteredItems.length === 0 ? (
        <div data-testid="empty-state">
          <EmptyState />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {showTransactions && <TableHead className="w-8" />}
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Current Qty</TableHead>
              <TableHead className="text-right">Safety Stock</TableHead>
              <TableHead>Status</TableHead>
              {showTrend && <TableHead>Trend</TableHead>}
              <TableHead>Warehouse</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => {
              const cfg = severityConfig[item.severity];
              const isExpanded = expandedIds.has(item.id);
              return (
                <React.Fragment key={item.id}>
                  <TableRow
                    className={cn(cfg.rowBg, onItemClick && "cursor-pointer")}
                    onClick={() => onItemClick?.(item)}
                    data-testid={`row-${item.id}`}
                  >
                    {showTransactions && (
                      <TableCell>
                        {item.recentTransactions &&
                          item.recentTransactions.length > 0 && (
                            <button
                              type="button"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                toggleExpand(item.id);
                              }}
                              data-testid={`expand-${item.id}`}
                            >
                              <ChevronDownIcon
                                className={cn(
                                  "size-4 transition-transform",
                                  isExpanded && "rotate-180",
                                )}
                              />
                            </button>
                          )}
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        {item.code && (
                          <span className="text-muted-foreground text-xs">
                            {item.code}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "font-mono font-semibold",
                          item.severity === "critical" &&
                            "text-red-600 dark:text-red-400",
                          item.severity === "warning" &&
                            "text-amber-600 dark:text-amber-400",
                        )}
                      >
                        {item.currentQty}
                        {item.unit ? ` ${item.unit}` : ""}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-muted-foreground font-mono">
                        {item.safetyStock ?? "\u2014"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        data-testid={`severity-badge-${item.id}`}
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          cfg.badgeClass,
                        )}
                      >
                        {cfg.label}
                      </span>
                    </TableCell>
                    {showTrend && (
                      <TableCell>
                        {item.trend && item.trend.length >= 2 ? (
                          <InlineSparkline data={item.trend} />
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            &mdash;
                          </span>
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {item.warehouse ?? "\u2014"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.severity === "critical" ||
                        item.severity === "warning") && (
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            onReorder?.(item);
                          }}
                        >
                          Reorder
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  {/* Expandable transaction detail */}
                  {showTransactions &&
                    isExpanded &&
                    item.recentTransactions && (
                      <TableRow>
                        <TableCell
                          colSpan={
                            7 + (showTrend ? 1 : 0) + (showTransactions ? 1 : 0)
                          }
                          className="bg-muted/30 p-3"
                        >
                          <div className="ml-8">
                            <p className="text-muted-foreground mb-2 text-xs font-semibold">
                              Recent Transactions
                            </p>
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="text-muted-foreground">
                                  <th className="pb-1 text-left font-medium">
                                    Date
                                  </th>
                                  <th className="pb-1 text-left font-medium">
                                    Type
                                  </th>
                                  <th className="pb-1 text-right font-medium">
                                    Qty
                                  </th>
                                  <th className="pb-1 text-right font-medium">
                                    Ref
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.recentTransactions.map((tx, ti) => (
                                  <tr
                                    key={ti}
                                    className="border-border/50 border-t"
                                  >
                                    <td className="py-1">{tx.date}</td>
                                    <td className="py-1">
                                      <span
                                        className={cn(
                                          "inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium",
                                          tx.type === "in"
                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                                        )}
                                      >
                                        {tx.type === "in" ? "IN" : "OUT"}
                                      </span>
                                    </td>
                                    <td className="py-1 text-right font-mono">
                                      {tx.quantity}
                                    </td>
                                    <td className="text-muted-foreground py-1 text-right">
                                      {tx.reference ?? "\u2014"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export { InventoryAlertList, InlineSparkline };
