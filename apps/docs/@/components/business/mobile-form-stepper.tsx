"use client";
import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileFormStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number;
  total: number;
  labels?: string[];
  className?: string;
  onStepClick?: (index: number) => void;
}

export function MobileFormStepper({
  current,
  total,
  labels,
  className,
  onStepClick,
  ...props
}: MobileFormStepperProps) {
  return (
    <div
      data-slot="mobile-form-stepper"
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto py-2",
        className,
      )}
      {...props}
    >
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current - 1;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onStepClick?.(i)}
            disabled={!onStepClick}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors",
              done && "bg-success/10 text-success",
              active && "bg-primary/10 text-primary",
              !done && !active && "bg-muted text-muted-foreground",
            )}
          >
            {done ? (
              <CheckIcon className="size-3" />
            ) : (
              <span className="flex size-3 items-center justify-center rounded-full border text-[0.6rem]">
                {i + 1}
              </span>
            )}
            {labels?.[i] && (
              <span className="whitespace-nowrap">{labels[i]}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
