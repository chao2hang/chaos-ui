import { CalendarDaysIcon, DollarSignIcon, RadioTowerIcon } from "lucide-react"
import type { ReactNode } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CampaignStatusTag } from "@/components/business/campaign-status-tag"
import type { CampaignStatus } from "@/components/business/campaign-status-tag"
import type { MarketingChannel } from "@/components/business/channel-picker"
import { cn } from "@/lib/utils"

export interface CampaignMetric {
  label: string
  value: string | number
  helper?: string
}

export interface CampaignCardProps {
  name: string
  description?: string
  status: CampaignStatus
  channels: MarketingChannel[]
  dateRange?: string
  budget?: number
  spent?: number
  currency?: string
  metrics?: CampaignMetric[]
  actions?: ReactNode
  className?: string
}

function formatBudget(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function CampaignCard({
  name,
  description,
  status,
  channels,
  dateRange,
  budget,
  spent = 0,
  currency = "USD",
  metrics = [],
  actions,
  className,
}: CampaignCardProps) {
  const budgetPercent = budget ? Math.min(Math.round((spent / budget) * 100), 100) : undefined

  return (
    <Card data-slot="campaign-card" className={className}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <CardAction>
          <CampaignStatusTag status={status} />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <RadioTowerIcon className="size-3.5" />
            {channels.join(", ")}
          </span>
          {dateRange && (
            <span className="inline-flex items-center gap-1">
              <CalendarDaysIcon className="size-3.5" />
              {dateRange}
            </span>
          )}
          {budget !== undefined && (
            <span className="inline-flex items-center gap-1">
              <DollarSignIcon className="size-3.5" />
              {formatBudget(budget, currency)}
            </span>
          )}
        </div>
        {budgetPercent !== undefined && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatBudget(spent, currency)} spent</span>
              <span>{budgetPercent}%</span>
            </div>
            <Progress value={budgetPercent} />
          </div>
        )}
        {metrics.length > 0 && (
          <div className="grid gap-2 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className={cn("rounded-lg border p-3")}>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
                <div className="text-lg font-semibold tabular-nums">{metric.value}</div>
                {metric.helper && <div className="text-xs text-muted-foreground">{metric.helper}</div>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {actions && <CardFooter className="justify-end gap-2">{actions}</CardFooter>}
    </Card>
  )
}
