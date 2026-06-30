import { describe, it, expect } from "vitest";
import { DonutCard } from "./donut-card";
import type { DonutCardProps } from "./donut-card";

describe("donut-card", () => {
  it("exports DonutCard", () => {
    expect(DonutCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DonutCardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
