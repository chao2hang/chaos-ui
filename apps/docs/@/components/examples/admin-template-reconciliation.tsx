"use client";

import * as React from "react";
import {
  ListPageShell,
  PageChrome,
  RecordCount,
  RefreshButton,
  SearchTable,
  StatusBadge,
  type SearchTableProps,
} from "@chaos_team/chaos-ui/business";
import {
  CheckIcon,
  ClipboardCheckIcon,
  EyeIcon,
  PlusIcon,
  ReceiptIcon,
  ShieldCheckIcon,
} from "@chaos_team/chaos-ui/ui-icons";
import { Button } from "@chaos_team/chaos-ui/ui";
import { RECONCILIATION_STATUS_MAPPING } from "./admin-template-config";
import { filterDemoRows, formatMoney, type DemoRow } from "./mock-data";

export function AdminReconciliationListScene({
  rows,
  onConfirm,
  onAdd,
  onRefresh,
  refreshing,
  onViewDetail,
}: {
  rows: DemoRow[];
  onConfirm: (id: string) => void;
  onAdd: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  onViewDetail: (id: string) => void;
}) {
  const [applied, setApplied] = React.useState<{
    period?: string;
    status?: string;
    distributor?: string;
  }>({});
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const filtered = React.useMemo(
    () => filterDemoRows(rows, applied),
    [rows, applied],
  );
  const visibleRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pendingCount = rows.filter((row) => row.status === "pending").length;
  const pendingAmount = rows
    .filter((row) => row.status === "pending")
    .reduce((sum, row) => sum + row.netAmount, 0);

  const columns: SearchTableProps<DemoRow>["columns"] = [
    {
      key: "period",
      title: "账期",
      dataIndex: "period",
      width: 108,
      hideOnMobile: true,
      render: (value) => (
        <span className="font-medium tabular-nums">{String(value)}</span>
      ),
    },
    {
      key: "distributor",
      title: "经销商",
      dataIndex: "distributor",
      width: 160,
      render: (_, row) => (
        <div className="min-w-36">
          <span className="block truncate font-medium">{row.distributor}</span>
          <span className="text-muted-foreground mt-0.5 block text-xs">
            ID {row.distributorId} · {row.period}
          </span>
          <span className="text-primary mt-0.5 block text-xs tabular-nums md:hidden">
            应付 {formatMoney(row.netAmount)}
          </span>
        </div>
      ),
    },
    {
      key: "orderAmount",
      title: "订单金额",
      dataIndex: "orderAmount",
      width: 140,
      align: "right",
      hideOnMobile: true,
      render: (value) => (
        <span className="tabular-nums">{formatMoney(Number(value))}</span>
      ),
    },
    {
      key: "deduction",
      title: "费用扣减",
      dataIndex: "deduction",
      width: 140,
      align: "right",
      hideOnMobile: true,
      render: (value) => (
        <span className="text-muted-foreground tabular-nums">
          {formatMoney(Number(value))}
        </span>
      ),
    },
    {
      key: "netAmount",
      title: "应付净额",
      dataIndex: "netAmount",
      width: 150,
      align: "right",
      hideOnMobile: true,
      render: (value) => (
        <span className="font-semibold tabular-nums">
          {formatMoney(Number(value))}
        </span>
      ),
    },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      width: 100,
      hideOnMobile: true,
      render: (value) => (
        <StatusBadge
          value={String(value)}
          mapping={RECONCILIATION_STATUS_MAPPING}
          size="sm"
          dot
        />
      ),
    },
    {
      key: "actions",
      title: "操作",
      width: 132,
      align: "right",
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <span className="md:hidden">
            <StatusBadge
              value={row.status}
              mapping={RECONCILIATION_STATUS_MAPPING}
              size="sm"
              dot
            />
          </span>
          {row.status === "pending" ? (
            <Button
              type="button"
              size="sm"
              icon={<CheckIcon />}
              onClick={() => onConfirm(row.id)}
            >
              签认
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              icon={<EyeIcon />}
              onClick={() => onViewDetail(row.id)}
            >
              明细
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageChrome variant="list">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
              <ReceiptIcon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold">对账签认</p>
              <p className="text-muted-foreground mt-1 truncate text-xs">
                核对经销商订单与费用扣减，完成签认后进入结算流程
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="text-muted-foreground">
              待签认{" "}
              <strong className="text-foreground ml-1 tabular-nums">
                {pendingCount}
              </strong>{" "}
              笔
            </span>
            <span className="text-muted-foreground">
              待付{" "}
              <strong className="text-foreground ml-1 tabular-nums">
                {formatMoney(pendingAmount)}
              </strong>
            </span>
          </div>
        </div>

        <div className="border-border/80 bg-card overflow-hidden rounded-lg border shadow-xs">
          <ListPageShell
            filterFields={[
              {
                key: "period",
                label: "账期",
                type: "input",
                placeholder: "如 2026-07",
              },
              {
                key: "status",
                label: "状态",
                type: "select",
                placeholder: "全部状态",
                options: [
                  { value: "pending", label: "待签认" },
                  { value: "confirmed", label: "已签认" },
                  { value: "closed", label: "已关闭" },
                ],
              },
              {
                key: "distributor",
                label: "经销商",
                type: "input",
                placeholder: "名称或 ID",
              },
            ]}
            onSearch={(values) => {
              setApplied({
                period:
                  typeof values.period === "string" ? values.period : undefined,
                status:
                  typeof values.status === "string" ? values.status : undefined,
                distributor:
                  typeof values.distributor === "string"
                    ? values.distributor
                    : undefined,
              });
              setPage(1);
            }}
            onReset={() => {
              setApplied({});
              setPage(1);
            }}
            toolbar={
              <>
                <RefreshButton onClick={onRefresh} loading={refreshing} />
                <Button
                  type="button"
                  size="sm"
                  icon={<PlusIcon />}
                  onClick={onAdd}
                >
                  新建对账单
                </Button>
              </>
            }
            extra={
              <div className="flex items-center gap-3">
                <RecordCount total={filtered.length} unit="笔" />
                <span className="text-muted-foreground hidden text-xs lg:inline">
                  最后同步 08:00
                </span>
              </div>
            }
          >
            <SearchTable<DemoRow>
              columns={columns}
              dataSource={visibleRows}
              rowKey="id"
              emptyText="没有匹配的对账单"
              pagination={{
                current: page,
                pageSize,
                total: filtered.length,
                onChange: (nextPage) => setPage(nextPage),
              }}
            />
          </ListPageShell>
        </div>
      </div>
    </PageChrome>
  );
}

export function AdminReconciliationDetailScene({
  row,
  onBack,
  onConfirm,
}: {
  row: DemoRow;
  onBack: () => void;
  onConfirm: (id: string) => void;
}) {
  return (
    <PageChrome variant="detail">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-3">
            <Button type="button" size="sm" variant="ghost" onClick={onBack}>
              返回列表
            </Button>
            <span
              className="text-border bg-border h-5 w-px"
              aria-hidden="true"
            />
            <div>
              <p className="text-base font-semibold">对账单详情</p>
              <p className="text-muted-foreground mt-1 font-mono text-xs">
                {row.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge
              value={row.status}
              mapping={RECONCILIATION_STATUS_MAPPING}
              size="sm"
              dot
            />
            {row.status === "pending" ? (
              <Button
                type="button"
                size="sm"
                icon={<CheckIcon />}
                onClick={() => onConfirm(row.id)}
              >
                签认
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,1fr)]">
          <section className="border-border/80 bg-card rounded-lg border shadow-xs">
            <div className="border-b px-4 py-3">
              <h2 className="text-sm font-semibold">金额信息</h2>
            </div>
            <dl className="grid gap-x-6 gap-y-5 p-4 sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground text-xs">账期</dt>
                <dd className="mt-1 text-sm font-medium">{row.period}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">经销商</dt>
                <dd className="mt-1 text-sm font-medium">{row.distributor}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">订单金额</dt>
                <dd className="mt-1 text-sm tabular-nums">
                  {formatMoney(row.orderAmount)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">费用扣减</dt>
                <dd className="mt-1 text-sm tabular-nums">
                  {formatMoney(row.deduction)}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground text-xs">应付净额</dt>
                <dd className="text-primary mt-1 text-2xl font-semibold tabular-nums">
                  {formatMoney(row.netAmount)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="border-border/80 bg-card rounded-lg border shadow-xs">
            <div className="border-b px-4 py-3">
              <h2 className="text-sm font-semibold">处理记录</h2>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex gap-3">
                <span className="bg-success/15 text-success flex size-7 shrink-0 items-center justify-center rounded-full">
                  <ClipboardCheckIcon className="size-3.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">对账单已生成</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    更新时间 {row.updatedAt}
                  </p>
                </div>
              </div>
              <div className="bg-border ml-3.5 h-5 w-px" aria-hidden="true" />
              <div className="flex gap-3">
                <span className="bg-info/15 text-info flex size-7 shrink-0 items-center justify-center rounded-full">
                  <ShieldCheckIcon className="size-3.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">
                    {row.signedAt ? "经销商已完成签认" : "等待经销商签认"}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {row.signedAt
                      ? `签认时间 ${row.signedAt}`
                      : "签认后进入结算流程"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageChrome>
  );
}
