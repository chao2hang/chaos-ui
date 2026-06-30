import { describe, it, expect } from "vitest";
import { Statistic } from "./statistic";
import type { StatisticProps } from "./statistic";

describe("statistic", () => {
  it("exports Statistic", () => {
    expect(Statistic).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: StatisticProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
