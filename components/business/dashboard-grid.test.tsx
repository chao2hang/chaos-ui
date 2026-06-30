import { describe, it, expect } from "vitest";
import { DashboardGrid } from "./dashboard-grid";
import type { DashboardGridProps } from "./dashboard-grid";

describe("dashboard-grid", () => {
  it("exports DashboardGrid", () => {
    expect(DashboardGrid).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DashboardGridProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
