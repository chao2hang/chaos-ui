"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/ui/icons";

/**
 * @component WizardLayout
 * @category layout
 * @since 0.7.0
 * @description 向导式分步布局 — 顶部水平步骤指示器（编号圆圈 + 标题，当前高亮、已完成勾选），下方为当前步骤内容。步骤指示器为信息性；当前步骤标记 `aria-current="step"`。
 * @param steps 步骤定义数组，每项含 `{ id, title, description? }`。
 * @param current 当前步骤索引（从 0 开始）。
 * @param onComplete 全部完成时的回调（当 `current >= steps.length - 1` 时可在内容中触发）。
 * @param children 当前步骤内容。
 * @param className 根元素附加类名。
 * @example
 * ```tsx
 * <WizardLayout
 *   steps={[{ id: "info", title: "信息" }, { id: "confirm", title: "确认" }]}
 *   current={0}
 * >
 *   <StepBody />
 * </WizardLayout>
 * ```
 */

interface WizardStep {
  id: string;
  title: string;
  description?: string;
}

interface WizardLayoutProps {
  steps: Array<WizardStep>;
  current: number;
  onComplete?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function WizardLayout({
  steps = [],
  current,
  onComplete,
  children,
  className,
}: WizardLayoutProps) {
  const safeCurrent = Math.max(0, Math.min(current, steps.length - 1));
  return (
    <div
      data-slot="wizard-layout"
      className={cn("flex w-full flex-col gap-6", className)}
    >
      <nav aria-label="步骤">
        <ol className="flex items-center gap-2">
          {steps.map((step, index) => {
            const isCompleted = index < safeCurrent;
            const isCurrent = index === safeCurrent;
            return (
              <li
                key={step.id}
                className="flex flex-1 items-center gap-2"
                aria-current={isCurrent ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent &&
                      "border-primary bg-primary/10 text-primary ring-2 ring-primary/30",
                    !isCompleted &&
                      !isCurrent &&
                      "border-input bg-background text-muted-foreground",
                  )}
                >
                  {isCompleted ? <CheckIcon className="size-4" /> : index + 1}
                </span>
                <span className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </span>
                  {step.description ? (
                    <span className="text-xs text-muted-foreground">
                      {step.description}
                    </span>
                  ) : null}
                </span>
                {index < steps.length - 1 ? (
                  <span
                    className="mx-1 h-px flex-1 bg-border"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <main className="min-h-0 flex-1">
        {children}
      </main>
      {onComplete && safeCurrent >= steps.length - 1 ? (
        <span className="sr-only" aria-live="polite">
          已到达最后一步
        </span>
      ) : null}
    </div>
  );
}

export { WizardLayout };
export type { WizardLayoutProps };
