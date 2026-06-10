import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Status =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled"

const statusConfig: Record<
  Status,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/15 text-warning",
  },
  approved: {
    label: "Approved",
    className: "bg-info/15 text-info",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive",
  },
  completed: {
    label: "Completed",
    className: "bg-success/15 text-success",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground line-through",
  },
}

function StatusTag({
  status,
  size = "default",
}: {
  status: Status | string
  size?: "sm" | "default"
}) {
  const key = status.toLowerCase() as Status
  const config = statusConfig[key] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  }

  return (
    <Badge
      className={cn(
        config.className,
        size === "sm" && "h-4 px-1.5 text-[0.65rem]"
      )}
    >
      {config.label}
    </Badge>
  )
}

export { StatusTag, statusConfig }
export type { Status }
