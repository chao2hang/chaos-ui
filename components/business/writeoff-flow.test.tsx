import { describe, it, expect } from "vitest";
import { WriteoffFlow } from "./writeoff-flow";
import type { WriteoffFlowProps } from "./writeoff-flow";

describe("writeoff-flow", () => {
  it("exports WriteoffFlow", () => {
    expect(WriteoffFlow).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: WriteoffFlowProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
