import { describe, it, expect } from "vitest";
import { ImportDialog } from "./import-dialog";
import type { ImportDialogProps } from "./import-dialog";

describe("import-dialog", () => {
  it("exports ImportDialog", () => {
    expect(ImportDialog).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ImportDialogProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
