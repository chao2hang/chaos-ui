"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { LockIcon } from "@/components/ui/icons"

interface ForbiddenProps {
  /** 自定义标题 */
  title?: string
  /** 自定义描述 */
  description?: string
  /** 申请权限回调 */
  onRequestAccess?: () => void
  /** 自定义权限码 */
  code?: string
  className?: string
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
        "rounded-lg border border-dashed border-border",
        "bg-muted/30 p-12 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
        <LockIcon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
      {code && (
        <p className="mb-4 text-xs text-muted-foreground">
          权限码: <code className="rounded bg-muted px-1 py-0.5 font-mono">{code}</code>
        </p>
      )}
      {onRequestAccess && (
        <Button variant="outline" onClick={onRequestAccess}>
          申请权限
        </Button>
      )}
    </div>
  )
}

export { Forbidden }
export type { ForbiddenProps }
