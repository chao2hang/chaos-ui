import { describe, it, expect } from "vitest";
import { ReconciliationLineEditor } from "./reconciliation-line-editor";
import type { ReconciliationLineEditorProps } from "./reconciliation-line-editor";

describe("reconciliation-line-editor", () => {
  it("exports ReconciliationLineEditor", () => {
    expect(ReconciliationLineEditor).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ReconciliationLineEditorProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
