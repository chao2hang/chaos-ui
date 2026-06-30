import { describe, it, expect } from "vitest";
import { PrintService } from "./print-service";
import type { PrintServiceProps } from "./print-service";

describe("print-service", () => {
  it("exports PrintService", () => {
    expect(PrintService).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PrintServiceProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
