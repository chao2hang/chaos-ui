import { describe, it, expect } from "vitest";
import { OperationLog } from "./operation-log";
import type { OperationLogProps } from "./operation-log";

describe("operation-log", () => {
  it("exports OperationLog", () => {
    expect(OperationLog).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: OperationLogProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
