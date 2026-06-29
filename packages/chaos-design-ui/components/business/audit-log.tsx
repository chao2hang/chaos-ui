"use client"
import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { formatRelativeTime } from "@/lib/format"
import { PlusIcon, MinusIcon, PencilIcon, TrashIcon, LogInIcon, LogOutIcon } from "lucide-react"

export interface AuditEntry {
  id: string
  actor: { name: string; avatar?: string }
  action: string
  target?: string
  timestamp: number | string | Date
  changes?: Array<{ field: string; before: string; after: string }>
  ip?: string
}

const ACTION_ICONS: Record<string, React.ElementType> = {
  create: PlusIcon,
  delete: TrashIcon,
  update: PencilIcon,
  login: LogInIcon,
  logout: LogOutIcon,
  remove: MinusIcon,
}

interface AuditLogProps extends React.ComponentProps<"ol"> {
  entries: AuditEntry[]
  className?: string
}

export function AuditLog({ entries, className, ...props }: AuditLogProps) {
  return (
    <ol data-slot="audit-log" className={cn("relative space-y-3", className)} {...props}>
      <span aria-hidden className="absolute top-2 bottom-2 left-3.5 w-px bg-muted-foreground/20" />
      {entries.map((e) => {
        const Icon = ACTION_ICONS[e.action.toLowerCase()] ?? PencilIcon
        const isRemoved = ["delete", "remove"].includes(e.action.toLowerCase())
        return (
          <li key={e.id} className="relative flex gap-3 pl-1">
            <span className="z-10 flex size-7 items-center justify-center rounded-full border bg-background">
              <Icon className={cn("size-3.5", isRemoved ? "text-destructive" : "text-muted-foreground")} />
            </span>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2 text-sm">
                <Avatar className="size-5">
                  {e.actor.avatar && <AvatarImage src={e.actor.avatar} />}
                  <AvatarFallback className="text-[0.6rem]">{e.actor.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{e.actor.name}</span>
                <span className="text-muted-foreground">{actionText(e.action)}</span>
                {e.target && <span className="font-mono text-xs">{e.target}</span>}
              </div>
              {e.changes && e.changes.length > 0 && (
                <ul className="mt-1 space-y-0.5 rounded bg-muted/30 p-2 text-xs">
                  {e.changes.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-muted-foreground">{c.field}:</span>
                      <span className="line-through text-destructive/70">{c.before}</span>
                      <span>→</span>
                      <span className="text-success">{c.after}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatRelativeTime(e.timestamp)}
                {e.ip && <span className="ml-2">· {e.ip}</span>}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function actionText(action: string): string {
  const map: Record<string, string> = {
    create: "创建了",
    update: "更新了",
    delete: "删除了",
    remove: "移除了",
    login: "登录了",
    logout: "登出了",
  }
  return map[action.toLowerCase()] ?? action
}
