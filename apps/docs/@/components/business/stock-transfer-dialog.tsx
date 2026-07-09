"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Badge } from "@chaos_team/chaos-ui/ui";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@chaos_team/chaos-ui/ui";
import {
  PlusIcon,
  Trash2Icon,
  ArrowRightIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component StockTransferDialog
 * @category business/erp
 * @since 1.0.0
 * @description Stock transfer dialog for moving inventory between warehouses
 * with quantity validation and batch tracking.
 * @keywords stock, transfer, warehouse, inventory, wms, move, dialog
 */

interface TransferLine {
  id: string;
  productCode: string;
  productName: string;
  quantity: number;
  unit: string;
  batchNo?: string;
  availableQty?: number;
}

interface StockTransferDialogProps {
  transferNo?: string;
  fromWarehouse?: string;
  toWarehouse?: string;
  onFromWarehouseChange?: (v: string) => void;
  onToWarehouseChange?: (v: string) => void;
  warehouses?: string[];
  lines: TransferLine[];
  onLinesChange?: (lines: TransferLine[]) => void;
  transferType?: "regular" | "urgent";
  onTransferTypeChange?: (type: "regular" | "urgent") => void;
  remark?: string;
  onRemarkChange?: (v: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  readOnly?: boolean;
  className?: string;
}

function genId() {
  return `st-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function StockTransferDialog({
  transferNo,
  fromWarehouse,
  toWarehouse,
  onFromWarehouseChange,
  onToWarehouseChange,
  warehouses = [],
  lines = [],
  onLinesChange,
  transferType = "regular",
  onTransferTypeChange,
  remark,
  onRemarkChange,
  onSubmit,
  onCancel,
  readOnly = false,
  className,
}: StockTransferDialogProps) {
  const handleAddLine = () =>
    onLinesChange?.([
      ...lines,
      {
        id: genId(),
        productCode: "",
        productName: "",
        quantity: 1,
        unit: "pcs",
      },
    ]);
  const handleRemoveLine = (id: string) =>
    onLinesChange?.(lines.filter((l) => l.id !== id));
  const handleLineChange = (
    id: string,
    field: keyof TransferLine,
    value: string | number,
  ) => {
    onLinesChange?.(
      lines.map((l) =>
        l.id === id
          ? {
              ...l,
              [field]:
                field === "quantity"
                  ? typeof value === "string"
                    ? parseFloat(value) || 0
                    : value
                  : value,
            }
          : l,
      ),
    );
  };

  const totalQty = lines.reduce((s, l) => s + l.quantity, 0);
  const sameWarehouse =
    !!fromWarehouse && !!toWarehouse && fromWarehouse === toWarehouse;

  return (
    <div
      data-slot="stock-transfer-dialog"
      className={cn(
        "border-border bg-card space-y-4 rounded-lg border p-5",
        className,
      )}
    >
      {/* Header */}
      <div className="border-border flex items-center justify-between border-b pb-3">
        <h3 className="text-foreground text-lg font-semibold">
          Stock Transfer
        </h3>
        {transferNo && (
          <Badge variant="outline" className="font-mono">
            {transferNo}
          </Badge>
        )}
      </div>

      {/* Warehouse selection */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            From Warehouse
          </label>
          <select
            className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
            value={fromWarehouse ?? ""}
            onChange={(e) => onFromWarehouseChange?.(e.target.value)}
            disabled={readOnly}
            aria-label="From warehouse"
          >
            <option value="">Select source</option>
            {warehouses.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
        <ArrowRightIcon className="text-muted-foreground mb-2 size-5" />
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-medium">
            To Warehouse
          </label>
          <select
            className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
            value={toWarehouse ?? ""}
            onChange={(e) => onToWarehouseChange?.(e.target.value)}
            disabled={readOnly}
            aria-label="To warehouse"
          >
            <option value="">Select destination</option>
            {warehouses.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>
      {sameWarehouse && (
        <p className="text-destructive text-xs">
          Source and destination cannot be the same
        </p>
      )}

      {/* Transfer type */}
      <div className="flex items-center gap-2">
        <label className="text-foreground text-sm font-medium">Type:</label>
        <div className="flex gap-1">
          <button
            type="button"
            data-slot="transfer-type"
            data-active={transferType === "regular"}
            onClick={() => !readOnly && onTransferTypeChange?.("regular")}
            disabled={readOnly}
            className={cn(
              "rounded-md border px-3 py-1 text-xs",
              transferType === "regular"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground",
            )}
          >
            Regular
          </button>
          <button
            type="button"
            data-slot="transfer-type"
            data-active={transferType === "urgent"}
            onClick={() => !readOnly && onTransferTypeChange?.("urgent")}
            disabled={readOnly}
            className={cn(
              "rounded-md border px-3 py-1 text-xs",
              transferType === "urgent"
                ? "border-destructive bg-destructive/10 text-destructive"
                : "border-border text-muted-foreground",
            )}
          >
            Urgent
          </button>
        </div>
      </div>

      {/* Lines */}
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="min-w-[120px]">Product Code</TableHead>
              <TableHead className="min-w-[160px]">Product Name</TableHead>
              <TableHead className="w-20 text-right">Qty</TableHead>
              <TableHead className="w-16">Unit</TableHead>
              <TableHead className="min-w-[120px]">Batch No</TableHead>
              <TableHead className="w-24 text-right">Available</TableHead>
              {!readOnly && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={readOnly ? 6 : 7}
                  className="text-muted-foreground py-6 text-center"
                >
                  No items
                </TableCell>
              </TableRow>
            ) : (
              lines.map((line) => (
                <TableRow key={line.id} data-slot="transfer-line">
                  <TableCell>
                    <Input
                      className="h-8 font-mono text-sm"
                      value={line.productCode}
                      onChange={(e) =>
                        handleLineChange(line.id, "productCode", e.target.value)
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
                        handleLineChange(line.id, "productName", e.target.value)
                      }
                      disabled={readOnly}
                      aria-label="Product name"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className={cn(
                        "h-8 text-right tabular-nums",
                        line.availableQty != null &&
                          line.quantity > line.availableQty &&
                          "border-destructive",
                      )}
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
                      className="h-8 text-sm"
                      value={line.batchNo ?? ""}
                      onChange={(e) =>
                        handleLineChange(line.id, "batchNo", e.target.value)
                      }
                      disabled={readOnly}
                      aria-label="Batch number"
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right text-sm tabular-nums">
                    {line.availableQty ?? "—"}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        {!readOnly && (
          <Button variant="outline" size="sm" onClick={handleAddLine}>
            <PlusIcon className="mr-1 size-4" />
            Add Item
          </Button>
        )}
        <span className="text-muted-foreground text-sm">
          Total: <strong className="text-foreground">{totalQty}</strong> units
        </span>
      </div>

      {/* Remark */}
      <div>
        <label className="text-muted-foreground mb-1 block text-xs font-medium">
          Remark
        </label>
        <textarea
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
          rows={2}
          value={remark ?? ""}
          onChange={(e) => onRemarkChange?.(e.target.value)}
          disabled={readOnly}
          aria-label="Remark"
        />
      </div>

      {/* Actions */}
      {!readOnly && (
        <div className="border-border flex justify-end gap-2 border-t pt-3">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button onClick={onSubmit} disabled={sameWarehouse}>
              Submit Transfer
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { StockTransferDialog };
export type { StockTransferDialogProps, TransferLine };
