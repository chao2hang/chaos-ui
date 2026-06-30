import { describe, it, expect } from "vitest";
import { PrintButton } from "./print-button";
import type { PrintButtonProps } from "./print-button";

describe("print-button", () => {
  it("exports PrintButton", () => {
    expect(PrintButton).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PrintButtonProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
