"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface OnboardingStep {
  id: string
  title: string
  description?: string
  href?: string
  optional?: boolean
}

interface OnboardingChecklistProps extends Omit<React.ComponentProps<"div">, "onToggle"> {
  steps: OnboardingStep[]
  completedIds?: string[]
  onToggle?: (id: string, completed: boolean) => void
  title?: string
  className?: string
}

export function OnboardingChecklist({
  steps,
  completedIds = [],
  onToggle,
  title = "开始使用",
  className,
  ...props
}: OnboardingChecklistProps) {
  const completed = steps.filter((s) => completedIds.includes(s.id)).length
  const pct = steps.length === 0 ? 0 : (completed / steps.length) * 100
  return (
    <div data-slot="onboarding-checklist" className={cn("rounded-md border bg-card p-4", className)} {...props}>
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {completed} / {steps.length} 已完成
          </p>
        </div>
        <span className="text-2xl font-bold tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ul className="space-y-1">
        {steps.map((s) => {
          const isDone = completedIds.includes(s.id)
          return (
            <li key={s.id} className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-muted/30">
              <input
                type="checkbox"
                checked={isDone}
                onChange={(e) => onToggle?.(s.id, e.target.checked)}
                className="size-4"
                aria-label={s.title}
              />
              <div className="flex-1 min-w-0">
                <div className={cn("text-sm", isDone && "line-through text-muted-foreground")}>{s.title}</div>
                {s.description && <div className="text-xs text-muted-foreground">{s.description}</div>}
              </div>
              {s.optional && !isDone && <span className="text-[0.65rem] text-muted-foreground">可选</span>}
              {s.href && (
                <Button variant="ghost" size="xs" render={<a href={s.href} />}>
                  开始
                </Button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
