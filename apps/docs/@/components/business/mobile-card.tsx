"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@chaos_team/chaos-ui/ui"
import { cn } from "@chaos_team/chaos-ui/lib"

interface MobileCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function MobileCard({ title, description, children, actions, className }: MobileCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader className="p-4 pb-2">
          {title && <CardTitle className="text-lg">{title}</CardTitle>}
          {description && <CardDescription className="text-sm">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("p-4", !(title || description) && "pt-4")}>
        {children}
      </CardContent>
      {actions && (
        <CardFooter className="p-4 pt-2 border-t">
          {actions}
        </CardFooter>
      )}
    </Card>
  )
}

export { MobileCard }
export type { MobileCardProps }
