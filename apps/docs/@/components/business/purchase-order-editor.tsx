"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  PlusIcon,
  Trash2Icon,
  CheckCircle2Icon,
  CircleIcon,
  ClockIcon,
} from "@/components/ui/icons";

/**
 * @component PurchaseOrderEditor
 * @category business/erp
 * @since 1.0.0
 * @description Purchase order editor with line item management, tax calculation,
 * approval flow visualization, and status tracking.
 * @keywords purchase, order, po, procurement, erp, approval, vendor
 */

interface POLineItem {
  id: string;
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: number;
}

interface ApprovalStep {
  id: string;
  approver: string;
  title?: string;
  status: "pending" | "approved" | "rejected" | "current";
  timestamp?: string;
  comment?: string;
}

interface PurchaseOrderEditorProps {
  poNumber?: string;
  vendor?: string;
  onVendorChange?: (v: string) => void;
  orderDate?: string;
  expectedDelivery?: string;
  paymentTerms?: string;
  onHeaderChange?: (field: string, value: string) => void;
  lineItems: POLineItem[];
  onLineItemsChange?: (items: POLineItem[]) => void;
  approvalSteps?: ApprovalStep[];
  status?: "draft" | "pending" | "approved" | "rejected" | "completed";
  currencySymbol?: string;
  readOnly?: boolean;
  onSubmit?: () => void;
  className?: string;
}

