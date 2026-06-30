import { describe, it, expect } from "vitest";
import { useIdle } from "./use-idle";

describe("use-idle", () => {
  it("exports useIdle", () => {
    expect(useIdle).toBeDefined();
  });
});
