"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";

/**
 * @component BarListCard
 * @category Business
 * @since 1.0.0-beta.0
 * @description 排名列表卡 — horizontal bar list inside a Card.
 * @param title Card title.
 * @param data Ranked entries with label/value and optional color.
 * @param className Extra classes on the root.
 * @example
 * ```tsx
 * <BarListCard title="销量TOP" data={[{label:"A",value:80},{label:"B",value:42}]} />
 * ```
 * 排名列表卡
 */
export interface BarListCardProps {
  /** Card heading. */
  title?: string;
  /** Ranked entries. */
  data?: Array<{ label: string; value: number; color?: string }>;
  className?: string;
}

const DEFAULT_BARLIST_DATA: Array<{
  label: string;
  value: number;
  color?: string;
}> = [
  { label: "华北", value: 86 },
  { label: "华东", value: 72 },
  { label: "华南", value: 54 },
  { label: "西部", value: 33 },
];

function BarListCard({
  title = "排名",
  data = DEFAULT_BARLIST_DATA,
  className,
}: BarListCardProps) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <Card data-slot="bar-list-card" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-2" role="list">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground w-5 shrink-0 tabular-nums">
                {i + 1}
              </span>
              <span className="text-muted-foreground w-20 shrink-0 truncate">
                {d.label}
              </span>
              <div
                className="bg-muted h-4 flex-1 overflow-hidden rounded"
                role="presentation"
              >
                <div
                  className="bg-primary h-full rounded"
                  style={{
                    width: `${(d.value / max) * 100}%`,
                    ...(d.color ? { backgroundColor: d.color } : {}),
                  }}
                />
              </div>
              <span className="w-12 shrink-0 text-right tabular-nums">
                {formatNumber(d.value)}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

export { BarListCard };
