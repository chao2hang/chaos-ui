"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { formatCurrency } from "@/lib/format";
import {
  CheckCircle2Icon,
  ClockIcon,
  XIcon,
  CircleIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";

/**
 * @component WriteoffFlow
 * @category business/finance
 * @since 0.7.0
 * @description 核销流程图。按顺序展示核销各节点及其状态（已完成 / 进行中 / 待处理 / 已驳回）与可选金额。
 * @param steps 核销步骤列表（id / name / status / amount?）
 *   status 取值：done | doing | pending | rejected
 * @example
 * <WriteoffFlow
 *   steps={[
 *     { id: "s1", name: "申请核销", status: "done", amount: 1200 },
 *     { id: "s2", name: "财务复核", status: "doing" },
 *     { id: "s3", name: "完成核销", status: "pending" },
 *   ]}
 * />
 */

type WriteoffStatus = "done" | "doing" | "pending" | "rejected";

interface WriteoffFlowProps {
  steps: Array<{ id: string; name: string; status: string; amount?: number }>;
  className?: string;
}

const STATUS_MAP: Record<WriteoffStatus, { label: string; icon: React.ReactNode; tone: string }> = {
  done: {
    label: "已完成",
    icon: <CheckCircle2Icon className="size-4" />,
    tone: "text-emerald-600",
  },
  doing: {
    label: "进行中",
    icon: <ClockIcon className="size-4" />,
    tone: "text-primary",
  },
  pending: {
    label: "待处理",
    icon: <CircleIcon className="size-4" />,
    tone: "text-muted-foreground",
  },
  rejected: {
    label: "已驳回",
    icon: <XIcon className="size-4" />,
    tone: "text-destructive",
  },
};

function resolveStatus(status: string): WriteoffStatus {
  const normalized = status.toLowerCase();
  if (normalized === "done" || normalized === "completed" || normalized === "finish" || normalized === "finished") return "done";
  if (normalized === "doing" || normalized === "active" || normalized === "processing" || normalized === "current") return "doing";
  if (normalized === "rejected" || normalized === "fail" || normalized === "failed" || normalized === "error") return "rejected";
  return "pending";
}

function WriteoffFlow({ steps = [], className }: WriteoffFlowProps) {
  if (steps.length === 0) {
    return (
      <div
        data-slot="writeoff-flow"
        className={cn("flex items-center gap-2 rounded-lg border border-dashed p-6 text-sm text-muted-foreground", className)}
        role="status"
      >
        <CircleIcon className="size-4" />
        暂无核销步骤
      </div>
    );
  }

  return (
    <ol
      data-slot="writeoff-flow"
      className={cn("flex flex-col gap-0", className)}
      role="list"
      aria-label="核销流程"
    >
      {steps.map((step, idx) => {
        const status = resolveStatus(step.status);
        const config = STATUS_MAP[status];
        const isLast = idx === steps.length - 1;
        const isDone = status === "done";
        return (
          <li key={step.id} className="relative flex gap-3 pb-4 last:pb-0">
            {/* connector */}
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 bottom-0 w-0.5",
                  isDone ? "bg-emerald-500" : "bg-border",
                )}
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-background",
                isDone && "border-emerald-500",
                status === "doing" && "border-primary",
                (status === "pending" || status === "rejected") && "border-muted-foreground/30",
                config.tone,
              )}
              aria-hidden="true"
            >
              {config.icon}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{step.name}</span>
                <Badge
                  variant={
                    status === "done"
                      ? "default"
                      : status === "rejected"
                        ? "destructive"
                        : "secondary"
                  }
                  className={cn(status === "doing" && "border-primary text-primary")}
                >
                  {config.label}
                </Badge>
                {step.amount !== undefined && (
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {formatCurrency(step.amount)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                <span>步骤 {idx + 1} / {steps.length}</span>
                {!isLast && (
                  <>
                    <ArrowRightIcon className="size-3" aria-hidden="true" />
                    <span>{steps[idx + 1]?.name}</span>
                  </>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { WriteoffFlow };
export type { WriteoffFlowProps };
