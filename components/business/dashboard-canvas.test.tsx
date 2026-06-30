import { describe, it, expect } from "vitest";
import { DashboardCanvas } from "./dashboard-canvas";
import type { DashboardCanvasProps } from "./dashboard-canvas";

describe("dashboard-canvas", () => {
  it("exports DashboardCanvas", () => {
    expect(DashboardCanvas).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DashboardCanvasProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
