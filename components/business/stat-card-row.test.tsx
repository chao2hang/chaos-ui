import { describe, it, expect } from "vitest";
import { StatCardRow } from "./stat-card-row";
import type { StatCardRowProps } from "./stat-card-row";

describe("stat-card-row", () => {
  it("exports StatCardRow", () => {
    expect(StatCardRow).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: StatCardRowProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
