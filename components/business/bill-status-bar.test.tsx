import { describe, it, expect } from "vitest";
import { BillStatusBar } from "./bill-status-bar";
import type { BillStatusBarProps, BillStatusStep } from "./bill-status-bar";

describe("bill-status-bar", () => {
  it("exports BillStatusBar", () => {
    expect(BillStatusBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BillStatusBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: BillStatusStep | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
