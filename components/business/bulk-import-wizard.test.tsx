import { describe, it, expect } from "vitest";
import { BulkImportWizard } from "./bulk-import-wizard";
import type {
  BulkImportStep,
  BulkImportValidationRow,
  BulkImportWizardProps,
} from "./bulk-import-wizard";

describe("bulk-import-wizard", () => {
  it("exports BulkImportWizard", () => {
    expect(BulkImportWizard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BulkImportStep | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: BulkImportValidationRow | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: BulkImportWizardProps | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
