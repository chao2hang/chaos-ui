import { describe, it, expect } from "vitest";
import { useToggle } from "./use-toggle";

describe("use-toggle", () => {
  it("exports useToggle", () => {
    expect(useToggle).toBeDefined();
  });
});
