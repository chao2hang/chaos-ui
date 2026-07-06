"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface BillFooterProps extends React.ComponentProps<"div"> {
  subtotal?: number;
  tax?: number;
  taxRate?: number;
  total?: number;
  notes?: string;
  showTax?: boolean;
  className?: string;
}

function BillFooter({
  subtotal = 0,
  tax,
  taxRate = 0,
  total,
  notes,
  showTax = true,
  className,
  ...props
}: BillFooterProps) {
  const computedTax = tax ?? subtotal * taxRate;
  const computedTotal = total ?? subtotal + computedTax;

  return (
    <div
      data-slot="bill-footer"
      className={cn("space-y-4", className)}
      {...props}
    >
      <div className="flex flex-col items-end gap-1 text-sm">
        <div className="flex w-52 justify-between">
          <span className="text-muted-foreground">小计</span>
          <span>
            ¥{subtotal.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
          </span>
        </div>
        {showTax && (
          <div className="flex w-52 justify-between">
            <span className="text-muted-foreground">
              税额 ({taxRate * 100}%)
            </span>
            <span>
              ¥
              {computedTax.toLocaleString("zh-CN", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
        <div className="flex w-52 justify-between border-t pt-1 text-base font-semibold">
          <span>合计</span>
          <span>
            ¥
            {computedTotal.toLocaleString("zh-CN", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      {notes && (
        <div className="border-t pt-3">
          <p className="text-muted-foreground text-sm font-medium">备注</p>
          <p className="mt-1 text-sm">{notes}</p>
        </div>
      )}
    </div>
  );
}

export { BillFooter };
export type { BillFooterProps };
