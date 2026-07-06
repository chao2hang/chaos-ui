"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backTopVariants = cva(
  "fixed z-50 flex items-center justify-center rounded-full shadow-md transition-all duration-300 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "bg-transparent text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "size-10",
        sm: "size-8",
        lg: "size-12",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

interface BackTopProps
  extends React.ComponentProps<"button">, VariantProps<typeof backTopVariants> {
  /** Scroll container target */
  target?: () => HTMLElement | Window | null;
  /** Threshold in px before showing */
  visibilityHeight?: number;
}

function BackTop({
  className,
  variant,
  size,
  target,
  visibilityHeight = 400,
  children,
  ...props
}: BackTopProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const container = target?.() ?? window;
    const handleScroll = () => {
      const scrollTop =
        container instanceof Window
          ? window.scrollY
          : (container as HTMLElement).scrollTop;
      setVisible(scrollTop > visibilityHeight);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [target, visibilityHeight]);

  const scrollToTop = () => {
    const container = target?.() ?? window;
    if (container instanceof Window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      container?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      data-slot="back-top"
      type="button"
      onClick={scrollToTop}
      className={cn(backTopVariants({ variant, size }), className)}
      aria-label="Back to top"
      {...props}
    >
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      )}
    </button>
  );
}

export { BackTop, backTopVariants };
