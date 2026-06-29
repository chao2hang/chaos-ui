"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon, CopyIcon } from "@/components/ui"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

type MaskRule = "phone" | "idcard" | "bankcard" | "email" | "name" | "custom"

interface FieldMaskProps {
  /** 原始值 */
  value: string
  /** 脱敏规则 */
  mask?: MaskRule | ((val: string) => string)
  /** 允许查看明文（管理员等） */
  canView?: boolean
  className?: string
}

const DEFAULT_MASKS: Record<MaskRule, (val: string) => string> = {
  phone: (v) => (v.length >= 11 ? `${v.slice(0, 3)}****${v.slice(-4)}` : v),
  idcard: (v) =>
    v.length >= 18 ? `${v.slice(0, 4)}**********${v.slice(-4)}` : v,
  bankcard: (v) =>
    v.length >= 16 ? `${v.slice(0, 4)} **** **** ${v.slice(-4)}` : v,
  email: (v) => {
    const atPos = v.indexOf("@")
    if (atPos <= 1) return v
    return `${v[0]}***${v.slice(atPos)}`
  },
  name: (v) => {
    if (v.length <= 1) return v
    if (v.length === 2) return `${v[0]}*`
    return `${v[0]}${"*".repeat(v.length - 2)}${v[v.length - 1]}`
  },
  custom: (v) => v,
}

/**
 * 字段脱敏 —— 显示态/明文切换 + 复制还原。
 * 场景: 客户手机号 / 银行卡号 / 身份证号。
 *
 * @component FieldMask
 * @category business/permission
 * @since 0.2.0
 */
function FieldMask({
  value,
  mask = "phone",
  canView = false,
  className,
}: FieldMaskProps) {
  const [visible, setVisible] = React.useState(false)
  const [, copy] = useCopyToClipboard()

  const maskFn = typeof mask === "function" ? mask : DEFAULT_MASKS[mask]
  const display = canView || visible ? value : maskFn(value)

  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-sm", className)}>
      <span className="select-none">{display}</span>
      {!canView && (
        <Button
          variant="ghost"
          size="icon-xs"
          className="size-5"
          onClick={() => setVisible(!visible)}
          title={visible ? "隐藏" : "查看"}
        >
          {visible ? (
            <EyeOffIcon className="size-3" />
          ) : (
            <EyeIcon className="size-3" />
          )}
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon-xs"
        className="size-5"
        onClick={() => copy(value)}
        title="复制"
      >
        <CopyIcon className="size-3" />
      </Button>
    </span>
  )
}

export { FieldMask }
export type { FieldMaskProps, MaskRule }
