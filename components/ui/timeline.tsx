import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

function Timeline({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col", className)} {...props} />
}

const timelineDotVariants = cva(
  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      variant: {
        default: "border-muted-foreground",
        success: "border-success text-success",
        warning: "border-warning text-warning",
        destructive: "border-destructive text-destructive",
        info: "border-info text-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

function TimelineItem({
  className,
  icon: Icon,
  title,
  description,
  time,
  status,
  variant,
  children,
  ...props
}: {
  className?: string
  icon?: React.ComponentType<{ className?: string }>
  title?: React.ReactNode
  description?: React.ReactNode
  time?: React.ReactNode
  status?: "completed" | "current" | "pending" | "default"
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  children?: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">) {
  const resolvedVariant =
    variant ??
    (status === "completed"
      ? "success"
      : status === "current"
        ? "info"
        : status === "pending"
          ? "default"
          : "default")

  return (
    <div className={cn("flex gap-4 relative", className)} {...props}>
      <div className="flex flex-col items-center self-stretch">
        <TimelineDot variant={resolvedVariant}>
          {Icon ? <Icon className="size-4" /> : null}
        </TimelineDot>
        <TimelineConnector />
      </div>
      <TimelineContent className="pb-8 last:pb-0">
        {title !== undefined ? <TimelineTitle>{title}</TimelineTitle> : null}
        {description !== undefined ? <TimelineDescription>{description}</TimelineDescription> : null}
        {time !== undefined ? <TimelineTime>{time}</TimelineTime> : null}
        {children}
      </TimelineContent>
    </div>
  )
}

function TimelineDot({ className, variant, children, ...props }: { className?: string; variant?: "default" | "success" | "warning" | "destructive" | "info"; children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(timelineDotVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

function TimelineConnector({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("ml-3.5 w-px flex-1 bg-border", className)} {...props} />
}

function TimelineContent({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 pt-1", className)} {...props} />
}

function TimelineTitle({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-sm font-semibold leading-none", className)} {...props} />
}

function TimelineDescription({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mt-1 text-sm text-muted-foreground", className)} {...props} />
}

function TimelineTime({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLTimeElement>) {
  return <time className={cn("mt-1 text-xs text-muted-foreground", className)} {...props} />
}

export {
  Timeline, TimelineItem, TimelineDot, TimelineConnector,
  TimelineContent, TimelineTitle, TimelineDescription, TimelineTime,
  timelineDotVariants,
}
