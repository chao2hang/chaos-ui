"use client";
import * as React from "react";

/**
 * @hook useBill
 * @category Data
 * @since 1.0.0-beta.0
 * @description Tracks a bill/document's lifecycle state (draft → submitted → approved → paid → void) with transitions and history.
 * @param initial Initial status.
 * @example
 * const { status, transition, history, can } = useBill("draft");
 */
export type BillStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "paid"
  | "void";

const TRANSITIONS: Record<BillStatus, BillStatus[]> = {
  draft: ["submitted", "void"],
  submitted: ["approved", "rejected", "void"],
  approved: ["paid", "void"],
  rejected: ["submitted", "void"],
  paid: ["void"],
  void: [],
};

export interface UseBillState {
  status: BillStatus;
  transition: (next: BillStatus) => boolean;
  can: (next: BillStatus) => boolean;
  history: BillStatus[];
  reset: (status?: BillStatus) => void;
}

export function useBill(initial: BillStatus = "draft"): UseBillState {
  const [status, setStatus] = React.useState<BillStatus>(initial);
  const [history, setHistory] = React.useState<BillStatus[]>([initial]);

  const can = React.useCallback(
    (next: BillStatus) => (TRANSITIONS[status] ?? []).includes(next),
    [status],
  );

  const transition = React.useCallback(
    (next: BillStatus) => {
      if (!can(next)) return false;
      setStatus(next);
      setHistory((h) => [...h, next]);
      return true;
    },
    [can],
  );

  const reset = React.useCallback((next: BillStatus = initial) => {
    setStatus(next);
    setHistory([next]);
  }, [initial]);

  return { status, transition, can, history, reset };
}
