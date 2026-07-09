import type { LucideIcon } from "@chaos_team/chaos-ui/ui-icons";
import {
  TrendingDownIcon,
  TrendingUpIcon,
  MinusIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

/**
 * @component StatCard
 * @category business/dashboard
 * @since 0.2.0
 * @description Dashboard stat card displaying a title, value, trend indicator, and optional icon / 仪表盘统计卡片，展示标题、数值、趋势指示和可选图标
 * @keywords stat, card, dashboard, metric, trend, kpi
 * @example
 * <StatCard title="Revenue" value="$12,345" change="+12.5%" changeType="positive" icon={DollarSignIcon} />
 */
function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  className?: string;
}) {
  const TrendIcon =
    changeType === "positive"
      ? TrendingUpIcon
      : changeType === "negative"
        ? TrendingDownIcon
        : MinusIcon;

  return (
    <Card data-slot="stat-card" className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        {Icon && <Icon className="text-muted-foreground size-4" />}
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
                changeType === "neutral" && "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground",
              )}
            >
              {change}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { StatCard };
