"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "@/components/ui/icons";

/**
 * @component SupplierScorecard
 * @category business/procurement
 * @since 1.0.0
 * @description Supplier evaluation scorecard with weighted criteria scoring,
 * radar-style category breakdown, trend indicators, and overall rating.
 * Used in SRM (Supplier Relationship Management) for periodic assessment.
 * @keywords supplier, scorecard, evaluation, rating, procurement, srm, vendor
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** A scoring criterion. */
interface ScorecardCriterion {
  /** Criterion id */
  id: string;
  /** Criterion name (e.g., "Quality", "Delivery", "Price") */
  name: string;
  /** Score (0-100) */
  score: number;
  /** Weight percentage (0-100, should sum to 100 across criteria) */
  weight: number;
  /** Optional trend: up/down/stable */
  trend?: "up" | "down" | "stable";
  /** Optional comment */
  comment?: string;
}

/** A supplier for the scorecard. */
interface Supplier {
  /** Supplier id */
  id: string;
  /** Supplier name */
  name: string;
  /** Supplier code */
  code?: string;
  /** Category of goods/services */
  category?: string;
  /** Scoring criteria */
  criteria: ScorecardCriterion[];
  /** Assessment period (e.g., "2026 Q2") */
  period?: string;
  /** Previous overall score for comparison */
  previousScore?: number;
}

/** Rating tier based on overall score. */
type RatingTier = "A" | "B" | "C" | "D";

/** Props for SupplierScorecard. */
interface SupplierScorecardProps {
  /** Supplier data */
  supplier: Supplier;
  /** Show weighted total (default: true) */
  showWeightedTotal?: boolean;
  /** Show trend indicators (default: true) */
  showTrends?: boolean;
  /** Show bar visualization (default: true) */
  showBars?: boolean;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function calcWeightedScore(criteria: ScorecardCriterion[]): number {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  if (totalWeight === 0) return 0;
  const weighted = criteria.reduce(
    (sum, c) => sum + c.score * (c.weight / totalWeight),
    0,
  );
  return Math.round(weighted * 10) / 10;
}

function getRatingTier(score: number): { tier: RatingTier; label: string; color: string } {
  if (score >= 90) return { tier: "A", label: "Excellent", color: "text-green-600" };
  if (score >= 75) return { tier: "B", label: "Good", color: "text-blue-600" };
  if (score >= 60) return { tier: "C", label: "Fair", color: "text-yellow-600" };
  return { tier: "D", label: "Poor", color: "text-red-600" };
}

function getScoreColor(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 75) return "bg-blue-500";
  if (score >= 60) return "bg-yellow-500";
  return "bg-red-500";
}

function getTrendIcon(trend?: "up" | "down" | "stable"): React.ReactNode {
  if (trend === "up") return <span className="text-green-600">▲</span>;
  if (trend === "down") return <span className="text-red-600">▼</span>;
  if (trend === "stable") return <span className="text-muted-foreground">—</span>;
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function SupplierScorecard({
  supplier,
  showWeightedTotal = true,
  showTrends = true,
  showBars = true,
  className,
}: SupplierScorecardProps) {
  const overallScore = calcWeightedScore(supplier.criteria);
  const rating = getRatingTier(overallScore);
  const scoreDiff = supplier.previousScore != null
    ? overallScore - supplier.previousScore
    : null;

  return (
    <div
      data-slot="supplier-scorecard"
      className={cn("rounded-lg border border-border bg-card p-5", className)}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{supplier.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {supplier.code && <span>Code: {supplier.code}</span>}
            {supplier.category && (
              <>
                <span>•</span>
                <span>{supplier.category}</span>
              </>
            )}
            {supplier.period && (
              <>
                <span>•</span>
                <span>{supplier.period}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span
              className={cn("text-3xl font-bold tabular-nums", rating.color)}
              data-slot="supplier-overall-score"
            >
              {overallScore.toFixed(1)}
            </span>
            <span className={cn("text-lg font-bold", rating.color)}>
              ({rating.tier})
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {rating.label}
          </Badge>
          {scoreDiff != null && (
            <span
              className={cn(
                "text-xs",
                scoreDiff > 0 ? "text-green-600" : scoreDiff < 0 ? "text-red-600" : "text-muted-foreground",
              )}
            >
              {scoreDiff > 0 ? "+" : ""}{scoreDiff.toFixed(1)} vs prev
            </span>
          )}
        </div>
      </div>

      {/* Criteria breakdown */}
      <div className="space-y-3">
        {supplier.criteria.map((criterion) => (
          <div key={criterion.id} data-slot="supplier-criterion">
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{criterion.name}</span>
                <span className="text-xs text-muted-foreground">
                  (weight: {criterion.weight}%)
                </span>
                {showTrends && getTrendIcon(criterion.trend)}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        "size-3.5",
                        i < Math.round(criterion.score / 20)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>
                <span className="w-12 text-right font-medium tabular-nums text-foreground">
                  {criterion.score}
                </span>
              </div>
            </div>
            {showBars && (
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full transition-all", getScoreColor(criterion.score))}
                  style={{ width: `${criterion.score}%` }}
                />
              </div>
            )}
            {criterion.comment && (
              <p className="mt-1 text-xs text-muted-foreground">{criterion.comment}</p>
            )}
          </div>
        ))}
      </div>

      {/* Weighted total */}
      {showWeightedTotal && (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-medium text-foreground">Weighted Total Score</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tabular-nums text-primary">
              {overallScore.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { SupplierScorecard };
export type {
  SupplierScorecardProps,
  Supplier,
  ScorecardCriterion,
  RatingTier,
};
