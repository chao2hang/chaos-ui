import { useTranslation } from "react-i18next";
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

export interface BudgetPacingCardProps {
  title?: string;
  budget: number;
  spent: number;
  currency?: string;
  status?: BudgetPacingStatus;
  forecast?: number;
  className?: string;
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

export function BudgetPacingCard({
  title,
  budget,
  spent,
  currency = "USD",
  status,
  forecast,
  className,
}: BudgetPacingCardProps) {
  const { t } = useTranslation("chart");
  const resolvedTitle = title ?? t("budgetPacing.card.title");
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
          {t(statusLabel[resolvedStatus])}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-semibold tabular-nums">
              {formatMoney(spent, currency)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t("budgetPacing.spentOf")} {formatMoney(budget, currency)}
            </div>
          </div>
          <div className="text-right text-sm">
            <div className="font-medium tabular-nums">{percent}%</div>
            <div className="text-xs text-muted-foreground">
              {t("budgetPacing.used")}
            </div>
          </div>
        </div>
        <Progress value={percent} />
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border p-3">
            <div className="text-xs text-muted-foreground">
              {t("budgetPacing.remaining")}
            </div>
            <div className="font-medium tabular-nums">
              {formatMoney(remaining, currency)}
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="text-xs text-muted-foreground">
              {t("budgetPacing.forecast")}
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
