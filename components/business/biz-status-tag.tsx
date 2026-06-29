"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type BizStatus = "draft" | "pending" | "approved" | "rejected" | "rejected_mid" | string

interface BizStatusTagProps {
  status: BizStatus
  /** Custom status label (auto-detected by default) */
  label?: React.ReactNode
  /** Custom status color map */
  statusMap?: Record<string, { color: string; label: string; className?: string }>
  className?: string
}

const defaultStatusMap: Record<string, { color: string; label: string; className: string }> = {
  draft: {
    color: "#6b7280",
    label: "草稿",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  pending: {
    color: "#3b82f6",
    label: "审批中",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  approved: {
    color: "#22c55e",
    label: "已通过",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  rejected: {
    color: "#ef4444",
    label: "已驳回",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  rejected_mid: {
    color: "#f97316",
    label: "驳回中",
    className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  inactive: {
    color: "#6b7280",
    label: "已停用",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  active: {
    color: "#22c55e",
    label: "已启用",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
}

/**
 * 业务状态标签 —— 自动颜色映射 + 标准化文案。
 * 对标 qxy-mop 所有页面的 `<Tag color={statusMap[v].color}>`。
 *
 * @component BizStatusTag
 * @category business/status
 * @since 0.2.0
 */
function BizStatusTag({ status, label, statusMap: customMap, className }: BizStatusTagProps) {
  const map = { ...defaultStatusMap, ...customMap }
  const config = map[status]

  if (!config) {
    return (
      <span className={cn("inline-flex rounded-md px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground", className)}>
        {label || status}
      </span>
    )
  }

  return (
    <span className={cn("inline-flex rounded-md px-2 py-0.5 text-xs font-medium", config.className, className)}>
      {label || config.label}
    </span>
  )
}

export { BizStatusTag, defaultStatusMap }
export type { BizStatusTagProps, BizStatus }
