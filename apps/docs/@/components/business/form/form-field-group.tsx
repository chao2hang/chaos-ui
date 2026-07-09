"use client"
import * as React from "react"
import { cn } from "@chaos_team/chaos-ui/lib"

interface FormFieldGroupProps extends React.ComponentProps<"fieldset"> {
  legend: string
  description?: string
  required?: boolean
  columns?: 1 | 2 | 3
  children: React.ReactNode
}

export function FormFieldGroup({
  legend,
  description,
  required,
  columns = 1,
  className,
  children,
  ...props
}: FormFieldGroupProps) {
  return (
    <fieldset
      data-slot="form-field-group"
      className={cn("space-y-3 rounded-md border p-4", className)}
      {...props}
    >
      <legend className="px-1 text-sm font-medium">
        {legend}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </legend>
      {description && (
        <p className="-mt-2 text-xs text-muted-foreground">{description}</p>
      )}
      <div
        className={cn(
          "grid gap-3",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {children}
      </div>
    </fieldset>
  )
}
