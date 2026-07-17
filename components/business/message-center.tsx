"use client";

import * as React from "react";
import {
  NotificationCenter,
  type NotificationItem,
  type NotificationTab,
} from "@/components/business/notification-center";

/**
 * @component MessageCenter
 * @category business/ux
 * @since 1.14.0
 * @description 顶栏消息中心，对齐 Ecology WeaMessageCenter：铃铛 + 未读数 + 分类 tab
 * + 列表 + 已读/跳转 + 加载更多。复用 NotificationCenter 铃铛面板，附加命令式 push
 * store（`useMessageCenter`），消费方可由 WebSocket/SSE/轮询写入。 / Top-bar message
 * center aligning with Ecology WeaMessageCenter: bell + unread + tabs + list +
 * mark-read/jump + load-more. Reuses the NotificationCenter bell panel and adds an
 * imperative push store (`useMessageCenter`).
 * @keywords message, center, bell, push, inbox, notification, unread
 * @example
 * ```tsx
 * const mc = useMessageCenter();
 * mc.push({ title: '流程到达', body: '报销单待审批', href: '/flow/1' });
 * <MessageCenter tabs={[{ key: 'todo', label: '待办' }]} onLoadMore={loadMore} />
 * ```
 */

export interface MessageItem extends NotificationItem {
  /** Longer body text (mapped to description for display). / 正文 */
  body?: string;
}

/* ------------------------------------------------------------------ */
/*  Module-level push store (no provider required)                      */
/* ------------------------------------------------------------------ */

interface MessageCenterState {
  items: MessageItem[];
  unreadCount: number;
}

type Listener = (state: MessageCenterState) => void;

const listeners = new Set<Listener>();
let state: MessageCenterState = { items: [], unreadCount: 0 };

function setState(next: Partial<MessageCenterState>) {
  state = { ...state, ...next };
  // Derive unreadCount from items if not explicitly set
  if (next.items && next.unreadCount === undefined) {
    state = {
      ...state,
      unreadCount: state.items.filter((i) => !i.read).length,
    };
  }
  listeners.forEach((l) => l(state));
}

/** Imperative message-center API (works without a React context). */
export interface MessageCenterApi {
  push: (item: MessageItem | MessageItem[]) => void;
  setItems: (items: MessageItem[]) => void;
  setUnread: (n: number) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
  open: () => void;
}

const openListeners = new Set<() => void>();

/** Imperative handle — call from anywhere (e.g. WebSocket onmessage). */
export const messageCenter: MessageCenterApi = {
  push(item) {
    const incoming = Array.isArray(item) ? item : [item];
    setState({ items: [...state.items, ...incoming] });
  },
  setItems(items) {
    setState({ items });
  },
  setUnread(n) {
    setState({ unreadCount: n });
  },
  markRead(id) {
    setState({
      items: state.items.map((i) => (i.id === id ? { ...i, read: true } : i)),
    });
  },
  markAllRead() {
    setState({
      items: state.items.map((i) => ({ ...i, read: true })),
      unreadCount: 0,
    });
  },
  clear() {
    setState({ items: [], unreadCount: 0 });
  },
  open() {
    openListeners.forEach((l) => l());
  },
};

/** Subscribe to the message-center store; returns the current state. */
export function useMessageCenter(): MessageCenterApi & {
  items: MessageItem[];
  unreadCount: number;
} {
  const [snap, setSnap] = React.useState<MessageCenterState>(state);
  React.useEffect(() => {
    const l: Listener = (s) => setSnap(s);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return { ...messageCenter, items: snap.items, unreadCount: snap.unreadCount };
}

/* ------------------------------------------------------------------ */
/*  MessageCenter component                                             */
/* ------------------------------------------------------------------ */

export interface MessageCenterProps {
  /** Controlled items (overrides the store when provided). */
  items?: MessageItem[];
  /** Controlled unread count (overrides the store when provided). */
  unreadCount?: number;
  /** Category tabs. */
  tabs?: NotificationTab[];
  /** Active tab key (controlled). */
  activeTab?: string;
  onTabChange?: (key: string) => void;
  /** Load-more callback. */
  onLoadMore?: () => void;
  /** Whether more items are loading. */
  loadingMore?: boolean;
  onItemClick?: (item: MessageItem) => void;
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onOpen?: () => void;
  align?: "start" | "center" | "end";
  className?: string;
  emptyText?: string;
  /** When true, bind to the module push store (default true). */
  useStore?: boolean;
}

function MessageCenter({
  items: itemsProp,
  unreadCount: unreadCountProp,
  tabs,
  activeTab,
  onTabChange,
  onLoadMore,
  loadingMore,
  onItemClick,
  onMarkRead,
  onMarkAllRead,
  onOpen,
  align,
  className,
  emptyText,
  useStore = true,
}: MessageCenterProps) {
  const store = useMessageCenter();
  const items = itemsProp ?? (useStore ? store.items : []);
  const [panelOpen, setPanelOpen] = React.useState(false);

  // Wire messageCenter.open() → open the NotificationCenter popover.
  React.useEffect(() => {
    if (!useStore) return;
    const l = () => {
      setPanelOpen(true);
      onOpen?.();
    };
    openListeners.add(l);
    return () => {
      openListeners.delete(l);
    };
  }, [useStore, onOpen]);

  const handleMarkRead = onMarkRead ?? (useStore ? store.markRead : undefined);
  const handleMarkAllRead =
    onMarkAllRead ?? (useStore ? store.markAllRead : undefined);

  // Map MessageItem.body → NotificationItem.description for display
  const mapped: NotificationItem[] = React.useMemo(
    () =>
      items.map((i) => ({
        ...i,
        description: i.description ?? i.body ?? "",
      })),
    [items],
  );

  return (
    <div data-slot="message-center" className={className}>
      <NotificationCenter
        notifications={mapped}
        open={panelOpen}
        onOpenChange={setPanelOpen}
        {...(unreadCountProp !== undefined
          ? { badgeCount: unreadCountProp }
          : {})}
        {...(handleMarkRead ? { onMarkRead: handleMarkRead } : {})}
        {...(handleMarkAllRead ? { onMarkAllRead: handleMarkAllRead } : {})}
        {...(onItemClick ? { onItemClick } : {})}
        {...(tabs ? { tabs } : {})}
        {...(activeTab ? { activeTab } : {})}
        {...(onTabChange ? { onTabChange } : {})}
        {...(onLoadMore ? { onLoadMore } : {})}
        {...(loadingMore !== undefined ? { loadingMore } : {})}
        {...(align ? { align } : {})}
        {...(emptyText ? { emptyText } : {})}
      />
    </div>
  );
}

export { MessageCenter };
