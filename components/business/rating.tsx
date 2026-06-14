"use client";
import * as React from "react";
import { StarIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface RatingProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "default" | "lg";
  readonly?: boolean;
  allowHalf?: boolean;
  className?: string;
  iconClassName?: string;
}

const sizeMap = {
  sm: "size-3.5",
  default: "size-5",
  lg: "size-7",
} as const;

export function Rating({
  value,
  defaultValue,
  onChange,
  max = 5,
  size = "default",
  readonly,
  allowHalf,
  className,
  iconClassName,
  ...props
}: RatingProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? 0);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const [hover, setHover] = React.useState<number | null>(null);
  const display = hover ?? current;

  const handleClick = (next: number) => {
    if (readonly) return;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div
      data-slot="rating"
      role="radiogroup"
      aria-label="评分"
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => setHover(null)}
      {...props}
    >
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        const filled = display >= index;
        const half = allowHalf && !filled && display >= index - 0.5;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={current === index}
            aria-label={`${index} 星`}
            disabled={readonly}
            onMouseEnter={() => !readonly && setHover(index)}
            onClick={() => handleClick(index)}
            className={cn(
              "relative transition-transform",
              !readonly && "cursor-pointer hover:scale-110",
              readonly && "cursor-default",
            )}
          >
            {allowHalf && (
              <span
                className="absolute inset-y-0 left-0 w-1/2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(index - 0.5);
                }}
              />
            )}
            <StarIcon
              className={cn(
                sizeMap[size],
                "transition-colors",
                filled || half
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-muted-foreground/40",
                iconClassName,
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
