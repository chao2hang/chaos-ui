"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @component TerritoryMap
 * @category business/sales
 * @since 1.0.0
 * @description Sales territory map with regional performance visualization,
 * rep assignment, and coverage heatmap. Uses CSS-grid based map layout.
 * @keywords territory, map, sales, region, coverage, heatmap, rep, assignment
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Territory region definition. */
interface TerritoryRegion {
  id: string;
  /** Region name. */
  name: string;
  /** Assigned sales rep. */
  rep?: string;
  /** Sales amount. */
  sales: number;
  /** Target amount. */
  target: number;
  /** Number of customers. */
  customerCount: number;
  /** Region position on grid (row, col). */
  gridArea?: { row: number; col: number; rowSpan?: number; colSpan?: number };
  /** Region color override. */
  color?: string;
}

/** Props for TerritoryMap. */
interface TerritoryMapProps {
  /** Territory regions. */
  regions: TerritoryRegion[];
  /** Map title. */
  title?: string;
  /** Currency symbol. */
  currencySymbol?: string;
  /** Grid columns for layout. */
  gridCols?: number;
  /** Region click handler. */
  onRegionClick?: (region: TerritoryRegion) => void;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** Achievement percentage = sales / target * 100. */
function achievementPct(sales: number, target: number): number {
  if (target === 0) return 0;
  return (sales / target) * 100;
}

/** Heat color based on achievement. */
function heatColor(achievement: number): string {
  if (achievement >= 100) return "bg-emerald-500/80 dark:bg-emerald-600/80";
  if (achievement >= 80) return "bg-blue-500/70 dark:bg-blue-600/70";
  if (achievement >= 60) return "bg-amber-500/60 dark:bg-amber-600/60";
  if (achievement >= 40) return "bg-orange-500/50 dark:bg-orange-600/50";
  return "bg-rose-500/40 dark:bg-rose-600/40";
}

function heatTextColor(achievement: number): string {
  if (achievement >= 60) return "text-white";
  return "text-foreground";
}

function formatMoney(v: number, symbol: string): string {
  if (v >= 1_000_000) return `${symbol}${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${symbol}${(v / 1_000).toFixed(0)}K`;
  return `${symbol}${v}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function TerritoryMap({
  regions = [],
  title = "Sales Territory Map",
  currencySymbol = "¥",
  gridCols = 4,
  onRegionClick,
  className,
}: TerritoryMapProps) {
  const totalSales = regions.reduce((s, r) => s + r.sales, 0);
  const totalTarget = regions.reduce((s, r) => s + r.target, 0);
  const overallAchievement =
    totalTarget > 0 ? achievementPct(totalSales, totalTarget) : 0;
  const totalCustomers = regions.reduce((s, r) => s + r.customerCount, 0);

  return (
    <div
      data-slot="territory-map"
      className={cn(
        "border-border bg-card space-y-4 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b pb-3">
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            Sales:{" "}
            <strong className="text-foreground tabular-nums">
              {formatMoney(totalSales, currencySymbol)}
            </strong>
          </span>
          <span className="text-muted-foreground">
            Target:{" "}
            <strong className="text-foreground tabular-nums">
              {formatMoney(totalTarget, currencySymbol)}
            </strong>
          </span>
          <Badge
            variant={overallAchievement >= 100 ? "default" : "destructive"}
            className="text-xs"
          >
            {overallAchievement.toFixed(1)}%
          </Badge>
        </div>
      </div>

      {/* Map grid */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        data-slot="territory-grid"
      >
        {regions.map((region) => {
          const achievement = achievementPct(region.sales, region.target);
          const isUnassigned = !region.rep;
          return (
            <div
              key={region.id}
              data-slot="territory-region"
              data-region-id={region.id}
              onClick={() => onRegionClick?.(region)}
              style={
                region.gridArea
                  ? {
                      gridColumnStart: region.gridArea.col + 1,
                      gridRowStart: region.gridArea.row + 1,
                      gridColumnEnd: region.gridArea.colSpan
                        ? `span ${region.gridArea.colSpan}`
                        : undefined,
                      gridRowEnd: region.gridArea.rowSpan
                        ? `span ${region.gridArea.rowSpan}`
                        : undefined,
                    }
                  : undefined
              }
              className={cn(
                "border-border relative overflow-hidden rounded-lg border p-3 transition-shadow",
                onRegionClick && "cursor-pointer hover:shadow-md",
                isUnassigned && "border-dashed",
              )}
            >
              {/* Heat background */}
              <div
                className={cn("absolute inset-0", heatColor(achievement))}
                data-slot="territory-heat"
              />

              {/* Content */}
              <div className={cn("relative z-10", heatTextColor(achievement))}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{region.name}</span>
                  <span className="text-xs font-medium opacity-80">
                    {achievement.toFixed(0)}%
                  </span>
                </div>

                <div className="mt-1 text-lg font-bold tabular-nums">
                  {formatMoney(region.sales, currencySymbol)}
                </div>
                <div className="text-xs opacity-80">
                  Target: {formatMoney(region.target, currencySymbol)}
                </div>

                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span className="opacity-80">
                    {region.customerCount} customers
                  </span>
                  {region.rep ? (
                    <span className="font-medium">{region.rep}</span>
                  ) : (
                    <span className="italic opacity-60">Unassigned</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div
        className="border-border flex flex-wrap items-center gap-3 border-t pt-3"
        data-slot="territory-legend"
      >
        <span className="text-muted-foreground text-xs font-medium">
          Coverage:
        </span>
        {[
          { label: "≥100%", color: "bg-emerald-500" },
          { label: "80–99%", color: "bg-blue-500" },
          { label: "60–79%", color: "bg-amber-500" },
          { label: "40–59%", color: "bg-orange-500" },
          { label: "<40%", color: "bg-rose-500" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <span className={cn("size-3 rounded", l.color)} />
            <span className="text-muted-foreground text-xs">{l.label}</span>
          </div>
        ))}
        <span className="text-muted-foreground ml-auto text-xs">
          {totalCustomers} total customers · {regions.length} regions
        </span>
      </div>
    </div>
  );
}

export { TerritoryMap };
export type { TerritoryMapProps, TerritoryRegion };
