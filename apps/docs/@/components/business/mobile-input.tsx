"use client";

import * as React from "react";
import { Input } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileInputProps extends React.ComponentProps<typeof Input> {
  // Mobile-specific props
}

function MobileInput({ className, ...props }: MobileInputProps) {
  return (
    <Input
      className={cn(
        "h-12 px-4 text-base",
        "md:h-8 md:px-2.5 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { MobileInput };
export type { MobileInputProps };
