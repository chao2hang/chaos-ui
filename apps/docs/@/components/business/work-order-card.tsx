"use client";

import { cn } from "@/lib/utils";

/**
 * @component WorkOrderCard
 * @category business/manufacturing
 * @since 1.0.0
 * @description Work order status card with progress tracking, operation
 * checklist, resource assignment, and real-time status indicators.
 * @keywords work order, mes, manufacturing, production, progress, status, operation
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Work order status. */
type WorkOrderStatus = "planned" | "released" | "in_progress" | "on_hold" | "completed" | "cancelled";

/** Operation step in the routing. */
interface WorkOrderOperation {
  id: string;
  /** Sequence number. */
  seq: number;
  /** Operation name. */
  name: string;
  /** Work center. */
  workCenter: string;
  /** Planned quantity. */
  plannedQty: number;
  /** Completed quantity. */
  completedQty: number;
  /** Setup time in minutes. */
  setupTime?: number;
  /** Run time per unit in minutes. */
  runTimePerUnit?: number;
  /** Operator assigned. */
  operator?: string;
  /** Status of this operation. */
  status: "pending" | "running" | "done" | "skipped";
}

/** Props for WorkOrderCard. */
interface WorkOrderCardProps {
  /** Work order number. */
  orderNo: string;
  /** Product being manufactured. */
  product: string;
  /** Product code. */
  productCode?: string;
  /** Work order status. */
  status: WorkOrderStatus;
  /** Planned start date. */
  plannedStart: string;
  /** Planned end date. */
  plannedEnd: string;
  /** Total planned quantity. */
  plannedQty: number;
  /** Completed quantity. */
  completedQty: number;
  /** Unit. */
  unit?: string;
  /** Priority. */
  priority?: "low" | "medium" | "high" | "urgent";
  /** Assigned work center. */
  workCenter?: string;
  /** Operations / routing steps. */
  operations?: WorkOrderOperation[];
  /** Responsible person. */
  supervisor?: string;
  /** Click handler for the card. */
  onClick?: () => void;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const statusConfig: Record<WorkOrderStatus, { label: string; className: string; dot: string }> = {
  planned: { label: "Planned", className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", dot: "bg-slate-400" },
  released: { label: "Released", className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300", dot: "bg-blue-500" },
  in_progress: { label: "In Progress", className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", dot: "bg-amber-500 animate-pulse" },
  on_hold: { label: "On Hold", className: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300", dot: "bg-orange-500" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", dot: "bg-emerald-500" },
  cancelled: { label: "Cancelled", className: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300", dot: "bg-rose-500" },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-slate-100 text-slate-600" },
  medium: { label: "Medium", className: "bg-blue-100 text-blue-600" },
  high: { label: "High", className: "bg-amber-100 text-amber-700" },
  urgent: { label: "Urgent", className: "bg-rose-100 text-rose-700" },
};

const opStatusIcons: Record<string, string> = {
  pending: "○",
  running: "◐",
  done: "●",
  skipped: "✕",
};

const opStatusColors: Record<string, string> = {
  pending: "text-muted-foreground",
  running: "text-amber-500",
  done: "text-emerald-500",
  skipped: "text-rose-500",
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function WorkOrderCard({
  orderNo,
  product,
  productCode,
  status,
  plannedStart,
  plannedEnd,
  plannedQty,
  completedQty,
  unit = "pcs",
  priority = "medium",
  workCenter,
  operations = [],
  supervisor,
  onClick,
  className,
}: WorkOrderCardProps) {
  const statusInfo = statusConfig[status];
  const priorityInfo = priorityConfig[priority]!;
  const progressPct = plannedQty > 0 ? Math.min(100, (completedQty / plannedQty) * 100) : 0;
  const remainingQty = Math.max(0, plannedQty - completedQty);
  const isOverdue = status !== "completed" && status !== "cancelled" && plannedEnd < new Date().toISOString().slice(0, 10);

  // Operation progress
  const completedOps = operations.filter((o) => o.status === "done").length;
  const currentOp = operations.find((o) => o.status === "running");

  return (
    <div
      data-slot="work-order-card"
      data-order-no={orderNo}
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow",
        onClick && "cursor-pointer hover:shadow-md",
        isOverdue && "border-l-4 border-l-rose-500",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className={cn("size-2.5 rounded-full", statusInfo.dot)} />
            <span className="font-mono text-sm font-bold text-foreground">{orderNo}</span>
          </div>
          <div className="mt-1 text-base font-semibold text-foreground">{product}</div>
          {productCode && (
            <div className="font-mono text-xs text-muted-foreground">{productCode}</div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", statusInfo.className)}>
            {statusInfo.label}
          </span>
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", priorityInfo.className)}>
            {priorityInfo.label}
          </span>
          {isOverdue && (
            <span className="text-xs font-medium text-rose-600">Overdue</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3" data-slot="wo-progress">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium tabular-nums text-foreground">
            {completedQty.toLocaleString()} / {plannedQty.toLocaleString()} {unit}
          </span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              progressPct >= 100 ? "bg-emerald-500" : progressPct >= 50 ? "bg-blue-500" : "bg-amber-500",
            )}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-0.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>{progressPct.toFixed(1)}% complete</span>
          {remainingQty > 0 && status !== "completed" && (
            <span>{remainingQty.toLocaleString()} {unit} remaining</span>
          )}
        </div>
      </div>

      {/* Info grid */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-md border border-border bg-muted/20 px-2.5 py-1.5">
          <span className="text-muted-foreground">Planned Start</span>
          <div className="font-medium text-foreground">{plannedStart}</div>
        </div>
        <div className="rounded-md border border-border bg-muted/20 px-2.5 py-1.5">
          <span className="text-muted-foreground">Planned End</span>
          <div className={cn("font-medium", isOverdue ? "text-rose-600" : "text-foreground")}>{plannedEnd}</div>
        </div>
        {workCenter && (
          <div className="rounded-md border border-border bg-muted/20 px-2.5 py-1.5">
            <span className="text-muted-foreground">Work Center</span>
            <div className="font-medium text-foreground">{workCenter}</div>
          </div>
        )}
        {supervisor && (
          <div className="rounded-md border border-border bg-muted/20 px-2.5 py-1.5">
            <span className="text-muted-foreground">Supervisor</span>
            <div className="font-medium text-foreground">{supervisor}</div>
          </div>
        )}
      </div>

      {/* Operations checklist */}
      {operations.length > 0 && (
        <div className="mt-3" data-slot="wo-operations">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Operations ({completedOps}/{operations.length})
            </span>
            {currentOp && (
              <span className="text-xs text-amber-600">
                Running: {currentOp.name}
              </span>
            )}
          </div>
          <div className="space-y-1">
            {operations.map((op) => (
              <div
                key={op.id}
                data-slot="wo-operation"
                data-op-status={op.status}
                className="flex items-center gap-2 rounded-md border border-border bg-muted/10 px-2.5 py-1.5"
              >
                <span className={cn("text-sm", opStatusColors[op.status])}>
                  {opStatusIcons[op.status]}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {String(op.seq).padStart(2, "0")}
                </span>
                <span className="flex-1 text-xs font-medium text-foreground">{op.name}</span>
                <span className="text-xs text-muted-foreground">{op.workCenter}</span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {op.completedQty}/{op.plannedQty}
                </span>
                {op.operator && (
                  <span className="text-xs text-muted-foreground">{op.operator}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { WorkOrderCard };
export type { WorkOrderCardProps, WorkOrderOperation, WorkOrderStatus };
