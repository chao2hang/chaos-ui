"use client";

import * as React from "react";
import { FilterBuilder } from "@chaos_team/chaos-ui/business";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileFilterBuilderProps {
  fields: { key: string; label: string }[];
  onChange?: (result: {
    logic: string;
    filters: { field: string; operator: string; value: string }[];
  }) => void;
  className?: string;
}

function MobileFilterBuilder({
  className,
  ...props
}: MobileFilterBuilderProps) {
  return (
    <FilterBuilder
      className={cn(
        "[&_select]:h-12 [&_select]:px-4 [&_select]:text-base",
        "[&_input]:h-12 [&_input]:px-4 [&_input]:text-base",
        "md:[&_select]:h-8 md:[&_select]:px-2.5 md:[&_select]:text-sm",
        "md:[&_input]:h-8 md:[&_input]:px-2.5 md:[&_input]:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { MobileFilterBuilder };
export type { MobileFilterBuilderProps };
