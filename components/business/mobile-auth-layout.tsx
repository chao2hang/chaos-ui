"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MobileAuthLayoutProps {
  children: React.ReactNode
  className?: string
}

function MobileAuthLayout({ children, className }: MobileAuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4",
        className
      )}
    >
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

export { MobileAuthLayout }
export type { MobileAuthLayoutProps }
