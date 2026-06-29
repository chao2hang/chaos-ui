import * as React from "react";
import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";

function LabeledField({
  label,
  description,
  error,
  required,
  children,
  className,
}: {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

/** @deprecated Use LabeledField — FormField renamed to avoid collision with ui/Form's FormField */
export { LabeledField };
/** @deprecated Use LabeledField instead */
export { LabeledField as FormField };
