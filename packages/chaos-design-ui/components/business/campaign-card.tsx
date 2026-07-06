"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva("", {
  variants: {
    status: {
      planned: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      ended: "bg-gray-100 text-gray-600",
    },
  },
});

const statusLabels: Record<string, string> = {
  planned: "计划中",
  active: "进行中",
  paused: "已暂停",
  ended: "已结束",
};

interface CampaignCardProps
  extends
    React.ComponentProps<typeof Card>,
    VariantProps<typeof statusVariants> {
  name: string;
  status?: "planned" | "active" | "paused" | "ended";
  startDate?: string;
  endDate?: string;
  budget?: number;
  location?: string;
  reachCount?: number;
}

function CampaignCard({
  name,
  status = "planned",
  startDate,
  endDate,
  budget,
  location,
  reachCount,
  className,
  ...props
}: CampaignCardProps) {
  return (
    <Card
      data-slot="campaign-card"
      className={cn("transition-shadow hover:shadow-md", className)}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          <Badge
            variant="outline"
            className={cn("text-xs", statusVariants({ status }))}
          >
            {statusLabels[status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {startDate && endDate && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <CalendarIcon className="size-3.5" />
            <span>
              {startDate} ~ {endDate}
            </span>
          </div>
        )}
        {location && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <MapPinIcon className="size-3.5" />
            <span>{location}</span>
          </div>
        )}
        {reachCount !== undefined && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <UsersIcon className="size-3.5" />
            <span>覆盖 {reachCount.toLocaleString()} 人</span>
          </div>
        )}
        {budget !== undefined && (
          <div className="mt-2 border-t pt-2">
            <span className="text-muted-foreground text-sm">预算: </span>
            <span className="text-sm font-semibold">
              ¥{budget.toLocaleString()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { CampaignCard, statusLabels };
export type { CampaignCardProps };
