"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

/**
 * @component ArApAgingTable
 * @category business/finance
 * @since 1.0.0
 * @description Accounts receivable / payable aging analysis table with
 * configurable bucket ranges, color-coded overdue amounts, and summary totals.
 * @keywords ar, ap, aging, receivable, payable, finance, overdue, bucket
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Aging bucket definition. */
interface AgingBucket {
  /** Bucket label, e.g. "0-30" */
  label: string;
  /** Upper bound in days (exclusive). */
  maxDays: number;
}

/** A single receivable / payable entry. */
interface AgingEntry {
  id: string;
  /** Customer or supplier name. */
  partyName: string;
  /** Invoice or document number. */
  docNo: string;
  /** Document date (ISO). */
  docDate: string;
  /** Due date (ISO). */
  dueDate: string;
  /** Total outstanding amount. */
  amount: number;
  /** Currency code. */
  currency?: string;
  /** Additional note. */
  note?: string;
}

/** Props for ArApAgingTable. */
interface ArApAgingTableProps {
  /** Entries to display. */
  entries: AgingEntry[];
  /** Reference date for aging calculation. Defaults to today. */
  asOfDate?: string;
  /** "ar" for receivable, "ap" for payable. */
  type?: "ar" | "ap";
  /** Custom bucket definitions. */
  buckets?: AgingBucket[];
  /** Currency symbol for display. */
  currencySymbol?: string;
  /** Row click handler. */
  onRowClick?: (entry: AgingEntry) => void;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Defaults                                                                  */
/* -------------------------------------------------------------------------- */

const defaultBuckets: AgingBucket[] = [
  { label: "0-30", maxDays: 31 },
  { label: "31-60", maxDays: 61 },
  { label: "61-90", maxDays: 91 },
  { label: "90+", maxDays: Infinity },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function daysBetween(from: string, to: string): number {
  const d1 = new Date(from);
  const d2 = new Date(to);
  return Math.floor((d2.getTime() - d1.getTime()) / 86_400_000);
}

/** Assign each entry to a single bucket index based on overdue days. */
function getBucketIndex(overdueDays: number, buckets: AgingBucket[]): number {
  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i];
    if (bucket && overdueDays < bucket.maxDays) return i;
  }
  return buckets.length - 1;
}

function formatMoney(v: number, symbol: string): string {
  const formatted = v.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

/** Bucket color severity — higher index = more overdue. */
const bucketColors = [
  "text-emerald-600",
  "text-amber-600",
  "text-orange-600",
  "text-destructive",
];

const bucketBg = [
  "bg-emerald-50 dark:bg-emerald-950/30",
  "bg-amber-50 dark:bg-amber-950/30",
  "bg-orange-50 dark:bg-orange-950/30",
  "bg-destructive/10",
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function ArApAgingTable({
  entries = [],
  asOfDate,
  type = "ar",
  buckets = defaultBuckets,
  currencySymbol = "¥",
  onRowClick,
  className,
}: ArApAgingTableProps) {
  const refDate = asOfDate ?? new Date().toISOString().slice(0, 10);

  // Compute overdue days and bucket per entry.
  const enriched = React.useMemo(() => {
    return entries.map((e) => {
      const overdue = Math.max(0, daysBetween(e.dueDate, refDate));
      const idx = getBucketIndex(overdue, buckets);
      return { ...e, overdueDays: overdue, bucketIdx: idx };
    });
  }, [entries, refDate, buckets]);

  // Column totals per bucket.
  const bucketTotals = React.useMemo(() => {
    const totals = new Array(buckets.length).fill(0);
    for (const e of enriched) {
      totals[e.bucketIdx] += e.amount;
    }
    return totals;
  }, [enriched, buckets]);

  const grandTotal = bucketTotals.reduce((s, v) => s + v, 0);

  // Build column headers.
  const headers = buckets.map((b) => b.label);

  return (
    <div
      data-slot="ar-ap-aging-table"
      className={cn(
        "border-border bg-card space-y-4 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground text-lg font-semibold">
            {type === "ar" ? "AR Aging" : "AP Aging"}
          </h3>
          <Badge variant="outline" className="text-xs">
            as of {refDate}
          </Badge>
        </div>
        <div className="text-muted-foreground text-sm">
          Total:{" "}
          <strong
            className={cn(
              "tabular-nums",
              grandTotal > 0 ? "text-foreground" : "",
            )}
          >
            {formatMoney(grandTotal, currencySymbol)}
          </strong>
        </div>
      </div>

      {/* Summary bar */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${buckets.length}, 1fr)` }}
      >
        {buckets.map((b, i) => (
          <div
            key={b.label}
            data-slot="aging-bucket-summary"
            className={cn(
              "border-border rounded-md border p-3",
              bucketBg[i] ?? "bg-muted/30",
            )}
          >
            <div className="text-muted-foreground text-xs">{b.label} days</div>
            <div
              className={cn(
                "text-lg font-bold tabular-nums",
                bucketColors[i] ?? "text-foreground",
              )}
            >
              {formatMoney(bucketTotals[i], currencySymbol)}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="min-w-[120px]">Party</TableHead>
              <TableHead className="min-w-[120px]">Doc No</TableHead>
              <TableHead className="w-28">Doc Date</TableHead>
              <TableHead className="w-28">Due Date</TableHead>
              {headers.map((h) => (
                <TableHead key={h} className="w-28 text-right">
                  {h}
                </TableHead>
              ))}
              <TableHead className="w-28 text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enriched.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5 + buckets.length}
                  className="text-muted-foreground py-8 text-center"
                >
                  No {type === "ar" ? "receivables" : "payables"} found
                </TableCell>
              </TableRow>
            ) : (
              enriched.map((e) => (
                <TableRow
                  key={e.id}
                  data-slot="aging-row"
                  className={cn(
                    onRowClick && "hover:bg-muted/30 cursor-pointer",
                  )}
                  onClick={() => onRowClick?.(e)}
                >
                  <TableCell className="text-foreground font-medium">
                    {e.partyName}
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {e.docNo}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {e.docDate}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {e.dueDate}
                  </TableCell>
                  {buckets.map((_, i) => (
                    <TableCell
                      key={i}
                      className={cn(
                        "text-right text-sm tabular-nums",
                        e.bucketIdx === i
                          ? cn(
                              "font-semibold",
                              bucketColors[i] ?? "text-foreground",
                            )
                          : "text-muted-foreground",
                      )}
                    >
                      {e.bucketIdx === i
                        ? formatMoney(e.amount, currencySymbol)
                        : "—"}
                    </TableCell>
                  ))}
                  <TableCell className="text-foreground text-right text-sm font-bold tabular-nums">
                    {formatMoney(e.amount, currencySymbol)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {enriched.length > 0 && (
            <TableFooter>
              <TableRow className="bg-muted/30 font-semibold">
                <TableCell colSpan={4}>Total</TableCell>
                {bucketTotals.map((v, i) => (
                  <TableCell
                    key={i}
                    className={cn(
                      "text-right tabular-nums",
                      bucketColors[i] ?? "text-foreground",
                    )}
                  >
                    {formatMoney(v, currencySymbol)}
                  </TableCell>
                ))}
                <TableCell className="text-foreground text-right tabular-nums">
                  {formatMoney(grandTotal, currencySymbol)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}

export { ArApAgingTable };
export type { ArApAgingTableProps, AgingEntry, AgingBucket };
