"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { LockIcon } from "@chaos_team/chaos-ui/ui-icons";

interface ForbiddenProps {
  /** 自定义标题 */
  title?: string;
  /** 自定义描述 */
  description?: string;
  /** 申请权限回调 */
  onRequestAccess?: () => void;
  /** 自定义权限码 */
  code?: string;
  className?: string;
}

/**
 * 无权限占位 —— 灰色蒙层 + 锁图标 + 申请权限按钮。
 * 可作为 PermissionWrapper 的默认 fallback。
 *
 * @component Forbidden
 * @category business/permission
 * @since 0.2.0
 */
function Forbidden({
  title = "暂无访问权限",
  description = "您没有访问此内容的权限，请联系管理员或申请权限。",
  onRequestAccess,
  code,
  className,
}: ForbiddenProps) {
  return (
    <div
      data-slot="forbidden"
      className={cn(
        "flex flex-col items-center justify-center",
        "border-border rounded-lg border border-dashed",
        "bg-muted/30 p-12 text-center",
        className,
      )}
    >
      <div className="bg-muted mb-4 flex size-16 items-center justify-center rounded-full">
        <LockIcon className="text-muted-foreground size-8" />
      </div>
      <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        {description}
      </p>
      {code && (
        <p className="text-muted-foreground mb-4 text-xs">
          权限码:{" "}
          <code className="bg-muted rounded px-1 py-0.5 font-mono">{code}</code>
        </p>
      )}
      {onRequestAccess && (
        <Button variant="outline" onClick={onRequestAccess}>
          申请权限
        </Button>
      )}
    </div>
  );
}

export { Forbidden };
export type { ForbiddenProps };
