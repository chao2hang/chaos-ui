"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import {
  MoreHorizontalIcon,
  SearchIcon,
  RefreshCwIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

interface CrudToolbarAction {
  key: string;
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface CrudToolbarProps {
  /** Left-side primary actions */
  primaryActions?: CrudToolbarAction[];
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search value */
  searchValue?: string;
  /** Search callback */
  onSearch?: (value: string) => void;
  /** Search input onChange */
  onSearchChange?: (value: string) => void;
  /** Whether to show search */
  showSearch?: boolean;
  /** More actions (dropdown) */
  moreActions?: CrudToolbarAction[];
  /** Row selection count */
  selectionCount?: number;
  /** Bulk action text */
  bulkActionLabel?: string;
  loading?: boolean;
  className?: string;
}

/**
 * CRUD 工具栏 —— 对标 qxy-mop 旧系统列表页顶部工具栏。
 * 内置搜索 + 新增/删除/刷新/导出/导入 + 更多操作下拉。
 *
 * @component CrudToolbar
 * @category business/layout
 * @since 0.2.0
 */
function CrudToolbar({
  primaryActions,
  searchPlaceholder,
  searchValue,
  onSearch,
  onSearchChange,
  showSearch = true,
  moreActions,
  selectionCount = 0,
  bulkActionLabel,
  loading = false,
  className,
}: CrudToolbarProps) {
  const { t } = useTranslation("ui");
  const resolvedSearchPlaceholder =
    searchPlaceholder ??
    t("list.searchPlaceholder", { defaultValue: "搜索..." });
  const defaultPrimary: CrudToolbarAction[] = primaryActions || [
    {
      key: "create",
      label: t("list.create", { defaultValue: "新增" }),
      icon: PlusIcon,
      onClick: () => {},
    },
    {
      key: "delete",
      label: t("list.delete", { defaultValue: "删除" }),
      icon: TrashIcon,
      onClick: () => {},
      danger: true,
    },
    {
      key: "refresh",
      label: t("list.refresh", { defaultValue: "刷新" }),
      icon: RefreshCwIcon,
      onClick: () => {},
    },
  ];

  return (
    <div
      data-slot="crud-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {/* Primary actions */}
      {selectionCount > 0 && bulkActionLabel ? (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {t("list.selected", {
              defaultValue: `已选 ${selectionCount} 项`,
              count: selectionCount,
            })}
          </span>
          <Button size="sm" variant="default">
            {bulkActionLabel}
          </Button>
        </div>
      ) : (
        defaultPrimary.map((action) => (
          <Button
            key={action.key}
            size="sm"
            variant={action.danger ? "outline" : "default"}
            className={cn(
              action.danger &&
                "border-destructive text-destructive hover:bg-destructive/10",
            )}
            onClick={action.onClick}
            disabled={action.disabled || loading}
          >
            {action.icon && <action.icon className="mr-1.5 size-3.5" />}
            {action.label}
          </Button>
        ))
      )}

      {/* Search */}
      {showSearch && (
        <div className="relative max-w-xs flex-1">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
          <Input
            size="sm"
            className="pl-8"
            placeholder={resolvedSearchPlaceholder}
            value={searchValue}
            onChange={(e) => {
              onSearchChange?.(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch?.(e.currentTarget.value);
            }}
          />
        </div>
      )}

      {/* More actions */}
      {moreActions && moreActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              type="button"
              className="hover:bg-accent hover:text-accent-foreground inline-flex h-7 w-7 items-center justify-center rounded-md border"
            >
              <MoreHorizontalIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {moreActions.map((action) => (
              <DropdownMenuItem
                key={action.key}
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(action.danger && "text-destructive")}
              >
                {action.icon && <action.icon className="mr-2 size-4" />}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export { CrudToolbar };
export type { CrudToolbarProps, CrudToolbarAction };
