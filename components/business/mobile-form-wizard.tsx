"use client";

import * as React from "react";
import {
  FormWizard,
  type WizardRenderContext,
} from "@/components/business/form-wizard";
import { cn } from "@/lib/utils";

interface MobileFormWizardProps {
  steps: {
    title: string;
    description?: string;
    render: (context: WizardRenderContext) => React.ReactNode;
    validate?: (data: Record<string, unknown>) => Record<string, string>;
  }[];
  onComplete?: (data: Record<string, unknown>) => void;
  className?: string;
}

function MobileFormWizard({
  steps,
  onComplete,
  className,
}: MobileFormWizardProps) {
  return (
    <FormWizard
      steps={steps}
      {...(onComplete !== undefined ? { onComplete } : {})}
      className={cn(
        "[&_button]:h-12 [&_button]:px-6 [&_button]:text-base",
        "md:[&_button]:h-8 md:[&_button]:px-3 md:[&_button]:text-sm",
        className,
      )}
    />
  );
}

export { MobileFormWizard };
export type { MobileFormWizardProps };
