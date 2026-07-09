"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertTriangleIcon,
  RefreshCwIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ServerIcon,
  InboxIcon,
} from "lucide-react";

/**
 * @component IntegrationExceptionWorkbench
 * @category business
 * @since 1.2.0
 * @description 集成异常工作台 — 按集成类型分组(U8C/OA/WeCom)、异常级别、
 * 批量重试、payload 展开。适用于 S5 集成异常处理。
 * / Integration exception workbench — group by integration type, severity,
 * batch retry, payload expansion.
 * @keywords integration, exception, workbench, retry, u8c, oa, wecom, error
 * @example
 * <IntegrationExceptionWorkbench
 *   exceptions={[
 *     { id: "1", integrationType: "U8C", severity: "error", title: "凭证推送失败", payload: {...}, createdAt: "2026-07-01", retryable: true },
 *   ]}
 *   onRetry={(ids) => retryExceptions(ids)}
 * />
 */

export type IntegrationType = "U8C" | "OA" | "WeCom" | string;
export type ExceptionSeverity = "error" | "warning" | "info";

export interface IntegrationException {
  /** Unique ID / 唯一标识 */
  id: string;
  /** Integration type / 集成类型 */
  integrationType: IntegrationType;
  /** Severity level / 异常级别 */
  severity: ExceptionSeverity;
  /** Exception title / 异常标题 */
  title: string;
  /** Exception message / 异常信息 */
  message?: string;
  /** Request payload / 请求负载 */
  payload?: Record<string, unknown>;
  /** Created timestamp / 创建时间 */
  createdAt?: string;
  /** Whether retry is allowed / 是否允许重试 */
  retryable?: boolean;
  /** Retry count / 重试次数 */
  retryCount?: number;
}

export interface IntegrationExceptionWorkbenchProps {
  /** Exception list / 异常列表 */
  exceptions: IntegrationException[];
  /** Retry callback (batch) / 批量重试回调 */
  onRetry?: (ids: string[]) => void;
  /** Dismiss callback / 忽略回调 */
  onDismiss?: (ids: string[]) => void;
  /** Extra className / 额外样式 */
  className?: string;
}

const severityConfig: Record<
  ExceptionSeverity,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  error: {
    label: "严重",
    color: "text-red-600",
    bg: "bg-red-500/10 border-red-500/20",
    icon: <AlertTriangleIcon className="size-4" />,
  },
  warning: {
    label: "警告",
    color: "text-amber-600",
    bg: "bg-amber-500/10 border-amber-500/20",
    icon: <AlertTriangleIcon className="size-4" />,
  },
  info: {
    label: "信息",
    color: "text-blue-600",
    bg: "bg-blue-500/10 border-blue-500/20",
    icon: <InboxIcon className="size-4" />,
  },
};

const integrationTypeColors: Record<string, string> = {
  U8C: "text-orange-600 bg-orange-500/10",
  OA: "text-blue-600 bg-blue-500/10",
  WeCom: "text-green-600 bg-green-500/10",
};

