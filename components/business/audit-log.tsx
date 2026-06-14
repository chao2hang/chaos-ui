"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type AuditLogStatus = "success" | "warning" | "error" | "info"

export interface AuditLogEntry {
  id: string
  actor: {
    name: string
    description?: string
  }
  action: string
  target: string
  timestamp: string
  status?: AuditLogStatus
  details?: React.ReactNode
}

export interface AuditLogProps extends React.ComponentProps<"div"> {
  entries: AuditLogEntry[]
  emptyText?: string
}

const statusVariant: Record<AuditLogStatus, "default" | "secondary" | "destructive" | "outline"> = {
  success: "default",
  warning: "secondary",
  error: "destructive",
  info: "outline",
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function AuditLog({
  entries,
  emptyText = "No audit events yet.",
  className,
  ...props
}: AuditLogProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

  if (entries.length === 0) {
    return (
      <div
        data-slot="audit-log"
        className={cn("rounded-lg border p-6 text-center text-sm text-muted-foreground", className)}
        {...props}
      >
        {emptyText}
      </div>
    )
  }

  return (
    <div data-slot="audit-log" className={cn("divide-y rounded-lg border", className)} {...props}>
      {entries.map((entry) => {
        const isExpanded = expanded[entry.id]
        const hasDetails = Boolean(entry.details)

        return (
          <div key={entry.id} className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="size-8">
                <AvatarFallback>{getInitials(entry.actor.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{entry.actor.name}</p>
                  {entry.status && (
                    <Badge variant={statusVariant[entry.status]}>{entry.status}</Badge>
                  )}
                </div>
                {entry.actor.description && (
                  <p className="text-xs text-muted-foreground">{entry.actor.description}</p>
                )}
                <p className="mt-1 text-sm">
                  <span className="text-muted-foreground">{entry.action}</span>{" "}
                  <span className="font-medium">{entry.target}</span>
                </p>
                {hasDetails && isExpanded && (
                  <div className="mt-3 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                    {entry.details}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <time className="text-xs text-muted-foreground">{entry.timestamp}</time>
                {hasDetails && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    onClick={() => setExpanded((value) => ({ ...value, [entry.id]: !isExpanded }))}
                  >
                    {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
