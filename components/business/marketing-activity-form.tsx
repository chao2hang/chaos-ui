"use client";

import { cn } from "@/lib/utils";

/**
 * @component MarketingActivityForm
 * @category business/finance
 * @since 0.7.0
 * @description 营销活动表单
 * @keywords marketing, activity, form
 * @example
 * <MarketingActivityForm />
 */

interface MarketingActivityFormProps {
  initial?: Record<string, unknown>;
  onSubmit?: (data: unknown) => void;
  className?: string;
}

function MarketingActivityForm({ className }: MarketingActivityFormProps) {
  return (
    <div data-slot="marketing-activity-form" className={cn("", className)}>
      {null}
    </div>
  );
}

export { MarketingActivityForm };
export type { MarketingActivityFormProps };
