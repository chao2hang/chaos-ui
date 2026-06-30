import { describe, it, expect } from "vitest";
import { useApproval } from "./use-approval";

describe("use-approval", () => {
  it("exports useApproval", () => {
    expect(useApproval).toBeDefined();
  });
});
