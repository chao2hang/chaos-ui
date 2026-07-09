"use client";
import * as React from "react";
import { FormAutosaveIndicator } from "./form/form-autosave-indicator";
import type { AutosaveStatus } from "@/hooks/use-form-autosave";
import { cn } from "@chaos_team/chaos-ui/lib";

interface MobileFormAutosaveProps extends React.HTMLAttributes<HTMLDivElement> {
  status: AutosaveStatus;
  lastSaved?: number | null;
  error?: Error | null;
}

export function MobileFormAutosave({
  status,
  lastSaved,
  error,
  className,
  ...props
}: MobileFormAutosaveProps) {
  return (
    <div
      data-slot="mobile-form-autosave"
      className={cn(
        "bg-background/95 sticky bottom-0 z-10 flex h-9 items-center justify-between border-t px-3 backdrop-blur",
        className,
      )}
      {...props}
    >
      <FormAutosaveIndicator
        status={status}
        lastSaved={lastSaved}
        error={error}
        className="text-xs"
      />
    </div>
  );
}
