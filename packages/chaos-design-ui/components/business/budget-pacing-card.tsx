"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUpIcon, AlertTriangleIcon } from "lucide-react";

interface BudgetPacingCardProps extends React.ComponentProps<typeof Card> {
  budget: number;
  spent: number;
  period?: string;
  label?: string;
  currency?: string;
}

function BudgetPacingCard({
  budget,
  spent,
  period = "本月",
  label = "预算消耗",
  currency = "¥",
  className,
  ...props
}: BudgetPacingCardProps) {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  const remaining = budget - spent;
  const isOverBudget = spent > budget;

  return (
    <Card
      data-slot="budget-pacing-card"
      className={cn("", className)}
      {...props}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {label} · {period}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {currency}
            {spent.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-sm">
            / {currency}
            {budget.toLocaleString()}
          </span>
        </div>
        <Progress
          value={Math.min(percentage, 100)}
          className={cn("h-2", isOverBudget && "[&>div]:bg-destructive")}
        />
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>{percentage.toFixed(1)}% 已使用</span>
          <span className={cn(isOverBudget && "text-destructive font-medium")}>
            {isOverBudget ? (
              <>
                <AlertTriangleIcon className="mr-0.5 inline size-3" />
                超预算 {currency}
                {Math.abs(remaining).toLocaleString()}
              </>
            ) : (
              <>
                剩余 {currency}
                {remaining.toLocaleString()}
              </>
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export { BudgetPacingCard };
export type { BudgetPacingCardProps };
