"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  MousePointerClickIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

/**
 * @component FeatureTour
 * @category business/ux
 * @since 0.7.0
 * @description Lightweight modal-style feature checklist tour (no DOM spotlight).
 * For spotlight / target-highlight onboarding, prefer UI `Tour`.
 * / 轻量功能引导浮层（无目标高亮）；需要 spotlight 请用 UI `Tour`。
 * @keywords feature, tour, onboarding
 * @see Tour (`@chaos_team/chaos-ui`)
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

  React.useEffect(() => {
    if (open) setCurrent(0);
  }, [open]);

  React.useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open, current]);

  const safeIndex =
    steps.length === 0 ? 0 : Math.min(current, steps.length - 1);
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
        "fixed inset-0 z-[var(--z-index-overlay)] flex items-center justify-center bg-black/40 p-4 supports-backdrop-filter:backdrop-blur-xs",
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
        className="bg-popover text-popover-foreground ring-foreground/10 w-full max-w-md rounded-xl p-5 text-sm ring-1 outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <MousePointerClickIcon className="text-primary size-5" />
            <h2 className="font-heading text-base font-medium">{step.title}</h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="关闭引导"
            onClick={onClose}
          >
            <XIcon className="size-4" />
          </Button>
        </div>

        <p className="text-muted-foreground mt-3">{step.content}</p>

        <p className="text-muted-foreground mt-3 text-xs">
          目标：
          <code className="bg-muted rounded px-1 py-0.5">{step.target}</code>
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-muted-foreground text-xs tabular-nums">
            第 {safeIndex + 1} / {steps.length} 步
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={goPrev}
              disabled={safeIndex === 0}
            >
              <ChevronLeftIcon className="size-4" />
              上一步
            </Button>
            {isLast ? (
              <Button type="button" size="sm" onClick={onClose}>
                <CheckIcon className="size-4" />
                完成
              </Button>
            ) : (
              <Button type="button" size="sm" onClick={goNext}>
                下一步
                <ChevronRightIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <div
          className="mt-4 flex items-center justify-center gap-1.5"
          aria-hidden="true"
        >
          {steps.map((s, i) => (
            <span
              key={s.target + i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === safeIndex ? "bg-primary w-4" : "bg-muted w-1.5",
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
