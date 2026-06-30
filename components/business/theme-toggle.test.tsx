import { describe, it, expect } from "vitest";
import { ThemeToggle, useResolvedTheme } from "./theme-toggle";

describe("theme-toggle", () => {
  it("exports ThemeToggle", () => {
    expect(ThemeToggle).toBeDefined();
  });

  it("exports useResolvedTheme", () => {
    expect(useResolvedTheme).toBeDefined();
  });
});
