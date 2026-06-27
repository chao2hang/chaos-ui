"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * @component BillFooter
 * @category business/bill
 * @since 0.2.0
 * @description 单据底部操作栏(根据状态自动显示/隐藏按钮) / Bill footer action bar with status-based button visibility
 * @keywords bill, footer, actions, submit, approve, reject, status
 * @example
 * <BillFooter status="draft" onSaveDraft={handleSave} onSubmit={handleSubmit} />
 */

type BillStatus = "draft" | "pending" | "approved" | "rejected";

interface BillFooterProps extends React.ComponentProps<"div"> {
  /** Bill status / 单据状态 */
  status?: BillStatus;
  /** Save draft callback / 存草稿回调 */
  onSaveDraft?: () => void;
  /** Submit callback / 提交回调 */
  onSubmit?: () => void;
  /** Cancel callback / 取消回调 */
  onCancel?: () => void;
  /** Approve callback / 通过回调 */
  onApprove?: () => void;
  /** Reject callback / 驳回回调 */
  onReject?: () => void;
  /** Recall callback / 撤回回调 */
  onRecall?: () => void;
  /** Print callback / 打印回调 */
  onPrint?: () => void;
  /** Void callback / 作废回调 */
  onVoid?: () => void;
  /** Edit & resubmit callback / 修改重提回调 */
  onResubmit?: () => void;
  /** Extra actions / 额外操作 */
  extra?: React.ReactNode;
  /** Whether buttons are loading / 按钮是否加载中 */
  loading?: boolean;
}

function BillFooter({
  className,
  status = "draft",
  onSaveDraft,
  onSubmit,
  onCancel,
  onApprove,
  onReject,
  onRecall,
  onPrint,
  onVoid,
  onResubmit,
  extra,
  loading = false,
  ...props
}: BillFooterProps) {
  return (
    <div
      data-slot="bill-footer"
      className={cn(
        "flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-6 py-3",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">{extra}</div>
      <div className="flex items-center gap-2">
        {status === "draft" && (
          <>
            {onCancel && (
              <Button variant="outline" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
            )}
            {onSaveDraft && (
              <Button variant="outline" onClick={onSaveDraft} disabled={loading}>
                Save Draft
              </Button>
            )}
            {onSubmit && (
              <Button variant="default" onClick={onSubmit} disabled={loading}>
                Submit
              </Button>
            )}
          </>
        )}

        {status === "pending" && (
          <>
            {onRecall && (
              <Button variant="outline" onClick={onRecall} disabled={loading}>
                Recall
              </Button>
            )}
            {onReject && (
              <Button variant="destructive" onClick={onReject} disabled={loading}>
                Reject
              </Button>
            )}
            {onApprove && (
              <Button variant="default" onClick={onApprove} disabled={loading}>
                Approve
              </Button>
            )}
          </>
        )}

        {status === "approved" && (
          <>
            {onPrint && (
              <Button variant="outline" onClick={onPrint} disabled={loading}>
                Print
              </Button>
            )}
            {onVoid && (
              <Button variant="destructive" onClick={onVoid} disabled={loading}>
                Void
              </Button>
            )}
          </>
        )}

        {status === "rejected" && (
          <>
            {onVoid && (
              <Button variant="destructive" onClick={onVoid} disabled={loading}>
                Void
              </Button>
            )}
            {onResubmit && (
              <Button variant="default" onClick={onResubmit} disabled={loading}>
                Edit & Resubmit
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { BillFooter };
export type { BillFooterProps, BillStatus };
