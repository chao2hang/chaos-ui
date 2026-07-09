"use client";

import * as React from "react";
import { ColorTag, type ColorTagColor } from "@chaos_team/chaos-ui/business";

/**
 * Status mapping entry: [label, color].
 * value → 渲染文案 + ColorTag 语义色。
 */
type StatusEntry = [label: React.ReactNode, color: ColorTagColor];

/**
 * Mapping from a status value (string | number | boolean) to [label, color].
 * 支持任意业务状态码 → 标准化文案 + 语义色。
 */
type StatusMapping = Record<string, StatusEntry>;

/** Built-in presets for common status vocabularies. / 内置预置状态映射。 */
type StatusPreset = "biz" | "active-inactive" | "open-closed";

const PRESETS: Record<StatusPreset, StatusMapping> = {
  /** 通用审批/业务流转状态 / generic approval/business flow */
  biz: {
    draft: ["草稿", "default"],
    pending: ["处理中", "info"],
    processing: ["处理中", "info"],
    approved: ["已通过", "success"],
    active: ["已启用", "success"],
    success: ["成功", "success"],
    rejected: ["已驳回", "error"],
    failed: ["失败", "error"],
    canceled: ["已取消", "default"],
    inactive: ["已停用", "default"],
    closed: ["已关闭", "default"],
  },
  /** 激活/停用（boolean-like） / active vs inactive */
  "active-inactive": {
    "1": ["激活", "success"],
    "0": ["停用", "default"],
    true: ["激活", "success"],
    false: ["停用", "default"],
    active: ["激活", "success"],
    inactive: ["停用", "default"],
    yes: ["是", "success"],
    no: ["否", "default"],
  },
  /** 开/关状态 / open vs closed */
  "open-closed": {
    open: ["进行中", "info"],
    closed: ["已关闭", "default"],
    done: ["已完成", "success"],
    todo: ["待处理", "default"],
  },
};

interface StatusBadgeProps {
  /** Status value (string | number | boolean). / 状态值 */
  value: string | number | boolean;
  /**
   * Built-in preset mapping. / 内置预置映射。
   * - `biz`: 通用审批/业务流转（draft/pending/approved/rejected/...）
   * - `active-inactive`: 激活/停用（1/0, true/false, active/inactive）
   * - `open-closed`: 开/关（open/closed/done/todo）
   */
  preset?: StatusPreset;
  /**
   * Custom value → [label, color] mapping. Merged on top of preset.
   * / 自定义映射，与 preset 合并（自定义优先）。
   * @example { 1: ['激活','success'], 0: ['停用','default'] }
   */
  mapping?: StatusMapping;
  /** Override the rendered label (defaults to mapping label or value). / 覆盖文案 */
  label?: React.ReactNode;
  /** ColorTag size. / 尺寸 */
  size?: "sm" | "md" | "lg";
  /** Show a dot indicator. / 显示圆点 */
  dot?: boolean;
  className?: string;
}

/**
 * StatusBadge — 业务状态徽标，内置可配置的「状态码 → 文案 + 语义色」映射。
 *
 * 替代消费方反复手写的 statusColorOf() / migration-helpers.tsx：
 *
 * ```tsx
 * // 预置映射
 * <StatusBadge value={record.status} preset="biz" />
 * // 自定义映射（支持 number/boolean value）
 * <StatusBadge value={record.isActive} mapping={{ 1: ['激活','success'], 0: ['停用','default'] }} />
 * // preset + 自定义合并
 * <StatusBadge value={record.status} preset="biz" mapping={{ archived: ['归档','gold'] }} />
 * ```
 *
 * 基于 ColorTag 渲染（14 色板，含 antd 迁移色 gold/cyan/orange/...）。
 *
 * @component StatusBadge
 * @category business/status
 * @since 0.6.0
 * @keywords status, badge, tag, color, mapping, preset
 */
function StatusBadge({
  value,
  preset,
  mapping,
  label,
  size = "md",
  dot = false,
  className,
}: StatusBadgeProps) {
  const base = preset ? PRESETS[preset] : {};
  const merged = { ...base, ...(mapping ?? {}) };
  const key = String(value);
  const entry = merged[key];

  const text = label ?? entry?.[0] ?? value;
  const color: ColorTagColor = entry?.[1] ?? "default";

  return (
    <ColorTag color={color} size={size} dot={dot} className={className}>
      {text}
    </ColorTag>
  );
}

export { StatusBadge, PRESETS as STATUS_BADGE_PRESETS };
export type { StatusBadgeProps, StatusPreset, StatusMapping, StatusEntry };
