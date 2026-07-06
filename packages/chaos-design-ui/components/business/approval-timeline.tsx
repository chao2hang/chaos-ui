"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChevronRightIcon,
} from "lucide-react";

export interface ApprovalStep {
  id: string;
  title: string;
  assignee?: string;
  status: "pending" | "approved" | "rejected" | "current";
  comment?: string;
  timestamp?: string;
}

interface ApprovalTimelineProps extends React.ComponentProps<"ol"> {
  steps: ApprovalStep[];
  className?: string;
}

const statusIcons: Record<ApprovalStep["status"], React.ElementType> = {
  pending: ClockIcon,
  approved: CheckCircleIcon,
  rejected: XCircleIcon,
  current: ChevronRightIcon,
};

const statusStyles: Record<ApprovalStep["status"], string> = {
  pending: "text-muted-foreground",
  approved: "text-success",
  rejected: "text-destructive",
  current: "text-primary",
};

function ApprovalTimeline({
  steps,
  className,
  ...props
}: ApprovalTimelineProps) {
  return (
    <ol
      data-slot="approval-timeline"
      className={cn("space-y-0", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const Icon = statusIcons[step.status];
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                className="bg-border absolute top-8 left-[15px] h-full w-px"
                aria-hidden
              />
            )}
            <span
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2",
                step.status === "approved" && "border-success bg-success/10",
                step.status === "rejected" &&
                  "border-destructive bg-destructive/10",
                step.status === "current" && "border-primary bg-primary/10",
                step.status === "pending" && "border-muted bg-muted/20",
              )}
            >
              <Icon className={cn("size-4", statusStyles[step.status])} />
            </span>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{step.title}</span>
                {step.assignee && (
                  <span className="text-muted-foreground text-xs">
                    · {step.assignee}
                  </span>
                )}
              </div>
              {step.comment && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {step.comment}
                </p>
              )}
              {step.timestamp && (
                <p className="text-muted-foreground mt-0.5 text-[11px]">
                  {step.timestamp}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { ApprovalTimeline };
export type { ApprovalTimelineProps, ApprovalStep };
