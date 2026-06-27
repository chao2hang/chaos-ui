"use client";

import * as React from "react";
import { Check, X, Clock } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * @component BillStatusBar
 * @category business/status
 * @since 0.2.0
 * @description 单据状态进度条(展示审批节点流程) / Bill status progress bar showing approval workflow
 * @keywords bill, status, progress, approval, stepper, timeline
 * @example
 * <BillStatusBar
 *   steps={[
 *     { title: 'Submit', status: 'done' },
 *     { title: 'Review', status: 'current' },
 *     { title: 'Approve', status: 'pending' },
 *   ]}
 * />
 */

type StepStatus = "done" | "current" | "pending" | "rejected";

interface BillStatusStep {
  /** Step title / 步骤标题 */
  title: React.ReactNode;
  /** Step description / 步骤描述 */
  description?: React.ReactNode;
  /** Step status / 步骤状态 */
  status: StepStatus;
  /** Step timestamp / 时间戳 */
  time?: string;
  /** Operator / 操作人 */
  operator?: string;
}

interface BillStatusBarProps extends React.ComponentProps<"div"> {
  /** Status steps / 状态步骤 */
  steps: BillStatusStep[];
  /** Layout direction / 布局方向 */
  direction?: "horizontal" | "vertical";
  /** Whether to show connector line / 是否显示连接线 */
  showConnector?: boolean;
}

const stepIconConfig: Record<
  StepStatus,
  { bg: string; text: string; icon?: React.ElementType }
> = {
  done: {
    bg: "bg-green-500",
    text: "text-white",
    icon: Check,
  },
  current: {
    bg: "bg-blue-500",
    text: "text-white",
    icon: Clock,
  },
  pending: {
    bg: "bg-muted",
    text: "text-muted-foreground",
  },
  rejected: {
    bg: "bg-red-500",
    text: "text-white",
    icon: X,
  },
};

function BillStatusBar({
  className,
  steps,
  direction = "horizontal",
  showConnector = true,
  ...props
}: BillStatusBarProps) {
  const isVertical = direction === "vertical";

  return (
    <div
      data-slot="bill-status-bar"
      className={cn(
        "flex",
        isVertical ? "flex-col gap-0" : "flex-row items-start gap-0",
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const config = stepIconConfig[step.status];
        const Icon = config.icon;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <div
              className={cn(
                "flex",
                isVertical
                  ? "flex-row gap-3 pb-6"
                  : "flex-1 flex-col items-center",
              )}
            >
              {/* Icon + connector for horizontal */}
              <div
                className={cn(
                  "flex items-center",
                  isVertical ? "flex-col" : "w-full",
                )}
              >
                {isVertical && (
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full",
                        config.bg,
                        config.text,
                      )}
                    >
                      {Icon ? <Icon className="size-4" /> : index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {step.title}
                      </div>
                      {step.description && (
                        <div className="text-xs text-muted-foreground">
                          {step.description}
                        </div>
                      )}
                      {(step.operator || step.time) && (
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {step.operator}
                          {step.operator && step.time && " · "}
                          {step.time}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!isVertical && (
                  <div className="flex w-full items-center">
                    {showConnector && index > 0 && (
                      <div
                        className={cn(
                          "h-0.5 flex-1",
                          step.status === "done"
                            ? "bg-green-500"
                            : "bg-border",
                        )}
                      />
                    )}
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full",
                        config.bg,
                        config.text,
                      )}
                    >
                      {Icon ? <Icon className="size-4" /> : index + 1}
                    </div>
                    {showConnector && !isLast && (
                      <div
                        className={cn(
                          "h-0.5 flex-1",
                          step.status === "done"
                            ? "bg-green-500"
                            : step.status === "rejected"
                              ? "bg-red-500"
                              : "bg-border",
                        )}
                      />
                    )}
                  </div>
                )}

                {!isVertical && (
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-foreground">
                      {step.title}
                    </div>
                    {step.description && (
                      <div className="text-xs text-muted-foreground">
                        {step.description}
                      </div>
                    )}
                    {(step.operator || step.time) && (
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {step.operator}
                        {step.operator && step.time && " · "}
                        {step.time}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Vertical connector */}
              {isVertical && showConnector && !isLast && (
                <div
                  className={cn(
                    "ml-4 w-0.5 self-stretch",
                    step.status === "done" ? "bg-green-500" : "bg-border",
                  )}
                  style={{ minHeight: "1.5rem" }}
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export { BillStatusBar };
export type { BillStatusBarProps, BillStatusStep, StepStatus };
