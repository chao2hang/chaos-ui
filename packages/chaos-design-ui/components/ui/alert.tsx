import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid items-center gap-3 grid-cols-[auto_minmax(0,1fr)]",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-info/30 bg-info/10 text-info",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  icon?: React.ReactNode
  className?: string
}

function Alert({ className, variant, icon, children, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon && (
        <div
          data-slot="alert-icon"
          className="flex size-7 shrink-0 items-center justify-center self-center text-current [&>svg]:size-5 [&>svg]:stroke-[1.75]"
        >
          {icon}
        </div>
      )}
      <div data-slot="alert-content" className="min-w-0 flex flex-col gap-1">
        {children}
      </div>
    </div>
  )
}

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("font-medium leading-5 tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-description"
      className={cn("mt-1 text-sm leading-relaxed text-current/80 [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
export type { AlertProps, AlertVariant }
