"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusIcon,
  Trash2Icon,
  DownloadIcon,
  UploadIcon,
  SearchIcon,
  RefreshCwIcon,
} from "lucide-react";

interface CrudToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  onAdd?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onRefresh?: () => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  selectedCount?: number;
  className?: string;
}

function CrudToolbar({
  onAdd,
  onDelete,
  onExport,
  onImport,
  onRefresh,
  onSearch,
  searchPlaceholder = "搜索...",
  selectedCount = 0,
  className,
  ...props
}: CrudToolbarProps) {
  const [query, setQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div
      data-slot="crud-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {onSearch && (
        <form onSubmit={handleSearch} className="flex items-center gap-1">
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 w-40 lg:w-56"
          />
          <Button type="submit" size="icon-sm" variant="ghost">
            <SearchIcon className="size-4" />
          </Button>
        </form>
      )}
      <div className="flex-1" />
      {selectedCount > 0 && onDelete && (
        <Button size="sm" variant="destructive" onClick={onDelete}>
          <Trash2Icon /> 删除 ({selectedCount})
        </Button>
      )}
      {onAdd && (
        <Button size="sm" onClick={onAdd}>
          <PlusIcon /> 新增
        </Button>
      )}
      {onImport && (
        <Button size="sm" variant="outline" onClick={onImport}>
          <UploadIcon /> 导入
        </Button>
      )}
      {onExport && (
        <Button size="sm" variant="outline" onClick={onExport}>
          <DownloadIcon /> 导出
        </Button>
      )}
      {onRefresh && (
        <Button size="icon-sm" variant="outline" onClick={onRefresh}>
          <RefreshCwIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}

export { CrudToolbar };
export type { CrudToolbarProps };
