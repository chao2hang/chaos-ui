import type { LucideIcon } from "lucide-react"
import { TrendingDownIcon, TrendingUpIcon, MinusIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
}: {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: LucideIcon
  className?: string
}) {
  const TrendIcon =
    changeType === "positive"
      ? TrendingUpIcon
      : changeType === "negative"
        ? TrendingDownIcon
        : MinusIcon

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="mt-1 flex items-center gap-1 text-xs">
            <TrendIcon
              className={cn(
                "size-3.5",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
