"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * @component BillHeader
 * @category business/bill
 * @since 0.2.0
 * @description 单据头区(自动渲染字段) / Bill header with auto-rendered fields
 * @keywords bill, header, form, fields, document
 * @example
 * <BillHeader
 *   title="订单信息"
 *   fields={[{ label: '订单号', value: 'ORD-001' }, { label: '客户', value: '张三' }]}
 *   columns={2}
 * />
 */

interface BillHeaderField {
  label: string;
  value: React.ReactNode;
  span?: number;
  render?: (value: React.ReactNode) => React.ReactNode;
}

interface BillHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  /** Section title / 区域标题 */
  title?: React.ReactNode;
  /** Field definitions / 字段定义 */
  fields?: BillHeaderField[];
  /** Number of columns / 列数 */
  columns?: 2 | 3 | 4;
  /** Whether fields are read-only / 是否只读 */
  readOnly?: boolean;
  /** Extra content (actions) / 额外内容 */
  extra?: React.ReactNode;
  /** Loading state / 加载状态 */
  loading?: boolean;
}

const columnsMap: Record<number, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

function BillHeader({
  className,
  title,
  fields = [],
  columns = 2,
  readOnly = true,
  extra,
  loading = false,
  ...props
}: BillHeaderProps) {
  return (
    <Card
      data-slot="bill-header"
      className={cn("w-full", className)}
      {...props}
    >
      {(title || extra) && (
        <CardHeader className="flex-row items-center justify-between">
          {title && <CardTitle className="text-base">{title}</CardTitle>}
          {extra && <div>{extra}</div>}
        </CardHeader>
      )}
      <CardContent>
        <div className={cn("grid gap-4", columnsMap[columns])}>
          {fields.map((field, index) => (
            <div
              key={index}
              className={cn("flex flex-col gap-1", field.span && `md:col-span-${field.span}`)}
            >
              <label className="text-xs font-medium text-muted-foreground">
                {field.label}
              </label>
              <div className="text-sm text-foreground">
                {loading ? (
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                ) : field.render ? (
                  field.render(field.value)
                ) : (
                  field.value ?? "—"
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { BillHeader };
export type { BillHeaderProps, BillHeaderField };
