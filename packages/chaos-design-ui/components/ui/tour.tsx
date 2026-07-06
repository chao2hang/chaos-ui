"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tourVariants = cva("", {
  variants: {
    size: {
      default: "",
      sm: "",
    },
  },
  defaultVariants: { size: "default" },
});

interface TourStep {
  title: React.ReactNode;
  description: React.ReactNode;
  /** CSS selector for the target element */
  target: string;
  /** Placement relative to the target */
  placement?: "top" | "bottom" | "left" | "right";
}

interface TourProps
  extends React.ComponentProps<"div">, VariantProps<typeof tourVariants> {
  /** Whether the tour is active */
  open?: boolean;
  /** Called when tour finishes or is dismissed */
  onClose?: () => void;
  /** Called when a step is completed */
  onFinish?: () => void;
  /** Tour steps */
  steps?: TourStep[];
  /** Current step index (controlled) */
  current?: number;
  /** Called when step changes */
  onStepChange?: (step: number) => void;
}

function Tour({
  className,
  open = false,
  onClose,
  onFinish,
  steps = [],
  current: controlledStep,
  onStepChange,
  ...props
}: TourProps) {
  const [internalStep, setInternalStep] = React.useState(0);
  const [tooltipPos, setTooltipPos] = React.useState({ top: 0, left: 0 });
  const currentStep = controlledStep ?? internalStep;

  const step = steps[currentStep];

  React.useEffect(() => {
    if (!open || !step) return;
    const updatePosition = () => {
      const el = document.querySelector(step.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        const placement = step.placement ?? "bottom";
        let top = 0;
        let left = 0;

        switch (placement) {
          case "bottom":
            top = rect.bottom + 8;
            left = rect.left + rect.width / 2;
            break;
          case "top":
            top = rect.top - 8;
            left = rect.left + rect.width / 2;
            break;
          case "left":
            top = rect.top + rect.height / 2;
            left = rect.left - 8;
            break;
          case "right":
            top = rect.top + rect.height / 2;
            left = rect.right + 8;
            break;
        }
        setTooltipPos({ top, left });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, step]);

  const goTo = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    if (controlledStep === undefined) setInternalStep(index);
    onStepChange?.(index);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      goTo(currentStep + 1);
    } else {
      onFinish?.();
      onClose?.();
    }
  };

  if (!open || !step) return null;

  return (
    <div data-slot="tour" className={tourVariants()} {...props}>
      {/* Backdrop */}
      <div
        data-slot="tour-backdrop"
        className={cn(
          "fixed inset-0 z-[99] bg-black/40 transition-opacity",
          className,
        )}
        onClick={onClose}
      />

      {/* Highlighted target */}
      {step && (
        <div
          data-slot="tour-highlight"
          className="ring-primary fixed z-[100] rounded-md ring-2 ring-offset-2 transition-all"
          style={{
            top: 0,
            left: 0,
            width: 0,
            height: 0,
          }}
          ref={(el) => {
            if (el) {
              const target = document.querySelector(step.target);
              if (target) {
                const rect = target.getBoundingClientRect();
                el.style.top = `${rect.top - 4}px`;
                el.style.left = `${rect.left - 4}px`;
                el.style.width = `${rect.width + 8}px`;
                el.style.height = `${rect.height + 8}px`;
              }
            }
          }}
        />
      )}

      {/* Tooltip */}
      <div
        data-slot="tour-tooltip"
        className="bg-popover fixed z-[101] w-72 rounded-lg border p-4 shadow-lg"
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
          transform: "translate(-50%, 0)",
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{step.title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-accent rounded p-0.5"
            aria-label="Close tour"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <p className="text-muted-foreground text-sm">{step.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            {currentStep + 1} / {steps.length}
          </span>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => goTo(currentStep - 1)}
                className="border-input hover:bg-accent inline-flex h-8 items-center rounded-md border bg-transparent px-3 text-xs"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center rounded-md px-3 text-xs"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Tour, tourVariants };
