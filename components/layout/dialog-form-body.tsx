"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component DialogFormBody
 * @category layout
 * @since 0.5.0
 * @description Drop-in body for Dialog forms - stacks FormFields / LabeledFields
 * vertically with appropriate gap and padding.
 * / Dialog form layout, vertical FormField stacking, default gap + padding
 * @example
 * <DialogContent>
 *   <DialogHeader>...</DialogHeader>
 *   <DialogFormBody>
 *     <LabeledField label="Name">...</LabeledField>
 *   </DialogFormBody>
 *   <DialogFooter>...</DialogFooter>
 * </DialogContent>
 */

interface DialogFormBodyProps extends React.ComponentProps<"div"> {
  /** Gap between fields / field spacing, default 4 (1rem) */
  gap?: number | string;
}

function DialogFormBody({
  className,
  gap = 4,
  ...props
}: DialogFormBodyProps) {
  const gapStyle: string | number =
    typeof gap === "number" ? `${gap * 0.25}rem` : gap;

  return (
    <div
      data-slot="dialog-form-body"
      className={cn("flex flex-col py-4", className)}
      style={{ gap: gapStyle }}
      {...props}
    />
  );
}

interface FormStackProps extends React.ComponentProps<"div"> {
  /** Gap between items / spacing */
  gap?: number | string;
  /** Direction / layout direction */
  direction?: "vertical" | "horizontal";
}

function FormStack({
  className,
  gap = 4,
  direction = "vertical",
  ...props
}: FormStackProps) {
  const gapStyle: string | number =
    typeof gap === "number" ? `${gap * 0.25}rem` : gap;

  return (
    <div
      data-slot="form-stack"
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
      style={{ gap: gapStyle }}
      {...props}
    />
  );
}

export { DialogFormBody, FormStack };
export type { DialogFormBodyProps, FormStackProps };
