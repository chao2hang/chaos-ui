import { describe, it, expect } from "vitest";
import { Kbd, KbdGroup, kbdVariants } from "./kbd";

describe("kbd", () => {
  it("exports Kbd", () => {
    expect(Kbd).toBeDefined();
  });

  it("exports KbdGroup", () => {
    expect(KbdGroup).toBeDefined();
  });

  it("exports kbdVariants", () => {
    expect(kbdVariants).toBeDefined();
  });
});
