"use client"

import * as React from "react"
import { EmptyState } from "@/components/business/empty-state"
import { cn } from "@/lib/utils"

interface MobileEmptyStateProps {
  variant?: string
  icon?: React.ElementType
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function MobileEmptyState({ className, ...props }: MobileEmptyStateProps) {
  return (
    <EmptyState
      className={cn("py-8", className)}
      {...props}
    />
  )
}

export { MobileEmptyState }
export type { MobileEmptyStateProps }
