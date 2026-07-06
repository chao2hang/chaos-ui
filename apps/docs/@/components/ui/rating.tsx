"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ratingVariants = cva("inline-flex items-center gap-0.5", {
  variants: {
    size: {
      default: "[&>button]:size-5",
      sm: "[&>button]:size-4",
      lg: "[&>button]:size-6",
    },
  },
  defaultVariants: { size: "default" },
});

interface RatingProps
  extends
    Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof ratingVariants> {
  /** Current rating value */
  value?: number;
  /** Called when rating changes */
  onChange?: (value: number) => void;
  /** Max number of stars */
  count?: number;
  /** Whether to allow half stars */
  allowHalf?: boolean;
  /** Whether the rating is read-only */
  readOnly?: boolean;
  /** Character/icon for filled star */
  filledIcon?: React.ReactNode;
  /** Character/icon for empty star */
  emptyIcon?: React.ReactNode;
}

function Rating({
  className,
  size,
  value = 0,
  onChange,
  count = 5,
  allowHalf = false,
  readOnly = false,
  filledIcon,
  emptyIcon,
  ...props
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);

  const getFillPercent = (index: number): number => {
    const currentValue = isHovering ? hoverValue : value;
    const starValue = index + 1;

    if (currentValue >= starValue) return 100;
    if (allowHalf && currentValue >= starValue - 0.5) return 50;
    return 0;
  };

  const handleClick = (index: number, isHalf: boolean) => {
    if (readOnly) return;
    const newValue = isHalf ? index + 0.5 : index + 1;
    onChange?.(newValue);
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = allowHalf && x < rect.width / 2;
    setHoverValue(isHalf ? index + 0.5 : index + 1);
  };

  const Star = ({
    fillPercent,
    index,
  }: {
    fillPercent: number;
    index: number;
  }) => (
    <button
      type="button"
      disabled={readOnly}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        handleClick(index, allowHalf && x < rect.width / 2);
      }}
      onMouseMove={(e) => handleMouseMove(e, index)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverValue(0);
      }}
      className={cn(
        "relative inline-flex items-center justify-center transition-colors",
        !readOnly && "cursor-pointer hover:scale-110",
      )}
      aria-label={`${index + 1} star`}
    >
      <span className="text-muted-foreground/30 absolute inset-0 flex items-center justify-center">
        {emptyIcon ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
      </span>
      {fillPercent > 0 && (
        <span
          className="absolute inset-0 flex items-center justify-center overflow-hidden text-yellow-500"
          style={{ width: `${fillPercent}%` }}
        >
          {filledIcon ?? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
        </span>
      )}
    </button>
  );

  return (
    <div
      data-slot="rating"
      className={cn(ratingVariants({ size }), className)}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverValue(0);
      }}
      role="radiogroup"
      aria-label="Rating"
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} fillPercent={getFillPercent(i)} index={i} />
      ))}
      {!readOnly && (
        <span className="text-muted-foreground ml-1 text-sm tabular-nums">
          {isHovering ? hoverValue || "" : value || ""}
        </span>
      )}
    </div>
  );
}

export { Rating, ratingVariants };
