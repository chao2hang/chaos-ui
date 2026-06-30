import { describe, it, expect } from "vitest";
import { BarListCard } from "./bar-list-card";
import type { BarListCardProps } from "./bar-list-card";

describe("bar-list-card", () => {
  it("exports BarListCard", () => {
    expect(BarListCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: BarListCardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
