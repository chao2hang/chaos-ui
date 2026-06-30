import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Callout
 * @category business/charts
 * @since 0.7.0
 * @description 标注卡片
 * @keywords callout
 * @example
 * <Callout />
 */

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "info" | "success" | "warning" | "error";
  className?: string;
}

function Callout({ className }: CalloutProps) {
  return (
    <div data-slot="callout" className={cn("", className)}>
      {null}
    </div>
  );
}

export { Callout };
export type { CalloutProps };
