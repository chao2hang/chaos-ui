"use client";

import * as React from "react";
import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";

type MobileInputProps = React.ComponentProps<typeof Input>;

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
