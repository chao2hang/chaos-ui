"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const formVariants = cva("", {
  variants: {
    layout: {
      vertical: "flex flex-col gap-4",
      horizontal: "flex flex-row flex-wrap gap-4",
      inline: "flex flex-row flex-wrap items-center gap-4",
    },
  },
  defaultVariants: { layout: "vertical" },
});

interface FormFieldContextValue {
  id: string;
  name: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);

function useFormField(): FormFieldContextValue | null {
  return React.useContext(FormFieldContext);
}

interface FormProps
  extends React.ComponentProps<"form">, VariantProps<typeof formVariants> {
  /** Called on submit with form data */
  onSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  /** Validation errors map (field name -> error message) */
  errors?: Record<string, string>;
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, layout, onSubmit, errors = {}, children, ...props }, ref) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: Record<string, FormDataEntryValue> = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      onSubmit?.(data);
    };

    return (
      <form
        ref={ref}
        data-slot="form"
        className={cn(formVariants({ layout }), className)}
        onSubmit={handleSubmit}
        noValidate
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.name) {
            const name = child.props.name as string;
            return (
              <FormFieldContext.Provider
                key={name}
                value={{
                  id: `form-field-${name}`,
                  name,
                  error: errors[name],
                  required: child.props.required,
                  disabled: child.props.disabled,
                }}
              >
                {child}
              </FormFieldContext.Provider>
            );
          }
          return child;
        })}
      </form>
    );
  },
);
Form.displayName = "Form";

interface FormItemProps extends React.ComponentProps<"div"> {
  name: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  required?: boolean;
}

function FormItem({
  className,
  name,
  label,
  description,
  required,
  children,
  ...props
}: FormItemProps) {
  const field = useFormField();

  return (
    <div
      data-slot="form-item"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {label && (
        <label
          data-slot="form-label"
          htmlFor={field?.id ?? `form-field-${name}`}
          className={cn(
            "text-sm leading-none font-medium",
            field?.disabled && "cursor-not-allowed opacity-70",
          )}
        >
          {label}
          {(required || field?.required) && (
            <span className="text-destructive ml-1">*</span>
          )}
        </label>
      )}
      {children}
      {description && (
        <p
          data-slot="form-description"
          className="text-muted-foreground text-xs"
        >
          {description}
        </p>
      )}
      {field?.error && (
        <p data-slot="form-message" className="text-destructive text-xs">
          {field.error}
        </p>
      )}
    </div>
  );
}

export { Form, FormItem, useFormField };
export type { FormFieldContextValue };
