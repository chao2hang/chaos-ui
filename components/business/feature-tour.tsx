"use client";

import { cn } from "@/lib/utils";

/**
 * @component FeatureTour
 * @category business/ux
 * @since 0.7.0
 * @description 功能引导
 * @keywords feature, tour
 * @example
 * <FeatureTour />
 */

interface FeatureTourProps {
  steps: Array<{ target: string; title: string; content: string }>;
  open: boolean;
  onClose?: () => void;
  className?: string;
}

function FeatureTour({ className }: FeatureTourProps) {
  return (
    <div data-slot="feature-tour" className={cn("", className)}>
      {null}
    </div>
  );
}

export { FeatureTour };
export type { FeatureTourProps };
