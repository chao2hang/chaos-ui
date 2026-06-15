import * as React from "react"
import { cn } from "@/lib/utils"

interface BlankLayoutProps extends React.ComponentProps<"div"> {
  centered?: boolean
  padded?: boolean
}

export function BlankLayout({
  centered = false,
  padded = true,
  className,
  children,
  ...props
}: BlankLayoutProps) {
  return (
    <div
      data-slot="blank-layout"
      className={cn(
        "min-h-screen bg-background text-foreground",
        padded && "p-4",
        centered && "flex items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
