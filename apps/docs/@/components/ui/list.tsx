import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const listVariants = cva("", {
  variants: {
    type: {
      unordered: "list-disc",
      ordered: "list-decimal",
      none: "list-none",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
    },
    spacing: {
      default: "space-y-1",
      sm: "space-y-0.5",
      lg: "space-y-2",
    },
  },
  defaultVariants: {
    type: "unordered",
    size: "default",
    spacing: "default",
  },
});

interface ListProps
  extends React.ComponentProps<"ul">, VariantProps<typeof listVariants> {
  items?: React.ReactNode[];
}

function List({
  className,
  type,
  size,
  spacing,
  items,
  children,
  ...props
}: ListProps) {
  const Tag = type === "ordered" ? "ol" : "ul";

  return (
    <Tag
      data-slot="list"
      className={cn("pl-5", listVariants({ type, size, spacing }), className)}
      {...props}
    >
      {items
        ? items.map((item, i) => (
            <li data-slot="list-item" key={i}>
              {item}
            </li>
          ))
        : React.Children.map(children, (child) => (
            <li data-slot="list-item">{child}</li>
          ))}
    </Tag>
  );
}

export { List, listVariants };
