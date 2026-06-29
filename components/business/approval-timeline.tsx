import { useTranslation } from "react-i18next";
import { CheckIcon, ClockIcon, XIcon } from "@/components/ui/icons";
import { Timeline, TimelineItem } from "@/components/ui";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ApprovalStepStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "skipped";

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

export function ApprovalTimeline({ steps, className, texts: textsProp }: ApprovalTimelineProps) {
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
  // Only call useTranslation if no texts prop provided
  const { t } = hasI18n ? useTranslation("transfer") : { t: (k: string) => k };

  return (
    <Timeline
      data-slot="approval-timeline"
      className={cn("max-w-2xl", className)}
    >
      {steps.map((step) => {
        const statusLabel = textsProp
          ? (statusTextMap[step.status] ?? (defaultTexts as Record<string, string>)[step.status] ?? step.status)
          : t(`approvalTimeline.status.${step.status}` as string, String(defaultTexts[step.status] ?? step.status));
        return (
        <TimelineItem
          key={step.id}
          icon={statusIcon[step.status]}
          title={
            <span className="inline-flex items-center gap-2">
              {step.title}
              <Badge variant="outline">
                {statusLabel}
              </Badge>
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
