import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sequencePreviewVariants = cva("inline-flex items-center gap-1", {
  variants: {
    size: {
      default: "[&>span]:size-3 [&>span]:text-xs",
      sm: "[&>span]:size-2 [&>span]:text-[10px]",
      lg: "[&>span]:size-4 [&>span]:text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

interface SequencePreviewProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof sequencePreviewVariants> {
  /** The sequence value to preview */
  value: string;
  /** Character to use for hidden chars */
  mask?: string;
  /** Show only last N chars, mask the rest */
  visibleChars?: number;
}

function SequencePreview({
  className,
  size,
  value,
  mask = "•",
  visibleChars,
  ...props
}: SequencePreviewProps) {
  const chars = value.split("");

  const displayChars = React.useMemo(() => {
    if (visibleChars === undefined) return chars;
    const numVisible = Math.min(visibleChars, chars.length);
    const numMasked = chars.length - numVisible;
    return [
      ...Array.from({ length: numMasked }, () => mask),
      ...chars.slice(-numVisible),
    ];
  }, [chars, mask, visibleChars]);

  return (
    <div
      data-slot="sequence-preview"
      className={cn(sequencePreviewVariants({ size }), className)}
      aria-label={`Sequence: ${value}`}
      {...props}
    >
      {displayChars.map((char, i) => (
        <span
          key={i}
          data-slot="sequence-preview-char"
          className={cn(
            "border-border bg-muted inline-flex items-center justify-center rounded border font-mono font-medium",
            char === mask && "text-muted-foreground",
          )}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export { SequencePreview, sequencePreviewVariants };
