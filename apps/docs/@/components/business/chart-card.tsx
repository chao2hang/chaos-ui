import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui";

/**
 * @component ChartCard
 * @category business/charts
 * @since 0.7.0
 * @description 图表卡片 — wraps a chart visualization in a titled Card.
 * @param title Heading shown in the card header.
 * @param description Optional sub-text under the title.
 * @param children The chart/visualization body.
 * @param footer Optional footer row (legend, source, actions).
 * @param className Extra classes on the root.
 * @example
 * <ChartCard title="月度营收" description="单位：万元">{...}</ChartCard>
 */

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

function ChartCard({
  title,
  description,
  children,
  footer,
  className,
}: ChartCardProps) {
  return (
    <Card data-slot="chart-card" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}

export { ChartCard };
export type { ChartCardProps };
