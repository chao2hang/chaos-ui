"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type TableProps = React.ComponentProps<"table">;
export type TableHeaderProps = React.ComponentProps<"thead">;
export type TableBodyProps = React.ComponentProps<"tbody">;
export type TableFooterProps = React.ComponentProps<"tfoot">;
export type TableRowProps = React.ComponentProps<"tr">;
export type TableHeadProps = React.ComponentProps<"th">;
export type TableCellProps = React.ComponentProps<"td">;
export type TableCaptionProps = React.ComponentProps<"caption">;

/**
 * @component Table
 * @category ui/data-entry
 * @since 0.2.0
 * @description Root table component with horizontal scroll container / 表格根组件，带水平滚动容器
 * @keywords table, data, grid, 表格
 * @example
 * <Table>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 */
function Table({ className, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

/**
 * @component TableHeader
 * @category ui/data-entry
 * @since 0.2.0
 * @description Table header group (thead) with bottom border on rows / 表格头部组（thead），行带底部边框
 * @keywords table, header, thead, 表格头部
 * @example
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Name</TableHead>
 *   </TableRow>
 * </TableHeader>
 */
function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

/**
 * @component TableBody
 * @category ui/data-entry
 * @since 0.2.0
 * @description Table body group (tbody) with border-separated rows / 表格主体组（tbody），行带分隔边框
 * @keywords table, body, tbody, 表格主体
 * @example
 * <TableBody>
 *   <TableRow>
 *     <TableCell>Data</TableCell>
 *   </TableRow>
 * </TableBody>
 */
function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/**
 * @component TableFooter
 * @category ui/data-entry
 * @since 0.2.0
 * @description Table footer group (tfoot) with muted background and top border / 表格底部组（tfoot），带柔和背景和顶部边框
 * @keywords table, footer, tfoot, 表格底部
 * @example
 * <TableFooter>
 *   <TableRow>
 *     <TableCell>Summary</TableCell>
 *   </TableRow>
 * </TableFooter>
 */
function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component TableRow
 * @category ui/data-entry
 * @since 0.2.0
 * @description Table row (tr) with hover highlight and selection state / 表格行（tr），带悬停高亮和选中状态
 * @keywords table, row, tr, 表格行
 * @example
 * <TableRow>
 *   <TableCell>Cell content</TableCell>
 * </TableRow>
 */
function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component TableHead
 * @category ui/data-entry
 * @since 0.2.0
 * @description Table header cell (th) with bold text and left alignment / 表格头单元格（th），粗体文本左对齐
 * @keywords table, head, th, column-header, 表格头
 * @example
 * <TableHead>Column Name</TableHead>
 */
function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component TableCell
 * @category ui/data-entry
 * @since 0.2.0
 * @description Standard table data cell (td) with padding and vertical alignment / 标准表格数据单元格（td），带内边距和垂直对齐
 * @keywords table, cell, td, data, 表格单元格
 * @example
 * <TableCell>Data value</TableCell>
 */
function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component TableCaption
 * @category ui/data-entry
 * @since 0.2.0
 * @description Table caption element for descriptive titles or summaries / 表格标题元素，用于描述性标题或摘要
 * @keywords table, caption, description, 表格标题
 * @example
 * <TableCaption>A list of recent transactions.</TableCaption>
 */
function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
