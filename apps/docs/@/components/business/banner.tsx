"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  XIcon,
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";

const bannerVariants = cva(
  "relative flex w-full items-start gap-3 border-b px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info: "border-info/30 bg-info/10 text-info",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        error: "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

const variantIcons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  error: XCircleIcon,
} as const;

type BannerVariant = NonNullable<
  VariantProps<typeof bannerVariants>["variant"]
>;

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

function Banner({
  variant = "info",
  title,
  description,
  action,
  closable = true,
  onClose,
  className,
  ...props
}: BannerProps) {
  const [visible, setVisible] = React.useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  const Icon = variantIcons[variant];

  return (
    <div
      role="alert"
      data-slot="banner"
      data-variant={variant}
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    >
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <p className="leading-5 font-medium">{title}</p>}
        {description && (
          <p className="mt-0.5 text-sm leading-relaxed opacity-80">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {closable && (
        <button
          type="button"
          aria-label="关闭"
          onClick={handleClose}
          className="shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

Banner.displayName = "Banner";

export { Banner, bannerVariants };
export type { BannerProps, BannerVariant };
