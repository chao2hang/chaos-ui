"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Progress } from "@/components/ui";
import { cn } from "@/lib/utils";

export type BudgetPacingStatus = "under" | "on-track" | "over" | "exhausted";

export interface BudgetPacingTexts {
  title?: string;
  under?: string;
  onTrack?: string;
  over?: string;
  exhausted?: string;
  spentOf?: string;
  used?: string;
  remaining?: string;
  forecast?: string;
}

export interface BudgetPacingCardProps {
  title?: string;
  budget: number;
  spent: number;
  currency?: string;
  status?: BudgetPacingStatus;
  forecast?: number;
  className?: string;
  /** i18n escape hatch — overrides translation keys / 国际化逃逸口 */
  texts?: BudgetPacingTexts;
}

const defaultTexts: Record<string, string> = {
  "budgetPacing.card.title": "Budget Pacing",
  "budgetPacing.status.under": "Under Budget",
  "budgetPacing.status.onTrack": "On Track",
  "budgetPacing.status.over": "Over Budget",
  "budgetPacing.status.exhausted": "Exhausted",
  "budgetPacing.spentOf": "spent of",
  "budgetPacing.used": "used",
  "budgetPacing.remaining": "Remaining",
  "budgetPacing.forecast": "Forecast",
};

function t(key: string, texts?: BudgetPacingTexts): string {
  if (texts) {
    const map: Record<string, string | undefined> = {
      "budgetPacing.card.title": texts.title,
      "budgetPacing.status.under": texts.under,
      "budgetPacing.status.onTrack": texts.onTrack,
      "budgetPacing.status.over": texts.over,
      "budgetPacing.status.exhausted": texts.exhausted,
      "budgetPacing.spentOf": texts.spentOf,
      "budgetPacing.used": texts.used,
      "budgetPacing.remaining": texts.remaining,
      "budgetPacing.forecast": texts.forecast,
    };
    const override = map[key];
    if (override !== undefined) return override;
  }
  return defaultTexts[key] ?? key;
}

const statusLabel: Record<BudgetPacingStatus, string> = {
  under: "budgetPacing.status.under",
  "on-track": "budgetPacing.status.onTrack",
  over: "budgetPacing.status.over",
  exhausted: "budgetPacing.status.exhausted",
};

const statusClassName: Record<BudgetPacingStatus, string> = {
  under: "text-info",
  "on-track": "text-success",
  over: "text-warning",
  exhausted: "text-destructive",
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * @component BudgetPacingCard
 * @category business/finance
 * @since 0.2.0
 * @description Card displaying budget vs. actual spend with pacing status, progress bar, and forecast / 展示预算消耗进度、状态和预估的卡片组件
 * @keywords budget, pacing, finance, spending, forecast, progress
 * @example
 * <BudgetPacingCard budget={10000} spent={4500} status="on-track" />
 */
export function BudgetPacingCard({
  title,
  budget,
  spent,
  currency = "USD",
  status,
  forecast,
  className,
  texts,
}: BudgetPacingCardProps) {
  const resolvedTitle = title ?? t("budgetPacing.card.title", texts);
  const percent =
    budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0;
  const remaining = Math.max(budget - spent, 0);
  const resolvedStatus =
    status ??
    (spent >= budget
      ? "exhausted"
      : percent > 85
        ? "over"
        : percent < 45
          ? "under"
          : "on-track");

  return (
    <Card data-slot="budget-pacing-card" className={className}>
      <CardHeader>
        <CardTitle>{resolvedTitle}</CardTitle>
        <CardDescription
          className={cn("font-medium", statusClassName[resolvedStatus])}
        >
          {t(statusLabel[resolvedStatus], texts)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold tabular-nums">
              {formatMoney(spent, currency)}
            </div>
            <div className="text-muted-foreground text-xs">
              {t("budgetPacing.spentOf", texts)} {formatMoney(budget, currency)}
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="font-medium tabular-nums">{percent}%</div>
            <div className="text-muted-foreground text-xs">
              {t("budgetPacing.used", texts)}
            </div>
          </div>
        </div>
        <Progress value={percent} />
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border p-3">
            <div className="text-muted-foreground text-xs">
              {t("budgetPacing.remaining", texts)}
            </div>
            <div className="font-medium tabular-nums">
              {formatMoney(remaining, currency)}
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-muted-foreground text-xs">
              {t("budgetPacing.forecast", texts)}
            </div>
            <div className="font-medium tabular-nums">
              {formatMoney(forecast ?? spent, currency)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
