"use client"
import * as React from "react"
import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingPageProps extends React.ComponentProps<"div"> {
  title?: string
  description?: string
  icon?: React.ReactNode
  variant?: "spinner" | "dots" | "pulse"
}

export function LoadingPage({
  title = "加载中...",
  description,
  icon,
  variant = "spinner",
  className,
  ...props
}: LoadingPageProps) {
  return (
    <div
      data-slot="loading-page"
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center",
        className
      )}
      {...props}
    >
      {icon ?? (variant === "spinner" ? (
        <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
      ) : null)}
      {variant === "dots" && <DotsSpinner />}
      {variant === "pulse" && <PulseLoader />}
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}

function DotsSpinner() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  )
}

function PulseLoader() {
  return (
    <div className="relative size-10">
      <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
      <span className="absolute inset-2 rounded-full bg-primary" />
    </div>
  )
}

interface FullPageLoaderProps {
  show?: boolean
  children?: React.ReactNode
}

export function FullPageLoader({ show = true, children }: FullPageLoaderProps) {
  if (!show) return <>{children}</>
  return (
    <div className="relative min-h-screen">
      {children && <div className="pointer-events-none opacity-50">{children}</div>}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    </div>
  )
}
