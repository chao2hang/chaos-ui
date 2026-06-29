"use client";

import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "paused"
  | "completed"
  | "failed"
  | "archived";

export interface CampaignStatusTagProps {
  status: CampaignStatus;
  size?: "sm" | "default";
  /** Custom label — overrides the default status label / 自定义标签文本 */
  label?: string;
  className?: string;
}

const statusMeta: Record<CampaignStatus, { label: string; className: string }> =
  {
    draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
    scheduled: { label: "Scheduled", className: "bg-info/15 text-info" },
    active: { label: "Active", className: "bg-success/15 text-success" },
    paused: { label: "Paused", className: "bg-warning/15 text-warning" },
    completed: { label: "Completed", className: "bg-primary/10 text-primary" },
    failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
    archived: { label: "Archived", className: "bg-secondary text-secondary-foreground" },
  };

export function CampaignStatusTag({
  status,
  size = "default",
  label,
  className,
}: CampaignStatusTagProps) {
  const meta = statusMeta[status];

  return (
    <Badge
      variant="secondary"
      className={cn(
        size === "sm" && "h-4 px-1.5 text-[0.65rem]",
        meta.className,
        className,
      )}
    >
      {label ?? meta.label}
    </Badge>
  );
}