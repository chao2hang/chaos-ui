import { describe, it, expect } from "vitest";
import { useStep } from "./use-step";

describe("use-step", () => {
  it("exports useStep", () => {
    expect(useStep).toBeDefined();
  });
});
