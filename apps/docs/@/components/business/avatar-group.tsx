"use client";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/format";

export interface AvatarUser {
  name: string;
  src?: string;
}

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  users: AvatarUser[];
  max?: number;
  size?: "sm" | "default" | "lg" | "xl";
  showOverflow?: boolean;
  onOverflowClick?: () => void;
}

const sizeMap = {
  sm: "size-6 text-[0.6rem]",
  default: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-12 text-base",
} as const;

const ringMap = {
  sm: "ring-1",
  default: "ring-2",
  lg: "ring-2",
  xl: "ring-2",
} as const;

/**
 * @component AvatarGroup
 * @category business/ux
 * @since 0.2.0
 * @description Overlapping avatar cluster with overflow indicator, supporting multiple sizes / 重叠头像组，支持溢出显示和多种尺寸
 * @keywords avatar, group, users, overflow, stack
 * @example
 * <AvatarGroup users={[{ name: "Alice" }, { name: "Bob" }]} max={3} />
 */
export function AvatarGroup({
  users = [],
  max = 4,
  size = "default",
  showOverflow = true,
  onOverflowClick,
  className,
  ...props
}: AvatarGroupProps) {
  const { t } = useTranslation("transfer");
  const visible = users.slice(0, max);
  const overflow = users.length - max;

  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-2", className)}
      {...props}
    >
      {visible.map((u, i) => (
        <Avatar
          key={`${u.name}-${i}`}
          className={cn(
            sizeMap[size],
            ringMap[size],
            "border-background border",
          )}
          title={u.name}
        >
          {u.src && <AvatarImage src={u.src} alt={u.name} />}
          <AvatarFallback>{initials(u.name)}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && showOverflow && (
        <Button
          type="button"
          variant="ghost"
          onClick={onOverflowClick}
          className={cn(
            "border-background bg-muted text-muted-foreground inline-flex shrink-0 items-center justify-center rounded-full border font-medium",
            sizeMap[size],
            ringMap[size],
          )}
          aria-label={t("avatarGroup.viewAll", { count: users.length })}
        >
          +{overflow}
        </Button>
      )}
    </div>
  );
}
