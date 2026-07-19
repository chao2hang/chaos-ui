"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@chaos_team/chaos-ui/ui";
import {
  BadgeDollarSignIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  ReceiptIcon,
  TrendingUpIcon,
  WalletIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { formatMoney, type DemoRow } from "./mock-data";

function MetricCard({
  icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "info" | "success";
}) {
  const toneClass = {
    default: "bg-muted text-muted-foreground",
    info: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  }[tone];

  return (
    <Card className="border-border/80 shadow-xs">
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs font-medium">{label}</p>
          <p className="mt-2 truncate text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">{hint}</p>
        </div>
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${toneClass}`}
        >
          {icon}
        </span>
      </CardContent>
    </Card>
  );
}

export function AdminDashboardScene({
  rows,
  onOpenList,
}: {
  rows: DemoRow[];
  onOpenList: () => void;
}) {
  const pendingRows = rows.filter((row) => row.status === "pending");
  const confirmedRows = rows.filter((row) => row.status === "confirmed");
  const pendingAmount = pendingRows.reduce(
    (sum, row) => sum + row.netAmount,
    0,
  );
  const confirmedAmount = confirmedRows.reduce(
    (sum, row) => sum + row.netAmount,
    0,
  );
  const trend = [44, 56, 48, 72, 66, 84, 76];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-muted-foreground text-sm">
            周五，2026 年 7 月 19 日
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            早上好，运营团队
          </h2>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<ClipboardListIcon />}
          onClick={onOpenList}
        >
          查看对账任务
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<ClipboardCheckIcon className="size-4" />}
          label="待签认对账"
          value={String(pendingRows.length)}
          hint={`${formatMoney(pendingAmount)} 待处理`}
          tone="info"
        />
        <MetricCard
          icon={<WalletIcon className="size-4" />}
          label="本月应付净额"
          value={formatMoney(rows.reduce((sum, row) => sum + row.netAmount, 0))}
          hint="较上月 +8.4%"
          tone="success"
        />
        <MetricCard
          icon={<TrendingUpIcon className="size-4" />}
          label="已签认金额"
          value={formatMoney(confirmedAmount)}
          hint="签认完成率 62%"
        />
        <MetricCard
          icon={<ReceiptIcon className="size-4" />}
          label="本月对账单"
          value={String(rows.length)}
          hint="数据同步正常"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">费用趋势</CardTitle>
              <p className="text-muted-foreground mt-1 text-xs">
                近 7 日应付净额（万元）
              </p>
            </div>
            <BadgeDollarSignIcon className="text-muted-foreground size-5" />
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-2 border-b border-l px-3 pt-4 pb-0">
              {trend.map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className="bg-primary/75 hover:bg-primary w-full max-w-9 rounded-t-md transition-colors"
                    style={{ height: `${height}%` }}
                    title={`${height} 万元`}
                  />
                  <span className="text-muted-foreground text-[10px]">
                    {index + 13}日
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">待办事项</CardTitle>
              <p className="text-muted-foreground mt-1 text-xs">
                需要你今天处理的工作
              </p>
            </div>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
              {pendingRows.length} 项
            </span>
          </CardHeader>
          <CardContent className="space-y-1">
            {pendingRows.slice(0, 4).map((row) => (
              <button
                key={row.id}
                type="button"
                className="hover:bg-muted/60 flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 text-left transition-colors"
                onClick={onOpenList}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {row.distributor}
                  </span>
                  <span className="text-muted-foreground mt-0.5 block text-xs">
                    账期 {row.period}
                  </span>
                </span>
                <span className="text-primary shrink-0 text-xs">去处理 →</span>
              </button>
            ))}
            {pendingRows.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                今天没有待办事项
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
