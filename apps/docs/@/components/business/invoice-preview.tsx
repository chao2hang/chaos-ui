"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceParty {
  name: string;
  address: string;
  email: string;
}

interface InvoiceData {
  id: string;
  date: string;
  dueDate: string;
  from: InvoiceParty;
  to: InvoiceParty;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

interface InvoicePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  invoice: InvoiceData;
  className?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function InvoicePreview({ invoice, className, ...props }: InvoicePreviewProps) {
  return (
    <div
      data-slot="invoice-preview"
      className={cn(
        "dark:bg-card dark:text-card-foreground max-w-2xl rounded-lg border bg-white p-8 text-sm shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoice</h2>
          <p className="text-muted-foreground">#{invoice.id}</p>
        </div>
        <div className="text-muted-foreground text-right text-xs">
          <p>Date: {invoice.date}</p>
          <p>Due: {invoice.dueDate}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <p className="text-muted-foreground mb-1 font-medium">From</p>
          <p className="font-medium">{invoice.from.name}</p>
          <p className="text-muted-foreground">{invoice.from.address}</p>
          <p className="text-muted-foreground">{invoice.from.email}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1 font-medium">To</p>
          <p className="font-medium">{invoice.to.name}</p>
          <p className="text-muted-foreground">{invoice.to.address}</p>
          <p className="text-muted-foreground">{invoice.to.email}</p>
        </div>
      </div>

      <table className="mt-8 w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-2 font-medium">Description</th>
            <th className="pb-2 text-right font-medium">Qty</th>
            <th className="pb-2 text-right font-medium">Unit Price</th>
            <th className="pb-2 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i} className="border-b border-dashed">
              <td className="py-2">{item.description}</td>
              <td className="py-2 text-right">{item.quantity}</td>
              <td className="py-2 text-right">
                {formatCurrency(item.unitPrice)}
              </td>
              <td className="py-2 text-right">
                {formatCurrency(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex flex-col items-end gap-1 text-sm">
        <div className="flex w-48 justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(invoice.subtotal)}</span>
        </div>
        <div className="flex w-48 justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatCurrency(invoice.tax)}</span>
        </div>
        <div className="flex w-48 justify-between border-t pt-1 text-base font-bold">
          <span>Total</span>
          <span>{formatCurrency(invoice.total)}</span>
        </div>
      </div>

      {invoice.notes && (
        <div className="bg-muted/50 text-muted-foreground mt-6 rounded-md p-3 text-xs">
          <p className="font-medium">Notes</p>
          <p>{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}

InvoicePreview.displayName = "InvoicePreview";

export { InvoicePreview };
export type { InvoiceData, InvoiceItem, InvoiceParty, InvoicePreviewProps };
