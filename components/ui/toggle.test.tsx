import { describe, it, expect } from "vitest";
import { Toggle, toggleVariants } from "./toggle";

describe("toggle", () => {
  it("exports Toggle", () => {
    expect(Toggle).toBeDefined();
  });

  it("exports toggleVariants", () => {
    expect(toggleVariants).toBeDefined();
  });
});
