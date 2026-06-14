import { TrophyIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface ExperimentVariant {
  id: string
  name: string
  sampleSize: number
  conversionRate: number
  lift?: number
  winner?: boolean
}

export interface ExperimentSummaryProps {
  name: string
  status?: "draft" | "running" | "completed"
  hypothesis?: string
  variants: ExperimentVariant[]
  primaryMetric?: string
  className?: string
}

export function ExperimentSummary({
  name,
  status = "running",
  hypothesis,
  variants,
  primaryMetric = "Conversion rate",
  className,
}: ExperimentSummaryProps) {
  return (
    <Card data-slot="experiment-summary" className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrophyIcon className="size-4" />
          {name}
          <Badge variant="secondary">{status}</Badge>
        </CardTitle>
        {hypothesis && <CardDescription>{hypothesis}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs font-medium text-muted-foreground">{primaryMetric}</div>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Variant</th>
                <th className="px-3 py-2 text-right font-medium">Sample</th>
                <th className="px-3 py-2 text-right font-medium">Rate</th>
                <th className="px-3 py-2 text-right font-medium">Lift</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr key={variant.id} className={cn("border-t", variant.winner && "bg-success/10")}>
                  <td className="px-3 py-2 font-medium">
                    <span className="inline-flex items-center gap-2">
                      {variant.name}
                      {variant.winner && <Badge className="bg-success text-success-foreground">Winner</Badge>}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{variant.sampleSize.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{variant.conversionRate.toFixed(2)}%</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {variant.lift === undefined ? "-" : `${variant.lift > 0 ? "+" : ""}${variant.lift.toFixed(1)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
