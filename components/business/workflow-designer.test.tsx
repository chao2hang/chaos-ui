import { describe, it, expect } from "vitest";
import { WorkflowDesigner } from "./workflow-designer";
import type { WorkflowDesignerProps } from "./workflow-designer";

describe("workflow-designer", () => {
  it("exports WorkflowDesigner", () => {
    expect(WorkflowDesigner).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WorkflowDesignerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
