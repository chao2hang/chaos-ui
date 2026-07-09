"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface OnboardingStep {
  id: string;
  title: string;
  description?: string;
  href?: string;
  optional?: boolean;
}

interface OnboardingChecklistProps extends Omit<
  React.ComponentProps<"div">,
  "onToggle"
> {
  steps: OnboardingStep[];
  completedIds?: string[];
  onToggle?: (id: string, completed: boolean) => void;
  title?: string;
  className?: string;
}

export function OnboardingChecklist({
  steps = [],
  completedIds = [],
  onToggle,
  title = "开始使用",
  className,
  ...props
}: OnboardingChecklistProps) {
  const completed = steps.filter((s) => completedIds.includes(s.id)).length;
  const pct = steps.length === 0 ? 0 : (completed / steps.length) * 100;
  return (
    <div
      data-slot="onboarding-checklist"
      className={cn("bg-card rounded-md border p-4", className)}
      {...props}
    >
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-muted-foreground text-xs">
            {completed} / {steps.length} 已完成
          </p>
        </div>
        <span className="text-2xl font-bold tabular-nums">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="bg-muted mb-3 h-1.5 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="space-y-1">
        {steps.map((s) => {
          const isDone = completedIds.includes(s.id);
          return (
            <li
              key={s.id}
              className="hover:bg-muted/30 flex items-center gap-2 rounded px-2 py-1.5"
            >
              <input
                type="checkbox"
                checked={isDone}
                onChange={(e) => onToggle?.(s.id, e.target.checked)}
                className="size-4"
                aria-label={s.title}
              />
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "text-sm",
                    isDone && "text-muted-foreground line-through",
                  )}
                >
                  {s.title}
                </div>
                {s.description && (
                  <div className="text-muted-foreground text-xs">
                    {s.description}
                  </div>
                )}
              </div>
              {s.optional && !isDone && (
                <span className="text-muted-foreground text-[0.65rem]">
                  可选
                </span>
              )}
              {s.href && (
                <Button variant="ghost" size="xs" render={<a href={s.href} />}>
                  开始
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
