"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NativeSelect } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "@/components/ui/icons";

/**
 * @component PaginationBar
 * @category business/data
 * @since 1.14.0
 * @description 表格分页栏（button onClick 原子），对齐 Ecology Table 分页交互。
 * 与 ui `Pagination`（anchor 路由）区分：本组件用于非路由表格场景（SearchTable /
 * ProTable / ReportTable），通过 `onChange(page, pageSize)` 回调驱动数据刷新。
 * / Table pagination bar with button onClick atoms (non-router). Use for
 * SearchTable / ProTable / ReportTable; ui `Pagination` (anchor) is for routes.
 * @keywords pagination, table, page, pager, size changer, jumper
 * @example
 * ```tsx
 * <PaginationBar
 *   total={100}
 *   page={1}
 *   pageSize={10}
 *   onChange={(page, pageSize) => fetchData(page, pageSize)}
 * />
 * ```
 */

export interface PaginationBarProps {
  /** Total item count. / 总条数 */
  total: number;
  /** Current page (1-based). / 当前页码（从 1 开始） */
  page: number;
  /** Items per page. / 每页条数 */
  pageSize: number;
  /** Callback when page or pageSize changes. / 页码/每页变化回调 */
  onChange: (page: number, pageSize: number) => void;
  /** Available page sizes. / 可选每页条数 */
  pageSizeOptions?: number[];
  /** Show the page-size selector (default true). / 显示每页条数选择器 */
  showSizeChanger?: boolean;
  /** Show the quick-jump input (default false). / 显示快速跳转输入框 */
  showQuickJumper?: boolean;
  /** Density: `sm` matches toolbar height (h-7). / 密度 */
  size?: "sm" | "default";
  className?: string;
}

/** Compute the visible page range with ellipsis. */
function getPageRange(
  current: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const range: (number | "ellipsis")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(totalPages - 1, current + 1);
  if (left > 2) range.push("ellipsis");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < totalPages - 1) range.push("ellipsis");
  range.push(totalPages);
  return range;
}

function PaginationBar({
  total,
  page,
  pageSize,
  onChange,
  pageSizeOptions = [10, 20, 50, 100],
  showSizeChanger = true,
  showQuickJumper = false,
  size = "sm",
  className,
}: PaginationBarProps) {
  const safePageSize = Math.max(1, pageSize || 1);
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const btnSize = size === "sm" ? "icon-sm" : "icon";
  const range = getPageRange(currentPage, totalPages);

  // Quick jumper
  const [jumpValue, setJumpValue] = React.useState("");
  const handleJump = () => {
    const n = parseInt(jumpValue, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= totalPages) {
      onChange(n, safePageSize);
    }
    setJumpValue("");
  };

  return (
    <div
      data-slot="pagination-bar"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-3 text-sm",
        className,
      )}
    >
      {/* Total count */}
      <span className="tabular-nums">
        共 <span className="text-foreground font-medium">{total}</span> 条
      </span>

      {/* Page size changer */}
      {showSizeChanger && (
        <NativeSelect
          size={size}
          value={String(safePageSize)}
          onChange={(e) => {
            const ps = Number(e.target.value);
            // Reset to page 1 when page size changes
            onChange(1, Math.max(1, ps || 1));
          }}
          className="h-7 w-auto"
          aria-label="每页条数"
          options={pageSizeOptions.map((n) => ({
            value: String(n),
            label: `${n} 条/页`,
          }))}
        />
      )}

      {/* Page buttons */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="outline"
          size={btnSize}
          disabled={currentPage <= 1}
          onClick={() => onChange(currentPage - 1, safePageSize)}
          aria-label="上一页"
        >
          <ChevronLeftIcon />
        </Button>

        {range.map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="text-muted-foreground inline-flex size-7 items-center justify-center"
            >
              <MoreHorizontalIcon className="size-4" />
            </span>
          ) : (
            <Button
              key={item}
              variant={item === currentPage ? "default" : "outline"}
              size={btnSize}
              onClick={() => onChange(item, safePageSize)}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size={btnSize}
          disabled={currentPage >= totalPages}
          onClick={() => onChange(currentPage + 1, safePageSize)}
          aria-label="下一页"
        >
          <ChevronRightIcon />
        </Button>
      </div>

      {/* Quick jumper */}
      {showQuickJumper && totalPages > 1 && (
        <div className="flex items-center gap-1">
          <span>跳至</span>
          <Input
            size={size}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleJump();
            }}
            onBlur={handleJump}
            className="h-7 w-14 text-center"
            inputMode="numeric"
            aria-label="跳转到页"
          />
          <span>页</span>
        </div>
      )}
    </div>
  );
}

export { PaginationBar };
