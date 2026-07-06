import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinVariants = cva("relative", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
});

interface SpinProps
  extends React.ComponentProps<"div">, VariantProps<typeof spinVariants> {
  /** Whether to show spinner */
  spinning?: boolean;
  /** Custom spinner indicator */
  indicator?: React.ReactNode;
  /** Tip text under spinner */
  tip?: React.ReactNode;
  /** Delay before showing spinner (ms) */
  delay?: number;
  children?: React.ReactNode;
}

function Spin({
  className,
  size,
  spinning = true,
  indicator,
  tip,
  delay = 0,
  children,
  ...props
}: SpinProps) {
  const [showSpinner, setShowSpinner] = React.useState(!delay);

  React.useEffect(() => {
    if (!spinning) {
      setShowSpinner(false);
      return;
    }
    if (delay > 0) {
      const timer = setTimeout(() => setShowSpinner(true), delay);
      return () => clearTimeout(timer);
    }
    setShowSpinner(true);
  }, [spinning, delay]);

  const defaultIndicator = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size === "sm" ? 16 : size === "lg" ? 32 : 20}
      height={size === "sm" ? 16 : size === "lg" ? 32 : 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary animate-spin"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );

  if (!children) {
    return spinning ? (
      <div
        data-slot="spin"
        className={cn(
          "inline-flex flex-col items-center justify-center gap-2",
          spinVariants({ size }),
          className,
        )}
        role="status"
        aria-label={typeof tip === "string" ? tip : "Loading"}
        {...props}
      >
        {indicator ?? defaultIndicator}
        {tip && <span className="text-muted-foreground text-sm">{tip}</span>}
      </div>
    ) : null;
  }

  return (
    <div
      data-slot="spin"
      className={cn(spinVariants({ size }), className)}
      {...props}
    >
      {showSpinner && (
        <div className="bg-background/50 absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
          {indicator ?? defaultIndicator}
          {tip && <span className="text-muted-foreground text-sm">{tip}</span>}
        </div>
      )}
      <div className={cn(showSpinner && "pointer-events-none opacity-50")}>
        {children}
      </div>
    </div>
  );
}

export { Spin, spinVariants };
