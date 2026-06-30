import { describe, it, expect } from "vitest";
import { Dot, dotVariants } from "./dot";

describe("dot", () => {
  it("exports Dot", () => {
    expect(Dot).toBeDefined();
  });

  it("exports dotVariants", () => {
    expect(dotVariants).toBeDefined();
  });
});
