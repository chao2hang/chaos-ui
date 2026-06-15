import * as React from "react"
import Link from "next/link"
import { HomeIcon, ArrowLeftIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
  return (
    <div
      data-slot="error-page"
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center",
        className
      )}
    >
      <div className="space-y-2">
        {illustration ?? (
          <p className="bg-gradient-to-br from-destructive to-orange-500 bg-clip-text text-7xl font-bold text-transparent md:text-8xl">
            {status}
          </p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-destructive">
          {title ?? content.title}
        </h1>
        <p className="mx-auto max-w-md text-sm text-destructive/80">
          {description ?? content.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {showHome && (
          <Button nativeButton={false} render={<Link href={homeHref} />}>
            <HomeIcon />
            返回首页
          </Button>
        )}
        {showBack && (
          <Button variant="outline" onClick={onBack ?? (() => history.back())}>
            <ArrowLeftIcon />
            返回上页
          </Button>
        )}
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
