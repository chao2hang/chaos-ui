"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const affixVariants = cva("fixed z-40", {
  variants: {
    position: {
      top: "top-0 inset-x-0",
      bottom: "bottom-0 inset-x-0",
      "top-start": "top-0 left-0",
      "top-end": "top-0 right-0",
      "bottom-start": "bottom-0 left-0",
      "bottom-end": "bottom-0 right-0",
    },
  },
  defaultVariants: { position: "bottom-end" },
});

interface AffixProps
  extends React.ComponentProps<"div">, VariantProps<typeof affixVariants> {
  /** Offset from the target position in pixels */
  offset?: number;
  /** Target container ref to observe scroll */
  target?: () => HTMLElement | null | Window;
}

function Affix({
  className,
  position = "bottom-end",
  offset = 0,
  target,
  children,
  ...props
}: AffixProps) {
  const [affixed, setAffixed] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = target?.() ?? window;
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const containerHeight =
        container instanceof Window
          ? window.innerHeight
          : (container as HTMLElement).getBoundingClientRect().height;

      if (position?.startsWith("top")) {
        setAffixed(rect.top <= offset);
      } else {
        setAffixed(rect.bottom >= containerHeight - offset);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [position, offset, target]);

  return (
    <div
      ref={ref}
      data-slot="affix"
      className={cn(
        affixVariants({ position }),
        affixed && "shadow-lg",
        className,
      )}
      style={{ [position?.startsWith("top") ? "top" : "bottom"]: offset }}
      {...props}
    >
      {children}
    </div>
  );
}

export { Affix, affixVariants };
