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

export interface ApprovalTimelineProps {
  steps: ApprovalStep[];
  className?: string;
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

export function ApprovalTimeline({ steps, className }: ApprovalTimelineProps) {
  const { t } = useTranslation("transfer");
  return (
    <Timeline
      data-slot="approval-timeline"
      className={cn("max-w-2xl", className)}
    >
      {steps.map((step) => (
        <TimelineItem
          key={step.id}
          icon={statusIcon[step.status]}
          title={
            <span className="inline-flex items-center gap-2">
              {step.title}
              <Badge variant="outline">
                {t(`approvalTimeline.status.${step.status}`)}
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
      ))}
    </Timeline>
  );
}
