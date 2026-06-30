import { describe, it, expect } from "vitest";
import { StatCardWithDelta } from "./stat-card-with-delta";
import type { StatCardWithDeltaProps } from "./stat-card-with-delta";

describe("stat-card-with-delta", () => {
  it("exports StatCardWithDelta", () => {
    expect(StatCardWithDelta).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: StatCardWithDeltaProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
