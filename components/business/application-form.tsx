"use client";

import { cn } from "@/lib/utils";

/**
 * @component ApplicationForm
 * @category business/finance
 * @since 0.7.0
 * @description 申请表单
 * @keywords application, form
 * @example
 * <ApplicationForm />
 */

interface ApplicationFormProps {
  type: "open" | "close" | "change";
  onSubmit?: (data: unknown) => void;
  className?: string;
}

function ApplicationForm({ className }: ApplicationFormProps) {
  return (
    <div data-slot="application-form" className={cn("", className)}>
      {null}
    </div>
  );
}

export { ApplicationForm };
export type { ApplicationFormProps };
