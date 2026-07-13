"use client";

// native-select-exception: help desk status control density
import * as React from "react";
import {
  TicketIcon,
  PlusIcon,
  SearchIcon,
  ClockIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  MessageCircleIcon,
  UserIcon,
  SendIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";

interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  replies?: TicketReply[];
}

interface TicketReply {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  isStaff?: boolean;
}

interface HelpDeskProps {
  /** Tickets / 工单列表 */
  tickets: Ticket[];
  /** Selected ticket ID (controlled) / 选中工单 */
  selectedTicketId?: string;
  /** Current user for new replies / 当前用户 */
  currentUser?: string;
  /** Called when a ticket is selected / 选中工单回调 */
  onSelectTicket?: (ticket: Ticket) => void;
  /** Called when a new reply is sent / 发送回复回调 */
  onSendReply?: (ticketId: string, content: string) => void;
  /** Called when creating a new ticket / 创建工单回调 */
  onCreateTicket?: () => void;
  /** Called when ticket status changes / 状态变更回调 */
  onStatusChange?: (ticketId: string, status: TicketStatus) => void;
  /** Additional class / 额外类名 */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusConfig: Record<
  TicketStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  open: {
    label: "待处理",
    icon: <AlertCircleIcon className="size-3" />,
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  in_progress: {
    label: "处理中",
    icon: <ClockIcon className="size-3" />,
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  resolved: {
    label: "已解决",
    icon: <CheckCircle2Icon className="size-3" />,
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  closed: {
    label: "已关闭",
    icon: <CheckCircle2Icon className="size-3" />,
    className: "bg-muted text-muted-foreground",
  },
};

const priorityConfig: Record<
  TicketPriority,
  { label: string; className: string }
> = {
  low: { label: "低", className: "text-muted-foreground" },
  medium: { label: "中", className: "text-blue-600" },
  high: { label: "高", className: "text-amber-600" },
  urgent: { label: "紧急", className: "text-red-600" },
};

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}小时前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}天前`;
  return d.toLocaleDateString("zh-CN");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function HelpDesk({
  tickets,
  selectedTicketId: controlledTicket,
  currentUser: _currentUser = "当前用户",
  onSelectTicket,
  onSendReply,
  onCreateTicket,
  onStatusChange,
  className,
}: HelpDeskProps) {
  const [internalTicket, setInternalTicket] = React.useState<string | null>(
    null,
  );
  const selectedTicketId = controlledTicket ?? internalTicket;
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<TicketStatus | "all">(
    "all",
  );
  const [replyText, setReplyText] = React.useState("");

  const selectTicket = (ticket: Ticket) => {
    if (!controlledTicket) setInternalTicket(ticket.id);
    onSelectTicket?.(ticket);
  };

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  const filteredTickets = React.useMemo(() => {
    let list = tickets;
    if (statusFilter !== "all") {
      list = list.filter((t) => t.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }
    return list;
  }, [tickets, statusFilter, searchQuery]);

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicketId) return;
    onSendReply?.(selectedTicketId, replyText);
    setReplyText("");
  };

  return (
    <div
      data-slot="help-desk"
      className={cn(
        "bg-background flex h-[500px] overflow-hidden rounded-lg border",
        className,
      )}
    >
      {/* Ticket list */}
      <div className="flex w-80 shrink-0 flex-col border-r">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-3 py-2">
          <h3 className="text-sm font-semibold">工单 ({tickets.length})</h3>
          {onCreateTicket && (
            <button
              type="button"
              onClick={onCreateTicket}
              className="text-muted-foreground hover:text-foreground rounded p-1"
              title="创建工单"
            >
              <PlusIcon className="size-4" />
            </button>
          )}
        </div>

        {/* Search + Filter */}
        <div className="border-b p-2">
          <div className="relative mb-2">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-3 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索工单..."
              className={cn(
                "border-input h-7 w-full rounded border bg-transparent pr-2 pl-6 text-xs",
                "focus-visible:border-ring outline-none",
              )}
            />
          </div>
          <div className="flex gap-1">
            {(["all", "open", "in_progress", "resolved"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "rounded px-2 py-0.5 text-[10px] transition-colors",
                  statusFilter === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted",
                )}
              >
                {s === "all"
                  ? "全部"
                  : (statusConfig[s as TicketStatus]?.label ?? s)}
              </button>
            ))}
          </div>
        </div>

        {/* Ticket list */}
        <div className="flex-1 overflow-auto">
          {filteredTickets.map((ticket) => {
            const status = statusConfig[ticket.status];
            const isSelected = ticket.id === selectedTicketId;
            return (
              <button
                key={ticket.id}
                type="button"
                onClick={() => selectTicket(ticket)}
                className={cn(
                  "flex w-full flex-col gap-1 border-b px-3 py-2.5 text-left transition-colors",
                  isSelected && "bg-accent",
                  !isSelected && "hover:bg-muted/30",
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium",
                      status.className,
                    )}
                  >
                    {status.icon}
                    {status.label}
                  </span>
                  {ticket.priority !== "low" && (
                    <span
                      className={cn(
                        "text-[10px]",
                        priorityConfig[ticket.priority].className,
                      )}
                    >
                      {priorityConfig[ticket.priority].label}
                    </span>
                  )}
                </div>
                <span className="truncate text-sm font-medium">
                  {ticket.title}
                </span>
                <div className="text-muted-foreground flex items-center gap-2 text-[10px]">
                  {ticket.assignee && (
                    <span className="flex items-center gap-0.5">
                      <UserIcon className="size-2.5" />
                      {ticket.assignee}
                    </span>
                  )}
                  <span>{formatTime(ticket.updatedAt)}</span>
                  {ticket.replies && ticket.replies.length > 0 && (
                    <span className="flex items-center gap-0.5">
                      <MessageCircleIcon className="size-2.5" />
                      {ticket.replies.length}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
          {filteredTickets.length === 0 && (
            <div className="text-muted-foreground py-8 text-center text-xs">
              暂无工单
            </div>
          )}
        </div>
      </div>

      {/* Ticket detail */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedTicket ? (
          <>
            {/* Detail header */}
            <div className="shrink-0 border-b px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">
                    {selectedTicket.title}
                  </h2>
                  <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                    <span>{selectedTicket.id}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <UserIcon className="size-3" />
                      {selectedTicket.assignee ?? "未分配"}
                    </span>
                    <span>·</span>
                    <span>{selectedTicket.createdAt}</span>
                  </div>
                </div>
                <select
                  value={selectedTicket.status}
                  onChange={(e) =>
                    onStatusChange?.(
                      selectedTicket.id,
                      e.target.value as TicketStatus,
                    )
                  }
                  className="border-input bg-background rounded border px-2 py-1 text-xs"
                >
                  {Object.keys(statusConfig).map((s) => (
                    <option key={s} value={s}>
                      {statusConfig[s as TicketStatus].label}
                    </option>
                  ))}
                </select>
              </div>
              {selectedTicket.description && (
                <p className="text-muted-foreground mt-2 text-sm">
                  {selectedTicket.description}
                </p>
              )}
            </div>

            {/* Replies */}
            <div className="flex-1 overflow-auto p-4">
              {selectedTicket.replies && selectedTicket.replies.length > 0 ? (
                <div className="space-y-4">
                  {selectedTicket.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className={cn(
                        "flex gap-3",
                        reply.isStaff && "flex-row-reverse",
                      )}
                    >
                      <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                        {reply.author[0]}
                      </div>
                      <div
                        className={cn(
                          "max-w-[75%]",
                          reply.isStaff ? "items-end" : "",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">
                            {reply.author}
                          </span>
                          {reply.isStaff && (
                            <span className="bg-primary/10 text-primary rounded px-1 py-0.5 text-[10px]">
                              客服
                            </span>
                          )}
                          <span className="text-muted-foreground text-[10px]">
                            {reply.createdAt}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "mt-1 rounded-lg px-3 py-2 text-sm",
                            reply.isStaff
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50",
                          )}
                        >
                          {reply.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                  <MessageCircleIcon className="size-8" />
                  <p className="text-sm">暂无对话</p>
                </div>
              )}
            </div>

            {/* Reply input */}
            <div className="shrink-0 border-t p-3">
              <div className="flex items-start gap-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="输入回复..."
                  rows={2}
                  className={cn(
                    "border-input flex-1 rounded-lg border bg-transparent px-3 py-2 text-sm",
                    "resize-none outline-none",
                    "placeholder:text-muted-foreground",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className={cn(
                    "text-primary hover:bg-primary/10 rounded-lg p-2",
                    "disabled:cursor-not-allowed disabled:opacity-30",
                  )}
                >
                  <SendIcon className="size-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
            <TicketIcon className="size-12" />
            <p className="text-sm">选择左侧工单查看详情</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { HelpDesk };
export type {
  HelpDeskProps,
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketReply,
};
