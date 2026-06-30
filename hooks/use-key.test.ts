import { describe, it, expect } from "vitest";
import { useKey, useKeyCombo } from "./use-key";

describe("use-key", () => {
  it("exports useKey", () => {
    expect(useKey).toBeDefined();
  });
  it("exports useKeyCombo", () => {
    expect(useKeyCombo).toBeDefined();
  });
});
