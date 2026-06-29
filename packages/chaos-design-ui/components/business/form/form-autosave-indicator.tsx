"use client"
import * as React from "react"
import { CloudIcon, CloudOffIcon, CheckIcon, AlertCircleIcon, Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AutosaveStatus } from "@/hooks/use-form-autosave"
import { formatRelativeTime } from "@/lib/format"

interface FormAutosaveIndicatorProps extends React.ComponentProps<"div"> {
  status: AutosaveStatus
  lastSaved?: number | null
  error?: Error | null
  className?: string
}

const config: Record<AutosaveStatus, { icon: React.ElementType; text: string; color: string; spin?: boolean }> = {
  idle: { icon: CloudIcon, text: "等待修改", color: "text-muted-foreground" },
  saving: { icon: Loader2Icon, text: "正在保存...", color: "text-info", spin: true },
  saved: { icon: CheckIcon, text: "已保存", color: "text-success" },
  error: { icon: AlertCircleIcon, text: "保存失败", color: "text-destructive" },
}

export function FormAutosaveIndicator({
  status,
  lastSaved,
  error,
  className,
  ...props
}: FormAutosaveIndicatorProps) {
  const c = config[status]
  const Icon = c.icon
  const text = status === "saved" && lastSaved ? `已保存 · ${formatRelativeTime(lastSaved)}` : c.text

  return (
    <div
      data-slot="form-autosave-indicator"
      data-status={status}
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-1.5 text-xs", c.color, className)}
      title={error?.message}
      {...props}
    >
      <Icon className={cn("size-3", c.spin && "animate-spin")} />
      <span>{text}</span>
      {status === "error" && <CloudOffIcon className="size-3" />}
    </div>
  )
}
