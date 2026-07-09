"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

/**
 * @component SealStampRegistry
 * @category business/admin
 * @since 1.0.0
 * @description Corporate seal / stamp registry with custodian tracking,
 * usage approval flow, and audit log for each stamp impression.
 * @keywords seal, stamp, registry, 印章, corporate, admin, approval, audit
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Seal type. */
type SealType =
  "official" | "financial" | "contract" | "hr" | "invoice" | "personal";

/** Seal status. */
type SealStatus = "active" | "custody" | "stored" | "lost" | "revoked";

/** A registered seal/stamp. */
interface SealRecord {
  id: string;
  /** Seal name / designation. */
  name: string;
  /** Seal type. */
  type: SealType;
  /** Registration number. */
  regNo: string;
  /** Current custodian. */
  custodian: string;
  /** Department. */
  department?: string;
  /** Issue date. */
  issueDate: string;
  /** Status. */
  status: SealStatus;
  /** Last usage date. */
  lastUsed?: string;
  /** Usage count. */
  usageCount: number;
  /** Seal image URL (optional). */
  imageUrl?: string;
}

/** Usage log entry. */
interface SealUsageLog {
  id: string;
  sealId: string;
  /** Applicant name. */
  applicant: string;
  /** Document name. */
  document: string;
  /** Usage date. */
  date: string;
  /** Approver. */
  approver: string;
  /** Status. */
  status: "pending" | "approved" | "rejected" | "completed";
}

/** Props for SealStampRegistry. */
interface SealStampRegistryProps {
  /** Registered seals. */
  seals: SealRecord[];
  /** Usage log entries. */
  usageLogs?: SealUsageLog[];
  /** Seal click handler. */
  onSealClick?: (seal: SealRecord) => void;
  /** Apply for usage handler. */
  onApplyUsage?: () => void;
  /** Read-only mode. */
  readOnly?: boolean;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const typeLabels: Record<SealType, string> = {
  official: "Official Seal",
  financial: "Financial Seal",
  contract: "Contract Seal",
  hr: "HR Seal",
  invoice: "Invoice Seal",
  personal: "Personal Seal",
};

const typeColors: Record<SealType, string> = {
  official: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  financial:
    "bg-emerald-200 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  contract: "bg-blue-200 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
  hr: "bg-violet-200 text-violet-700 dark:bg-violet-950 dark:text-violet-200",
  invoice: "bg-amber-200 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
  personal: "bg-rose-200 text-rose-700 dark:bg-rose-950 dark:text-rose-200",
};

const statusLabels: Record<SealStatus, string> = {
  active: "Active",
  custody: "In Custody",
  stored: "Stored",
  lost: "Lost",
  revoked: "Revoked",
};

const statusColors: Record<SealStatus, string> = {
  active: "text-emerald-600",
  custody: "text-blue-600",
  stored: "text-muted-foreground",
  lost: "text-destructive",
  revoked: "text-destructive",
};

const logStatusConfig: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  approved: {
    label: "Approved",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function SealStampRegistry({
  seals = [],
  usageLogs = [],
  onSealClick,
  onApplyUsage,
  readOnly = false,
  className,
}: SealStampRegistryProps) {
  const activeCount = seals.filter((s) => s.status === "active").length;
  const custodyCount = seals.filter((s) => s.status === "custody").length;

  return (
    <div
      data-slot="seal-stamp-registry"
      className={cn(
        "border-border bg-card space-y-5 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="text-foreground text-lg font-semibold">
            Seal &amp; Stamp Registry
          </h3>
          <p className="text-muted-foreground text-sm">
            {seals.length} registered · {activeCount} active · {custodyCount} in
            custody
          </p>
        </div>
        {!readOnly && onApplyUsage && (
          <Button size="sm" onClick={onApplyUsage}>
            Apply for Usage
          </Button>
        )}
      </div>

      {/* Seals grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {seals.map((seal) => (
          <div
            key={seal.id}
            data-slot="seal-card"
            data-seal-id={seal.id}
            onClick={() => onSealClick?.(seal)}
            className={cn(
              "border-border bg-muted/20 rounded-lg border p-4",
              onSealClick && "hover:bg-muted/40 cursor-pointer",
            )}
          >
            {/* Seal image / placeholder */}
            <div className="mb-2 flex items-center justify-center">
              {seal.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={seal.imageUrl}
                  alt={seal.name}
                  className="border-border size-16 rounded-full border-2 object-cover"
                />
              ) : (
                <div className="border-border bg-card flex size-16 items-center justify-center rounded-full border-2 border-dashed text-2xl">
                  🔏
                </div>
              )}
            </div>

            {/* Name & type */}
            <div className="text-center">
              <div className="text-foreground font-medium">{seal.name}</div>
              <div className="text-muted-foreground font-mono text-xs">
                {seal.regNo}
              </div>
            </div>

            {/* Type badge */}
            <div className="mt-2 flex justify-center">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  typeColors[seal.type],
                )}
              >
                {typeLabels[seal.type]}
              </span>
            </div>

            {/* Details */}
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Custodian:</span>
                <span className="text-foreground font-medium">
                  {seal.custodian}
                </span>
              </div>
              {seal.department && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Dept:</span>
                  <span className="text-foreground">{seal.department}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Used:</span>
                <span className="text-foreground">{seal.usageCount} times</span>
              </div>
              {seal.lastUsed && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last:</span>
                  <span className="text-foreground">{seal.lastUsed}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={cn("font-medium", statusColors[seal.status])}>
                  {statusLabels[seal.status]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage log table */}
      {usageLogs.length > 0 && (
        <div data-slot="seal-usage-log">
          <h4 className="text-foreground mb-2 text-sm font-semibold">
            Recent Usage Log
          </h4>
          <div className="border-border overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="min-w-[100px]">Applicant</TableHead>
                  <TableHead className="min-w-[150px]">Document</TableHead>
                  <TableHead className="w-28">Date</TableHead>
                  <TableHead className="w-28">Approver</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageLogs.map((log) => {
                  const cfg =
                    logStatusConfig[log.status] ?? logStatusConfig.pending!;
                  return (
                    <TableRow key={log.id} data-slot="usage-log-row">
                      <TableCell className="text-foreground font-medium">
                        {log.applicant}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {log.document}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {log.date}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {log.approver}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            cfg!.className,
                          )}
                        >
                          {cfg!.label}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export { SealStampRegistry };
export type {
  SealStampRegistryProps,
  SealRecord,
  SealUsageLog,
  SealType,
  SealStatus,
};
