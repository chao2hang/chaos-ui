"use client";
import * as React from "react";
import { Loader2Icon } from "@chaos_team/chaos-ui/ui-icons";
import { useTranslation } from "react-i18next";
import { cn } from "@chaos_team/chaos-ui/lib";

interface LoadingPageProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: "spinner" | "dots" | "pulse";
}

/**
 * @component LoadingPage
 * @category business/ux
 * @since 0.2.0
 * @description Centered loading page with spinner, dots, or pulse variants and optional title/description / 居中加载页面，支持旋转、弹跳点或脉冲动画变体，可选标题和描述
 * @keywords loading, page, spinner, dots, pulse, placeholder
 * @example
 * <LoadingPage title="Loading..." variant="spinner" />
 */
export function LoadingPage({
  title,
  description,
  icon,
  variant = "spinner",
  className,
  ...props
}: LoadingPageProps) {
  const { t } = useTranslation("transfer");
  const resolvedTitle = title ?? t("loadingPage.title");
  return (
    <div
      data-slot="loading-page"
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center",
        className,
      )}
      {...props}
    >
      {icon ??
        (variant === "spinner" ? (
          <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        ) : null)}
      {variant === "dots" && <DotsSpinner />}
      {variant === "pulse" && <PulseLoader />}
      <div className="space-y-1">
        <p className="text-sm font-medium">{resolvedTitle}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
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
  );
}

function PulseLoader() {
  return (
    <div className="relative size-10">
      <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
      <span className="absolute inset-2 rounded-full bg-primary" />
    </div>
  );
}

interface FullPageLoaderProps {
  show?: boolean;
  children?: React.ReactNode;
}

/**
 * @component FullPageLoader
 * @category business/ux
 * @since 0.2.0
 * @description Full-screen overlay loader with backdrop blur, useful for route transitions or data fetching / 全屏叠加加载器，带背景模糊效果，适用于路由切换或数据加载场景
 * @keywords loading, fullscreen, overlay, spinner, backdrop
 * @example
 * <FullPageLoader show={isLoading}>
 *   <PageContent />
 * </FullPageLoader>
 */
export function FullPageLoader({ show = true, children }: FullPageLoaderProps) {
  if (!show) return <>{children}</>;
  return (
    <div className="relative min-h-screen">
      {children && (
        <div className="pointer-events-none opacity-50">{children}</div>
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2Icon className="size-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
