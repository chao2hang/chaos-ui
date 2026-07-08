"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva("", {
  variants: {
    status: {
      draft: "bg-muted text-muted-foreground hover:bg-muted",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      approved:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      paid: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
  },
});

interface BillStatusBarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  currentStatus: "draft" | "pending" | "approved" | "rejected" | "paid";
  className?: string;
}

const steps: { key: BillStatusBarProps["currentStatus"]; label: string }[] = [
  { key: "draft", label: "草稿" },
  { key: "pending", label: "待审批" },
  { key: "approved", label: "已审批" },
  { key: "paid", label: "已支付" },
];

function BillStatusBar({
  currentStatus,
  className,
  ...props
}: BillStatusBarProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStatus);
  const showRejected = currentStatus === "rejected";

  return (
    <div
      data-slot="bill-status-bar"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {steps.map((step, i) => {
        const isCompleted = i <= currentIndex && !showRejected;
        const isCurrent = i === currentIndex && !showRejected;
        return (
          <React.Fragment key={step.key}>
            <Badge
              variant={
                isCurrent ? "default" : isCompleted ? "secondary" : "outline"
              }
              className={cn("text-xs", isCurrent && "shadow-sm")}
            >
              {step.label}
            </Badge>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-px w-4",
                  isCompleted ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </React.Fragment>
        );
      })}
      {showRejected && (
        <>
          <span className="bg-border h-px w-4" />
          <Badge variant="destructive" className="text-xs">
            已驳回
          </Badge>
        </>
      )}
    </div>
  );
}

export { BillStatusBar };
export type { BillStatusBarProps };
