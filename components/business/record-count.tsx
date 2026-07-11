"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Build the common total-count description used on list page headers.
 * / 生成列表页常用的「共 N 条记录」文案
 *
 * @example
 * totalDescription(12) // "共 12 条记录"
 * totalDescription(3, "人") // "共 3 人"
 */
export function totalDescription(total: number, unit = "条记录"): string {
  return `共 ${total} ${unit}`;
}

export interface RecordCountProps extends React.ComponentProps<"span"> {
  total: number;
  /** Unit after the number. Default: 条记录 */
  unit?: string;
  /** When true, omit the leading 共. Default false */
  bare?: boolean;
}

/**
 * @component RecordCount
 * @category business/ux
 * @since 1.5.0
 * @description Inline total-count text for PageHeader.description or list toolbars.
 * / 列表总数文案，可直接塞 PageHeader.description 或工具条。
 * @keywords total, count, records, list, header
 * @example
 * <PageHeader title="订单" description={<RecordCount total={total} />} />
 * // or description={totalDescription(total)}
 */
export function RecordCount({
  total,
  unit = "条记录",
  bare = false,
  className,
  ...props
}: RecordCountProps) {
  const text = bare ? `${total} ${unit}` : totalDescription(total, unit);
  return (
    <span
      data-slot="record-count"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {text}
    </span>
  );
}
