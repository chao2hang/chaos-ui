import { TrophyIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface ExperimentVariant {
  id: string;
  name: string;
  sampleSize: number;
  conversionRate: number;
  lift?: number;
  winner?: boolean;
}

export interface ExperimentSummaryProps {
  name: string;
  status?: "draft" | "running" | "completed";
  hypothesis?: string;
  variants: ExperimentVariant[];
  primaryMetric?: string;
  className?: string;
}

/**
 * @component ExperimentSummary
 * @category business/dashboard
 * @since 0.2.0
 * @description A/B experiment summary card showing variant comparison with conversion rates, lift, and winner badges / A/B 实验摘要卡片，展示变体对比、转化率、提升幅度及优胜标记
 * @keywords experiment, ab-test, variant, conversion, summary
 * @example
 * <ExperimentSummary name="Homepage Test" variants={[{ id: "a", name: "Control", sampleSize: 1000, conversionRate: 3.2 }]} />
 */
export function ExperimentSummary({
  name,
  status = "running",
  hypothesis,
  variants,
  primaryMetric,
  className,
}: ExperimentSummaryProps) {
  const { t } = useTranslation("marketing");
  const resolvedMetric = primaryMetric ?? t("experimentSummary.primaryMetric");
  return (
    <Card data-slot="experiment-summary" className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrophyIcon className="size-4" />
          {name}
          <Badge variant="secondary">
            {t(`experimentSummary.status.${status}`)}
          </Badge>
        </CardTitle>
        {hypothesis && <CardDescription>{hypothesis}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs font-medium text-muted-foreground">
          {resolvedMetric}
        </div>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">
                  {t("experimentSummary.variant")}
                </th>
                <th className="px-3 py-2 text-right font-medium">
                  {t("experimentSummary.sample")}
                </th>
                <th className="px-3 py-2 text-right font-medium">
                  {t("experimentSummary.rate")}
                </th>
                <th className="px-3 py-2 text-right font-medium">
                  {t("experimentSummary.lift")}
                </th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr
                  key={variant.id}
                  className={cn("border-t", variant.winner && "bg-success/10")}
                >
                  <td className="px-3 py-2 font-medium">
                    <span className="inline-flex items-center gap-2">
                      {variant.name}
                      {variant.winner && (
                        <Badge className="bg-success text-success-foreground">
                          {t("experimentSummary.winner")}
                        </Badge>
                      )}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {(variant.sampleSize ?? 0).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {(variant.conversionRate ?? 0).toFixed(2)}%
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {variant.lift === undefined
                      ? "-"
                      : `${variant.lift > 0 ? "+" : ""}${variant.lift.toFixed(1)}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
