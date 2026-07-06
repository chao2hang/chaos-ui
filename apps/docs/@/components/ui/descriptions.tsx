import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const descriptionsVariants = cva("", {
  variants: {
    layout: {
      horizontal: "",
      vertical: "",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
    },
    bordered: {
      true: "border border-border rounded-md",
      false: "",
    },
  },
  defaultVariants: { layout: "horizontal", size: "default", bordered: false },
});

interface DescriptionItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
  span?: number;
}

interface DescriptionsProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof descriptionsVariants> {
  items: DescriptionItem[];
  /** Column count */
  column?: number;
  /** Label width */
  labelWidth?: string | number;
}

function Descriptions({
  className,
  layout = "horizontal",
  size,
  bordered,
  items,
  column = 3,
  labelWidth,
  ...props
}: DescriptionsProps) {
  return (
    <div
      data-slot="descriptions"
      className={cn(
        descriptionsVariants({ layout, size, bordered }),
        className,
      )}
      {...props}
    >
      <dl
        className={cn(
          "grid gap-0",
          layout === "horizontal" && "grid-cols-[auto_1fr]",
        )}
        style={{
          gridTemplateColumns:
            layout === "horizontal"
              ? `repeat(${column * 2}, auto)`
              : `repeat(${column}, 1fr)`,
        }}
      >
        {items.map((item) => (
          <React.Fragment key={item.key}>
            <dt
              data-slot="descriptions-label"
              className={cn(
                "text-muted-foreground font-medium",
                bordered && "border-border border-b px-3 py-2",
                !bordered && "py-1 pr-4",
              )}
              style={labelWidth ? { width: labelWidth } : undefined}
            >
              {item.label}
            </dt>
            <dd
              data-slot="descriptions-content"
              className={cn(
                "text-foreground",
                bordered && "border-border border-b px-3 py-2",
                !bordered && "py-1",
              )}
            >
              {item.content}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}

export { Descriptions, descriptionsVariants };
