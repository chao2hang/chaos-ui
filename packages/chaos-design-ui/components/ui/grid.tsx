import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
  },
  defaultVariants: {
    columns: 1,
    gap: "md",
    align: "stretch",
    justify: "start",
  },
});

interface GridProps
  extends React.ComponentProps<"div">, VariantProps<typeof gridVariants> {}

function Grid({
  className,
  columns,
  gap,
  align,
  justify,
  ...props
}: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(gridVariants({ columns, gap, align, justify }), className)}
      {...props}
    />
  );
}

export { Grid, gridVariants };
