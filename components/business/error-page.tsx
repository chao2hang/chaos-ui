import * as React from "react"
import Link from "next/link"
import {
  ArrowLeftIcon,
  HomeIcon,
  LifeBuoyIcon,
  SearchXIcon,
  ServerCrashIcon,
  ShieldAlertIcon,
  WrenchIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ErrorPageProps {
  status?: 403 | 404 | 500 | 503
  title?: string
  description?: string
  homeHref?: string
  showHome?: boolean
  showBack?: boolean
  onBack?: () => void
  illustration?: React.ReactNode
  className?: string
}

const DEFAULT_CONTENT: Record<NonNullable<ErrorPageProps["status"]>, { title: string; description: string }> = {
  403: {
    title: "无权访问",
    description: "抱歉，您没有权限访问此页面。如有疑问请联系管理员。",
  },
  404: {
    title: "页面不存在",
    description: "抱歉，您访问的页面已被移动或不存在。",
  },
  500: {
    title: "服务异常",
    description: "抱歉，服务器开了个小差，请稍后再试。",
  },
  503: {
    title: "服务暂不可用",
    description: "系统正在维护中，请稍后重试。",
  },
}

const STATUS_META = {
  403: {
    label: "Access restricted",
    impact: "当前账号权限不足",
    action: "切换账号或联系管理员开通访问范围。",
    icon: ShieldAlertIcon,
    accent: "text-warning",
    surface: "bg-warning/10 ring-warning/20",
  },
  404: {
    label: "Route not found",
    impact: "目标页面未命中",
    action: "检查链接是否完整，或回到首页重新进入。",
    icon: SearchXIcon,
    accent: "text-info",
    surface: "bg-info/10 ring-info/20",
  },
  500: {
    label: "Server incident",
    impact: "服务端响应异常",
    action: "稍后重试；如果持续出现，请提交错误上下文。",
    icon: ServerCrashIcon,
    accent: "text-destructive",
    surface: "bg-destructive/10 ring-destructive/20",
  },
  503: {
    label: "Maintenance window",
    impact: "系统正在维护",
    action: "等待维护完成后刷新页面。",
    icon: WrenchIcon,
    accent: "text-brand-600 dark:text-brand-700",
    surface: "bg-brand-100/70 ring-brand-300/50 dark:bg-brand-300/15 dark:ring-brand-400/30",
  },
} satisfies Record<
  NonNullable<ErrorPageProps["status"]>,
  {
    label: string
    impact: string
    action: string
    icon: React.ElementType
    accent: string
    surface: string
  }
>

export function ErrorPage({
  status = 404,
  title,
  description,
  homeHref = "/",
  showHome = true,
  showBack = true,
  onBack,
  illustration,
  className,
}: ErrorPageProps) {
  const content = DEFAULT_CONTENT[status]
  const meta = STATUS_META[status]
  const Icon = meta.icon

  return (
    <div
      data-slot="error-page"
      className={cn(
        "flex min-h-[60vh] items-center justify-center bg-background px-4 py-10 sm:px-6",
        className
      )}
    >
      <div className="grid w-full max-w-5xl overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="flex min-w-0 flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="h-6 rounded-md font-mono">
                {status}
              </Badge>
              <span className="text-xs font-medium uppercase text-muted-foreground">
                {meta.label}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div
                className={cn(
                  "flex size-20 items-center justify-center rounded-xl ring-1 sm:size-24",
                  meta.surface
                )}
              >
                {illustration ?? <Icon className={cn("size-10 sm:size-12", meta.accent)} />}
              </div>

              <div className="min-w-0 space-y-3">
                <p className={cn("font-mono text-5xl font-semibold leading-none sm:text-6xl", meta.accent)}>
                  {status}
                </p>
                <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                  {title ?? content.title}
                </h1>
                <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {description ?? content.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {showHome && (
              <Link href={homeHref} className={buttonVariants({ size: "lg" })}>
                <HomeIcon />
                返回首页
              </Link>
            )}
            {showBack && (
              <Button
                size="lg"
                variant="outline"
                onClick={onBack ?? (() => history.back())}
              >
                <ArrowLeftIcon />
                返回上页
              </Button>
            )}
          </div>
        </section>

        <aside className="border-t bg-muted/35 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <LifeBuoyIcon className="size-4 text-muted-foreground" />
                故障上下文
              </div>
              <Separator />
              <dl className="space-y-5 text-sm">
                <div className="space-y-1">
                  <dt className="text-xs font-medium uppercase text-muted-foreground">
                    影响范围
                  </dt>
                  <dd className="text-foreground">{meta.impact}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-xs font-medium uppercase text-muted-foreground">
                    建议操作
                  </dt>
                  <dd className="leading-6 text-foreground">{meta.action}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border bg-background/70 p-3 text-xs leading-5 text-muted-foreground">
              Request ID 会在生产环境由上游网关注入，组件仅负责稳定呈现错误状态。
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function NotFound() {
  return <ErrorPage status={404} />
}

function InternalError() {
  return <ErrorPage status={500} />
}

function Unauthorized() {
  return <ErrorPage status={403} />
}

export { NotFound, InternalError, Unauthorized }
