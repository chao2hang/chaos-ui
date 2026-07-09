"use client";

import * as React from "react";
import { Textarea } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileTextareaProps extends React.ComponentProps<"textarea"> {
  // Mobile-specific props
}

function MobileTextarea({ className, ...props }: MobileTextareaProps) {
  return (
    <Textarea
      className={cn(
        "min-h-[120px] px-4 py-3 text-base",
        "md:min-h-[80px] md:px-2.5 md:py-1 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { MobileTextarea };
export type { MobileTextareaProps };
