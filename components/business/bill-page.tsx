"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * @component BillPage
 * @category business/bill
 * @since 0.2.0
 * @description 单据页面骨架 / Bill page skeleton with header, content, and footer
 * @keywords bill, page, document, form, skeleton
 * @example
 * <BillPage title="费用申请" status="draft" onBack={() => history.back()} actions={<Button>Submit</Button>}>
 *   <Content />
 * </BillPage>
 */

type BillStatus = "draft" | "pending" | "approved" | "rejected";

interface BillPageProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Bill title / 单据标题 */
  title?: React.ReactNode;
  /** Bill subtitle / 单据副标题 */
  subtitle?: React.ReactNode;
  /** Bill status / 单据状态 */
  status?: BillStatus;
  /** Back callback / 返回回调 */
  onBack?: () => void;
  /** Header actions / 头部操作 */
  actions?: React.ReactNode;
  /** Loading state / 加载状态 */
  loading?: boolean;
  /** Footer content (action bar) / 底部内容 */
  footer?: React.ReactNode;
  /** Whether to show back button / 是否显示返回按钮 */
  showBack?: boolean;
}

const statusConfig: Record<BillStatus, { label: string; color: string }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground" },
  pending: { label: "Pending", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  approved: { label: "Approved", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
};

function BillPage({
  className,
  title,
  subtitle,
  status,
  onBack,
  actions,
  loading = false,
  footer,
  showBack = true,
  children,
  ...props
}: BillPageProps) {
  return (
    <div
      data-slot="bill-page"
      className={cn("flex min-h-full flex-col bg-background", className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          {showBack && onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back">
              <ArrowLeft className="size-5" />
            </Button>
          )}
          <div>
            {loading ? (
              <Skeleton className="h-6 w-40" />
            ) : (
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {status && !loading && (
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-medium",
                statusConfig[status].color,
              )}
            >
              {statusConfig[status].label}
            </span>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          children
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-6 py-3">
          {footer}
        </div>
      )}
    </div>
  );
}

export { BillPage };
export type { BillPageProps };
