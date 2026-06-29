import * as React from "react"
import { cn } from "@/lib/utils"

function AuthLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-h-svh items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4",
        className
      )}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}

export { AuthLayout }
