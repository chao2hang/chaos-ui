"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  ArrowRightIcon,
  Building2Icon,
  CheckCircle2Icon,
  SendIcon,
} from "@chaos_team/chaos-ui/ui";

/**
 * @component OaBridge
 * @category business/bill
 * @since 0.7.0
 * @description OA系统桥接 — 将业务单据提交至 OA(办公自动化)系统走审批，含提交状态反馈。
 * @param billId 业务单据 id
 * @param billType 业务单据类型(如"报销单")
 * @param onSubmit 提交至 OA 的异步回调，参数为单据 id
 * @example
 * <OaBridge billId="EXP-2026-001" billType="报销单" onSubmit={async (id) => {}} />
 */

interface OaBridgeProps {
  billId: string;
  billType: string;
  onSubmit?: (billId: string) => Promise<void>;
  className?: string;
}

function OaBridge({ billId, billType, onSubmit, className }: OaBridgeProps) {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    setStatus("submitting");
    setError(null);
    try {
      await onSubmit?.(billId);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "提交失败");
      setStatus("error");
    }
  };

  return (
    <div
      data-slot="oa-bridge"
      className={cn(
        "bg-card flex flex-col gap-3 rounded-lg border p-4",
        className,
      )}
      role="region"
      aria-label="OA 系统桥接"
    >
      <div className="flex items-center gap-3">
        <span className="bg-muted flex size-9 items-center justify-center rounded-lg">
          <Building2Icon className="text-muted-foreground size-5" />
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium">提交至 OA 系统</span>
          <span className="text-muted-foreground text-xs">
            {billType} · {billId}
          </span>
        </div>
        <ArrowRightIcon className="text-muted-foreground ml-auto size-4" />
      </div>
      <p className="text-muted-foreground text-sm">
        将该{billType}推送至 OA 系统发起审批流程，提交后可在 OA 端追踪审批进度。
      </p>
      {status === "done" ? (
        <div
          className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
          role="status"
        >
          <CheckCircle2Icon className="size-4" />
          已提交至 OA 系统，单据 {billId} 进入审批流程
        </div>
      ) : status === "error" ? (
        <div
          className="text-destructive flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm"
          role="alert"
        >
          提交失败：{error}
        </div>
      ) : null}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={status === "submitting" || status === "done"}
          icon={<SendIcon />}
          aria-busy={status === "submitting"}
        >
          {status === "submitting"
            ? "提交中"
            : status === "done"
              ? "已提交"
              : "提交至 OA"}
        </Button>
      </div>
    </div>
  );
}

export { OaBridge };
export type { OaBridgeProps };
