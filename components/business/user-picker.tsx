"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchIcon, UserIcon, MailIcon, XIcon } from "@/components/ui/icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * A user item in the user picker.
 */
interface UserItem {
  /** Unique key / 唯一键 */
  key: string;
  /** User display name / 用户显示名 */
  name: string;
  /** Email address / 邮箱地址 */
  email?: string;
  /** Avatar URL / 头像地址 */
  avatar?: string;
  /** Department name / 部门名称 */
  department?: string;
}

/** Remote search params for `loadUsers`. Matching (incl. pinyin) is backend-owned. */
interface UserPickerLoadParams {
  /** Raw search keyword from the input; passed through unchanged. */
  keyword: string;
}

/**
 * Props for the UserPicker component.
 */
interface UserPickerProps {
  /** Whether the dialog is open / 对话框是否打开 */
  open?: boolean;
  /** Callback when open state changes / 打开状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** Callback when user confirms selection / 用户确认选择回调 */
  onConfirm?: (selected: string[]) => void;
  /** Allow multiple selections (default: true) / 是否允许多选 */
  multiple?: boolean;
  /** Currently selected keys / 当前选中的键 */
  selectedKeys?: string[];
  /**
   * Local static list. Used when `loadUsers` is omitted, or as seed while
   * remote results are loading.
   */
  users?: UserItem[];
  /**
   * Remote loader. When set, search calls this with the raw keyword (debounced).
   * Pinyin / fuzzy match must be implemented by the backend — the library only
   * ships the keyword through the API surface.
   * @example
   * loadUsers={async ({ keyword }) => {
   *   const res = await api.searchUsers({ q: keyword });
   *   return res.list.map((u) => ({ key: u.id, name: u.name, email: u.email }));
   * }}
   */
  loadUsers?: (params: UserPickerLoadParams) => Promise<UserItem[]>;
  /** Debounce for `loadUsers` in ms (default 300). */
  searchDebounceMs?: number;
  /** Additional className / 额外类名 */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  UserPicker - main export                                          */
/* ------------------------------------------------------------------ */

/**
 * @component UserPicker
 * @category business/user
 * @since 0.2.0
 * @description User selector dialog with search input, user list with
 *   checkboxes, and selected chips bar. Optional remote `loadUsers({ keyword })`
 *   — keyword is passed through; pinyin/fuzzy match is backend-owned.
 *   / 用户选择器对话框；可选远程 loadUsers，拼音等匹配由后端完成。
 * @keywords user, picker, dialog, select, search, checkbox, chips, remote
 * @example
 * ```tsx
 * <UserPicker
 *   open={open}
 *   onOpenChange={setOpen}
 *   loadUsers={async ({ keyword }) => api.searchUsers(keyword)}
 *   onConfirm={(keys) => console.log(keys)}
 * />
 * ```
 */
function UserPicker({
  open = false,
  onOpenChange,
  onConfirm,
  multiple = true,
  selectedKeys = [],
  users = [],
  loadUsers,
  searchDebounceMs = 300,
  className,
}: UserPickerProps) {
  const [internalSelected, setInternalSelected] =
    React.useState<string[]>(selectedKeys);
  const [query, setQuery] = React.useState("");
  const [remoteUsers, setRemoteUsers] = React.useState<UserItem[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setInternalSelected(selectedKeys);
  }, [selectedKeys]);

  React.useEffect(() => {
    if (!open || !loadUsers) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    const timer = window.setTimeout(() => {
      void loadUsers({ keyword: query })
        .then((rows) => {
          if (!cancelled) {
            setRemoteUsers(rows);
            setLoading(false);
          }
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            setLoadError(err instanceof Error ? err.message : "加载失败");
            setRemoteUsers([]);
            setLoading(false);
          }
        });
    }, searchDebounceMs);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [open, query, loadUsers, searchDebounceMs]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setRemoteUsers(null);
      setLoadError(null);
      setLoading(false);
    }
  }, [open]);

  const filteredUsers = React.useMemo(() => {
    if (loadUsers) {
      return remoteUsers ?? users;
    }
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.department?.toLowerCase().includes(q),
    );
  }, [users, query, loadUsers, remoteUsers]);

  const selectedUsers = React.useMemo(
    () =>
      internalSelected
        .map((k) => users.find((u) => u.key === k))
        .filter(Boolean) as UserItem[],
    [internalSelected, users],
  );

  const toggleUser = (key: string) => {
    setInternalSelected((prev) => {
      if (multiple) {
        return prev.includes(key)
          ? prev.filter((k) => k !== key)
          : [...prev, key];
      }
      return prev.includes(key) ? [] : [key];
    });
  };

  const removeSelected = (key: string) => {
    setInternalSelected((prev) => prev.filter((k) => k !== key));
  };

  const handleConfirm = () => {
    onConfirm?.(internalSelected);
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    setInternalSelected(selectedKeys);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-slot="user-picker"
        className={cn("sm:max-w-2xl", className)}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="text-primary size-4" />
            <span>选择用户</span>
          </DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="relative">
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            className="h-9 pl-8"
            placeholder="搜索姓名、邮箱或部门"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* User list */}
        <div
          className="max-h-[300px] overflow-y-auto rounded-lg border p-1"
          data-slot="user-picker-list"
        >
          {loading ? (
            <div
              className="text-muted-foreground flex h-32 items-center justify-center text-sm"
              data-slot="user-picker-loading"
            >
              加载中…
            </div>
          ) : loadError ? (
            <div
              className="text-destructive flex h-32 items-center justify-center text-sm"
              data-slot="user-picker-error"
            >
              {loadError}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-muted-foreground flex h-32 items-center justify-center text-sm">
              <UserIcon className="mr-1.5 size-4" />
              暂无用户
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = internalSelected.includes(user.key);
              return (
                <button
                  key={user.key}
                  type="button"
                  className={cn(
                    "hover:bg-muted flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors",
                    isSelected && "bg-muted",
                  )}
                  onClick={() => toggleUser(user.key)}
                >
                  <Checkbox checked={isSelected} className="shrink-0" />
                  <Avatar size="sm">
                    {user.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="size-full rounded-full object-cover"
                      />
                    ) : (
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <span className="truncate text-sm font-medium">
                      {user.name}
                    </span>
                    {user.email && (
                      <span className="text-muted-foreground flex items-center gap-1 truncate text-xs">
                        <MailIcon className="size-3" />
                        {user.email}
                      </span>
                    )}
                  </div>
                  {user.department && (
                    <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs">
                      {user.department}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Selected chips bar */}
        {selectedUsers.length > 0 && (
          <div className="flex flex-wrap gap-1.5 border-t pt-3">
            {selectedUsers.map((user) => (
              <span
                key={user.key}
                className="bg-muted inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs"
              >
                {user.name}
                <button
                  type="button"
                  className="hover:bg-accent rounded-full p-0.5"
                  onClick={() => removeSelected(user.key)}
                  aria-label={`移除 ${user.name}`}
                >
                  <XIcon className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-muted-foreground text-sm">
            已选 {internalSelected.length} 人
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              取消
            </Button>
            <Button size="sm" onClick={handleConfirm}>
              确定
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { UserPicker };
export type { UserPickerProps, UserItem, UserPickerLoadParams };
