"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component LeadPipelineBoard
 * @category business/crm
 * @since 1.0.0
 * @description CRM lead pipeline board with funnel stages, drag-and-drop
 * between stages, deal value roll-up, and win-probability tracking.
 * @keywords crm, lead, pipeline, funnel, deal, opportunity, sales, kanban
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Pipeline stage definition. */
interface PipelineStage {
  /** Unique stage id. */
  id: string;
  /** Display label. */
  label: string;
  /** Win probability 0–100. */
  probability: number;
  /** Tailwind color name for accent. */
  color?: "blue" | "indigo" | "violet" | "amber" | "emerald" | "rose";
}

/** A single deal / opportunity. */
interface Deal {
  id: string;
  /** Customer / company name. */
  customer: string;
  /** Deal title. */
  title: string;
  /** Estimated deal value. */
  value: number;
  /** Currency symbol. */
  currency?: string;
  /** Stage id this deal belongs to. */
  stageId: string;
  /** Owner / sales rep name. */
  owner?: string;
  /** Expected close date (ISO). */
  expectedClose?: string;
  /** Priority level. */
  priority?: "low" | "medium" | "high";
}

/** Props for LeadPipelineBoard. */
interface LeadPipelineBoardProps {
  /** Stage definitions in funnel order. */
  stages: PipelineStage[];
  /** All deals. */
  deals: Deal[];
  /** Callback when a deal moves to a different stage. */
  onDealMove?: (dealId: string, fromStageId: string, toStageId: string) => void;
  /** Deal click handler. */
  onDealClick?: (deal: Deal) => void;
  /** Currency symbol for display. */
  currencySymbol?: string;
  /** Read-only mode disables drag. */
  readOnly?: boolean;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const stageColorMap: Record<
  string,
  { bar: string; badge: string; header: string }
> = {
  blue: {
    bar: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    header: "text-blue-600",
  },
  indigo: {
    bar: "bg-indigo-500",
    badge:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    header: "text-indigo-600",
  },
  violet: {
    bar: "bg-violet-500",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    header: "text-violet-600",
  },
  amber: {
    bar: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    header: "text-amber-600",
  },
  emerald: {
    bar: "bg-emerald-500",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    header: "text-emerald-600",
  },
  rose: {
    bar: "bg-rose-500",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    header: "text-rose-600",
  },
};

const priorityColors: Record<string, string> = {
  high: "border-l-rose-500",
  medium: "border-l-amber-500",
  low: "border-l-emerald-500",
};

function formatMoney(v: number, symbol: string): string {
  return `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function LeadPipelineBoard({
  stages = [],
  deals = [],
  onDealMove,
  onDealClick,
  currencySymbol = "¥",
  readOnly = false,
  className,
}: LeadPipelineBoardProps) {
  const [draggedDeal, setDraggedDeal] = React.useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = React.useState<string | null>(null);

  // Group deals by stage.
  const dealsByStage = React.useMemo(() => {
    const map = new Map<string, Deal[]>();
    for (const s of stages) map.set(s.id, []);
    for (const d of deals) {
      const arr = map.get(d.stageId);
      if (arr) arr.push(d);
    }
    return map;
  }, [stages, deals]);

  // Total pipeline value.
  const totalValue = deals.reduce((s, d) => s + d.value, 0);
  const weightedTotal = deals.reduce((s, d) => {
    const stage = stages.find((st) => st.id === d.stageId);
    return s + (d.value * (stage?.probability ?? 0)) / 100;
  }, 0);

  const handleDragStart = (dealId: string) => {
    if (readOnly) return;
    setDraggedDeal(dealId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    if (readOnly) return;
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDrop = (e: React.DragEvent, toStageId: string) => {
    e.preventDefault();
    if (readOnly || !draggedDeal) return;
    const deal = deals.find((d) => d.id === draggedDeal);
    if (deal && deal.stageId !== toStageId) {
      onDealMove?.(deal.id, deal.stageId, toStageId);
    }
    setDraggedDeal(null);
    setDragOverStage(null);
  };

  return (
    <div
      data-slot="lead-pipeline-board"
      className={cn(
        "border-border bg-card space-y-4 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header / summary */}
      <div className="border-border flex items-center justify-between border-b pb-3">
        <h3 className="text-foreground text-lg font-semibold">Pipeline</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-muted-foreground">
            Deals: <strong className="text-foreground">{deals.length}</strong>
          </div>
          <div className="text-muted-foreground">
            Total:{" "}
            <strong className="text-foreground tabular-nums">
              {formatMoney(totalValue, currencySymbol)}
            </strong>
          </div>
          <div className="text-muted-foreground">
            Weighted:{" "}
            <strong className="text-foreground tabular-nums">
              {formatMoney(weightedTotal, currencySymbol)}
            </strong>
          </div>
        </div>
      </div>

      {/* Funnel stages */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${stages.length}, minmax(200px, 1fr))`,
        }}
      >
        {stages.map((stage) => {
          const stageDeals = dealsByStage.get(stage.id) ?? [];
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
          const colors =
            stageColorMap[stage.color ?? "blue"] ?? stageColorMap.blue!;
          const isDragOver = dragOverStage === stage.id;

          return (
            <div
              key={stage.id}
              data-slot="pipeline-column"
              data-stage-id={stage.id}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDrop={(e) => handleDrop(e, stage.id)}
              onDragLeave={() => setDragOverStage(null)}
              className={cn(
                "border-border bg-muted/20 flex flex-col rounded-lg border",
                isDragOver && "ring-primary ring-2 ring-offset-1",
              )}
            >
              {/* Column header */}
              <div
                className={cn("border-border rounded-t-lg border-b px-3 py-2")}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm font-semibold", colors.header)}>
                    {stage.label}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-xs font-medium",
                      colors.badge,
                    )}
                  >
                    {stage.probability}%
                  </span>
                </div>
                <div className="text-muted-foreground mt-1 flex items-center justify-between text-xs">
                  <span>{stageDeals.length} deals</span>
                  <span className="tabular-nums">
                    {formatMoney(stageValue, currencySymbol)}
                  </span>
                </div>
                <div className="bg-muted mt-1.5 h-1 overflow-hidden rounded-full">
                  <div
                    className={cn("h-full transition-all", colors.bar)}
                    style={{ width: `${stage.probability}%` }}
                  />
                </div>
              </div>

              {/* Deal cards */}
              <div
                className="flex-1 space-y-2 overflow-y-auto p-2"
                style={{ maxHeight: "400px" }}
              >
                {stageDeals.length === 0 ? (
                  <div className="text-muted-foreground py-4 text-center text-xs">
                    No deals
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      data-slot="deal-card"
                      data-deal-id={deal.id}
                      draggable={!readOnly}
                      onDragStart={() => handleDragStart(deal.id)}
                      onClick={() => onDealClick?.(deal)}
                      className={cn(
                        "border-border bg-card cursor-pointer rounded-md border border-l-4 p-2.5 shadow-sm transition-shadow hover:shadow-md",
                        priorityColors[deal.priority ?? "low"],
                        draggedDeal === deal.id && "opacity-50",
                      )}
                    >
                      <div className="text-foreground text-sm font-medium">
                        {deal.title}
                      </div>
                      <div className="text-muted-foreground mt-0.5 text-xs">
                        {deal.customer}
                      </div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-foreground text-sm font-bold tabular-nums">
                          {formatMoney(
                            deal.value,
                            deal.currency ? "" : currencySymbol,
                          )}
                        </span>
                        {deal.owner && (
                          <span className="text-muted-foreground text-xs">
                            {deal.owner}
                          </span>
                        )}
                      </div>
                      {deal.expectedClose && (
                        <div className="text-muted-foreground mt-1 text-xs">
                          Close: {deal.expectedClose}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { LeadPipelineBoard };
export type { LeadPipelineBoardProps, PipelineStage, Deal };
