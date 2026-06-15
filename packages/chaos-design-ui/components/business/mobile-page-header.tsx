"use client"

import * as React from "react"
import { PageHeader } from "@/components/business/page-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon, MenuIcon } from "lucide-react"

interface MobilePageHeaderProps {
  title: string
  description?: string
  breadcrumbItems?: { label: string; href?: string }[]
  actions?: React.ReactNode
  onBack?: () => void
  onMenu?: () => void
  className?: string
}

function MobilePageHeader({ onBack, onMenu, className, ...props }: MobilePageHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 p-4 border-b bg-background sticky top-0 z-10", "md:p-0 md:border-0 md:mb-6 md:static md:z-auto", className)}>
      {onBack && (
        <Button variant="ghost" size="icon-sm" onClick={onBack} className="shrink-0">
          <ArrowLeftIcon className="size-5" />
        </Button>
      )}
      <div className="flex-1 min-w-0">
        <PageHeader {...props} />
      </div>
      {onMenu && (
        <Button variant="ghost" size="icon-sm" onClick={onMenu} className="shrink-0">
          <MenuIcon className="size-5" />
        </Button>
      )}
    </div>
  )
}

export { MobilePageHeader }
export type { MobilePageHeaderProps }
