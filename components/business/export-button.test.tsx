import { describe, it, expect } from "vitest";
import { ExportButton } from "./export-button";
import type { ExportFormat } from "./export-button";

describe("export-button", () => {
  it("exports ExportButton", () => {
    expect(ExportButton).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ExportFormat | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
