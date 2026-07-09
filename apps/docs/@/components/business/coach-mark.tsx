"use client";
import * as React from "react";
import { XIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";

interface CoachMarkProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: HTMLElement | null;
  title: string;
  description?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  onNext?: () => void;
  onSkip?: () => void;
  nextLabel?: string;
  skipLabel?: string;
  showSkip?: boolean;
  className?: string;
}

export function CoachMark({
  open,
  onOpenChange,
  target,
  title,
  description,
  placement = "bottom",
  onNext,
  onSkip,
  nextLabel = "下一步",
  skipLabel = "跳过",
  showSkip = true,
  className,
}: CoachMarkProps) {
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  React.useEffect(() => {
    if (!open || !target) {
      setRect(null);
      return;
    }
    const update = () => setRect(target.getBoundingClientRect());
    update();
    const ro = new ResizeObserver(update);
    ro.observe(target);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, target]);

  if (!open || !rect) return null;

  const offset = 8;
  const style: React.CSSProperties = (() => {
    const base: React.CSSProperties = { position: "fixed", zIndex: 9999 };
    if (placement === "bottom") {
      base.top = rect.bottom + offset;
      base.left = rect.left + rect.width / 2;
      base.transform = "translateX(-50%)";
    } else if (placement === "top") {
      base.top = rect.top - offset - 100;
      base.left = rect.left + rect.width / 2;
      base.transform = "translateX(-50%)";
    } else if (placement === "right") {
      base.top = rect.top + rect.height / 2;
      base.left = rect.right + offset;
      base.transform = "translateY(-50%)";
    } else {
      base.top = rect.top + rect.height / 2;
      base.left = rect.left - offset - 280;
      base.transform = "translateY(-50%)";
    }
    return base;
  })();

  return (
    <>
      <div
        aria-hidden
        className="ring-primary/60 fixed z-[9998] rounded ring-4"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        }}
      />
      <div
        role="dialog"
        data-slot="coach-mark"
        className={cn(
          "bg-popover w-72 rounded-md border p-3 shadow-xl",
          className,
        )}
        style={style}
      >
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onOpenChange(false)}
            aria-label="关闭"
          >
            <XIcon />
          </Button>
        </div>
        {description && (
          <p className="text-muted-foreground mb-3 text-xs">{description}</p>
        )}
        <div className="flex items-center justify-end gap-1">
          {showSkip && (
            <Button variant="ghost" size="xs" onClick={onSkip}>
              {skipLabel}
            </Button>
          )}
          <Button size="xs" onClick={onNext}>
            {nextLabel}
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
}
