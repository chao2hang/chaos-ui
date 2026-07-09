"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangleIcon, RotateCcwIcon } from "@/components/ui/icons";

/**
 * @component ErrorBoundaryUI
 * @category ui/feedback
 * @since 0.2.0
 * @description Error boundary at UI level that catches render errors and displays a fallback / UI 级别的错误边界，捕获渲染错误并显示回退内容
 * @keywords error, boundary, fallback, catch, error-handling
 * @example
 * <ErrorBoundaryUI>
 *   <MyComponent />
 * </ErrorBoundaryUI>
 *
 * <ErrorBoundaryUI fallback={(error, reset) => <p>{error.message}</p>}>
 *   <MyComponent />
 * </ErrorBoundaryUI>
 */

interface ErrorBoundaryUIProps {
  children?: React.ReactNode;
  /** Fallback ReactNode or render function receiving (error, reset) / 回退内容或接收 (error, reset) 的渲染函数 */
  fallback?:
    React.ReactNode | ((error: Error, reset: () => void) => React.ReactNode);
  /** Called when an error is caught / 捕获错误时调用 */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Container className / 容器类名 */
  className?: string;
}

interface ErrorBoundaryUIState {
  error: Error | null;
}

function DefaultFallback({
  error,
  reset,
  className,
}: {
  error: Error;
  reset: () => void;
  className: string | undefined;
}) {
  return (
    <div
      data-slot="error-boundary-fallback"
      className={cn(
        "border-destructive/30 bg-destructive/10 text-destructive flex flex-col items-center gap-4 rounded-lg border px-6 py-8 text-center",
        className,
      )}
    >
      <AlertTriangleIcon className="size-10" />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold">Something went wrong</h3>
        <p className="text-destructive/80 text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="bg-background text-foreground hover:bg-muted flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium"
      >
        <RotateCcwIcon className="size-4" />
        Try again
      </button>
    </div>
  );
}

class ErrorBoundaryUI extends React.Component<
  ErrorBoundaryUIProps,
  ErrorBoundaryUIState
> {
  constructor(props: ErrorBoundaryUIProps) {
    super(props);
    this.state = { error: null };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryUIState {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  override render() {
    const { error } = this.state;
    const { children, fallback, className } = this.props;

    if (error) {
      if (typeof fallback === "function") {
        return fallback(error, this.reset);
      }
      if (fallback !== undefined) {
        return fallback;
      }
      return (
        <DefaultFallback
          error={error}
          reset={this.reset}
          className={className}
        />
      );
    }

    return children;
  }
}

export { ErrorBoundaryUI };
export type { ErrorBoundaryUIProps };
