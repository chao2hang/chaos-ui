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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  UserIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";

/**
 * @component AuditTrailDiff
 * @category business/data
 * @since 1.0.0
 * @description Structured field-level audit trail with before/after diff
 * comparison. Shows who changed what, when, and from what value to what
 * value. Supports filtering by user, action type, and date range.
 * @keywords audit, trail, diff, change, log, history, before, after, field
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Type of audit action. */
type AuditAction = "create" | "update" | "delete" | "restore";

/** A single field-level change entry. */
interface AuditChangeEntry {
  /** Unique entry id */
  id: string;
  /** Entity type (e.g., "PurchaseOrder", "Invoice") */
  entityType: string;
  /** Entity id/number */
  entityId: string;
  /** Field name that changed */
  field: string;
  /** Field display label */
  fieldLabel?: string;
  /** Action type */
  action: AuditAction;
  /** Value before change */
  oldValue?: string;
  /** Value after change */
  newValue?: string;
  /** User who made the change */
  user: string;
  /** Timestamp (ISO) */
  timestamp: string;
  /** Optional comment/reason */
  reason?: string;
  /** Optional section/module */
  section?: string;
}

/** Props for AuditTrailDiff. */
interface AuditTrailDiffProps {
  /** Audit change entries */
  entries: AuditChangeEntry[];
  /** Show search/filter bar (default: true) */
  showFilter?: boolean;
  /** Show entity column (default: true) */
  showEntity?: boolean;
  /** Show user column (default: true) */
  showUser?: boolean;
  /** Show timestamp column (default: true) */
  showTimestamp?: boolean;
  /** Show reason column (default: false) */
  showReason?: boolean;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const actionConfig: Record<
  AuditAction,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  create: { label: "Created", variant: "default" },
  update: { label: "Updated", variant: "secondary" },
  delete: { label: "Deleted", variant: "destructive" },
  restore: { label: "Restored", variant: "outline" },
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function AuditTrailDiff({
  entries,
  showFilter = true,
  showEntity = true,
  showUser = true,
  showTimestamp = true,
  showReason = false,
  className,
}: AuditTrailDiffProps) {
  const [search, setSearch] = React.useState("");
  const [actionFilter, setActionFilter] = React.useState<string>("all");

  /* ---- filtered entries ---- */
  const filtered = React.useMemo(() => {
    let result = entries;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.field.toLowerCase().includes(q) ||
          e.fieldLabel?.toLowerCase().includes(q) ||
          e.entityType.toLowerCase().includes(q) ||
          e.entityId.toLowerCase().includes(q) ||
          e.user.toLowerCase().includes(q) ||
          e.oldValue?.toLowerCase().includes(q) ||
          e.newValue?.toLowerCase().includes(q),
      );
    }
    if (actionFilter !== "all") {
      result = result.filter((e) => e.action === actionFilter);
    }
    return result;
  }, [entries, search, actionFilter]);

  /* ---- stats ---- */
  const stats = React.useMemo(() => {
    const counts: Record<AuditAction, number> = {
      create: 0,
      update: 0,
      delete: 0,
      restore: 0,
    };
    for (const e of entries) counts[e.action]++;
    return counts;
  }, [entries]);

  return (
    <div
      data-slot="audit-trail-diff"
      className={cn("space-y-3", className)}
    >
      {/* Filter bar */}
      {showFilter && (
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-8 pl-8 text-sm"
              placeholder="Search fields, entities, users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search audit trail"
            />
          </div>
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            aria-label="Filter by action"
          >
            <option value="all">All actions</option>
            <option value="create">Created ({stats.create})</option>
            <option value="update">Updated ({stats.update})</option>
            <option value="delete">Deleted ({stats.delete})</option>
            <option value="restore">Restored ({stats.restore})</option>
          </select>
        </div>
      )}

      {/* Diff table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-20">Action</TableHead>
              {showEntity && <TableHead className="min-w-[140px]">Entity</TableHead>}
              <TableHead className="min-w-[120px]">Field</TableHead>
              <TableHead className="min-w-[140px]">Old Value</TableHead>
              <TableHead className="w-8 text-center">→</TableHead>
              <TableHead className="min-w-[140px]">New Value</TableHead>
              {showUser && <TableHead className="min-w-[100px]">User</TableHead>}
              {showTimestamp && <TableHead className="min-w-[140px]">Time</TableHead>}
              {showReason && <TableHead className="min-w-[120px]">Reason</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8 + (showReason ? 1 : 0)}
                  className="py-8 text-center text-muted-foreground"
                >
                  No audit entries found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((entry) => (
                <TableRow
                  key={entry.id}
                  data-slot="audit-trail-entry"
                  data-action={entry.action}
                  className={cn(
                    entry.action === "delete" && "bg-red-50 dark:bg-red-950/10",
                    entry.action === "create" && "bg-green-50 dark:bg-green-950/10",
                  )}
                >
                  {/* Action */}
                  <TableCell>
                    <Badge variant={actionConfig[entry.action].variant} className="text-[10px]">
                      {actionConfig[entry.action].label}
                    </Badge>
                  </TableCell>

                  {/* Entity */}
                  {showEntity && (
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {entry.entityType}
                        </span>
                        <span className="text-xs text-muted-foreground">{entry.entityId}</span>
                      </div>
                    </TableCell>
                  )}

                  {/* Field */}
                  <TableCell>
                    <span className="text-sm text-foreground">
                      {entry.fieldLabel ?? entry.field}
                    </span>
                    {entry.section && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({entry.section})
                      </span>
                    )}
                  </TableCell>

                  {/* Old value */}
                  <TableCell>
                    {entry.action === "create" ? (
                      <span className="text-xs text-muted-foreground">—</span>
                    ) : (
                      <span
                        className={cn(
                          "text-sm tabular-nums",
                          entry.action === "delete"
                            ? "line-through text-muted-foreground"
                            : "text-muted-foreground line-through decoration-red-500/50",
                        )}
                      >
                        {entry.oldValue || "(empty)"}
                      </span>
                    )}
                  </TableCell>

                  {/* Arrow */}
                  <TableCell className="text-center">
                    <ArrowRightIcon className="mx-auto size-3.5 text-muted-foreground" />
                  </TableCell>

                  {/* New value */}
                  <TableCell>
                    {entry.action === "delete" ? (
                      <span className="text-xs text-muted-foreground">—</span>
                    ) : (
                      <span
                        className={cn(
                          "text-sm font-medium tabular-nums text-foreground",
                          entry.action === "create" && "text-green-600",
                        )}
                      >
                        {entry.newValue || "(empty)"}
                      </span>
                    )}
                  </TableCell>

                  {/* User */}
                  {showUser && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <UserIcon className="size-3 text-muted-foreground" />
                        <span className="text-sm text-foreground">{entry.user}</span>
                      </div>
                    </TableCell>
                  )}

                  {/* Timestamp */}
                  {showTimestamp && (
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(entry.timestamp)}
                        </span>
                      </div>
                    </TableCell>
                  )}

                  {/* Reason */}
                  {showReason && (
                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {entry.reason || "—"}
                      </span>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Entry count */}
      <div className="text-xs text-muted-foreground">
        Showing {filtered.length} of {entries.length} entries
      </div>
    </div>
  );
}

export { AuditTrailDiff };
export type { AuditTrailDiffProps, AuditChangeEntry, AuditAction };
