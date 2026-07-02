"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

type BillStatus = "draft" | "pending" | "approved" | "rejected";

interface BillFooterProps {
  /** 单据状态 */
  status: BillStatus;
  /** 存草稿 */
  onSaveDraft?: () => void;
  /** 提交 */
  onSubmit?: () => void;
  /** 取消 */
  onCancel?: () => void;
  /** 审批通过 */
  onApprove?: () => void;
  /** 驳回 */
  onReject?: () => void;
  /** 撤回 */
  onRecall?: () => void;
  /** 打印 */
  onPrint?: () => void;
  /** 作废 */
  onVoid?: () => void;
  /** 加载态 */
  loading?: boolean;
  /** 额外操作 */
  extra?: React.ReactNode;
  className?: string;
}

/**
 * 单据底部操作栏 —— 根据单据状态自动显示/隐藏对应按钮。
 * 对标 qxy-mop 所有单据页底部按钮组。
 *
 * @component BillFooter
 * @category business/bills
 * @since 0.2.0
 */
function BillFooter({
  status,
  onSaveDraft,
  onSubmit,
  onCancel,
  onApprove,
  onReject,
  onRecall,
  onPrint,
  onVoid,
  loading = false,
  extra,
  className,
}: BillFooterProps) {
  const renderDraft = status === "draft" && (
    <>
      {onSaveDraft && (
        <Button variant="outline" onClick={onSaveDraft} disabled={loading}>
          存草稿
        </Button>
      )}
      {onSubmit && (
        <Button onClick={onSubmit} disabled={loading}>
          提交
        </Button>
      )}
      {onCancel && (
        <Button variant="ghost" onClick={onCancel} disabled={loading}>
          取消
        </Button>
      )}
    </>
  );

  const renderPending = status === "pending" && (
    <>
      {onApprove && (
        <Button onClick={onApprove} disabled={loading}>
          审批通过
        </Button>
      )}
      {onReject && (
        <Button variant="outline" onClick={onReject} disabled={loading}>
          驳回
        </Button>
      )}
      {onRecall && (
        <Button variant="ghost" onClick={onRecall} disabled={loading}>
          撤回
        </Button>
      )}
    </>
  );

  const renderApproved = status === "approved" && (
    <>
      {onPrint && (
        <Button variant="outline" onClick={onPrint} disabled={loading}>
          打印
        </Button>
      )}
      {onVoid && (
        <Button
          variant="outline"
          className="text-destructive"
          onClick={onVoid}
          disabled={loading}
        >
          作废
        </Button>
      )}
    </>
  );

  const renderRejected = status === "rejected" && (
    <>
      {onSubmit && (
        <Button onClick={onSubmit} disabled={loading}>
          修改重提
        </Button>
      )}
      {onVoid && (
        <Button
          variant="outline"
          className="text-destructive"
          onClick={onVoid}
          disabled={loading}
        >
          作废
        </Button>
      )}
    </>
  );

  return (
    <div
      data-slot="bill-footer"
      className={cn(
        "bg-background flex items-center justify-between border-t px-6 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-2">{extra}</div>
      <div className="flex items-center gap-2">
        {renderDraft}
        {renderPending}
        {renderApproved}
        {renderRejected}
      </div>
    </div>
  );
}

export { BillFooter };
export type { BillFooterProps };
