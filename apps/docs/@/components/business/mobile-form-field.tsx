"use client"

import * as React from "react"
import { FormField } from "@/components/business/form-field"
import { cn } from "@/lib/utils"

interface MobileFormFieldProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

function MobileFormField({ className, ...props }: MobileFormFieldProps) {
  return (
    <FormField
      className={cn("space-y-2", className)}
      {...props}
    />
  )
}

export { MobileFormField }
export type { MobileFormFieldProps }
