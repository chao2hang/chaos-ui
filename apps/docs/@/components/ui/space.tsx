import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spaceVariants = cva("", {
  variants: {
    direction: {
      horizontal: "flex flex-row items-center",
      vertical: "flex flex-col",
    },
    size: {
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    wrap: {
      true: "flex-wrap",
      false: "",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    size: "sm",
    wrap: false,
    align: "center",
  },
});

interface SpaceProps
  extends React.ComponentProps<"div">, VariantProps<typeof spaceVariants> {
  /** Split items with a separator */
  split?: React.ReactNode;
}

function Space({
  className,
  direction,
  size,
  wrap,
  align,
  split,
  children,
  ...props
}: SpaceProps) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return (
    <div
      data-slot="space"
      className={cn(spaceVariants({ direction, size, wrap, align }), className)}
      {...props}
    >
      {childrenArray.map((child, i) => (
        <React.Fragment key={i}>
          {child}
          {split && i < childrenArray.length - 1 && (
            <span data-slot="space-split" className="shrink-0">
              {split}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export { Space, spaceVariants };
