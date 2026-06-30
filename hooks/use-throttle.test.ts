import { describe, it, expect } from "vitest";
import { useThrottle } from "./use-throttle";

describe("use-throttle", () => {
  it("exports useThrottle", () => {
    expect(useThrottle).toBeDefined();
  });
});
