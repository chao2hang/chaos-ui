"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { PlusIcon, Trash2Icon } from "@/components/ui/icons";

/**
 * @component CommissionCalculator
 * @category business/sales
 * @since 1.0.0
 * @description Sales commission calculator with tiered rates, quota-based
 * multipliers, team override splits, and per-deal commission breakdown.
 * @keywords commission, sales,提成, quota, tier, rate, override, split
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Commission tier. */
interface CommissionTier {
  /** Lower bound (inclusive). */
  from: number;
  /** Upper bound (exclusive), Infinity for last tier. */
  to: number;
  /** Commission rate percentage. */
  rate: number;
}

/** A single deal for commission calculation. */
interface CommissionDeal {
  id: string;
  /** Sales rep name. */
  rep: string;
  /** Deal / order number. */
  dealNo: string;
  /** Customer name. */
  customer: string;
  /** Deal amount. */
  amount: number;
  /** Deal date. */
  date: string;
  /** Override percentage for manager split (0–100). */
  overridePct?: number;
}

/** Props for CommissionCalculator. */
interface CommissionCalculatorProps {
  /** Commission tier structure. */
  tiers: CommissionTier[];
  /** Sales deals. */
  deals: CommissionDeal[];
  /** Quota for multiplier. If met, bonus rate applies. */
  quota?: number;
  /** Bonus rate when quota is met. */
  quotaBonusRate?: number;
  /** Currency symbol. */
  currencySymbol?: string;
  /** On deals change. */
  onDealsChange?: (deals: CommissionDeal[]) => void;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function genId() {
  return `cd-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Calculate commission for a single amount based on tiers. */
function calcCommission(amount: number, tiers: CommissionTier[]): number {
  let commission = 0;
  let remaining = amount;
  for (const tier of tiers) {
    if (remaining <= 0) break;
    const tierRange = tier.to - tier.from;
    const taxable = Math.min(remaining, tierRange);
    if (taxable > 0) {
      commission += taxable * (tier.rate / 100);
      remaining -= taxable;
    }
  }
  return commission;
}

/** Aggregate sales by rep. */
function aggregateByRep(
  deals: CommissionDeal[],
  tiers: CommissionTier[],
  quota?: number,
  quotaBonusRate?: number,
): Map<string, { totalAmount: number; totalCommission: number; dealCount: number; quotaMet: boolean; bonus: number }> {
  const map = new Map<string, { deals: CommissionDeal[]; totalAmount: number }>();

  for (const d of deals) {
    if (!map.has(d.rep)) map.set(d.rep, { deals: [], totalAmount: 0 });
    const entry = map.get(d.rep)!;
    entry.deals.push(d);
    entry.totalAmount += d.amount;
  }

  const result = new Map<string, { totalAmount: number; totalCommission: number; dealCount: number; quotaMet: boolean; bonus: number }>();
  for (const [rep, entry] of map) {
    let totalCommission = 0;
    for (const d of entry.deals) {
      const base = calcCommission(d.amount, tiers);
      const override = (base * (d.overridePct ?? 0)) / 100;
      totalCommission += base - override;
    }
    const quotaMet = quota != null && entry.totalAmount >= quota;
    const bonus = quotaMet && quotaBonusRate ? (entry.totalAmount * quotaBonusRate) / 100 : 0;
    result.set(rep, {
      totalAmount: entry.totalAmount,
      totalCommission,
      dealCount: entry.deals.length,
      quotaMet,
      bonus,
    });
  }
  return result;
}

function formatMoney(v: number, symbol: string): string {
  return `${symbol}${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function CommissionCalculator({
  tiers = [],
  deals = [],
  quota,
  quotaBonusRate = 0,
  currencySymbol = "¥",
  onDealsChange,
  className,
}: CommissionCalculatorProps) {
  const handleAddDeal = () => {
    onDealsChange?.([
      ...deals,
      { id: genId(), rep: "", dealNo: "", customer: "", amount: 0, date: new Date().toISOString().slice(0, 10) },
    ]);
  };

  const handleRemoveDeal = (id: string) => {
    onDealsChange?.(deals.filter((d) => d.id !== id));
  };

  const handleDealChange = (id: string, field: keyof CommissionDeal, value: string | number) => {
    onDealsChange?.(
      deals.map((d) => {
        if (d.id !== id) return d;
        if (field === "amount" || field === "overridePct") {
          return { ...d, [field]: typeof value === "string" ? parseFloat(value) || 0 : value };
        }
        return { ...d, [field]: value as string };
      }),
    );
  };

  // Aggregated data
  const repData = React.useMemo(
    () => aggregateByRep(deals, tiers, quota, quotaBonusRate),
    [deals, tiers, quota, quotaBonusRate],
  );

  const grandTotalAmount = deals.reduce((s, d) => s + d.amount, 0);
  const grandTotalCommission = Array.from(repData.values()).reduce((s, r) => s + r.totalCommission + r.bonus, 0);

  return (
    <div
      data-slot="commission-calculator"
      className={cn("space-y-4 rounded-lg border border-border bg-card p-5", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-lg font-semibold text-foreground">Commission Calculator</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            Total Sales: <strong className="text-foreground tabular-nums">{formatMoney(grandTotalAmount, currencySymbol)}</strong>
          </span>
          <span className="text-muted-foreground">
            Total Commission: <strong className="text-primary tabular-nums">{formatMoney(grandTotalCommission, currencySymbol)}</strong>
          </span>
        </div>
      </div>

      {/* Tier structure display */}
      <div className="flex flex-wrap items-center gap-2" data-slot="commission-tiers">
        <span className="text-xs font-medium text-muted-foreground">Tiers:</span>
        {tiers.map((t, i) => (
          <Badge key={i} variant="outline" className="text-xs">
            {t.to === Infinity
              ? `${currencySymbol}${t.from.toLocaleString()}+`
              : `${currencySymbol}${t.from.toLocaleString()}–${currencySymbol}${t.to.toLocaleString()}`}
            {" → "}
            {t.rate}%
          </Badge>
        ))}
        {quota != null && (
          <Badge variant="outline" className="text-xs text-emerald-600">
            Quota: {currencySymbol}{quota.toLocaleString()} → +{quotaBonusRate}% bonus
          </Badge>
        )}
      </div>

      {/* Summary by rep */}
      {repData.size > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" data-slot="rep-summary">
          {Array.from(repData.entries()).map(([rep, data]) => (
            <div
              key={rep}
              data-slot="rep-card"
              className={cn(
                "rounded-lg border p-3",
                data.quotaMet ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-border bg-muted/20",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{rep}</span>
                {data.quotaMet && <Badge className="text-[10px] bg-emerald-100 text-emerald-700">Quota Met</Badge>}
              </div>
              <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                <div>Sales: <span className="font-medium tabular-nums text-foreground">{formatMoney(data.totalAmount, currencySymbol)}</span></div>
                <div>Deals: <span className="font-medium text-foreground">{data.dealCount}</span></div>
                <div>Commission: <span className="font-medium tabular-nums text-foreground">{formatMoney(data.totalCommission, currencySymbol)}</span></div>
                {data.bonus > 0 && (
                  <div>Bonus: <span className="font-medium tabular-nums text-emerald-600">{formatMoney(data.bonus, currencySymbol)}</span></div>
                )}
                <div className="border-t border-border pt-0.5">
                  Total: <span className="font-bold tabular-nums text-primary">{formatMoney(data.totalCommission + data.bonus, currencySymbol)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deals table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="min-w-[100px]">Rep</TableHead>
              <TableHead className="min-w-[120px]">Deal No</TableHead>
              <TableHead className="min-w-[120px]">Customer</TableHead>
              <TableHead className="w-28 text-right">Amount</TableHead>
              <TableHead className="w-28">Date</TableHead>
              <TableHead className="w-20 text-right">Override%</TableHead>
              <TableHead className="w-28 text-right">Commission</TableHead>
              {onDealsChange && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={onDealsChange ? 8 : 7} className="py-6 text-center text-muted-foreground">
                  No deals
                </TableCell>
              </TableRow>
            ) : (
              deals.map((deal) => {
                const baseCommission = calcCommission(deal.amount, tiers);
                const overrideAmount = (baseCommission * (deal.overridePct ?? 0)) / 100;
                const netCommission = baseCommission - overrideAmount;
                return (
                  <TableRow key={deal.id} data-slot="commission-deal">
                    <TableCell>
                      {onDealsChange ? (
                        <Input className="h-8 text-sm" value={deal.rep} onChange={(e) => handleDealChange(deal.id, "rep", e.target.value)} aria-label="Rep name" />
                      ) : (
                        <span className="text-sm font-medium text-foreground">{deal.rep}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {onDealsChange ? (
                        <Input className="h-8 font-mono text-sm" value={deal.dealNo} onChange={(e) => handleDealChange(deal.id, "dealNo", e.target.value)} aria-label="Deal number" />
                      ) : (
                        <span className="font-mono text-xs text-muted-foreground">{deal.dealNo}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {onDealsChange ? (
                        <Input className="h-8 text-sm" value={deal.customer} onChange={(e) => handleDealChange(deal.id, "customer", e.target.value)} aria-label="Customer" />
                      ) : (
                        <span className="text-sm text-muted-foreground">{deal.customer}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {onDealsChange ? (
                        <Input type="number" className="h-8 text-right tabular-nums" value={deal.amount} onChange={(e) => handleDealChange(deal.id, "amount", e.target.value)} aria-label="Amount" min={0} />
                      ) : (
                        <span className="text-sm tabular-nums text-foreground">{formatMoney(deal.amount, currencySymbol)}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {onDealsChange ? (
                        <Input type="date" className="h-8 text-sm" value={deal.date} onChange={(e) => handleDealChange(deal.id, "date", e.target.value)} aria-label="Date" />
                      ) : (
                        <span className="text-sm text-muted-foreground">{deal.date}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {onDealsChange ? (
                        <Input type="number" className="h-8 text-right tabular-nums" value={deal.overridePct ?? 0} onChange={(e) => handleDealChange(deal.id, "overridePct", e.target.value)} aria-label="Override percent" min={0} max={100} />
                      ) : (
                        <span className="text-sm tabular-nums text-muted-foreground">{deal.overridePct ?? 0}%</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold tabular-nums text-primary">
                      {formatMoney(netCommission, currencySymbol)}
                    </TableCell>
                    {onDealsChange && (
                      <TableCell>
                        <Button variant="ghost" size="icon-sm" onClick={() => handleRemoveDeal(deal.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove deal">
                          <Trash2Icon className="size-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
          {deals.length > 0 && (
            <TableFooter>
              <TableRow className="bg-muted/30 font-semibold">
                <TableCell colSpan={3}>Grand Total</TableCell>
                <TableCell className="text-right tabular-nums text-foreground">{formatMoney(grandTotalAmount, currencySymbol)}</TableCell>
                <TableCell />
                <TableCell />
                <TableCell className="text-right tabular-nums text-primary">{formatMoney(grandTotalCommission, currencySymbol)}</TableCell>
                {onDealsChange && <TableCell />}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Add deal button */}
      {onDealsChange && (
        <div className="flex justify-start">
          <Button variant="outline" size="sm" onClick={handleAddDeal}>
            <PlusIcon className="mr-1 size-4" />
            Add Deal
          </Button>
        </div>
      )}
    </div>
  );
}

export { CommissionCalculator };
export type { CommissionCalculatorProps, CommissionTier, CommissionDeal };
