"use client";

import * as React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Lock, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @component Result
 * @category ui/feedback
 * @since 0.5.0
 * @description Result page component for success/error/403/404/500 states.
 * / 结果页组件，统一异常和完成状态展示
 * @keywords result, success, error, 404, 403, 500, feedback
 * @example
 * <Result status="success" title="提交成功" />
 * <Result status="404" title="页面不存在" extra={<Button>返回首页</Button>} />
 */

type ResultStatus = "success" | "error" | "warning" | "info" | "403" | "404" | "500";

const statusConfig: Record<ResultStatus, { icon: React.ElementType; color: string }> = {
  success: { icon: CheckCircle2, color: "text-green-500" },
  error: { icon: XCircle, color: "text-red-500" },
  warning: { icon: AlertTriangle, color: "text-amber-500" },
  info: { icon: CheckCircle2, color: "text-blue-500" },
  403: { icon: Lock, color: "text-red-500" },
  404: { icon: SearchX, color: "text-muted-foreground" },
  500: { icon: XCircle, color: "text-red-500" },
};

interface ResultProps {
  /** Result status / 结果状态 */
  status?: ResultStatus;
  /** Title text / 标题 */
  title?: string;
  /** Subtitle / 描述 */
  subtitle?: string;
  /** Extra content (usually action buttons) / 额外内容（通常为操作按钮） */
  extra?: React.ReactNode;
  /** Custom icon / 自定义图标 */
  icon?: React.ReactNode;
  /** className */
  className?: string;
}

function Result({
  status = "info",
  title,
  subtitle,
  extra,
  icon: iconProp,
  className,
}: ResultProps) {
  const config = statusConfig[status] ?? statusConfig.info;
  const Icon = config.icon;

  return (
    <div
      data-slot="result"
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center text-center",
        className,
      )}
    >
      <div className="mb-4">
        {iconProp ?? <Icon className={cn("size-16", config.color)} />}
      </div>
      {typeof status === "string" && /^\d{3}$/.test(status) && (
        <h1 className="mb-2 text-6xl font-bold text-muted-foreground/30">{status}</h1>
      )}
      {title && <h2 className="mb-2 text-xl font-semibold">{title}</h2>}
      {subtitle && (
        <p className="mb-6 max-w-md text-sm text-muted-foreground">{subtitle}</p>
      )}
      {extra && <div className="flex items-center gap-3">{extra}</div>}
    </div>
  );
}

export { Result };
export type { ResultProps, ResultStatus };
