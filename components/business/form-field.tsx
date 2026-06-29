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

/**
 * LabeledField — simple label + content + description/error wrapper.
 *
 * Note: Previously also exported as `FormField`, which collided with the
 * react-hook-form-based `FormField` from `@/components/ui/form`. The alias
 * was removed to resolve the naming conflict — use `LabeledField` directly.
 */
export { LabeledField };
