import { describe, it, expect } from "vitest";
import { useScroll, useScrollDirection } from "./use-scroll";

describe("use-scroll", () => {
  it("exports useScroll", () => {
    expect(useScroll).toBeDefined();
  });
  it("exports useScrollDirection", () => {
    expect(useScrollDirection).toBeDefined();
  });
});
