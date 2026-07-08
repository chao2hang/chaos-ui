"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BillStatusStep {
  label: string;
  status: "completed" | "current" | "pending" | "rejected";
  description?: string;
}

interface BillStatusBarProps {
  steps: BillStatusStep[];
  /** Horizontal (inline) or vertical */
  direction?: "horizontal" | "vertical";
  className?: string;
}

const stepDotClasses: Record<string, string> = {
  completed: "bg-green-500 border-green-500",
  current: "bg-blue-500 border-blue-500",
  pending: "bg-transparent border-gray-300 dark:border-gray-600",
  rejected: "bg-red-500 border-red-500",
};

const stepTextClasses: Record<string, string> = {
  completed: "text-green-700 dark:text-green-400",
  current: "text-blue-700 dark:text-blue-400 font-semibold",
  pending: "text-muted-foreground",
  rejected: "text-red-700 dark:text-red-400",
};

/**
 * 单据状态进度条 —— 纵向/横向展示审批流转节点。
 * 对标 qxy-mop 审批场景。
 *
 * @component BillStatusBar
 * @category business/status
 * @since 0.2.0
 */
function BillStatusBar({
  steps,
  direction = "horizontal",
  className,
}: BillStatusBarProps) {
  if (direction === "vertical") {
    return (
      <div
        data-slot="bill-status-bar"
        className={cn("flex flex-col", className)}
      >
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "size-3 rounded-full border-2",
                  stepDotClasses[step.status],
                )}
              />
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "my-1 w-0.5 flex-1",
                    step.status === "completed"
                      ? "bg-green-500"
                      : "bg-gray-200 dark:bg-gray-700",
                  )}
                />
              )}
            </div>
            <div className="pb-6">
              <p
                className={cn(
                  "text-sm leading-none",
                  stepTextClasses[step.status],
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      data-slot="bill-status-bar"
      className={cn("flex items-center", className)}
    >
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-3 shrink-0 rounded-full border-2",
                stepDotClasses[step.status],
              )}
            />
            <div className="min-w-0">
              <p
                className={cn("truncate text-sm", stepTextClasses[step.status])}
              >
                {step.label}
              </p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "mx-2 h-0.5 w-12 shrink-0",
                step.status === "completed"
                  ? "bg-green-500"
                  : "bg-gray-200 dark:bg-gray-700",
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export { BillStatusBar };
export type { BillStatusBarProps, BillStatusStep };
