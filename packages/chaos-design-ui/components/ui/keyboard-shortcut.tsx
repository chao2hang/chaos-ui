import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const keyboardShortcutVariants = cva(
  "inline-flex items-center justify-center rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground shadow-sm",
  {
    variants: {
      size: {
        default: "min-w-[1.5rem] h-5",
        sm: "min-w-[1.25rem] h-4 text-[10px]",
        lg: "min-w-[2rem] h-6 text-sm",
      },
    },
    defaultVariants: { size: "default" },
  },
);

interface KeyboardShortcutProps
  extends
    React.ComponentProps<"kbd">,
    VariantProps<typeof keyboardShortcutVariants> {
  /** The keys to display */
  keys: string | string[];
  /** Separator between keys */
  separator?: string;
}

function KeyboardShortcut({
  className,
  size,
  keys,
  separator = "+",
  ...props
}: KeyboardShortcutProps) {
  const keyList = Array.isArray(keys) ? keys : [keys];

  return (
    <kbd
      data-slot="keyboard-shortcut"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      {keyList.map((key, i) => (
        <React.Fragment key={i}>
          <span
            data-slot="keyboard-shortcut-key"
            className={cn(keyboardShortcutVariants({ size }))}
          >
            {key}
          </span>
          {i < keyList.length - 1 && (
            <span className="text-muted-foreground text-xs">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </kbd>
  );
}

export { KeyboardShortcut, keyboardShortcutVariants };
