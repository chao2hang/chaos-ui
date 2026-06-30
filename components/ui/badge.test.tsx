import { describe, it, expect } from "vitest";
import { Badge, badgeVariants } from "./badge";

describe("badge", () => {
  it("exports Badge", () => {
    expect(Badge).toBeDefined();
  });

  it("exports badgeVariants", () => {
    expect(badgeVariants).toBeDefined();
  });
});
