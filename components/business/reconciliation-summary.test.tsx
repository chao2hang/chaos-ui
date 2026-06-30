import { describe, it, expect } from "vitest";
import { ReconciliationSummary } from "./reconciliation-summary";
import type { ReconciliationSummaryProps } from "./reconciliation-summary";

describe("reconciliation-summary", () => {
  it("exports ReconciliationSummary", () => {
    expect(ReconciliationSummary).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ReconciliationSummaryProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
