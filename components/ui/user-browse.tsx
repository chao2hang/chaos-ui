"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchIcon, XIcon, UserIcon } from "@/components/ui/icons";

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  department?: string;
}

/** Remote search params for `loadUsers`. Matching (incl. pinyin) is backend-owned. */
interface UserBrowseLoadParams {
  /** Raw search keyword from the input; passed through unchanged. */
  keyword: string;
}

interface UserBrowseProps {
  value?: User | User[];
  defaultValue?: User | User[];
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  maxCount?: number;
  /**
   * Local static list. Used when `loadUsers` is omitted, or as the empty-keyword
   * seed while remote results are loading.
   */
  users?: User[];
  /**
   * Remote loader. When set, dialog search calls this with the raw keyword
   * (debounced). Pinyin / fuzzy match must be implemented by the backend.
   * @example
   * loadUsers={async ({ keyword }) => {
   *   const res = await api.searchUsers({ q: keyword });
   *   return res.list;
   * }}
   */
  loadUsers?: (params: UserBrowseLoadParams) => Promise<User[]>;
  /** Debounce for `loadUsers` in ms (default 300). */
  searchDebounceMs?: number;
  onChange?: (value: User | User[] | undefined) => void;
  onBrowse?: () => void;
  className?: string;
  /** Trigger height: default min-h-8; sm aligns with Button/SelectTrigger h-7 */
  size?: "sm" | "default";
}

const defaultUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Design",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "Marketing",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    department: "Engineering",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    department: "Sales",
  },
];

/**
 * @component UserBrowse
 * @category ui/user
 * @since 0.2.0
 * @description User picker dialog with search, avatar display, single/multi-select, and department badges.
 * Supports optional remote `loadUsers({ keyword })` — keyword is passed through; pinyin/fuzzy match is backend-owned.
 * / 用户选择器对话框，支持搜索、头像、单/多选、部门标签；可选远程 loadUsers，拼音等匹配由后端完成。
 * @keywords user, browse, picker, select, avatar, department, remote, 用户选择
 * @example
 * <UserBrowse
 *   loadUsers={async ({ keyword }) => api.searchUsers(keyword)}
 *   value={selectedUser}
 *   onChange={setSelectedUser}
 *   multiple
 * />
 */
function UserBrowse({
  value: controlledValue,
  defaultValue,
  placeholder = "Select user...",
  disabled,
  multiple = false,
  maxCount,
  users = defaultUsers,
  loadUsers,
  searchDebounceMs = 300,
  onChange,
  className,
  size = "default",
}: UserBrowseProps) {
  const isSm = size === "sm";
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [remoteUsers, setRemoteUsers] = React.useState<User[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<User[]>(
    Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : [],
  );
  const value = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : uncontrolledValue;

  // Remote: debounce keyword → loadUsers. Local: client-side includes filter.
  React.useEffect(() => {
    if (!open || !loadUsers) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    const timer = window.setTimeout(() => {
      void loadUsers({ keyword: search })
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
  }, [open, search, loadUsers, searchDebounceMs]);

  React.useEffect(() => {
    if (!open) {
      setSearch("");
      setRemoteUsers(null);
      setLoadError(null);
      setLoading(false);
    }
  }, [open]);

  const filteredUsers = React.useMemo(() => {
    if (loadUsers) {
      return remoteUsers ?? users;
    }
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.department?.toLowerCase().includes(q),
    );
  }, [users, search, loadUsers, remoteUsers]);

  const handleSelect = (user: User) => {
    let newValue: User[];
    if (multiple) {
      const isSelected = value.some((u) => u.id === user.id);
      if (!isSelected && maxCount && value.length >= maxCount) return;
      newValue = isSelected
        ? value.filter((u) => u.id !== user.id)
        : [...value, user];
    } else {
      newValue = [user];
      setOpen(false);
    }
    setUncontrolledValue(newValue);
    onChange?.(multiple ? newValue : newValue[0]);
  };

  const handleRemove = (userId: string) => {
    const newValue = value.filter((u) => u.id !== userId);
    setUncontrolledValue(newValue);
    onChange?.(multiple ? newValue : newValue[0]);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUncontrolledValue([]);
    onChange?.(multiple ? [] : undefined);
  };

  return (
    <div
      data-slot="user-browse"
      data-size={size}
      className={cn("w-full", className)}
    >
      <div
        data-size={size}
        className={cn(
          "border-input flex w-full items-center gap-1 border bg-transparent px-2.5 text-sm transition-colors",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-input/30",
          isSm
            ? cn(
                "min-h-7 rounded-[min(var(--radius-md),10px)] py-0",
                !multiple && "h-7",
              )
            : "min-h-8 rounded-lg py-1",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <button
                type="button"
                className="flex flex-1 items-center gap-1 text-left"
              />
            }
            disabled={disabled}
          >
            {value.length > 0 ? (
              <div className="flex flex-1 flex-wrap gap-1">
                {value.map((user) => (
                  <Badge
                    key={user.id}
                    variant="secondary"
                    className={cn(
                      "gap-1",
                      isSm && "h-4 px-1.5 py-0 text-[10px] leading-none",
                    )}
                  >
                    <Avatar className={cn(isSm ? "size-3" : "size-4")}>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-[0.5rem]">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                    {!disabled && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(user.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemove(user.id);
                          }
                        }}
                        className="hover:bg-muted ml-0.5 flex cursor-pointer items-center rounded-full"
                      >
                        <XIcon className={cn(isSm ? "size-2.5" : "size-3")} />
                        <span className="sr-only">Remove</span>
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground flex-1">
                {placeholder}
              </span>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select User</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-1" data-slot="user-browse-list">
                {loading && (
                  <div
                    className="text-muted-foreground flex flex-col items-center justify-center py-8 text-sm"
                    data-slot="user-browse-loading"
                  >
                    加载中…
                  </div>
                )}
                {loadError && !loading && (
                  <div
                    className="text-destructive flex flex-col items-center justify-center py-8 text-sm"
                    data-slot="user-browse-error"
                  >
                    {loadError}
                  </div>
                )}
                {!loading &&
                  !loadError &&
                  filteredUsers.map((user) => {
                    const isSelected = value.some((u) => u.id === user.id);
                    return (
                      <div
                        key={user.id}
                        className={cn(
                          "hover:bg-muted flex cursor-pointer items-center gap-3 rounded-md p-2",
                          isSelected && "bg-muted",
                        )}
                        onClick={() => handleSelect(user)}
                      >
                        {multiple && <Checkbox checked={isSelected} />}
                        <Avatar className="size-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            <UserIcon className="size-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {user.name}
                          </p>
                          {user.email && (
                            <p className="text-muted-foreground truncate text-xs">
                              {user.email}
                            </p>
                          )}
                        </div>
                        {user.department && (
                          <Badge variant="outline" className="shrink-0">
                            {user.department}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                {!loading && !loadError && filteredUsers.length === 0 && (
                  <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
                    <UserIcon className="mb-2 size-8" />
                    <p className="text-sm">No users found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            {multiple && (
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>{value.length} user(s) selected</span>
                {maxCount && <span>Max: {maxCount}</span>}
              </div>
            )}
          </DialogContent>
        </Dialog>
        {value.length > 0 && !disabled && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleClear}
            className="shrink-0"
          >
            <XIcon className="size-3" />
            <span className="sr-only">Clear all</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export { UserBrowse };
export type { User, UserBrowseProps, UserBrowseLoadParams };
