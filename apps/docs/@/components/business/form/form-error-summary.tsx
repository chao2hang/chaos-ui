"use client";
import * as React from "react";
import { AlertCircleIcon, XIcon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";

export interface FormError {
  field?: string;
  message: string;
}

interface FormErrorSummaryProps extends React.ComponentProps<"div"> {
  errors: FormError[];
  onJumpTo?: (field: string) => void;
  className?: string;
  title?: string;
}

export function FormErrorSummary({
  errors,
  onJumpTo,
  className,
  title = `表单中有 ${errors.length} 个错误`,
  ...props
}: FormErrorSummaryProps) {
  if (errors.length === 0) return null;
  return (
    <div
      data-slot="form-error-summary"
      role="alert"
      className={cn(
        "border-destructive/30 bg-destructive/5 rounded-md border p-3 text-sm",
        className,
      )}
      {...props}
    >
      <div className="text-destructive flex items-center gap-2 font-medium">
        <AlertCircleIcon className="size-4" />
        {title}
      </div>
      <ul className="mt-2 space-y-1 text-xs">
        {errors.map((err, i) => (
          <li
            key={`${err.field ?? "global"}-${i}`}
            className="flex items-center gap-2"
          >
            {err.field && onJumpTo ? (
              <button
                type="button"
                onClick={() => onJumpTo(err.field!)}
                className="text-destructive underline-offset-2 hover:underline"
              >
                {err.message}
              </button>
            ) : (
              <span className="text-destructive/80">{err.message}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
