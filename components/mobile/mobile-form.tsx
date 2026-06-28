"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileFormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
  className?: string
}

function MobileForm({ children, onSubmit, className }: MobileFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "space-y-4 p-4",
        "md:p-0 md:space-y-6",
        className
      )}
    >
      {children}
    </form>
  )
}

export { MobileForm }
export type { MobileFormProps }
