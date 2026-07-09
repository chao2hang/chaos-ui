"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import {
  CheckIcon,
  Loader2Icon,
  XIcon,
  ClockIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component FlowTracker
 * @category business/bill
 * @since 0.7.0
 * @description 流程跟踪器 — 以垂直时间线展示审批/流程节点及其状态、操作人与时间。
 * @keywords flow, tracker
 * @param steps 流程节点列表，每项含 id/name/status/operator/time
 * @param className 根节点额外类名
 * @example
 * <FlowTracker steps={[{ id:"1", name:"提交", status:"done", operator:"张三", time:"2026-01-01 09:00" }]} />
 */
interface FlowTrackerProps {
  steps: Array<{
    id: string;
    name: string;
    status: "pending" | "active" | "done" | "rejected";
    operator?: string;
    time?: string;
  }>;
  className?: string;
}

function StatusDot({ status }: { status: FlowTrackerProps["steps"][number]["status"] }) {
  switch (status) {
    case "done":
      return (
        <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckIcon className="size-3.5" />
        </span>
      );
    case "active":
      return (
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Loader2Icon className="size-3.5 animate-spin" />
        </span>
      );
    case "rejected":
      return (
        <span className="flex size-6 items-center justify-center rounded-full bg-destructive text-white">
          <XIcon className="size-3.5" />
        </span>
      );
    default:
      return (
        <span className="flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
          <ClockIcon className="size-3.5" />
        </span>
      );
  }
}

function FlowTracker({ steps, className }: FlowTrackerProps) {
  return (
    <ol
      data-slot="flow-tracker"
      className={cn("flex flex-col gap-0", className)}
      role="list"
    >
      {steps.map((step, idx) => {
        const last = idx === steps.length - 1;
        const rejected = step.status === "rejected";
        return (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <StatusDot status={step.status} />
              {!last ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "my-1 w-px flex-1",
                    rejected ? "bg-destructive/30" : "bg-border",
                  )}
                />
              ) : null}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{step.name}</span>
                {step.time ? (
                  <time className="text-xs text-muted-foreground tabular-nums">
                    {step.time}
                  </time>
                ) : null}
              </div>
              {step.operator ? (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  操作人：{step.operator}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { FlowTracker };
export type { FlowTrackerProps };
