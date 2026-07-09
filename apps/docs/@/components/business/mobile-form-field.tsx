"use client";

import * as React from "react";
import { FormField } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileFormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

function MobileFormField({ className, ...props }: MobileFormFieldProps) {
  return <FormField className={cn("space-y-2", className)} {...props} />;
}

export { MobileFormField };
export type { MobileFormFieldProps };
