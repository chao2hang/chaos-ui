"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva("text-xs font-medium", {
  variants: {
    status: {
      default: "bg-gray-100 text-gray-600",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      info: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
    },
  },
  defaultVariants: { status: "default" },
});

const defaultLabels: Record<string, string> = {
  default: "默认",
  success: "成功",
  warning: "警告",
  error: "错误",
  info: "信息",
  processing: "处理中",
};

interface StatusBadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  label?: string;
  dot?: boolean;
}

function StatusBadge({
  status = "default",
  label,
  dot = true,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge
      data-slot="status-badge"
      variant="outline"
      className={cn(badgeVariants({ status }), "gap-1", className)}
      {...(props as React.ComponentProps<"div">)}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-full",
            status === "success" && "bg-green-500",
            status === "warning" && "bg-yellow-500",
            status === "error" && "bg-red-500",
            status === "info" && "bg-blue-500",
            status === "processing" && "bg-purple-500",
            status === "default" && "bg-gray-400",
          )}
        />
      )}
      {label ?? defaultLabels[status ?? "default"]}
    </Badge>
  );
}

export { StatusBadge, badgeVariants };
export type { StatusBadgeProps };
