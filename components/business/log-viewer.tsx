"use client";

import * as React from "react";
import { TerminalIcon } from "@/components/ui/icons";

import { cn } from "@/lib/utils";

export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | "TRACE";

export interface LogEntry {
  /** ISO timestamp or formatted time string / 时间戳或格式化时间字符串 */
  timestamp?: string;
  /** Log severity level / 日志级别 */
  level?: LogLevel;
  /** Log message content / 日志消息内容 */
  message: string;
  /** Source of the log entry (module/service) / 日志来源（模块/服务） */
  source?: string;
}

export interface LogViewerProps extends React.ComponentProps<"div"> {
  /** Array of log entries / 日志条目数组 */
  logs: LogEntry[];
  /** Container height in pixels / 容器高度（像素） */
  height?: number;
  /** Auto-scroll to bottom on new logs / 新日志到达时自动滚动到底部 */
  autoScroll?: boolean;
  /** Show timestamp column / 显示时间戳列 */
  showTimestamp?: boolean;
  /** Show level column / 显示级别列 */
  showLevel?: boolean;
  /** Text filter for log messages / 日志消息的文本过滤器 */
  filter?: string;
  /** Array of levels to include; empty/null means all / 要包含的级别数组；空表示全部 */
  levelFilter?: LogLevel[];
  /** Callback when user scrolls to bottom / 用户滚动到底部时的回调 */
  onReachBottom?: () => void;
  /** Loading state indicator / 加载状态指示器 */
  loading?: boolean;
}

const levelColorMap: Record<LogLevel, string> = {
  INFO: "text-cyan-400",
  WARN: "text-yellow-400",
  ERROR: "text-red-400",
  DEBUG: "text-zinc-400",
  TRACE: "text-zinc-500",
};

const levelBadgeMap: Record<LogLevel, string> = {
  INFO: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  WARN: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  ERROR: "bg-red-500/10 text-red-400 border-red-500/20",
  DEBUG: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  TRACE: "bg-zinc-600/10 text-zinc-500 border-zinc-600/20",
};

/**
 * @component LogViewer
 * @category business/ops
 * @since 0.2.0
 * @description Streaming log viewer with monospace dark terminal styling, level coloring, auto-scroll, and text/level filtering / 流式日志查看器，等宽暗色终端样式，级别着色，自动滚动和文本/级别过滤
 * @keywords log, viewer, terminal, streaming, ops, deploy, console
 * @example
 * <LogViewer
 *   logs={[{ timestamp: "2024-01-01T00:00:00Z", level: "INFO", message: "Server started" }]}
 *   height={400}
 *   autoScroll
 * />
 */
function LogViewer({
  logs = [],
  height = 400,
  autoScroll = true,
  showTimestamp = true,
  showLevel = true,
  filter,
  levelFilter = [],
  onReachBottom,
  loading = false,
  className,
  ...props
}: LogViewerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = React.useState(autoScroll);

  const filteredLogs = React.useMemo(() => {
    let result = logs;
    if (levelFilter.length > 0) {
      result = result.filter(
        (log) => !log.level || levelFilter.includes(log.level),
      );
    }
    if (filter) {
      const q = filter.toLowerCase();
      result = result.filter(
        (log) =>
          log.message.toLowerCase().includes(q) ||
          (log.source?.toLowerCase().includes(q) ?? false),
      );
    }
    return result;
  }, [logs, filter, levelFilter]);

  React.useEffect(() => {
    if (autoScrollEnabled && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [filteredLogs, autoScrollEnabled]);

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 2;
      if (isAtBottom) {
        setAutoScrollEnabled(autoScroll);
        onReachBottom?.();
      } else if (autoScroll) {
        setAutoScrollEnabled(false);
      }
    },
    [autoScroll, onReachBottom],
  );

  return (
    <div
      data-slot="log-viewer"
      className={cn(
        "relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs text-zinc-100",
        className,
      )}
      style={{ height }}
      {...props}
    >
      {loading && (
        <div className="absolute top-0 right-0 left-0 z-10 h-0.5 animate-pulse bg-cyan-500" />
      )}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-auto"
      >
        {filteredLogs.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-500">
            <TerminalIcon className="size-8 opacity-40" />
            <span>No logs to display</span>
          </div>
        ) : (
          <div className="px-3 py-2">
            {filteredLogs.map((log, i) => {
              const level = log.level ?? "INFO";
              return (
                <div
                  key={i}
                  className="flex items-start gap-2 py-0.5 leading-relaxed hover:bg-zinc-900"
                >
                  {showTimestamp && log.timestamp && (
                    <span className="shrink-0 text-zinc-600 select-none">
                      {log.timestamp}
                    </span>
                  )}
                  {showLevel && (
                    <span
                      className={cn(
                        "shrink-0 rounded border px-1 text-[0.65rem] leading-tight font-semibold",
                        levelBadgeMap[level],
                      )}
                    >
                      {level}
                    </span>
                  )}
                  {log.source && (
                    <span className="shrink-0 text-zinc-500 select-none">
                      [{log.source}]
                    </span>
                  )}
                  <span
                    className={cn(
                      "min-w-0 flex-1 break-all whitespace-pre-wrap",
                      levelColorMap[level],
                    )}
                  >
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!autoScrollEnabled && filteredLogs.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setAutoScrollEnabled(true);
            if (containerRef.current) {
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight;
            }
          }}
          className="absolute right-2 bottom-2 z-10 rounded bg-zinc-800 px-2 py-1 text-[0.65rem] text-zinc-300 transition-colors hover:bg-zinc-700"
        >
          Auto scroll
        </button>
      )}
    </div>
  );
}

export { LogViewer };
// LogEntry, LogViewerProps are exported via their interface declarations above
