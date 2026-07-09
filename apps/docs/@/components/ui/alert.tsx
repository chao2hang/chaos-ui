import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid items-center gap-3 grid-cols-[auto_minmax(0,1fr)] has-[>svg]:items-start has-[[data-slot=alert-title]]:items-start",
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
  },
);

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * @component Alert
 * @category ui/feedback
 * @since 0.2.0
 * @description Displays a contextual feedback message with optional icon and variant / 显示带图标和样式的上下文反馈消息
 * @keywords alert, message, notification, feedback, warning
 * @example
 * <Alert variant="info" icon={<InfoIcon />}>
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info message.</AlertDescription>
 * </Alert>
 */
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
          className="self-stretch flex items-center justify-center text-current [&>svg]:size-6 [&>svg]:stroke-[1.75]"
        >
          {icon}
        </div>
      )}
      <div data-slot="alert-content" className="min-w-0">
        {children}
      </div>
    </div>
  );
}

/**
 * @component AlertTitle
 * @category ui/feedback
 * @since 0.2.0
 * @description The heading element of an Alert / 提示组件的标题
 * @keywords alert, title, heading
 * @example
 * <AlertTitle>Important Notice</AlertTitle>
 */
function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("mb-1 leading-5 font-medium tracking-tight text-current", className)}
      {...props}
    />
  );
}

/**
 * @component AlertDescription
 * @category ui/feedback
 * @since 0.2.0
 * @description The body text content of an Alert / 提示组件的正文内容
 * @keywords alert, description, content, body
 * @example
 * <AlertDescription>Detailed message about the alert.</AlertDescription>
 */
function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm leading-relaxed text-current/80 [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
export type { AlertProps, AlertVariant };
