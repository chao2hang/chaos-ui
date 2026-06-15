import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeftIcon } from "lucide-react"

interface DetailTab {
  value: string
  label: string
  content: React.ReactNode
}

function DetailLayout({
  title,
  subtitle,
  children,
  tabs,
  actions,
  onBack,
  className,
}: {
  title: string
  subtitle?: string
  children?: React.ReactNode
  tabs?: DetailTab[]
  actions?: React.ReactNode
  onBack?: () => void
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex items-start gap-4">
        {onBack && (
          <Button variant="ghost" size="icon-sm" onClick={onBack} className="mt-0.5">
            <ArrowLeftIcon />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {tabs ? (
        <Tabs defaultValue={tabs[0].value}>
          <TabsList variant="line">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        children
      )}
    </div>
  )
}

export { DetailLayout }
export type { DetailTab }
