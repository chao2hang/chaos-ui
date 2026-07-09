"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { PlusIcon, SearchIcon } from "@chaos_team/chaos-ui/ui";

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
          <form
            role="search"
            onSubmit={handleSearch}
            className="relative ml-auto"
          >
            <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2" />
            <input
              type="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="bg-background focus-visible:ring-ring h-8 w-56 rounded-lg border pr-3 pl-8 text-sm outline-none focus-visible:ring-2"
            />
          </form>
        )}
        {onCreate && (
          <Button type="button" onClick={onCreate} icon={<PlusIcon />}>
            新增
          </Button>
        )}
      </div>
      <div className="bg-card flex-1 rounded-lg border">
        {children ?? (
          <p className="text-muted-foreground p-8 text-center text-sm">
            暂无数据
          </p>
        )}
      </div>
    </div>
  );
}

export { MasterListTemplate };
export type { MasterListTemplateProps };
