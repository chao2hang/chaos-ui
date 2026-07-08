import * as React from "react";
import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * @component LabeledField
 * @category business/ux
 * @since 0.2.0
 * @description Simple label + content + description/error wrapper for form fields / 表单字段的标签、内容、描述和错误提示包装组件
 * @keywords form, field, label, error, description
 * @example
 * <LabeledField label="Email" required error="Invalid email">
 *   <Input />
 * </LabeledField>
 */
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
    <div data-slot="form-field" className={cn("space-y-1.5", className)}>
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

export { LabeledField };
export { LabeledField as FormField };
