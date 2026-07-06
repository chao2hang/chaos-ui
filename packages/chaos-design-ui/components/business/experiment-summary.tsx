"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

interface ExperimentSummaryProps extends React.ComponentProps<typeof Card> {
  name: string;
  controlRate: number;
  variantRate: number;
  metric?: string;
  confidence?: number;
  status?: "running" | "completed" | "stopped";
}

function ExperimentSummary({
  name,
  controlRate,
  variantRate,
  metric = "转化率",
  confidence = 95,
  status = "running",
  className,
  ...props
}: ExperimentSummaryProps) {
  const lift =
    controlRate > 0 ? ((variantRate - controlRate) / controlRate) * 100 : 0;
  const isSignificant = confidence >= 95;
  const liftLabel = lift >= 0 ? `+${lift.toFixed(1)}%` : `${lift.toFixed(1)}%`;

  return (
    <Card data-slot="experiment-summary" className={className} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          <Badge
            variant={status === "running" ? "default" : "secondary"}
            className="text-xs"
          >
            {status === "running"
              ? "运行中"
              : status === "completed"
                ? "已完成"
                : "已停止"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-muted-foreground text-xs">对照组 ({metric})</p>
            <p className="mt-1 text-xl font-bold">
              {(controlRate * 100).toFixed(1)}%
            </p>
          </div>
          <div className="bg-primary/5 rounded-lg p-3 text-center">
            <p className="text-muted-foreground text-xs">实验组 ({metric})</p>
            <p className="mt-1 text-xl font-bold">
              {(variantRate * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            {lift > 0 ? (
              <TrendingUpIcon className="text-success size-4" />
            ) : lift < 0 ? (
              <TrendingDownIcon className="text-destructive size-4" />
            ) : (
              <MinusIcon className="text-muted-foreground size-4" />
            )}
            <span
              className={cn(
                lift > 0
                  ? "text-success"
                  : lift < 0
                    ? "text-destructive"
                    : "text-muted-foreground",
              )}
            >
              提升 {liftLabel}
            </span>
          </span>
          <span
            className={cn(
              "text-xs",
              isSignificant ? "text-success" : "text-muted-foreground",
            )}
          >
            置信度 {confidence}% {isSignificant ? "✓ 显著" : ""}
          </span>
        </div>
        <Progress value={confidence} className="h-1.5" />
      </CardContent>
    </Card>
  );
}

export { ExperimentSummary };
export type { ExperimentSummaryProps };
