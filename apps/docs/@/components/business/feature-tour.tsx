"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  MousePointerClickIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component FeatureTour
 * @category business/ux
 * @since 0.7.0
 * @description 功能引导 — 以全屏遮罩浮层逐步引导用户了解功能点，支持上一步/下一步/跳过与键盘操作。
 * @keywords feature, tour
 * @param steps 引导步骤数组，每项含 target(目标元素标识)、title、content
 * @param open 是否显示引导浮层
 * @param onClose 关闭/跳过回调
 * @param className 根节点额外类名
 * @example
 * <FeatureTour open steps={[{ target:"#btn", title:"开始", content:"点击此处开始" }]} onClose={() => {}} />
 */
interface FeatureTourProps {
  steps: Array<{ target: string; title: string; content: string }>;
  open: boolean;
  onClose?: () => void;
  className?: string;
}

function FeatureTour({ steps, open, onClose, className }: FeatureTourProps) {
  const [current, setCurrent] = React.useState(0);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Reset to first step whenever the tour (re)opens.
  React.useEffect(() => {
    if (open) setCurrent(0);
  }, [open]);

  // Move focus into the panel and keep current step in range when steps change.
  React.useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open, current]);

  // Clamp current index against the steps array length.
  const safeIndex = steps.length === 0 ? 0 : Math.min(current, steps.length - 1);
  const step = steps[safeIndex];
  const isLast = safeIndex === steps.length - 1;

  const goNext = React.useCallback(() => {
    setCurrent((c) => Math.min(c + 1, steps.length - 1));
  }, [steps.length]);

  const goPrev = React.useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose?.();
      return;
    }
    if (event.key === "ArrowRight" && !isLast) {
      event.preventDefault();
      goNext();
      return;
    }
    if (event.key === "ArrowLeft" && safeIndex > 0) {
      event.preventDefault();
      goPrev();
    }
  };

  if (!open || steps.length === 0 || !step) {
    return null;
  }

  return (
    <div
      data-slot="feature-tour"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-label="功能引导"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="document"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="w-full max-w-md rounded-xl bg-popover p-5 text-sm text-popover-foreground ring-1 ring-foreground/10 outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <MousePointerClickIcon className="size-5 text-primary" />
            <h2 className="font-heading text-base font-medium">{step.title}</h2>
          </div>
          <button
            type="button"
            aria-label="关闭引导"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        <p className="mt-3 text-muted-foreground">{step.content}</p>

        <p className="mt-3 text-xs text-muted-foreground">
          目标：<code className="rounded bg-muted px-1 py-0.5">{step.target}</code>
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground tabular-nums">
            第 {safeIndex + 1} / {steps.length} 步
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={safeIndex === 0}
              className="inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-sm font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeftIcon className="size-4" />
              上一步
            </button>
            {isLast ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
              >
                <CheckIcon className="size-4" />
                完成
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-8 items-center gap-1 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
              >
                下一步
                <ChevronRightIcon className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Step indicator dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.target + i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === safeIndex ? "w-4 bg-primary" : "w-1.5 bg-muted",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { FeatureTour };
export type { FeatureTourProps };
