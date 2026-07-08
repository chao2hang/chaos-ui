import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/ui/icons";

interface StepperProps {
  className?: string;
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
}

/**
 * @component Stepper
 * @category ui/navigation
 * @since 0.2.0
 * @description A multi-step progress indicator with numbered circles and connecting lines / 多步骤进度指示器，带编号圆圈和连接线
 * @keywords stepper, steps, wizard, progress, navigation, 步骤条
 * @example
 * <Stepper activeStep={1}>
 *   <Step>Step 1</Step>
 *   <Step>Step 2</Step>
 * </Stepper>
 */
function Stepper({
  className,
  activeStep = 0,
  orientation = "horizontal",
  children,
}: StepperProps) {
  const steps = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <div
      data-slot="stepper"
      className={cn(
        orientation === "horizontal"
          ? "flex w-full items-center justify-center"
          : "flex flex-col",
        className,
      )}
    >
      {steps.map((child, index) => {
        const isLast = index === steps.length - 1;
        return React.cloneElement(
          child as React.ReactElement<StepInternalProps>,
          {
            index,
            active: index === activeStep,
            completed: index < activeStep,
            last: isLast,
            orientation,
          },
        );
      })}
    </div>
  );
}

interface StepInternalProps {
  className?: string;
  index?: number;
  active?: boolean;
  completed?: boolean;
  last?: boolean;
  orientation?: string;
  children?: React.ReactNode;
}

/**
 * @component Step
 * @category ui/navigation
 * @since 0.2.0
 * @description An individual step within a Stepper, showing step number or checkmark / 步骤条中的单个步骤，显示步骤编号或对勾
 * @keywords step, stepper, step-item, 步骤
 * @example
 * <Step>Step label</Step>
 */
function Step({
  className,
  index = 0,
  active,
  completed,
  last,
  orientation,
  children,
}: StepInternalProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center",
        orientation === "horizontal"
          ? last
            ? "shrink-0"
            : "min-w-0 flex-1"
          : "flex-col items-start",
        className,
      )}
    >
      {orientation === "horizontal" ? (
        <>
          <div className="flex shrink-0 flex-col items-center gap-1">
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                completed &&
                  "border-primary bg-primary text-primary-foreground",
                active &&
                  "border-primary bg-primary/10 text-primary animate-pulse",
                !completed &&
                  !active &&
                  "border-muted-foreground/30 text-muted-foreground",
              )}
            >
              {completed ? <CheckIcon className="size-4" /> : index! + 1}
            </div>
            {children && (
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {children}
              </span>
            )}
          </div>
          {!last && (
            <div
              className={cn(
                "mx-2 mt-4 h-0.5 min-w-4 flex-1 self-start",
                completed ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />
          )}
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                completed &&
                  "border-primary bg-primary text-primary-foreground",
                active &&
                  "border-primary bg-primary/10 text-primary animate-pulse",
                !completed &&
                  !active &&
                  "border-muted-foreground/30 text-muted-foreground",
              )}
            >
              {completed ? <CheckIcon className="size-4" /> : index! + 1}
            </div>
            {children && (
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {children}
              </span>
            )}
          </div>
          {!last && (
            <div
              className={cn(
                "ml-3.5 h-8 w-0.5",
                completed ? "bg-primary" : "bg-muted-foreground/30",
              )}
            />
          )}
        </>
      )}
    </div>
  );
}

export { Stepper, Step };
