import { useTranslation } from "react-i18next";
import { CheckIcon, ClockIcon, XIcon } from "@/components/ui/icons";
import { Timeline, TimelineItem } from "@/components/ui";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ApprovalStepStatus =
  "approved" | "pending" | "rejected" | "skipped";

export interface ApprovalStep {
  id: string;
  title: string;
  approver: string;
  status: ApprovalStepStatus;
  time?: string;
  note?: string;
}

export interface ApprovalTimelineTexts {
  statusApproved?: string;
  statusPending?: string;
  statusRejected?: string;
  statusSkipped?: string;
}

export interface ApprovalTimelineProps {
  steps: ApprovalStep[];
  className?: string;
  /**
   * Override i18n strings. When provided, useTranslation is skipped.
   * / 覆盖 i18n 字符串，传入后跳过 useTranslation
   */
  texts?: ApprovalTimelineTexts;
}

const statusIcon = {
  approved: CheckIcon,
  pending: ClockIcon,
  rejected: XIcon,
  skipped: ClockIcon,
};

const statusVariant = {
  approved: "success",
  pending: "info",
  rejected: "destructive",
  skipped: "default",
} as const;

/**
 * @component ApprovalTimeline
 * @category business/bill
 * @since 0.2.0
 * @description Visual approval workflow timeline showing step status (approved, pending, rejected, skipped) / 审批流程可视化时间线，展示各节点审批状态
 * @keywords approval, timeline, workflow, review, steps
 * @example
 * <ApprovalTimeline steps={[{ id: "1", title: "Manager", approver: "Alice", status: "approved" }]} />
 */
export function ApprovalTimeline({
  steps,
  className,
  texts: textsProp,
}: ApprovalTimelineProps) {
  const defaultTexts: Record<string, string> = {
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    skipped: "Skipped",
  };

  const statusTextMap: Record<ApprovalStepStatus, string | undefined> = {
    approved: textsProp?.statusApproved,
    pending: textsProp?.statusPending,
    rejected: textsProp?.statusRejected,
    skipped: textsProp?.statusSkipped,
  };

  const hasI18n = !textsProp;
  // Always call useTranslation unconditionally (rules-of-hooks); ignore its
  // result when explicit texts are provided.
  const { t: tI18n } = useTranslation("transfer");
  const t = hasI18n ? tI18n : (k: string) => k;

  return (
    <Timeline
      data-slot="approval-timeline"
      className={cn("max-w-2xl", className)}
    >
      {steps.map((step) => {
        const statusLabel = textsProp
          ? (statusTextMap[step.status] ??
            (defaultTexts as Record<string, string>)[step.status] ??
            step.status)
          : t(
              `approvalTimeline.status.${step.status}` as string,
              String(defaultTexts[step.status] ?? step.status),
            );
        return (
          <TimelineItem
            key={step.id}
            icon={statusIcon[step.status]}
            title={
              <span className="inline-flex items-center gap-2">
                {step.title}
                <Badge variant="outline">{statusLabel}</Badge>
              </span>
            }
            description={
              <span>
                {step.approver}
                {step.note ? ` · ${step.note}` : ""}
              </span>
            }
            time={step.time}
            variant={statusVariant[step.status]}
          />
        );
      })}
    </Timeline>
  );
}
