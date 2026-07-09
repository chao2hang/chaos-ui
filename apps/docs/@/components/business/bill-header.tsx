"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui";

interface BillHeaderField {
  /** 字段标签 */
  label: string;
  /** 渲染字段内容（可以是值或自定义 ReactNode） */
  value: React.ReactNode;
  /** 该字段占多少列（默认 1，在 4 列中为 1/4） */
  span?: number;
  /** 是否隐藏（常用于条件字段） */
  hidden?: boolean;
}

interface BillHeaderProps {
  /** 字段配置数组 */
  fields: BillHeaderField[];
  /** 标题 */
  title?: React.ReactNode;
  /** 卡片标题右侧操作 */
  extra?: React.ReactNode;
  /** 列数（1-6，默认根据 span 自动计算，最大 4） */
  columns?: 1 | 2 | 3 | 4;
  /** 只读模式 */
  readOnly?: boolean;
  /** 加载态 */
  loading?: boolean;
  className?: string;
}

/**
 * 单据头区 —— 以网格形式渲染单据的基本信息字段。
 * 对标 qxy-mop 所有单据页的"单据信息" Card。
 *
 * @component BillHeader
 * @category business/bills
 * @since 0.2.0
 */
function BillHeader({
  fields = [],
  title = "单据信息",
  extra,
  columns = 4,
  loading = false,
  className,
}: Omit<BillHeaderProps, "readOnly">) {
  const visibleFields = fields.filter((f) => !f.hidden);

  const gridCols: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <Card data-slot="bill-header" className={className}>
      <CardContent className="pt-6">
        {/* Title row */}
        {(title || extra) && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-foreground text-sm font-semibold">{title}</h3>
            {extra && <div>{extra}</div>}
          </div>
        )}

        {/* Fields grid */}
        <div className={cn("grid gap-x-6 gap-y-3", gridCols[columns])}>
          {visibleFields.map((field, i) => (
            <div
              key={i}
              className={cn(
                "min-w-0",
                field.span && field.span > 1 && `col-span-${field.span}`,
              )}
            >
              <dt className="text-muted-foreground mb-1 text-xs font-medium">
                {field.label}
              </dt>
              <dd className="text-foreground text-sm break-words">
                {loading ? (
                  <span className="bg-muted inline-block h-4 w-24 animate-pulse rounded" />
                ) : (
                  field.value
                )}
              </dd>
            </div>
          ))}

          {/* Empty state */}
          {visibleFields.length === 0 && !loading && (
            <p className="text-muted-foreground col-span-full text-sm">
              暂无单据信息
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { BillHeader };
export type { BillHeaderProps, BillHeaderField };
