import { describe, it, expect } from "vitest";
import { Stepper, Step } from "./stepper";

describe("stepper", () => {
  it("exports Stepper", () => {
    expect(Stepper).toBeDefined();
  });

  it("exports Step", () => {
    expect(Step).toBeDefined();
  });
});
