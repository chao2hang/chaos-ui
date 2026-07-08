"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { XIcon, MegaphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";

const bannerVariants = cva(
  "relative flex w-full items-center gap-3 px-4 py-2.5 text-sm",
  {
    variants: {
      variant: {
        info: "bg-primary/10 text-primary",
        warning: "bg-warning/10 text-warning",
        success: "bg-success/10 text-success",
        error: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

interface AnnouncementBannerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  message: string;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ElementType;
}

function AnnouncementBanner({
  message,
  variant = "info",
  action,
  dismissible = true,
  onDismiss,
  icon: Icon = MegaphoneIcon,
  className,
  ...props
}: AnnouncementBannerProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div
      data-slot="announcement-banner"
      role="alert"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {action}
      {dismissible && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0"
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
        >
          <XIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}

export { AnnouncementBanner, bannerVariants };
export type { AnnouncementBannerProps };
