import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

interface StepperProps {
  className?: string
  activeStep?: number
  orientation?: "horizontal" | "vertical"
  children: React.ReactNode
}

function Stepper({ className, activeStep = 0, orientation = "horizontal", children }: StepperProps) {
  const steps = React.Children.toArray(children).filter(React.isValidElement)
  return (
    <div className={cn(orientation === "horizontal" ? "flex items-center" : "flex flex-col", className)}>
      {steps.map((child, index) => {
        const isLast = index === steps.length - 1
        return React.cloneElement(child as React.ReactElement<StepInternalProps>, {
          index,
          active: index === activeStep,
          completed: index < activeStep,
          last: isLast,
          orientation,
        })
      })}
    </div>
  )
}

interface StepInternalProps {
  className?: string
  index?: number
  active?: boolean
  completed?: boolean
  last?: boolean
  orientation?: string
  children?: React.ReactNode
}

function Step({ className, index = 0, active, completed, last, orientation, children }: StepInternalProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", orientation === "horizontal" ? "flex-1" : "", className)}>
      <div className="flex flex-col items-center gap-1">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
            completed && "border-primary bg-primary text-primary-foreground",
            active && "border-primary bg-primary/10 text-primary animate-pulse",
            !completed && !active && "border-muted-foreground/30 text-muted-foreground"
          )}
        >
          {completed ? <CheckIcon className="size-4" /> : (index + 1)}
        </div>
        {children && (
          <span className={cn("text-xs font-medium", active ? "text-primary" : "text-muted-foreground")}>
            {children}
          </span>
        )}
      </div>
      {!last && orientation === "horizontal" && (
        <div className={cn("h-0.5 flex-1 mx-2", completed ? "bg-primary" : "bg-muted-foreground/30")} />
      )}
      {!last && orientation === "vertical" && (
        <div className={cn("w-0.5 h-8 ml-3.5", completed ? "bg-primary" : "bg-muted-foreground/30")} />
      )}
    </div>
  )
}

export { Stepper, Step }
