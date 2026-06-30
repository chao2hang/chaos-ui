"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { PlusIcon, SearchIcon } from "@/components/ui";

/**
 * @component MasterListTemplate
 * @category business/bill
 * @since 0.7.0
 * @description 主数据列表模板 — 含标题、搜索框、新增按钮与列表内容区的标准列表页骨架。
 * @param title 页面标题
 * @param onCreate 新增回调
 * @param onSearch 搜索回调，参数为搜索关键词
 * @param searchPlaceholder 搜索框占位符
 * @param children 列表内容
 * @example
 * <MasterListTemplate title="供应商列表" onCreate={() => {}}>
 *   <table />
 * </MasterListTemplate>
 */

interface MasterListTemplateProps {
  title?: string;
  onCreate?: () => void;
  onSearch?: (keyword: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  className?: string;
}

function MasterListTemplate({
  title = "列表",
  onCreate,
  onSearch,
  searchPlaceholder = "搜索...",
  children,
  className,
}: MasterListTemplateProps) {
  const [keyword, setKeyword] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(keyword);
  };

  return (
    <div
      data-slot="master-list-template"
      className={cn("flex flex-col gap-4", className)}
      role="region"
      aria-label={`列表页 ${title}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onSearch && (
          <form role="search" onSubmit={handleSearch} className="relative ml-auto">
            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-8 w-56 rounded-lg border bg-background pl-8 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </form>
        )}
        {onCreate && (
          <Button type="button" onClick={onCreate} icon={<PlusIcon />}>
            新增
          </Button>
        )}
      </div>
      <div className="flex-1 rounded-lg border bg-card">
        {children ?? <p className="p-8 text-center text-sm text-muted-foreground">暂无数据</p>}
      </div>
    </div>
  );
}

export { MasterListTemplate };
export type { MasterListTemplateProps };
