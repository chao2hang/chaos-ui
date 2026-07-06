"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { BillHeader } from "@/components/business/bill-header";
import { BillFooter } from "@/components/business/bill-footer";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface BillLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface BillPageProps extends React.ComponentProps<"div"> {
  headerProps?: React.ComponentProps<typeof BillHeader>;
  footerProps?: React.ComponentProps<typeof BillFooter>;
  lineItems?: BillLineItem[];
  className?: string;
}

function BillPage({
  headerProps,
  footerProps,
  lineItems = [],
  className,
  ...props
}: BillPageProps) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div
      data-slot="bill-page"
      className={cn("mx-auto max-w-4xl space-y-6 p-8", className)}
      {...props}
    >
      <BillHeader {...headerProps} />
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">序号</TableHead>
            <TableHead>描述</TableHead>
            <TableHead className="text-right">数量</TableHead>
            <TableHead className="text-right">单价</TableHead>
            <TableHead className="text-right">金额</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lineItems.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                ¥{item.unitPrice.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ¥{item.amount.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BillFooter subtotal={subtotal} {...footerProps} />
    </div>
  );
}

export { BillPage };
export type { BillPageProps, BillLineItem };