function generateId() {
  return `po-line-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}
function fmt(n: number, s = "¥") {
  return `${s}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function PurchaseOrderEditor({
  poNumber,
  vendor,
  onVendorChange,
  orderDate,
  expectedDelivery,
  paymentTerms,
  onHeaderChange,
  lineItems = [],
  onLineItemsChange,
  approvalSteps = [],
  status = "draft",
  currencySymbol = "¥",
  readOnly = false,
  onSubmit,
  className,
}: PurchaseOrderEditorProps) {
  const totals = React.useMemo(() => {
    const subtotal = lineItems.reduce(
      (s, l) => s + l.quantity * l.unitPrice,
      0,
    );
    const tax = lineItems.reduce(
      (s, l) => s + l.quantity * l.unitPrice * (l.taxRate / 100),
      0,
    );
    return { subtotal, tax, total: subtotal + tax };
  }, [lineItems]);

  const handleAddLine = () => {
    onLineItemsChange?.([
      ...lineItems,
      {
        id: generateId(),
        productCode: "",
        productName: "",
        quantity: 1,
        unit: "pcs",
        unitPrice: 0,
        taxRate: 13,
      },
    ]);
  };
  const handleRemoveLine = (id: string) =>
    onLineItemsChange?.(lineItems.filter((l) => l.id !== id));
  const handleLineChange = (
    id: string,
    field: keyof POLineItem,
    value: string | number,
  ) => {
    onLineItemsChange?.(
      lineItems.map((l) =>
        l.id === id
          ? {
              ...l,
              [field]:
                field === "quantity" ||
                field === "unitPrice" ||
                field === "taxRate"
                  ? typeof value === "string"
                    ? parseFloat(value) || 0
                    : value
                  : value,
            }
          : l,
      ),
    );
  };

  const statusBadge = {
    draft: { label: "Draft", variant: "outline" as const },
    pending: { label: "Pending Approval", variant: "secondary" as const },
    approved: { label: "Approved", variant: "default" as const },
    rejected: { label: "Rejected", variant: "destructive" as const },
    completed: { label: "Completed", variant: "default" as const },
  };

  return (
    <div
      data-slot="purchase-order-editor"
      className={cn("space-y-4", className)}
    >
      {/* Header */}
      <div className="border-border bg-card flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <h3 className="text-foreground text-lg font-semibold">
            Purchase Order
          </h3>
          {poNumber && (
            <Badge variant="outline" className="font-mono text-xs">
              {poNumber}
            </Badge>
          )}
          <Badge variant={statusBadge[status].variant}>
            {statusBadge[status].label}
          </Badge>
        </div>
      </div>

      {/* PO header fields */}
      <div className="border-border bg-card grid grid-cols-2 gap-3 rounded-lg border p-4 md:grid-cols-4">
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Vendor
          </label>
          <Input
            value={vendor ?? ""}
            onChange={(e) => onVendorChange?.(e.target.value)}
            disabled={readOnly}
            placeholder="Vendor name"
            aria-label="Vendor"
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Order Date
          </label>
          <Input
            type="date"
            value={orderDate ?? ""}
            onChange={(e) => onHeaderChange?.("orderDate", e.target.value)}
            disabled={readOnly}
            aria-label="Order date"
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Expected Delivery
          </label>
          <Input
            type="date"
            value={expectedDelivery ?? ""}
            onChange={(e) =>
              onHeaderChange?.("expectedDelivery", e.target.value)
            }
            disabled={readOnly}
            aria-label="Expected delivery"
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            Payment Terms
          </label>
          <Input
            value={paymentTerms ?? ""}
            onChange={(e) => onHeaderChange?.("paymentTerms", e.target.value)}
            disabled={readOnly}
            placeholder="Net 30"
            aria-label="Payment terms"
          />
        </div>
      </div>

      {/* Line items */}
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="min-w-[120px]">Product Code</TableHead>
              <TableHead className="min-w-[160px]">Product Name</TableHead>
              <TableHead className="w-20 text-right">Qty</TableHead>
              <TableHead className="w-16">Unit</TableHead>
              <TableHead className="w-28 text-right">Unit Price</TableHead>
              <TableHead className="w-20 text-right">Tax %</TableHead>
              <TableHead className="w-28 text-right">Line Total</TableHead>
              {!readOnly && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={readOnly ? 7 : 8}
                  className="text-muted-foreground py-8 text-center"
                >
                  No line items
                </TableCell>
              </TableRow>
            ) : (
              lineItems.map((line) => {
                const lineTotal =
                  line.quantity * line.unitPrice * (1 + line.taxRate / 100);
                return (
                  <TableRow key={line.id} data-slot="po-line-item">
                    <TableCell>
                      <Input
                        className="h-8 font-mono text-sm"
                        value={line.productCode}
                        onChange={(e) =>
                          handleLineChange(
                            line.id,
                            "productCode",
                            e.target.value,
                          )
                        }
                        disabled={readOnly}
                        aria-label="Product code"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="h-8 text-sm"
                        value={line.productName}
                        onChange={(e) =>
                          handleLineChange(
                            line.id,
                            "productName",
                            e.target.value,
                          )
                        }
                        disabled={readOnly}
                        aria-label="Product name"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="h-8 text-right tabular-nums"
                        value={line.quantity}
                        onChange={(e) =>
                          handleLineChange(line.id, "quantity", e.target.value)
                        }
                        disabled={readOnly}
                        aria-label="Quantity"
                        min={0}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="h-8 text-sm"
                        value={line.unit}
                        onChange={(e) =>
                          handleLineChange(line.id, "unit", e.target.value)
                        }
                        disabled={readOnly}
                        aria-label="Unit"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="h-8 text-right tabular-nums"
                        value={line.unitPrice}
                        onChange={(e) =>
                          handleLineChange(line.id, "unitPrice", e.target.value)
                        }
                        disabled={readOnly}
                        aria-label="Unit price"
                        min={0}
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="h-8 text-right tabular-nums"
                        value={line.taxRate}
                        onChange={(e) =>
                          handleLineChange(line.id, "taxRate", e.target.value)
                        }
                        disabled={readOnly}
                        aria-label="Tax rate"
                        min={0}
                      />
                    </TableCell>
                    <TableCell className="text-right text-sm font-medium tabular-nums">
                      {fmt(lineTotal, currencySymbol)}
                    </TableCell>
                    {!readOnly && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleRemoveLine(line.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Remove line"
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
          {lineItems.length > 0 && (
            <TableBody>
              <TableRow className="bg-muted/50 border-t-2">
                <TableCell
                  colSpan={5}
                  className="text-right text-sm font-medium"
                >
                  Subtotal:
                </TableCell>
                <TableCell
                  className="text-right text-sm tabular-nums"
                  data-slot="po-subtotal"
                >
                  {fmt(totals.subtotal, currencySymbol)}
                </TableCell>
                {!readOnly && <TableCell />}
              </TableRow>
              <TableRow className="bg-muted/50">
                <TableCell
                  colSpan={5}
                  className="text-right text-sm font-medium"
                >
                  Tax:
                </TableCell>
                <TableCell
                  className="text-right text-sm tabular-nums"
                  data-slot="po-tax"
                >
                  {fmt(totals.tax, currencySymbol)}
                </TableCell>
                {!readOnly && <TableCell />}
              </TableRow>
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell colSpan={5} className="text-right text-sm">
                  Grand Total:
                </TableCell>
                <TableCell
                  className="text-primary text-right text-sm tabular-nums"
                  data-slot="po-total"
                >
                  {fmt(totals.total, currencySymbol)}
                </TableCell>
                {!readOnly && <TableCell />}
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>

      {!readOnly && (
        <Button variant="outline" size="sm" onClick={handleAddLine}>
          <PlusIcon className="mr-1 size-4" />
          Add Line
        </Button>
      )}

      {/* Approval flow */}
      {approvalSteps.length > 0 && (
        <div
          data-slot="po-approval-flow"
          className="border-border bg-card rounded-lg border p-4"
        >
          <h4 className="text-foreground mb-3 text-sm font-medium">
            Approval Flow
          </h4>
          <div className="flex items-center gap-2">
            {approvalSteps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div
                  className="flex flex-col items-center gap-1"
                  data-slot="approval-step"
                  data-status={step.status}
                >
                  {step.status === "approved" ? (
                    <CheckCircle2Icon className="size-6 text-green-600" />
                  ) : step.status === "current" ? (
                    <ClockIcon className="size-6 text-yellow-500" />
                  ) : step.status === "rejected" ? (
                    <CircleIcon className="size-6 text-red-500" />
                  ) : (
                    <CircleIcon className="text-muted-foreground size-6" />
                  )}
                  <span className="text-foreground text-xs font-medium">
                    {step.approver}
                  </span>
                  {step.title && (
                    <span className="text-muted-foreground text-[10px]">
                      {step.title}
                    </span>
                  )}
                </div>
                {i < approvalSteps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-8",
                      step.status === "approved" ? "bg-green-500" : "bg-border",
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {!readOnly && onSubmit && (
        <div className="border-border flex justify-end gap-2 border-t pt-4">
          <Button onClick={onSubmit}>Submit for Approval</Button>
        </div>
      )}
    </div>
  );
}

export { PurchaseOrderEditor };
export type { PurchaseOrderEditorProps, POLineItem, ApprovalStep };
