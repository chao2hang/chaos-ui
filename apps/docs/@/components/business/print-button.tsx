"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";

interface PrintButtonProps extends React.ComponentProps<"button"> {
  onClick?: () => void;
  label?: string;
  className?: string;
}

function PrintButton({
  onClick,
  label = "打印",
  className,
  ...props
}: PrintButtonProps) {
  const handlePrint = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Button
      data-slot="print-button"
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className={cn("", className)}
      {...(props as React.ComponentProps<"button">)}
    >
      <PrinterIcon />
      {label}
    </Button>
  );
}

export { PrintButton };
export type { PrintButtonProps };
