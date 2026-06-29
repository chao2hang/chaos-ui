"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui"

interface MasterDetailTabsProps {
  master: React.ReactNode
  details: Record<string, { label: string; content: React.ReactNode }>
  activeDetail?: string
  onDetailChange?: (key: string) => void
  masterWidth?: string
  className?: string
}

/**
 * 主-明细-标签页布局 —— 左主表 + 右标签页明细。
 *
 * @component MasterDetailTabs
 * @category layout/business
 * @since 0.2.0
 */
function MasterDetailTabs({
  master,
  details,
  activeDetail,
  onDetailChange,
  masterWidth = "40%",
  className,
}: MasterDetailTabsProps) {
  const detailKeys = Object.keys(details)
  const [active, setActive] = React.useState(activeDetail || detailKeys[0] || "")

  return (
    <div className={cn("flex h-full flex-col gap-0 lg:flex-row", className)}>
      <div className="shrink-0 overflow-auto border-r lg:w-[40%]" style={{ width: masterWidth }}>
        {master}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Tabs value={active} onValueChange={(v) => { setActive(v); onDetailChange?.(v) }}>
          <div className="border-b px-4 pt-2">
            <TabsList>
              {detailKeys.map((key) => (
                <TabsTrigger key={key} value={key}>
                  {details[key]!.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {detailKeys.map((key) => (
            <TabsContent key={key} value={key} className="flex-1 overflow-auto p-4 m-0">
              {details[key]!.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export { MasterDetailTabs }
export type { MasterDetailTabsProps }
