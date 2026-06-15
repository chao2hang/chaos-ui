"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InboxIcon, SearchIcon, AlertTriangleIcon, WifiOffIcon,
} from "lucide-react"

const variantConfig = {
  default: { icon: InboxIcon, title: "No data", description: "There are no items to display." },
  search: { icon: SearchIcon, title: "No results", description: "Try adjusting your search or filter criteria." },
  error: { icon: AlertTriangleIcon, title: "Something went wrong", description: "An error occurred while loading data." },
  network: { icon: WifiOffIcon, title: "No connection", description: "Check your internet connection and try again." },
}

function EmptyState({
  variant = "default",
  icon: iconProp,
  title: titleProp,
  description: descProp,
  action,
  className,
}: {
  variant?: string
  icon?: React.ElementType
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  const config = (variantConfig as Record<string, typeof variantConfig.default>)[variant] ?? variantConfig.default
  const Icon = iconProp ?? config.icon
  const title = titleProp ?? config.title
  const description = descProp ?? config.description

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export { EmptyState, variantConfig }
