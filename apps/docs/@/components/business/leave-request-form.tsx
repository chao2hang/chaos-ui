"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "@/components/ui/icons";

/**
 * @component LeaveRequestForm
 * @category business/oa
 * @since 1.0.0
 * @description Leave request form with leave type selection, date range,
 * balance display, approver chain, and mini calendar preview.
 * @keywords leave, vacation, absence, oa, hr, request, form, balance
 */

/* -------------------------------------------------------------------------- */
/*  Public types                                                              */
/* -------------------------------------------------------------------------- */

/** Leave type. */
type LeaveType =
  "annual" | "sick" | "personal" | "maternity" | "compassionate" | "unpaid";

/** Leave balance info. */
interface LeaveBalance {
  type: LeaveType;
  label: string;
  total: number;
  used: number;
  unit: "days" | "hours";
}

/** Approver in the chain. */
interface Approver {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
}

/** Props for LeaveRequestForm. */
interface LeaveRequestFormProps {
  /** Current leave type */
  leaveType?: LeaveType;
  /** Leave type change callback */
  onLeaveTypeChange?: (type: LeaveType) => void;
  /** Start date */
  startDate?: string;
  /** End date */
  endDate?: string;
  /** Date change callback */
  onDateChange?: (start: string, end: string) => void;
  /** Available leave balances */
  balances: LeaveBalance[];
  /** Approver chain */
  approvers: Approver[];
  /** Reason text */
  reason?: string;
  /** Reason change callback */
  onReasonChange?: (reason: string) => void;
  /** Submit handler */
  onSubmit?: () => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Read-only mode */
  readOnly?: boolean;
  /** Extra class name */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.round((d2.getTime() - d1.getTime()) / 86400000) + 1;
}

function isWeekend(dateStr: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const day = d.getDay();
  return day === 0 || day === 6;
}

