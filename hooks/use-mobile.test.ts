import { describe, it, expect } from "vitest";
import { useIsMobile } from "./use-mobile";

describe("use-mobile", () => {
  it("exports useIsMobile", () => {
    expect(useIsMobile).toBeDefined();
  });
});
