"use client";
import * as React from "react";
import {
  CircleIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  MessageCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/format";

export interface ApprovalStep {
  id: string;
  name: string;
  approver: { name: string; avatar?: string };
  status: "pending" | "approved" | "rejected" | "skipped";
  timestamp?: number | string | Date;
  comment?: string;
}

interface ApprovalFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: ApprovalStep[];
  currentStep?: number;
  onApprove?: (stepId: string) => void;
  onReject?: (stepId: string) => void;
  className?: string;
}

const STATUS_ICONS = {
  pending: ClockIcon,
  approved: CheckCircle2Icon,
  rejected: XCircleIcon,
  skipped: CircleIcon,
} as const;

const STATUS_STYLES = {
  pending: "text-warning",
  approved: "text-success",
  rejected: "text-destructive",
  skipped: "text-muted-foreground",
} as const;

export function ApprovalFlow({
  steps,
  currentStep,
  onApprove,
  onReject,
  className,
  ...props
}: ApprovalFlowProps) {
  return (
    <div
      data-slot="approval-flow"
      className={cn("space-y-3", className)}
      {...props}
    >
      {steps.map((step, i) => {
        const Icon = STATUS_ICONS[step.status];
        const isCurrent = i === currentStep;
        return (
          <div
            key={step.id}
            className={cn(
              "flex items-start gap-3 rounded-md border p-3",
              isCurrent && "border-primary/50 bg-primary/5",
              step.status === "approved" && "border-success/30",
              step.status === "rejected" && "border-destructive/30",
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 size-5 shrink-0",
                STATUS_STYLES[step.status],
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{step.name}</span>
                <span className="text-muted-foreground text-xs">
                  {step.approver.name}
                </span>
                {step.timestamp && (
                  <span className="text-muted-foreground text-xs">
                    · {formatRelativeTime(step.timestamp)}
                  </span>
                )}
              </div>
              {step.comment && (
                <div className="bg-muted/30 text-muted-foreground mt-1 flex items-start gap-1.5 rounded px-2 py-1.5 text-xs">
                  <MessageCircleIcon className="mt-0.5 size-3 shrink-0" />
                  <span>{step.comment}</span>
                </div>
              )}
            </div>
            {isCurrent && (onApprove || onReject) && (
              <div className="flex gap-1">
                {onReject && (
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onReject(step.id)}
                  >
                    拒绝
                  </Button>
                )}
                {onApprove && (
                  <Button size="xs" onClick={() => onApprove(step.id)}>
                    同意
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
