"use client";
import * as React from "react";
import { AlertTriangleIcon, RefreshCwIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

interface ErrorBoundaryProps {
  fallback?:
    | React.ReactNode
    | ((error: Error, reset: () => void) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
  children: React.ReactNode;
  className?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * @component ErrorBoundary
 * @category business/ux
 * @since 0.2.0
 * @description React error boundary with customizable fallback UI and retry support / React 错误边界组件，支持自定义降级 UI 和重试功能
 * @keywords error, boundary, fallback, retry, resilience
 * @example
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <App />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  override render() {
    if (this.state.hasError) {
      const { fallback, className } = this.props;
      if (typeof fallback === "function") {
        return fallback(this.state.error!, this.reset);
      }
      if (fallback) return fallback;
      return (
        <div
          data-slot="error-boundary"
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-8 text-center",
            className,
          )}
        >
          <AlertTriangleIcon className="size-8 text-destructive" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">组件出错了</h3>
            <p className="text-xs text-muted-foreground">
              {this.state.error?.message ?? "发生未知错误"}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={this.reset}>
            <RefreshCwIcon />
            重试
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
