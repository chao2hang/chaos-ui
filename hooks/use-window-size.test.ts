import { describe, it, expect } from "vitest";
import { useWindowSize } from "./use-window-size";

describe("use-window-size", () => {
  it("exports useWindowSize", () => {
    expect(useWindowSize).toBeDefined();
  });
});
