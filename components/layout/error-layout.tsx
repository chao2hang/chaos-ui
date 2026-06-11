import * as React from "react"
import { cn } from "@/lib/utils"

export function ErrorLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="error-layout"
      className={cn(
        "flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
