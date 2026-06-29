"use client";
import * as React from "react";
import { XIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type ChipVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "outline";
type ChipSize = "sm" | "default" | "lg";

const variantStyles: Record<ChipVariant, string> = {
  default: "bg-muted text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info/15 text-info",
  outline: "border border-input bg-background",
};

const sizeStyles: Record<ChipSize, string> = {
  sm: "h-5 px-1.5 text-[0.65rem] gap-1",
  default: "h-6 px-2 text-xs gap-1.5",
  lg: "h-7 px-2.5 text-sm gap-1.5",
};

interface ChipProps extends React.ComponentProps<"span"> {
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
}

export function Chip({
  variant = "default",
  size = "default",
  removable,
  onRemove,
  icon,
  className,
  children,
  ...props
}: ChipProps) {
  const { t } = useTranslation("ui");
  return (
    <span
      data-slot="chip"
      data-variant={variant}
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {icon && <span className="-ml-0.5 inline-flex">{icon}</span>}
      <span className="truncate">{children}</span>
      {removable && (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={t("chip.remove")}
          onClick={onRemove}
          className="-mr-1 size-4 rounded-full opacity-60 hover:opacity-100"
        >
          <XIcon className="size-3" />
        </Button>
      )}
    </span>
  );
}
