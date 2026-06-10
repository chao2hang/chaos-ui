import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, AlertTriangleIcon } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-3 [&>svg]:size-4 [&>svg]:text-current [&>svg+div]:translate-y-[-2px] [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-info/30 bg-info/10 text-info [&>svg]:text-info",
        success: "border-success/30 bg-success/10 text-success [&>svg]:text-success",
        warning: "border-warning/30 bg-warning/10 text-warning [&>svg]:text-warning",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const alertIcons = {
  default: AlertCircleIcon,
  info: InfoIcon,
  success: CheckCircle2Icon,
  warning: AlertTriangleIcon,
  destructive: AlertCircleIcon,
}

function Alert({ className, variant = "default", icon, children, ...props }: { className?: string; variant?: "default" | "info" | "success" | "warning" | "destructive"; icon?: React.ElementType; children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const Icon = icon ?? alertIcons[variant ?? "default"]
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon />
      {children}
    </div>
  )
}

function AlertTitle({ className, ...props }: { className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
}

function AlertDescription({ className, ...props }: { className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
