"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Building2Icon } from "lucide-react";

interface BillHeaderProps extends React.ComponentProps<"div"> {
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  customerName?: string;
  customerAddress?: string;
  className?: string;
}

function BillHeader({
  companyName = "公司名称",
  companyAddress,
  companyPhone,
  invoiceNumber,
  invoiceDate,
  dueDate,
  customerName,
  customerAddress,
  className,
  ...props
}: BillHeaderProps) {
  return (
    <div
      data-slot="bill-header"
      className={cn("flex items-start justify-between", className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
          <Building2Icon className="text-primary size-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{companyName}</h2>
          {companyAddress && (
            <p className="text-muted-foreground mt-0.5 text-sm">
              {companyAddress}
            </p>
          )}
          {companyPhone && (
            <p className="text-muted-foreground text-sm">{companyPhone}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        {invoiceNumber && (
          <div className="mb-1">
            <span className="text-muted-foreground text-xs">发票编号</span>
            <p className="text-sm font-semibold">{invoiceNumber}</p>
          </div>
        )}
        {invoiceDate && (
          <div className="text-muted-foreground text-xs">
            开票日期: {invoiceDate}
          </div>
        )}
        {dueDate && (
          <div className="text-muted-foreground text-xs">
            到期日期: {dueDate}
          </div>
        )}
      </div>
    </div>
  );
}

export { BillHeader };
export type { BillHeaderProps };
