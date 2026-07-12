"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ColorTag, type ColorTagColor } from "@/components/business/color-tag";

type BizStatus =
  "draft" | "pending" | "approved" | "rejected" | "rejected_mid" | string;

interface BizStatusTagProps {
  status: BizStatus;
  /** Custom status label (auto-detected by default) */
  label?: React.ReactNode;
  /** Custom status color map — merged over defaults */
  statusMap?: Record<
    string,
    { color: string; label: string; className?: string; tone?: ColorTagColor }
  >;
  className?: string;
}

/** @deprecated Prefer ColorTag tones via StatusBadge / ColorTag for new maps. Kept for className overrides. */
const defaultStatusMap: Record<
  string,
  { color: string; label: string; className: string; tone: ColorTagColor }
> = {
  draft: {
    color: "#6b7280",
    label: "草稿",
    className: "",
    tone: "default",
  },
  pending: {
    color: "#3b82f6",
    label: "审批中",
    className: "",
    tone: "info",
  },
  approved: {
    color: "#22c55e",
    label: "已通过",
    className: "",
    tone: "success",
  },
  rejected: {
    color: "#ef4444",
    label: "已驳回",
    className: "",
    tone: "error",
  },
  rejected_mid: {
    color: "#f97316",
    label: "驳回中",
    className: "",
    tone: "orange",
  },
  inactive: {
    color: "#6b7280",
    label: "已停用",
    className: "",
    tone: "default",
  },
  active: {
    color: "#22c55e",
    label: "已启用",
    className: "",
    tone: "success",
  },
};

/**
 * 业务状态标签 —— 基于 ColorTag 的语义色 + 标准化文案。
 * 新代码优先 `StatusBadge preset="biz"`；本组件保留兼容 API。
 *
 * @component BizStatusTag
 * @category business/status
 * @since 0.2.0
 * @see StatusBadge, ColorTag, docs/api-boundaries.md
 */
function BizStatusTag({
  status,
  label,
  statusMap: customMap,
  className,
}: BizStatusTagProps) {
  const map = { ...defaultStatusMap, ...customMap };
  const config = map[status];

  if (!config) {
    return (
      <ColorTag
        data-slot="biz-status-tag"
        color="muted"
        size="sm"
        className={className}
      >
        {label || status}
      </ColorTag>
    );
  }

  const tone =
    (config as { tone?: ColorTagColor }).tone ?? ("default" as ColorTagColor);

  return (
    <ColorTag
      data-slot="biz-status-tag"
      color={tone}
      size="sm"
      className={cn(config.className, className)}
    >
      {label || config.label}
    </ColorTag>
  );
}

export { BizStatusTag, defaultStatusMap };
export type { BizStatusTagProps, BizStatus };
