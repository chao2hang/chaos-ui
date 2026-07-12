"use client";
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@/components/ui/icons";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface TourStep {
  target: string | (() => HTMLElement | null);
  title: string;
  description?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
}

interface TourProps {
  steps: TourStep[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  storageKey?: string;
  className?: string;
}

/**
 * @component Tour
 * @category ui/overlay
 * @since 0.2.0
 * @description Step-by-step guided product tour overlay with spotlight, navigation, and localStorage persistence / 逐步引导式产品导览覆盖层，带有聚焦高亮、导航和 localStorage 持久化
 * @keywords tour, onboarding, guide, walkthrough, spotlight, 导览, 引导
 * @example
 * <Tour
 *   steps={[
 *     { target: "#dashboard", title: "Dashboard", description: "Your overview" },
 *   ]}
 *   onComplete={() => console.log("tour done")}
 * />
 */
export function Tour({
  steps,
  open,
  onOpenChange,
  onComplete,
  onSkip,
  storageKey,
  className,
}: TourProps) {
  const { t } = useTranslation("tour");
  const [internalOpen, setInternalOpen] = React.useState<boolean>(() => {
    if (typeof window === "undefined" || !storageKey) return true;
    try {
      return localStorage.getItem(storageKey) !== "1";
    } catch {
      return true;
    }
  });
  const [index, setIndex] = React.useState(0);
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const isOpen = open ?? internalOpen;
  const setOpen = React.useCallback(
    (v: boolean) => {
      if (open === undefined) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [open, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    const step = steps[index];
    if (!step) return;
    const el =
      typeof step.target === "function"
        ? step.target()
        : document.querySelector(step.target);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const update = () => setRect((el as HTMLElement).getBoundingClientRect());
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el as HTMLElement);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isOpen, index, steps]);

  const finish = (skipped: boolean) => {
    if (skipped) onSkip?.();
    else onComplete?.();
    if (storageKey) localStorage.setItem(storageKey, "1");
    setOpen(false);
    setIndex(0);
  };

  if (!isOpen || !rect) return null;
  const step = steps[index] ?? { target: "", title: "" };
  const placement = step.placement ?? "bottom";
  const offset = step.offset ?? 8;
  const popoverWidth = Math.min(320, window.innerWidth - 16);

  const popoverStyle: React.CSSProperties = (() => {
    const style: React.CSSProperties = {
      position: "fixed",
      zIndex: "var(--z-index-modal)",
    };
    if (placement === "bottom") {
      style.top = rect.bottom + offset;
      style.left = rect.left + rect.width / 2 - popoverWidth / 2;
    } else if (placement === "top") {
      style.top = rect.top - offset - 200;
      style.left = rect.left + rect.width / 2 - popoverWidth / 2;
    } else if (placement === "right") {
      style.top = rect.top + rect.height / 2 - 100;
      style.left = rect.right + offset;
    } else {
      style.top = rect.top + rect.height / 2 - 100;
      style.left = rect.left - offset - popoverWidth;
    }
    Object.assign(style, {
      left: Math.max(
        8,
        Math.min(style.left as number, window.innerWidth - popoverWidth - 8),
      ),
      top: Math.max(8, Math.min(style.top as number, window.innerHeight - 220)),
      width: popoverWidth,
    });
    return style;
  })();

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[var(--z-index-overlay)] bg-black/40 transition-opacity"
        onClick={() => finish(true)}
      />
      <div
        aria-hidden
        className="ring-primary/60 fixed z-[var(--z-index-modal)] rounded-md ring-4 transition-all"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        }}
      />
      <Card
        data-slot="tour"
        className={cn("shadow-xl", className)}
        style={popoverStyle}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardDescription>
                {index + 1} / {steps.length}
              </CardDescription>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => finish(true)}
              aria-label={t("tour.close")}
            >
              <XIcon />
            </Button>
          </div>
        </CardHeader>
        {step.description && (
          <CardContent className="text-muted-foreground text-sm">
            {step.description}
          </CardContent>
        )}
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={() => finish(true)}>
            {t("tour.skip")}
          </Button>
          <div className="flex flex-wrap items-center justify-end gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            >
              <ChevronLeftIcon />
              {t("tour.previous")}
            </Button>
            {index < steps.length - 1 ? (
              <Button size="sm" onClick={() => setIndex((i) => i + 1)}>
                {t("tour.next")}
                <ChevronRightIcon />
              </Button>
            ) : (
              <Button size="sm" onClick={() => finish(false)}>
                {t("tour.complete")}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
