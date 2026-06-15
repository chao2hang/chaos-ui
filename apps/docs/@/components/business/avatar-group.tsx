"use client"
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"

export interface AvatarUser {
  name: string
  src?: string
}

interface AvatarGroupProps extends React.ComponentProps<"div"> {
  users: AvatarUser[]
  max?: number
  size?: "sm" | "default" | "lg" | "xl"
  showOverflow?: boolean
  onOverflowClick?: () => void
}

const sizeMap = {
  sm: "size-6 text-[0.6rem]",
  default: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-12 text-base",
} as const

const ringMap = {
  sm: "ring-1",
  default: "ring-2",
  lg: "ring-2",
  xl: "ring-2",
} as const

export function AvatarGroup({
  users,
  max = 4,
  size = "default",
  showOverflow = true,
  onOverflowClick,
  className,
  ...props
}: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

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
            "border border-background"
          )}
          title={u.name}
        >
          {u.src && <AvatarImage src={u.src} alt={u.name} />}
          <AvatarFallback>{initials(u.name)}</AvatarFallback>
        </Avatar>
      ))}
      {overflow > 0 && showOverflow && (
        <button
          type="button"
          onClick={onOverflowClick}
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full border border-background bg-muted font-medium text-muted-foreground",
            sizeMap[size],
            ringMap[size]
          )}
          aria-label={`查看全部 ${users.length} 个`}
        >
          +{overflow}
        </button>
      )}
    </div>
  )
}
