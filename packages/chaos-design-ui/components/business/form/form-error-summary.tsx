"use client"
import * as React from "react"
import { AlertCircleIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface FormError {
  field?: string
  message: string
}

interface FormErrorSummaryProps extends React.ComponentProps<"div"> {
  errors: FormError[]
  onJumpTo?: (field: string) => void
  className?: string
  title?: string
}

export function FormErrorSummary({
  errors,
  onJumpTo,
  className,
  title = `表单中有 ${errors.length} 个错误`,
  ...props
}: FormErrorSummaryProps) {
  if (errors.length === 0) return null
  return (
    <div
      data-slot="form-error-summary"
      role="alert"
      className={cn(
        "rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 font-medium text-destructive">
        <AlertCircleIcon className="size-4" />
        {title}
      </div>
      <ul className="mt-2 space-y-1 text-xs">
        {errors.map((err, i) => (
          <li key={`${err.field ?? "global"}-${i}`} className="flex items-center gap-2">
            {err.field && onJumpTo ? (
              <button
                type="button"
                onClick={() => onJumpTo(err.field!)}
                className="text-destructive underline-offset-2 hover:underline"
              >
                {err.message}
              </button>
            ) : (
              <span className="text-destructive/80">{err.message}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