function IntegrationExceptionWorkbench({
  exceptions,
  onRetry,
  onDismiss,
  className,
}: IntegrationExceptionWorkbenchProps) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(
    new Set(),
  );

  // Group by integration type
  const groups = React.useMemo(() => {
    const map = new Map<IntegrationType, IntegrationException[]>();
    for (const ex of exceptions) {
      const arr = map.get(ex.integrationType) ?? [];
      arr.push(ex);
      map.set(ex.integrationType, arr);
    }
    return Array.from(map.entries());
  }, [exceptions]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGroup = (type: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const selectAllInGroup = (type: IntegrationType) => {
    const groupExcs = exceptions.filter((e) => e.integrationType === type);
    const allSelected = groupExcs.every((e) => selected.has(e.id));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        groupExcs.forEach((e) => next.delete(e.id));
      } else {
        groupExcs.forEach((e) => next.add(e.id));
      }
      return next;
    });
  };

  const handleBatchRetry = () => {
    if (selected.size === 0) return;
    onRetry?.(Array.from(selected));
    setSelected(new Set());
  };

  return (
    <div
      data-slot="integration-exception-workbench"
      className={cn("w-full space-y-4", className)}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">异常工作台</span>
          <span className="text-muted-foreground text-xs">
            共 {exceptions.length} 条
          </span>
          {selected.size > 0 && (
            <span className="text-primary text-xs">
              已选 {selected.size} 条
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleBatchRetry}
          disabled={selected.size === 0}
        >
          <RefreshCwIcon className="size-3.5" /> 批量重试
        </Button>
      </div>

      {/* Groups */}
      {groups.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-12 text-sm">
          <InboxIcon className="size-8 opacity-50" />
          暂无集成异常
        </div>
      ) : (
        groups.map(([type, excs]) => {
          const isCollapsed = collapsedGroups.has(type);
          const typeColor =
            integrationTypeColors[type] ?? "text-gray-600 bg-gray-500/10";
          const allSelected = excs.every((e) => selected.has(e.id));

          return (
            <div key={type} className="overflow-hidden rounded-lg border">
              {/* Group header */}
              <div className="bg-muted/30 flex items-center gap-3 border-b px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => toggleGroup(type)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isCollapsed ? (
                    <ChevronRightIcon className="size-4" />
                  ) : (
                    <ChevronDownIcon className="size-4" />
                  )}
                </button>
                <span
                  className={cn(
                    "flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium",
                    typeColor,
                  )}
                >
                  <ServerIcon className="size-3" /> {type}
                </span>
                <span className="text-muted-foreground text-xs">
                  {excs.length} 条异常
                </span>
                <label className="ml-auto flex cursor-pointer items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => selectAllInGroup(type)}
                    className="accent-primary"
                  />
                  全选
                </label>
              </div>

              {/* Exception rows */}
              {!isCollapsed && (
                <div className="divide-y">
                  {excs.map((ex) => {
                    const sev = severityConfig[ex.severity];
                    const isSelected = selected.has(ex.id);
                    const isExpanded = expanded.has(ex.id);
                    return (
                      <div key={ex.id} className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(ex.id)}
                            className="accent-primary mt-0.5"
                          />
                          <div
                            className={cn(
                              "flex size-6 shrink-0 items-center justify-center rounded",
                              sev.bg,
                            )}
                          >
                            <span className={sev.color}>{sev.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {ex.title}
                              </span>
                              <span
                                className={cn(
                                  "rounded px-1.5 py-0.5 text-[10px]",
                                  sev.bg,
                                  sev.color,
                                )}
                              >
                                {sev.label}
                              </span>
                              {ex.retryCount && ex.retryCount > 0 && (
                                <span className="text-muted-foreground text-xs">
                                  已重试 {ex.retryCount} 次
                                </span>
                              )}
                            </div>
                            {ex.message && (
                              <p className="text-muted-foreground mt-0.5 text-xs">
                                {ex.message}
                              </p>
                            )}
                            {ex.createdAt && (
                              <p className="text-muted-foreground/60 mt-0.5 text-xs">
                                {ex.createdAt}
                              </p>
                            )}
                            {/* Payload expansion */}
                            {ex.payload && (
                              <div className="mt-2">
                                <button
                                  type="button"
                                  onClick={() => toggleExpand(ex.id)}
                                  className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs"
                                >
                                  {isExpanded ? (
                                    <ChevronDownIcon className="size-3" />
                                  ) : (
                                    <ChevronRightIcon className="size-3" />
                                  )}
                                  Payload
                                </button>
                                {isExpanded && (
                                  <pre className="bg-muted/50 mt-1 max-h-48 overflow-auto rounded border p-2 text-xs">
                                    {JSON.stringify(ex.payload, null, 2)}
                                  </pre>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex shrink-0 gap-1">
                            {ex.retryable !== false && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onRetry?.([ex.id])}
                              >
                                <RefreshCwIcon className="size-3" /> 重试
                              </Button>
                            )}
                            {onDismiss && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onDismiss([ex.id])}
                              >
                                忽略
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export { IntegrationExceptionWorkbench };
