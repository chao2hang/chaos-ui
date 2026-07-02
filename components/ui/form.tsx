"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

/**
 * @component FormField
 * @category ui/data-entry
 * @since 0.2.0
 * @description A form field wrapper integrating react-hook-form Controller with field context / 基于 react-hook-form Controller 的表单字段包装器，提供字段上下文
 * @keywords form, field, react-hook-form, controller, validation
 * @example
 * <FormField control={control} name="email" render={({ field }) => <Input {...field} />} />
 */
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext.name) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

export type FormItemProps = React.ComponentProps<"div">;

/**
 * @component FormItem
 * @category ui/data-entry
 * @since 0.2.0
 * @description A form item container providing unique ID context for labels, controls, descriptions, and messages / 表单项目容器，为标签、控件、描述和消息提供唯一 ID 上下文
 * @keywords form, item, label, control, context
 * @example
 * <FormItem><FormLabel>Email</FormLabel><FormControl><Input /></FormControl></FormItem>
 */
function FormItem({ className, ...props }: FormItemProps) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("group/form-item space-y-1.5", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

export type FormLabelProps = React.ComponentProps<typeof Label> & {
  required?: boolean;
};

/**
 * @component FormLabel
 * @category ui/data-entry
 * @since 0.2.0
 * @description A form label that integrates with FormField context, supports required indicator and error styling / 与 FormField 上下文集成的表单标签，支持必填指示和错误样式
 * @keywords form, label, required, error
 * @example
 * <FormLabel required>Email Address</FormLabel>
 */
function FormLabel({ className, required, ...props }: FormLabelProps) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    >
      {props.children}
      {required && <span className="text-destructive">*</span>}
    </Label>
  );
}

export type FormControlProps = React.ComponentProps<typeof Slot>;

/**
 * @component FormControl
 * @category ui/data-entry
 * @since 0.2.0
 * @description A form control slot that wires aria-describedby and aria-invalid from the parent FormField context / 从父 FormField 上下文连接 aria-describedby 和 aria-invalid 的表单控件插槽
 * @keywords form, control, slot, aria, accessibility
 * @example
 * <FormControl><Input placeholder="Enter your name" /></FormControl>
 */
function FormControl({ ...props }: FormControlProps) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

export type FormDescriptionProps = React.ComponentProps<"p">;

/**
 * @component FormDescription
 * @category ui/data-entry
 * @since 0.2.0
 * @description A form field description text that wires its ID from FormField context for aria-describedby / 从 FormField 上下文连接 ID 的表单字段描述文本
 * @keywords form, description, helper-text, aria
 * @example
 * <FormDescription>Your email will not be shared.</FormDescription>
 */
function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  );
}

export type FormMessageProps = React.ComponentProps<"p">;

/**
 * @component FormMessage
 * @category ui/data-entry
 * @since 0.2.0
 * @description Displays validation error messages from FormField context, hidden when there is no error / 显示来自 FormField 上下文的验证错误消息，无错误时隐藏
 * @keywords form, message, error, validation
 * @example
 * <FormMessage />
 */
function FormMessage({ className, ...props }: FormMessageProps) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-xs font-medium", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
