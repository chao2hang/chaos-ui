"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { ChevronLeftIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component MobilePageShell
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端页面骨架 — 提供顶部导航栏（含返回按钮与标题）与可滚动内容区。
 * @keywords mobile, page, shell
 * @param title 顶部标题；为空时仍渲染占位栏以保持高度一致。
 * @param onBack 返回按钮回调；提供时渲染返回箭头按钮。
 * @param children 页面主体内容。
 * @example
 * <MobilePageShell title="订单详情" onBack={() => history.back()}>
 *   <p>内容</p>
 * </MobilePageShell>
 */

interface MobilePageShellProps {
  title?: string;
  onBack?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function MobilePageShell({ title, onBack, children, className }: MobilePageShellProps) {
  return (
    <div
      data-slot="mobile-page-shell"
      className={cn("flex h-full min-h-0 flex-col bg-background", className)}
    >
      <header
        data-slot="mobile-page-shell-header"
        className="relative flex h-12 shrink-0 items-center gap-2 border-b px-2"
      >
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="返回"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-muted"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
        ) : null}
        <h1 className="flex-1 truncate text-center text-base font-medium">
          {title ?? ""}
        </h1>
        {/* Spacer to keep the title visually centered when a back button is present. */}
        {onBack ? <span className="size-9 shrink-0" aria-hidden="true" /> : null}
      </header>
      <main
        data-slot="mobile-page-shell-body"
        className="min-h-0 flex-1 overflow-y-auto"
      >
        {children ?? null}
      </main>
    </div>
  );
}

export { MobilePageShell };
export type { MobilePageShellProps };
