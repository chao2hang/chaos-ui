"use client";

import * as React from "react";
import { EmptyState } from "@chaos_team/chaos-ui/ui";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileEmptyStateProps {
  variant?: string;
  icon?: React.ElementType;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function MobileEmptyState({ className, ...props }: MobileEmptyStateProps) {
  return <EmptyState className={cn("py-8", className)} {...props} />;
}

export { MobileEmptyState };
export type { MobileEmptyStateProps };
