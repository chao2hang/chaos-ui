"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface MobileTabItem {
  value: string
  label: string
  content: React.ReactNode
}

interface MobileTabsProps {
  tabs: MobileTabItem[]
  defaultValue?: string
  className?: string
}

function MobileTabs({ tabs, defaultValue, className }: MobileTabsProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className={cn("w-full", className)}>
      <ScrollArea className="w-full border-b">
        <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="p-4 mt-0">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { MobileTabs }
export type { MobileTabItem, MobileTabsProps }
