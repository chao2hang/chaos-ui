import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogFormBodyProps extends React.ComponentProps<"div"> {
  scrolling?: boolean;
}

export function DialogFormBody({
  scrolling = true,
  className,
  children,
  ...props
}: DialogFormBodyProps) {
  return (
    <div
      data-slot="dialog-form-body"
      className={cn("px-4 py-4", scrolling && "overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}
