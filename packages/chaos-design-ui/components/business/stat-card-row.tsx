"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ElementType;
  format?: "number" | "currency" | "percentage";
}

interface StatCardRowProps extends React.ComponentProps<"div"> {
  cards: StatCard[];
  className?: string;
}

function formatValue(value: string | number, format?: string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  if (format === "currency") return `¥${num.toLocaleString()}`;
  if (format === "percentage") return `${num}%`;
  return num.toLocaleString();
}

function StatCardRow({ cards, className, ...props }: StatCardRowProps) {
  return (
    <div
      data-slot="stat-card-row"
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = (card.change ?? 0) >= 0;
        const ChangeIcon = isPositive
          ? TrendingUpIcon
          : card.change !== undefined
            ? TrendingDownIcon
            : MinusIcon;
        return (
          <Card key={card.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  {card.title}
                </span>
                {Icon && <Icon className="text-muted-foreground size-4" />}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {formatValue(card.value, card.format)}
                </span>
                {card.change !== undefined && (
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-xs",
                      isPositive ? "text-success" : "text-destructive",
                    )}
                  >
                    <ChangeIcon className="size-3" />
                    {isPositive ? "+" : ""}
                    {card.change}%
                  </span>
                )}
              </div>
              {card.changeLabel && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {card.changeLabel}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export { StatCardRow };
export type { StatCardRowProps, StatCard };
