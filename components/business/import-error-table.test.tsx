import { describe, it, expect } from "vitest";
import { ImportErrorTable } from "./import-error-table";
import type { ImportErrorTableProps } from "./import-error-table";

describe("import-error-table", () => {
  it("exports ImportErrorTable", () => {
    expect(ImportErrorTable).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ImportErrorTableProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
