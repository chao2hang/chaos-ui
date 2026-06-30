import { describe, it, expect } from "vitest";
import { BatchPrintDialog } from "./batch-print-dialog";
import type { BatchPrintDialogProps } from "./batch-print-dialog";

describe("batch-print-dialog", () => {
  it("exports BatchPrintDialog", () => {
    expect(BatchPrintDialog).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BatchPrintDialogProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
