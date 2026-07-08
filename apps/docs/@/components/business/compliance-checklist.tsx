"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component ComplianceChecklist
 * @category business/compliance
 * @since 1.0.0
 * @description Compliance checklist with categorized requirements,
 * evidence attachments, due dates, and compliance score tracking.
 * @keywords compliance, checklist, audit, regulation, requirement, evidence
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Compliance item status. */
type ComplianceItemStatus = "compliant" | "non_compliant" | "in_progress" | "not_applicable" | "pending";

/** A single compliance requirement. */
interface ComplianceItem {
  id: string;
  /** Requirement code / number. */
  code: string;
  /** Requirement description. */
  description: string;
  /** Category. */
  category: string;
  /** Status. */
  status: ComplianceItemStatus;
  /** Due date (ISO). */
  dueDate?: string;
  /** Responsible person. */
  owner?: string;
  /** Evidence / document reference. */
  evidence?: string;
  /** Risk level. */
  risk?: "low" | "medium" | "high";
  /** Notes. */
  notes?: string;
}

/** Props for ComplianceChecklist. */
interface ComplianceChecklistProps {
  /** Compliance items. */
  items: ComplianceItem[];
  /** Checklist title. */
  title?: string;
  /** Item click handler. */
  onItemClick?: (item: ComplianceItem) => void;
  /** Status change handler. */
  onStatusChange?: (id: string, status: ComplianceItemStatus) => void;
  /** Read-only mode. */
  readOnly?: boolean;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const statusConfig: Record<ComplianceItemStatus, { label: string; className: string; icon: string }> = {
  compliant: { label: "Compliant", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", icon: "✓" },
  non_compliant: { label: "Non-Compliant", className: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300", icon: "✕" },
  in_progress: { label: "In Progress", className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", icon: "◐" },
  not_applicable: { label: "N/A", className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400", icon: "—" },
  pending: { label: "Pending", className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300", icon: "○" },
};

const riskConfig: Record<string, { label: string; className: string }> = {
  low: { label: "Low", className: "text-emerald-600" },
  medium: { label: "Medium", className: "text-amber-600" },
  high: { label: "High", className: "text-destructive" },
};

const statusOrder: ComplianceItemStatus[] = ["compliant", "in_progress", "pending", "non_compliant", "not_applicable"];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function ComplianceChecklist({
  items,
  title = "Compliance Checklist",
  onItemClick,
  onStatusChange,
  readOnly = false,
  className,
}: ComplianceChecklistProps) {
  // Group by category
  const categories = React.useMemo(() => {
    const map = new Map<string, ComplianceItem[]>();
    for (const item of items) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    return Array.from(map.entries());
  }, [items]);

  // Compliance score
  const score = React.useMemo(() => {
    const applicable = items.filter((i) => i.status !== "not_applicable");
    if (applicable.length === 0) return 0;
    const compliant = items.filter((i) => i.status === "compliant").length;
    return (compliant / applicable.length) * 100;
  }, [items]);

  const statusCounts = React.useMemo(() => {
    const counts: Record<ComplianceItemStatus, number> = {
      compliant: 0,
      non_compliant: 0,
      in_progress: 0,
      not_applicable: 0,
      pending: 0,
    };
    for (const item of items) counts[item.status]++;
    return counts;
  }, [items]);

  const scoreColor = score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-600" : "text-destructive";

  return (
    <div
      data-slot="compliance-checklist"
      className={cn("space-y-4 rounded-lg border border-border bg-card p-5", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Compliance Score</div>
            <div className={cn("text-2xl font-bold tabular-nums", scoreColor)}>{score.toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {/* Status summary */}
      <div className="flex flex-wrap items-center gap-2" data-slot="compliance-summary">
        {statusOrder.map((status) => {
          const cfg = statusConfig[status];
          return (
            <div key={status} className="flex items-center gap-1.5">
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", cfg.className)}>
                {cfg.icon} {cfg.label}: {statusCounts[status]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div className="space-y-4" data-slot="compliance-categories">
        {categories.map(([category, catItems]) => {
          const catCompliant = catItems.filter((i) => i.status === "compliant").length;
          const catApplicable = catItems.filter((i) => i.status !== "not_applicable").length;
          const catScore = catApplicable > 0 ? (catCompliant / catApplicable) * 100 : 0;

          return (
            <div key={category} data-slot="compliance-category">
              {/* Category header */}
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">{category}</h4>
                <span className="text-xs text-muted-foreground">
                  {catCompliant}/{catApplicable} compliant
                  {" · "}
                  <span className={cn("font-medium", catScore >= 80 ? "text-emerald-600" : catScore >= 60 ? "text-amber-600" : "text-destructive")}>
                    {catScore.toFixed(0)}%
                  </span>
                </span>
              </div>

              {/* Items */}
              <div className="space-y-1">
                {catItems.map((item) => {
                  const cfg = statusConfig[item.status];
                  const riskCfg = item.risk ? riskConfig[item.risk] : null;
                  return (
                    <div
                      key={item.id}
                      data-slot="compliance-item"
                      data-item-id={item.id}
                      data-item-status={item.status}
                      onClick={() => onItemClick?.(item)}
                      className={cn(
                        "flex items-start gap-2 rounded-md border border-border bg-muted/20 px-3 py-2",
                        onItemClick && "cursor-pointer hover:bg-muted/40",
                      )}
                    >
                      {/* Status icon */}
                      <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold", cfg.className)}>
                        {cfg.icon}
                      </span>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{item.code}</span>
                          {riskCfg && (
                            <span className={cn("text-[10px] font-medium", riskCfg.className)}>
                              {riskCfg.label} risk
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-foreground">{item.description}</div>

                        {/* Meta info */}
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          {item.owner && <span>👤 {item.owner}</span>}
                          {item.dueDate && <span>📅 {item.dueDate}</span>}
                          {item.evidence && <span>📎 {item.evidence}</span>}
                        </div>

                        {item.notes && (
                          <div className="mt-0.5 text-xs italic text-muted-foreground">{item.notes}</div>
                        )}
                      </div>

                      {/* Status selector */}
                      {!readOnly && onStatusChange ? (
                        <select
                          className="h-7 rounded border border-border bg-background px-1.5 text-xs"
                          value={item.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            onStatusChange(item.id, e.target.value as ComplianceItemStatus);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Status selector"
                        >
                          {statusOrder.map((s) => (
                            <option key={s} value={s}>{statusConfig[s].label}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", cfg.className)}>
                          {cfg.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          No compliance items
        </div>
      )}
    </div>
  );
}

export { ComplianceChecklist };
export type { ComplianceChecklistProps, ComplianceItem, ComplianceItemStatus };
