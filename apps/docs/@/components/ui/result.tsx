import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const resultVariants = cva(
  "flex flex-col items-center justify-center text-center py-12 px-6",
  {
    variants: {
      status: {
        success: "",
        error: "",
        info: "",
        warning: "",
      },
      size: {
        default: "max-w-md",
        sm: "max-w-sm",
        lg: "max-w-lg",
      },
    },
    defaultVariants: { size: "default" },
  },
);

interface ResultProps
  extends React.ComponentProps<"div">, VariantProps<typeof resultVariants> {
  /** Status determines default icon and color */
  status?: "success" | "error" | "info" | "warning";
  /** Title text */
  title?: React.ReactNode;
  /** Subtitle / description */
  subtitle?: React.ReactNode;
  /** Custom icon override */
  icon?: React.ReactNode;
  /** Extra content (e.g., action buttons) */
  extra?: React.ReactNode;
}

function Result({
  className,
  status = "info",
  size,
  title,
  subtitle,
  icon,
  extra,
  children,
  ...props
}: ResultProps) {
  const statusStyles: Record<string, string> = {
    success: "text-success",
    error: "text-destructive",
    info: "text-primary",
    warning: "text-warning",
  };

  const defaultIcons: Record<string, React.ReactNode> = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" x2="9" y1="9" y2="15" />
        <line x1="9" x2="15" y1="9" y2="15" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="16" y2="12" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" x2="12" y1="9" y2="13" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
      </svg>
    ),
  };

  return (
    <div
      data-slot="result"
      className={cn(resultVariants({ status, size }), className)}
      role="status"
      {...props}
    >
      <div className={cn("mb-6", statusStyles[status])}>
        {icon ?? defaultIcons[status]}
      </div>
      {title && (
        <div
          data-slot="result-title"
          className="text-foreground text-xl font-semibold"
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div
          data-slot="result-subtitle"
          className="text-muted-foreground mt-2 text-sm"
        >
          {subtitle}
        </div>
      )}
      {extra && (
        <div data-slot="result-extra" className="mt-6 flex gap-3">
          {extra}
        </div>
      )}
      {children}
    </div>
  );
}

export { Result, resultVariants };
