"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";

interface BarcodeDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  format?: "CODE128" | "EAN13" | "UPC";
  width?: number;
  height?: number;
  className?: string;
}

function BarcodeDisplay({
  value,
  format = "CODE128",
  width = 2,
  height = 100,
  className,
  ...props
}: BarcodeDisplayProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!value || !canvasRef.current) return;
    import("jsbarcode")
      .then((JsBarcode) => {
        JsBarcode.default(canvasRef.current!, value, {
          format,
          width,
          height,
          displayValue: true,
          fontSize: 14,
          margin: 10,
        });
      })
      .catch(() => {});
  }, [value, format, width, height]);

  if (!value) return null;

  return (
    <div
      data-slot="barcode-display"
      className={cn("inline-block", className)}
      {...props}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

BarcodeDisplay.displayName = "BarcodeDisplay";

export { BarcodeDisplay };
export type { BarcodeDisplayProps };
