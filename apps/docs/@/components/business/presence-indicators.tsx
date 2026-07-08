"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Dot } from "@/components/ui/dot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initials } from "@/lib/format";

export type PresenceStatus = "online" | "away" | "busy" | "offline" | "typing";

export interface PresenceUser {
  id: string;
  name: string;
  avatar?: string;
  status: PresenceStatus;
  lastSeen?: number | string | Date;
}

interface PresenceIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {
  users: PresenceUser[];
  max?: number;
  className?: string;
}

const STATUS_COLORS: Record<
  PresenceStatus,
  "success" | "warning" | "destructive" | "default"
> = {
  online: "success",
  away: "warning",
  busy: "destructive",
  offline: "default",
  typing: "success",
};

export function PresenceIndicators({
  users,
  max = 5,
  className,
  ...props
}: PresenceIndicatorsProps) {
  const visible = users.slice(0, max);
  const overflow = users.length - max;
  return (
    <div
      data-slot="presence-indicators"
      className={cn("flex -space-x-2", className)}
      {...props}
    >
      {visible.map((u) => (
        <div key={u.id} className="relative">
          <Avatar
            className="border-background size-8 border-2"
            title={`${u.name} · ${u.status}`}
          >
            {u.avatar && <AvatarImage src={u.avatar} />}
            <AvatarFallback className="text-xs">
              {initials(u.name)}
            </AvatarFallback>
          </Avatar>
          {u.status !== "offline" && (
            <Dot
              variant={STATUS_COLORS[u.status]}
              pulse={u.status === "online" || u.status === "typing"}
              className="ring-background absolute right-0 bottom-0 ring-2"
            />
          )}
        </div>
      ))}
      {overflow > 0 && (
        <div className="border-background bg-muted flex size-8 items-center justify-center rounded-full border-2 text-xs font-medium">
          +{overflow}
        </div>
      )}
    </div>
  );
}
