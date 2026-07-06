"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const campaignStatusMap: Record<string, { label: string; className: string }> =
  {
    draft: { label: "草稿", className: "bg-gray-100 text-gray-600" },
    reviewing: { label: "审核中", className: "bg-yellow-100 text-yellow-800" },
    scheduled: { label: "已排期", className: "bg-blue-100 text-blue-800" },
    running: { label: "投放中", className: "bg-green-100 text-green-800" },
    paused: { label: "已暂停", className: "bg-orange-100 text-orange-800" },
    completed: {
      label: "已完成",
      className: "bg-emerald-100 text-emerald-800",
    },
    rejected: { label: "已驳回", className: "bg-red-100 text-red-800" },
  };

interface CampaignStatusTagProps extends React.ComponentProps<"span"> {
  status: string;
  label?: string;
}

function CampaignStatusTag({
  status,
  label,
  className,
  ...props
}: CampaignStatusTagProps) {
  const config = campaignStatusMap[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  };
  return (
    <Badge
      data-slot="campaign-status-tag"
      variant="outline"
      className={cn("text-xs font-medium", config.className, className)}
      {...(props as React.ComponentProps<"div">)}
    >
      {label ?? config.label}
    </Badge>
  );
}

export { CampaignStatusTag, campaignStatusMap };
export type { CampaignStatusTagProps };
