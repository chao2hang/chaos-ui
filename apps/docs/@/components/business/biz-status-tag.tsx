"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";

const tagVariants = cva("rounded-md font-medium", {
  variants: {
    status: {
      active: "bg-green-100 text-green-800 border-green-300",
      inactive: "bg-gray-100 text-gray-600 border-gray-300",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      processing: "bg-blue-100 text-blue-800 border-blue-300",
      error: "bg-red-100 text-red-800 border-red-300",
      completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
      cancelled: "bg-slate-100 text-slate-500 border-slate-300",
      warning: "bg-orange-100 text-orange-800 border-orange-300",
    },
  },
  defaultVariants: { status: "pending" },
});

const statusLabels: Record<string, string> = {
  active: "启用",
  inactive: "停用",
  pending: "待处理",
  processing: "处理中",
  error: "异常",
  completed: "已完成",
  cancelled: "已取消",
  warning: "警告",
};

interface BizStatusTagProps
  extends React.ComponentProps<"span">, VariantProps<typeof tagVariants> {
  label?: string;
}

function BizStatusTag({
  status = "pending",
  label,
  className,
  ...props
}: BizStatusTagProps) {
  return (
    <Badge
      data-slot="biz-status-tag"
      variant="outline"
      className={cn(tagVariants({ status }), className)}
      {...(props as React.ComponentProps<"div">)}
    >
      {label ?? statusLabels[status ?? "pending"] ?? status}
    </Badge>
  );
}

export { BizStatusTag, tagVariants, statusLabels };
export type { BizStatusTagProps };
