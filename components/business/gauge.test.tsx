import { describe, it, expect } from "vitest";
import { Gauge, RadialProgress } from "./gauge";

describe("gauge", () => {
  it("exports Gauge", () => {
    expect(Gauge).toBeDefined();
  });

  it("exports RadialProgress", () => {
    expect(RadialProgress).toBeDefined();
  });
});
