"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MobileNavigationProps {
  items: {
    label: string
    href?: string
    icon?: React.ElementType
    active?: boolean
    onClick?: () => void
  }[]
  className?: string
}

function MobileNavigation({ items, className }: MobileNavigationProps) {
  return (
    <ScrollArea className={cn("w-full", className)}>
      <div className="flex gap-2 p-2">
        {items.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? "default" : "outline"}
            size="sm"
            className="shrink-0"
            onClick={item.onClick}
            asChild={!!item.href}
          >
            {item.href ? (
              <a href={item.href}>
                {item.icon && <item.icon className="size-4 mr-1" />}
                {item.label}
              </a>
            ) : (
              <>
                {item.icon && <item.icon className="size-4 mr-1" />}
                {item.label}
              </>
            )}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

export { MobileNavigation }
export type { MobileNavigationProps }