/** Build a mini calendar for the month containing the start date. */
function buildMonthDays(
  year: number,
  month: number,
): { date: string; day: number; isWeekend: boolean }[] {
  const days: { date: string; day: number; isWeekend: boolean }[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Pad with empty for offset
  const startOffset = firstDay.getDay();
  for (let i = 0; i < startOffset; i++) {
    days.push({ date: "", day: 0, isWeekend: false });
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days.push({ date: dateStr, day: d, isWeekend: isWeekend(dateStr) });
  }
  return days;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

function LeaveRequestForm({
  leaveType = "annual",
  onLeaveTypeChange,
  startDate = "",
  endDate = "",
  onDateChange,
  balances = [],
  approvers = [],
  reason = "",
  onReasonChange,
  onSubmit,
  onCancel,
  readOnly = false,
  className,
}: LeaveRequestFormProps) {
  const duration = daysBetween(startDate, endDate);
  const currentBalance = balances.find((b) => b.type === leaveType);

  // Mini calendar
  const calRefDate = startDate ? new Date(startDate) : new Date();
  const calYear = calRefDate.getFullYear();
  const calMonth = calRefDate.getMonth();
  const monthDays = React.useMemo(
    () => buildMonthDays(calYear, calMonth),
    [calYear, calMonth],
  );
  const monthName = new Date(calYear, calMonth, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isDateInRange = (dateStr: string): boolean => {
    if (!dateStr || !startDate || !endDate) return false;
    return dateStr >= startDate && dateStr <= endDate;
  };

  const insufficientBalance = currentBalance
    ? currentBalance.total - currentBalance.used < duration
    : false;

  return (
    <div
      data-slot="leave-request-form"
      className={cn(
        "border-border bg-card space-y-5 rounded-lg border p-5",
        className,
      )}
    >
      {/* Leave type selector */}
      <div>
        <label className="text-foreground mb-1.5 block text-sm font-medium">
          Leave Type
        </label>
        <div className="flex flex-wrap gap-2">
          {balances.map((b) => (
            <button
              key={b.type}
              type="button"
              data-slot="leave-type-option"
              data-active={leaveType === b.type}
              onClick={() => !readOnly && onLeaveTypeChange?.(b.type)}
              disabled={readOnly}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                leaveType === b.type
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-muted",
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Balance display */}
      {currentBalance && (
        <div
          data-slot="leave-balance"
          className="border-border bg-muted/30 flex items-center gap-3 rounded-md border px-4 py-2"
        >
          <span className="text-muted-foreground text-sm">
            Available balance:
          </span>
          <Badge
            variant={insufficientBalance ? "destructive" : "default"}
            className="text-xs"
          >
            {currentBalance.total - currentBalance.used} /{" "}
            {currentBalance.total} {currentBalance.unit}
          </Badge>
          {insufficientBalance && duration > 0 && (
            <span className="text-destructive text-xs">
              Insufficient balance for {duration} {currentBalance.unit}
            </span>
          )}
        </div>
      )}

      {/* Date range */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-foreground mb-1.5 block text-sm font-medium">
            Start Date
          </label>
          <div className="relative">
            <CalendarIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              type="date"
              className="pl-8"
              value={startDate}
              onChange={(e) => onDateChange?.(e.target.value, endDate)}
              disabled={readOnly}
              aria-label="Start date"
            />
          </div>
        </div>
        <div>
          <label className="text-foreground mb-1.5 block text-sm font-medium">
            End Date
          </label>
          <div className="relative">
            <CalendarIcon className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              type="date"
              className="pl-8"
              value={endDate}
              onChange={(e) => onDateChange?.(startDate, e.target.value)}
              disabled={readOnly}
              aria-label="End date"
            />
          </div>
        </div>
      </div>

      {/* Duration display */}
      {duration > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon className="text-muted-foreground size-4" />
          <span className="text-foreground">
            Duration: <strong>{duration}</strong> day{duration > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Mini calendar preview */}
      <div data-slot="leave-calendar-preview">
        <div className="text-foreground mb-2 text-sm font-medium">
          {monthName}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div
              key={i}
              className="text-muted-foreground text-center text-[10px] font-medium"
            >
              {d}
            </div>
          ))}
          {monthDays.map((d, i) => (
            <div
              key={i}
              className={cn(
                "flex h-7 items-center justify-center rounded text-xs",
                !d.date && "opacity-0",
                d.isWeekend &&
                  d.date &&
                  !isDateInRange(d.date) &&
                  "bg-muted/50 text-muted-foreground",
                isDateInRange(d.date) &&
                  "bg-primary text-primary-foreground font-medium",
              )}
            >
              {d.day || ""}
            </div>
          ))}
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="text-foreground mb-1.5 block text-sm font-medium">
          Reason
        </label>
        <textarea
          className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
          rows={3}
          value={reason}
          onChange={(e) => onReasonChange?.(e.target.value)}
          placeholder="Please provide a reason for your leave request..."
          disabled={readOnly}
          aria-label="Leave reason"
        />
      </div>

      {/* Approver chain */}
      {approvers.length > 0 && (
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            Approval Chain
          </label>
          <div className="flex items-center gap-2">
            {approvers.map((ap, i) => (
              <React.Fragment key={ap.id}>
                <div className="border-border bg-muted/30 flex items-center gap-2 rounded-md border px-3 py-1.5">
                  <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full text-xs font-medium">
                    {ap.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-foreground text-sm font-medium">
                      {ap.name}
                    </div>
                    {ap.title && (
                      <div className="text-muted-foreground text-xs">
                        {ap.title}
                      </div>
                    )}
                  </div>
                </div>
                {i < approvers.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {!readOnly && (
        <div className="border-border flex items-center justify-end gap-2 border-t pt-4">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button
              onClick={onSubmit}
              disabled={insufficientBalance && duration > 0}
            >
              Submit Request
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { LeaveRequestForm };
export type { LeaveRequestFormProps, LeaveType, LeaveBalance, Approver };
