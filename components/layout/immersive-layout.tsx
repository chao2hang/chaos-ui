"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MaximizeIcon, MinimizeIcon, XIcon } from "@/components/ui/icons";

/**
 * @component ImmersiveLayout
 * @category layout/fullscreen
 * @since 0.2.0
 * @description Full-screen immersive layout for dashboards/reports, hiding all chrome with optional floating header and exit button / 用于仪表板/报告的全屏沉浸式布局，隐藏所有边框，支持浮动头部和退出按钮
 * @keywords immersive, fullscreen, dashboard, report, layout, exit
 * @example
 * <ImmersiveLayout header={<h1>Q3 Report</h1>} onExit={() => navigate("/home")}>
 *   <Report />
 * </ImmersiveLayout>
 */

interface ImmersiveLayoutProps extends React.ComponentProps<"div"> {
  /** Floating header content (auto-hides on scroll down) / 浮动头部内容（向下滚动时自动隐藏） */
  header?: React.ReactNode;
  /** Exit callback / 退出回调 */
  onExit?: () => void;
  /** Show exit button (default: true) / 显示退出按钮（默认 true） */
  showExitButton?: boolean;
}

function ImmersiveLayout({
  className,
  header,
  onExit,
  showExitButton = true,
  children,
  ...props
}: ImmersiveLayoutProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [headerVisible, setHeaderVisible] = React.useState(true);
  const lastScrollTop = React.useRef(0);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen?.();
        setIsFullscreen(true);
      } catch {
        // requestFullscreen not available or denied
      }
    } else {
      try {
        await document.exitFullscreen?.();
        setIsFullscreen(false);
      } catch {
        // exit not available
      }
    }
  };

  React.useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > lastScrollTop.current && scrollTop > 60) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
    lastScrollTop.current = scrollTop;
  }, []);

  return (
    <div
      ref={containerRef}
      data-slot="immersive-layout"
      className={cn(
        "bg-background relative h-dvh w-full overflow-auto",
        className,
      )}
      onScroll={handleScroll}
      {...props}
    >
      {/* Floating header */}
      {header && (
        <div
          data-slot="immersive-layout-header"
          className={cn(
            "fixed inset-x-0 top-0 z-20 transition-transform duration-300",
            headerVisible ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="bg-background/80 border-border flex items-center justify-between border-b px-4 py-3 backdrop-blur-sm">
            <div className="min-w-0 flex-1">{header}</div>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="hover:bg-muted text-foreground ml-2 shrink-0 rounded-md p-2"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <MinimizeIcon className="size-4" />
              ) : (
                <MaximizeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Exit button */}
      {showExitButton && (
        <button
          type="button"
          onClick={onExit}
          className="bg-background/80 hover:bg-muted text-foreground fixed top-4 right-4 z-30 rounded-full p-2 shadow-md"
          aria-label="Exit"
        >
          <XIcon className="size-5" />
        </button>
      )}

      {/* Content */}
      <div
        data-slot="immersive-layout-content"
        className={cn("min-h-full", header && "pt-16")}
      >
        {children}
      </div>
    </div>
  );
}

export { ImmersiveLayout };
export type { ImmersiveLayoutProps };
