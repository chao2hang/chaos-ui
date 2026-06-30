"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { formatCompactNumber } from "@/lib/format";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  LayoutDashboardIcon,
} from "@/components/ui";

/**
 * @component OverviewPage
 * @category Business
 * @since 1.0.0-beta.0
 * @description 总览页面模板 — 顶部 KPI 指标行 + 下方摘要/最近活动列表的标准总览页骨架。
 * @param title 页面标题
 * @param subtitle 副标题
 * @param kpis 顶部 KPI 指标数组
 * @param activities 最近活动条目数组（可选）
 * @param children 自定义内容区（可选，渲染在 KPI 下方）
 * @example
 * ```tsx
 * <OverviewPage
 *   title="经营总览"
 *   kpis={[{ label: "营收", value: 1280000, delta: 0.12 }]}
 *   activities={[{ id: "a1", text: "新增订单 120" }]}
 * />
 * ```
 */
interface OverviewPageProps {
  /** 页面标题 */
  title?: string;
  /** 副标题 */
  subtitle?: string;
  /** KPI 指标数组 */
  kpis?: Array<{
    label: string;
    value: number;
    delta?: number;
    unit?: string;
  }>;
  /** 最近活动条目 */
  activities?: Array<{ id: string; text: string; time?: string }>;
  /** 自定义内容区 */
  children?: React.ReactNode;
  className?: string;
}

function OverviewPage({
  title = "总览",
  subtitle = "",
  kpis = [],
  activities = [],
  children,
  className,
}: OverviewPageProps) {
  return (
    <div
      data-slot="overview-page"
      className={cn("flex flex-col gap-6", className)}
      role="region"
      aria-label={`${title}总览`}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <LayoutDashboardIcon className="size-5 text-primary" />
        </span>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <span className="text-sm text-muted-foreground">{subtitle}</span>}
        </div>
      </div>

      <section aria-label="关键指标" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => {
          const isUp = (k.delta ?? 0) >= 0;
          const DeltaIcon = isUp ? ArrowUpRightIcon : ArrowDownRightIcon;
          return (
            <div key={k.label} className="flex flex-col gap-1 rounded-lg border bg-card p-4">
              <span className="text-xs text-muted-foreground">{k.label}</span>
              <span className="text-2xl font-semibold tabular-nums">
                {formatCompactNumber(k.value)}
                {k.unit && <span className="ml-0.5 text-sm font-normal text-muted-foreground">{k.unit}</span>}
              </span>
              {k.delta !== undefined && (
                <span
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    isUp ? "text-emerald-600" : "text-destructive",
                  )}
                >
                  <DeltaIcon className="size-3" />
                  {isUp ? "+" : ""}
                  {(k.delta * 100).toFixed(1)}%
                </span>
              )}
            </div>
          );
        })}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section aria-label="自定义内容" className="lg:col-span-2">
          {children ?? (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              暂无自定义内容
            </div>
          )}
        </section>
        <section aria-label="最近活动" className="rounded-lg border bg-card p-4">
          <h2 className="mb-3 text-sm font-medium">最近活动</h2>
          {activities.length > 0 ? (
            <ol className="flex flex-col gap-3" role="list">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-foreground">{a.text}</span>
                    {a.time && <span className="text-xs text-muted-foreground">{a.time}</span>}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">暂无活动</p>
          )}
        </section>
      </div>
    </div>
  );
}

export { OverviewPage };
export type { OverviewPageProps };
