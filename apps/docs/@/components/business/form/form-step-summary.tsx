"use client"
import * as React from "react"
import { CheckIcon, CircleIcon } from "lucide-react"
import { cn } from "@chaos_team/chaos-ui/lib"

interface FormStep {
  id: string
  title: string
  description?: string
  optional?: boolean
}

interface FormStepSummaryProps extends React.ComponentProps<"ol"> {
  steps: FormStep[]
  values: Record<string, unknown>
  onJumpTo?: (stepId: string) => void
  className?: string
}

export function FormStepSummary({
  steps,
  values,
  onJumpTo,
  className,
  ...props
}: FormStepSummaryProps) {
  return (
    <ol
      data-slot="form-step-summary"
      className={cn("space-y-2", className)}
      {...props}
    >
      {steps.map((step) => {
        const value = values[step.id]
        const filled = isFilled(value)
        return (
          <li
            key={step.id}
            className={cn(
              "flex items-start gap-3 rounded-md border p-3",
              filled ? "border-success/30 bg-success/5" : "border-border bg-muted/30"
            )}
          >
            {filled ? (
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" />
            ) : (
              <CircleIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{step.title}</span>
                {step.optional && (
                  <span className="rounded bg-muted px-1 py-0.5 text-[0.65rem] text-muted-foreground">可选</span>
                )}
              </div>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
              )}
              {filled && (
                <p className="mt-1 text-xs text-success/80 truncate">{formatPreview(value)}</p>
              )}
            </div>
            {onJumpTo && (
              <button
                type="button"
                onClick={() => onJumpTo(step.id)}
                className="text-xs text-primary hover:underline"
              >
                编辑
              </button>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function isFilled(value: unknown): boolean {
  if (value == null) return false
  if (typeof value === "string") return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === "object") return Object.keys(value as object).length > 0
  return true
}

function formatPreview(value: unknown): string {
  if (Array.isArray(value)) return `${value.length} 项`
  if (typeof value === "string") return value
  if (typeof value === "object" && value !== null) return JSON.stringify(value)
  return String(value)
}
