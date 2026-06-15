"use client"
import * as React from "react"
import { CookieIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CookieBannerProps {
  open?: boolean
  onAccept?: () => void
  onReject?: () => void
  onDismiss?: () => void
  title?: string
  description?: React.ReactNode
  acceptText?: string
  rejectText?: string
  policyUrl?: string
  policyText?: string
  storageKey?: string
  position?: "bottom" | "top" | "bottom-right" | "bottom-left"
  className?: string
}

export function CookieBanner({
  open,
  onAccept,
  onReject,
  onDismiss,
  title = "Cookie 使用提示",
  description = "我们使用 Cookie 提升您的体验。点击「接受」以启用全部功能，或在设置中自定义。",
  acceptText = "接受全部",
  rejectText = "仅必要",
  policyText = "隐私政策",
  policyUrl,
  storageKey = "cookie-consent",
  position = "bottom",
  className,
}: CookieBannerProps) {
  const [internal, setInternal] = React.useState<boolean>(() => {
    if (typeof window === "undefined" || storageKey === undefined) return true
    try {
      return localStorage.getItem(storageKey) === null
    } catch {
      return true
    }
  })

  const isOpen = open ?? internal

  const persist = (value: "accepted" | "rejected" | "dismissed") => {
    try {
      localStorage.setItem(storageKey, value)
    } catch {}
  }

  const accept = () => {
    persist("accepted")
    onAccept?.()
    if (open === undefined) setInternal(false)
  }

  const reject = () => {
    persist("rejected")
    onReject?.()
    if (open === undefined) setInternal(false)
  }

  const dismiss = () => {
    persist("dismissed")
    onDismiss?.()
    if (open === undefined) setInternal(false)
  }

  const positionClass: Record<NonNullable<CookieBannerProps["position"]>, string> = {
    bottom: "bottom-4 left-1/2 -translate-x-1/2",
    top: "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }

  if (!isOpen) return null

  return (
    <div
      data-slot="cookie-banner"
      role="dialog"
      aria-label="Cookie 偏好"
      className={cn(
        "fixed z-50 flex w-[min(640px,calc(100vw-2rem))] flex-col gap-3 rounded-lg border bg-popover p-4 shadow-xl sm:flex-row sm:items-center",
        positionClass[position],
        className
      )}
    >
      <CookieIcon className="size-5 shrink-0 text-muted-foreground" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">
          {description}
          {policyUrl && (
            <>
              {" "}
              <a href={policyUrl} className="text-primary hover:underline">
                {policyText}
              </a>
            </>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:flex-row">
        <Button variant="outline" size="sm" onClick={reject}>
          {rejectText}
        </Button>
        <Button size="sm" onClick={accept}>
          {acceptText}
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={dismiss}
          aria-label="关闭"
        >
          <XIcon />
        </Button>
      </div>
    </div>
  )
}
