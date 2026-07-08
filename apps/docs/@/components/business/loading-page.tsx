"use client";
import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingPageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: "spinner" | "dots" | "pulse";
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
        className,
      )}
      {...props}
    >
      {icon ??
        (variant === "spinner" ? (
          <Loader2Icon className="text-muted-foreground size-8 animate-spin" />
        ) : null)}
      {variant === "dots" && <DotsSpinner />}
      {variant === "pulse" && <PulseLoader />}
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
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
          className="bg-muted-foreground size-2 animate-bounce rounded-full"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}

function PulseLoader() {
  return (
    <div className="relative size-10">
      <span className="bg-primary/30 absolute inset-0 animate-ping rounded-full" />
      <span className="bg-primary absolute inset-2 rounded-full" />
    </div>
  );
}

interface FullPageLoaderProps {
  show?: boolean;
  children?: React.ReactNode;
}

export function FullPageLoader({ show = true, children }: FullPageLoaderProps) {
  if (!show) return <>{children}</>;
  return (
    <div className="relative min-h-screen">
      {children && (
        <div className="pointer-events-none opacity-50">{children}</div>
      )}
      <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <Loader2Icon className="text-primary size-8 animate-spin" />
      </div>
    </div>
  );
}
