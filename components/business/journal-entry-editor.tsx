"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  Trash2Icon,
  CheckCircle2Icon,
  AlertCircleIcon,
} from "@/components/ui/icons";

/**
 * @component JournalEntryEditor
 * @category business/finance
 * @since 1.0.0
 * @description Double-entry journal editor with debit/credit balance
 * validation. Supports account selection, line-level amounts, auto-balance
 * calculation, and entry summary with totals.
 * @keywords journal, entry, accounting, debit, credit, balance, ledger, voucher
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** A single journal entry line. */
interface JournalEntryLine {
  /** Unique line id */
  id: string;
  /** Account code */
  accountCode: string;
  /** Account name */
  accountName: string;
  /** Description/memo */
  description?: string;
  /** Debit amount (0 if credit) */
  debit: number;
  /** Credit amount (0 if debit) */
  credit: number;
}

/** Account option for the account picker. */
interface AccountOption {
  code: string;
  name: string;
  /** Whether this is a debit-normal or credit-normal account */
  normalBalance?: "debit" | "credit";
}

/** Props for JournalEntryEditor. */
interface JournalEntryEditorProps {
  /** Journal entry lines */
  lines: JournalEntryLine[];
  /** Change callback with updated lines */
  onChange?: (lines: JournalEntryLine[]) => void;
  /** Available accounts for selection */
  accounts?: AccountOption[];
  /** Read-only mode */
  readOnly?: boolean;
  /** Currency symbol (default: "¥") */
  currencySymbol?: string;
  /** Entry date */
  entryDate?: string;
  /** Entry description / voucher number */
  voucherNo?: string;
  /** Show balance status badge */
  showBalanceStatus?: boolean;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function formatAmount(value: number, symbol = "¥"): string {
  if (!value) return `${symbol}0.00`;
  return `${symbol}${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function generateId(): string {
  return `je-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function JournalEntryEditor({
  lines,
  onChange,
  accounts = [],
  readOnly = false,
  currencySymbol = "¥",
  voucherNo,
  showBalanceStatus = true,
  className,
}: JournalEntryEditorProps) {
  /* ---- totals ---- */
  const totals = React.useMemo(() => {
    const totalDebit = lines.reduce(
      (sum, l) => sum + (Number(l.debit) || 0),
      0,
    );
    const totalCredit = lines.reduce(
      (sum, l) => sum + (Number(l.credit) || 0),
      0,
    );
    return {
      debit: totalDebit,
      credit: totalCredit,
      balanced: Math.abs(totalDebit - totalCredit) < 0.005,
      diff: totalDebit - totalCredit,
    };
  }, [lines]);

  /* ---- handlers ---- */
  const handleAddLine = () => {
    const newLine: JournalEntryLine = {
      id: generateId(),
      accountCode: "",
      accountName: "",
      description: "",
      debit: 0,
      credit: 0,
    };
    onChange?.([...lines, newLine]);
  };

  const handleRemoveLine = (id: string) => {
    onChange?.(lines.filter((l) => l.id !== id));
  };

  const handleLineChange = (
    id: string,
    field: keyof JournalEntryLine,
    value: string | number,
  ) => {
    onChange?.(
      lines.map((l) => {
        if (l.id !== id) return l;
        if (field === "debit" || field === "credit") {
          // When entering debit, clear credit and vice versa
          const numVal =
            typeof value === "string" ? parseFloat(value) || 0 : value;
          if (field === "debit" && numVal > 0) {
            return { ...l, debit: numVal, credit: 0 };
          }
          if (field === "credit" && numVal > 0) {
            return { ...l, credit: numVal, debit: 0 };
          }
          return { ...l, [field]: numVal };
        }
        // Account selection
        if (field === "accountCode") {
          const account = accounts.find((a) => a.code === value);
          return {
            ...l,
            accountCode: String(value),
            accountName: account?.name ?? "",
          };
        }
        return { ...l, [field]: value };
      }),
    );
  };

  return (
    <div
      data-slot="journal-entry-editor"
      className={cn("space-y-3", className)}
    >
      {/* Header */}
      {(voucherNo || showBalanceStatus) && (
        <div className="flex items-center justify-between gap-4">
          {voucherNo && (
            <span className="text-foreground text-sm font-medium">
              Voucher: {voucherNo}
            </span>
          )}
          {showBalanceStatus && (
            <div className="flex items-center gap-2">
              {totals.balanced && lines.length > 0 ? (
                <Badge variant="default" className="gap-1 bg-green-600">
                  <CheckCircle2Icon className="size-3" />
                  Balanced
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <AlertCircleIcon className="size-3" />
                  Unbalanced (
                  {formatAmount(Math.abs(totals.diff), currencySymbol)})
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Lines table */}
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-10 text-center">#</TableHead>
              <TableHead className="min-w-[140px]">Account Code</TableHead>
              <TableHead className="min-w-[160px]">Account Name</TableHead>
              <TableHead className="min-w-[180px]">Description</TableHead>
              <TableHead className="w-32 text-right">Debit</TableHead>
              <TableHead className="w-32 text-right">Credit</TableHead>
              {!readOnly && (
                <TableHead className="w-12 text-center">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={readOnly ? 6 : 7}
                  className="text-muted-foreground py-8 text-center"
                >
                  No journal lines. Click "Add Line" to start.
                </TableCell>
              </TableRow>
            ) : (
              lines.map((line, index) => (
                <TableRow key={line.id} data-slot="journal-entry-line">
                  <TableCell className="text-muted-foreground text-center text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span className="text-sm">{line.accountCode || "—"}</span>
                    ) : accounts.length > 0 ? (
                      <NativeSelect
                        size="sm"
                        className="w-full"
                        value={line.accountCode}
                        onChange={(e) =>
                          handleLineChange(
                            line.id,
                            "accountCode",
                            e.target.value,
                          )
                        }
                        aria-label="Account code"
                        options={[
                          { value: "", label: "Select account" },
                          ...accounts.map((acc) => ({
                            value: acc.code,
                            label: `${acc.code} — ${acc.name}`,
                          })),
                        ]}
                      />
                    ) : (
                      <Input
                        className="h-8"
                        value={line.accountCode}
                        onChange={(e) =>
                          handleLineChange(
                            line.id,
                            "accountCode",
                            e.target.value,
                          )
                        }
                        placeholder="Account code"
                        aria-label="Account code"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span className="text-sm">{line.accountName || "—"}</span>
                    ) : (
                      <Input
                        className="h-8"
                        value={line.accountName}
                        onChange={(e) =>
                          handleLineChange(
                            line.id,
                            "accountName",
                            e.target.value,
                          )
                        }
                        placeholder="Account name"
                        aria-label="Account name"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span className="text-sm">{line.description || "—"}</span>
                    ) : (
                      <Input
                        className="h-8"
                        value={line.description ?? ""}
                        onChange={(e) =>
                          handleLineChange(
                            line.id,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Memo"
                        aria-label="Description"
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {readOnly ? (
                      <span
                        className={cn(
                          "text-sm tabular-nums",
                          line.debit > 0 && "text-foreground font-medium",
                        )}
                      >
                        {line.debit > 0
                          ? formatAmount(line.debit, currencySymbol)
                          : "—"}
                      </span>
                    ) : (
                      <Input
                        type="number"
                        className="h-8 text-right tabular-nums"
                        value={line.debit || ""}
                        onChange={(e) =>
                          handleLineChange(line.id, "debit", e.target.value)
                        }
                        placeholder="0.00"
                        aria-label="Debit amount"
                        min={0}
                        step="0.01"
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {readOnly ? (
                      <span
                        className={cn(
                          "text-sm tabular-nums",
                          line.credit > 0 && "text-foreground font-medium",
                        )}
                      >
                        {line.credit > 0
                          ? formatAmount(line.credit, currencySymbol)
                          : "—"}
                      </span>
                    ) : (
                      <Input
                        type="number"
                        className="h-8 text-right tabular-nums"
                        value={line.credit || ""}
                        onChange={(e) =>
                          handleLineChange(line.id, "credit", e.target.value)
                        }
                        placeholder="0.00"
                        aria-label="Credit amount"
                        min={0}
                        step="0.01"
                      />
                    )}
                  </TableCell>
                  {!readOnly && (
                    <TableCell className="text-center">
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

          {/* Totals row */}
          {lines.length > 0 && (
            <TableBody>
              <TableRow className="bg-muted/50 border-t-2 font-semibold">
                <TableCell colSpan={4} className="text-right text-sm">
                  Totals:
                </TableCell>
                <TableCell
                  className="text-foreground text-right text-sm tabular-nums"
                  data-slot="journal-total-debit"
                >
                  {formatAmount(totals.debit, currencySymbol)}
                </TableCell>
                <TableCell
                  className="text-foreground text-right text-sm tabular-nums"
                  data-slot="journal-total-credit"
                >
                  {formatAmount(totals.credit, currencySymbol)}
                </TableCell>
                {!readOnly && <TableCell />}
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>

      {/* Actions */}
      {!readOnly && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAddLine}>
            <PlusIcon className="mr-1 size-4" />
            Add Line
          </Button>
        </div>
      )}
    </div>
  );
}

export { JournalEntryEditor };
export type { JournalEntryEditorProps, JournalEntryLine, AccountOption };
