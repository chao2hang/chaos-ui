import { describe, it, expect } from "vitest";
import { useHotkeys } from "./use-hotkeys";

describe("use-hotkeys", () => {
  it("exports useHotkeys", () => {
    expect(useHotkeys).toBeDefined();
  });
});
