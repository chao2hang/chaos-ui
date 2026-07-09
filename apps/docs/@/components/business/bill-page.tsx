"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Skeleton } from "@chaos_team/chaos-ui/ui";

export type BillStatus = "draft" | "pending" | "approved" | "rejected";

interface BillPageProps {
  /** 单据标题 */
  title: React.ReactNode;
  /** 副标题（如单据编号） */
  subtitle?: React.ReactNode;
  /** 当前单据状态 */
  status?: BillStatus;
  /** 返回回调 */
  onBack?: () => void;
  /** 顶部右侧操作区 */
  actions?: React.ReactNode;
  /** 加载态 */
  loading?: boolean;
  /** 额外 className */
  className?: string;
  children: React.ReactNode;
}

const statusLabels: Record<BillStatus, string> = {
  draft: "草稿",
  pending: "审批中",
  approved: "已通过",
  rejected: "已驳回",
};

const statusVariants: Record<BillStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  pending: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

/**
 * 单据页面骨架 —— 统一单据页的页头 + 内容区 + 底部操作栏结构。
 * 对标 qxy-mop 所有 page.tsx 的模板。
 *
 * @component BillPage
 * @category business/bills
 * @since 0.2.0
 */
function BillPage({
  title,
  subtitle,
  status,
  onBack,
  actions,
  loading = false,
  className,
  children,
}: BillPageProps) {
  return (
    <div
      data-slot="bill-page"
      className={cn("flex h-full flex-col", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon-sm" onClick={onBack}>
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Button>
          )}
          <div>
            {loading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              <h1 className="text-lg font-semibold">{title}</h1>
            )}
            {loading ? (
              <Skeleton className="mt-1 h-4 w-32" />
            ) : subtitle ? (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            ) : null}
          </div>
          {status && !loading && (
            <span
              className={cn(
                "ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                statusVariants[status],
              )}
            >
              {statusLabels[status]}
            </span>
          )}
        </div>
        {actions && !loading ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : loading ? (
          <Skeleton className="h-8 w-64" />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export { BillPage };
export type { BillPageProps };
