"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component WizardLayout
 * @category layout
 * @since 0.7.0
 * @description 向导式分步布局
 * @keywords wizard, layout
 * @example
 * <WizardLayout />
 */

interface WizardLayoutProps {
  steps: Array<{ id: string; title: string; description?: string }>;
  current: number;
  onComplete?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function WizardLayout({ className }: WizardLayoutProps) {
  return <div data-slot="wizard-layout" className={cn("", className)} />;
}

export { WizardLayout };
export type { WizardLayoutProps };
