import { describe, it, expect } from "vitest";
import { WorkflowPreview } from "./workflow-preview";
import type { WorkflowPreviewProps } from "./workflow-preview";

describe("workflow-preview", () => {
  it("exports WorkflowPreview", () => {
    expect(WorkflowPreview).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WorkflowPreviewProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
