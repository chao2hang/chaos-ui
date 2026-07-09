"use client";

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
  TableFooter,
} from "@/components/ui/table";
import { PlusIcon, Trash2Icon } from "@/components/ui/icons";

/**
 * @component QuotationLineEditor
 * @category business/sales
 * @since 1.0.0
 * @description Quotation line-item editor with cost / margin / discount
 * calculation, per-line profit display, and subtotal roll-up.
 * @keywords quotation, quote, sales, margin, profit, discount, pricing
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** A single quotation line item. */
interface QuotationLine {
  id: string;
  /** Product code. */
  productCode: string;
  /** Product name / description. */
  productName: string;
  /** Quantity. */
  quantity: number;
  /** Unit, e.g. "pcs", "kg". */
  unit: string;
  /** Unit cost. */
  unitCost: number;
  /** Unit list price. */
  unitPrice: number;
  /** Discount percentage 0–100. */
  discountPct: number;
  /** Tax rate percentage. */
  taxRate?: number;
}

/** Props for QuotationLineEditor. */
interface QuotationLineEditorProps {
  /** Quote number. */
  quoteNo?: string;
  /** Line items. */
  lines: QuotationLine[];
  /** Lines change callback. */
  onLinesChange?: (lines: QuotationLine[]) => void;
  /** Currency symbol. */
  currencySymbol?: string;
  /** Submit handler. */
  onSubmit?: () => void;
  /** Cancel handler. */
  onCancel?: () => void;
  /** Read-only mode. */
  readOnly?: boolean;
  /** Extra class name. */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function genId() {
  return `ql-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Net unit price after discount. */
function netUnitPrice(line: QuotationLine): number {
  return line.unitPrice * (1 - line.discountPct / 100);
}

/** Line subtotal before tax. */
function lineSubtotal(line: QuotationLine): number {
  return netUnitPrice(line) * line.quantity;
}

/** Line cost. */
function lineCost(line: QuotationLine): number {
  return line.unitCost * line.quantity;
}

/** Line profit. */
function lineProfit(line: QuotationLine): number {
  return lineSubtotal(line) - lineCost(line);
}

/** Line margin percentage. */
function lineMarginPct(line: QuotationLine): number {
  const sub = lineSubtotal(line);
  if (sub === 0) return 0;
  return (lineProfit(line) / sub) * 100;
}

/** Line tax amount. */
function lineTax(line: QuotationLine): number {
  return lineSubtotal(line) * ((line.taxRate ?? 0) / 100);
}

function formatMoney(v: number, symbol: string): string {
  return `${symbol}${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function marginColor(margin: number): string {
  if (margin < 0) return "text-destructive";
  if (margin < 15) return "text-amber-600";
  return "text-emerald-600";
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function QuotationLineEditor({
  quoteNo,
  lines = [],
  onLinesChange,
  currencySymbol = "¥",
  onSubmit,
  onCancel,
  readOnly = false,
  className,
}: QuotationLineEditorProps) {
  const handleAddLine = () => {
    onLinesChange?.([
      ...lines,
      {
        id: genId(),
        productCode: "",
        productName: "",
        quantity: 1,
        unit: "pcs",
        unitCost: 0,
        unitPrice: 0,
        discountPct: 0,
        taxRate: 13,
      },
    ]);
  };

  const handleRemoveLine = (id: string) => {
    onLinesChange?.(lines.filter((l) => l.id !== id));
  };

  const handleLineChange = (
    id: string,
    field: keyof QuotationLine,
    value: string | number,
  ) => {
    onLinesChange?.(
      lines.map((l) => {
        if (l.id !== id) return l;
        if (
          field === "productCode" ||
          field === "productName" ||
          field === "unit"
        ) {
          return { ...l, [field]: value as string };
        }
        const numVal =
          typeof value === "string" ? parseFloat(value) || 0 : value;
        return { ...l, [field]: numVal };
      }),
    );
  };

  // Totals
  const subtotal = lines.reduce((s, l) => s + lineSubtotal(l), 0);
  const totalCost = lines.reduce((s, l) => s + lineCost(l), 0);
  const totalProfit = subtotal - totalCost;
  const totalTax = lines.reduce((s, l) => s + lineTax(l), 0);
  const grandTotal = subtotal + totalTax;
  const overallMargin = subtotal > 0 ? (totalProfit / subtotal) * 100 : 0;

  return (
    <div
      data-slot="quotation-line-editor"
      className={cn(
        "border-border bg-card space-y-4 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b pb-3">
        <h3 className="text-foreground text-lg font-semibold">
          Quotation Editor
        </h3>
        {quoteNo && (
          <Badge variant="outline" className="font-mono">
            {quoteNo}
          </Badge>
        )}
      </div>

      {/* Line items table */}
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="min-w-[100px]">Code</TableHead>
              <TableHead className="min-w-[140px]">Product</TableHead>
              <TableHead className="w-20 text-right">Qty</TableHead>
              <TableHead className="w-16">Unit</TableHead>
              <TableHead className="w-24 text-right">Unit Cost</TableHead>
              <TableHead className="w-24 text-right">Unit Price</TableHead>
              <TableHead className="w-20 text-right">Disc%</TableHead>
              <TableHead className="w-24 text-right">Net Price</TableHead>
              <TableHead className="w-24 text-right">Subtotal</TableHead>
              <TableHead className="w-24 text-right">Profit</TableHead>
              <TableHead className="w-20 text-right">Margin</TableHead>
              <TableHead className="w-20 text-right">Tax%</TableHead>
              {!readOnly && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={readOnly ? 11 : 12}
                  className="text-muted-foreground py-6 text-center"
                >
                  No line items
                </TableCell>
              </TableRow>
            ) : (
              lines.map((line) => {
                const profit = lineProfit(line);
                const margin = lineMarginPct(line);
                return (
                  <TableRow key={line.id} data-slot="quotation-line">
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
                        value={line.unitCost}
                        onChange={(e) =>
                          handleLineChange(line.id, "unitCost", e.target.value)
                        }
                        disabled={readOnly}
                        aria-label="Unit cost"
                        min={0}
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
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="h-8 text-right tabular-nums"
                        value={line.discountPct}
                        onChange={(e) =>
                          handleLineChange(
                            line.id,
                            "discountPct",
                            e.target.value,
                          )
                        }
                        disabled={readOnly}
                        aria-label="Discount percent"
                        min={0}
                        max={100}
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right text-sm tabular-nums">
                      {formatMoney(netUnitPrice(line), currencySymbol)}
                    </TableCell>
                    <TableCell className="text-foreground text-right text-sm font-medium tabular-nums">
                      {formatMoney(lineSubtotal(line), currencySymbol)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right text-sm tabular-nums",
                        marginColor(margin),
                      )}
                    >
                      {formatMoney(profit, currencySymbol)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right text-sm font-semibold tabular-nums",
                        marginColor(margin),
                      )}
                    >
                      {margin.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="h-8 text-right tabular-nums"
                        value={line.taxRate ?? 0}
                        onChange={(e) =>
                          handleLineChange(line.id, "taxRate", e.target.value)
                        }
                        disabled={readOnly}
                        aria-label="Tax rate"
                        min={0}
                      />
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
          {lines.length > 0 && (
            <TableFooter>
              <TableRow className="bg-muted/30 font-semibold">
                <TableCell colSpan={7}>Total</TableCell>
                <TableCell className="text-muted-foreground text-right">
                  —
                </TableCell>
                <TableCell className="text-foreground text-right tabular-nums">
                  {formatMoney(subtotal, currencySymbol)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right tabular-nums",
                    marginColor(overallMargin),
                  )}
                >
                  {formatMoney(totalProfit, currencySymbol)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right tabular-nums",
                    marginColor(overallMargin),
                  )}
                >
                  {overallMargin.toFixed(1)}%
                </TableCell>
                <TableCell className="text-muted-foreground text-right">
                  {formatMoney(totalTax, currencySymbol)}
                </TableCell>
                {!readOnly && <TableCell />}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Summary + actions */}
      <div className="flex items-center justify-between">
        <div className="space-y-1 text-sm">
          <div className="text-muted-foreground">
            Subtotal:{" "}
            <strong className="text-foreground tabular-nums">
              {formatMoney(subtotal, currencySymbol)}
            </strong>
            {"  ·  "}
            Tax:{" "}
            <strong className="text-foreground tabular-nums">
              {formatMoney(totalTax, currencySymbol)}
            </strong>
            {"  ·  "}
            <span className={cn("font-semibold", marginColor(overallMargin))}>
              Margin: {overallMargin.toFixed(1)}%
            </span>
          </div>
          <div className="text-foreground text-base font-bold">
            Grand Total:{" "}
            <span className="tabular-nums">
              {formatMoney(grandTotal, currencySymbol)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!readOnly && (
            <Button variant="outline" size="sm" onClick={handleAddLine}>
              <PlusIcon className="mr-1 size-4" />
              Add Line
            </Button>
          )}
          {!readOnly && onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {!readOnly && onSubmit && (
            <Button onClick={onSubmit}>Save Quotation</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { QuotationLineEditor };
export type { QuotationLineEditorProps, QuotationLine };
