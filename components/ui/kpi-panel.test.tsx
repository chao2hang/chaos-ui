import { describe, it, expect } from "vitest";
import { KPIPanel, KPICard } from "./kpi-panel";
import type { KPIItem, KPIPanelProps } from "./kpi-panel";

describe("kpi-panel", () => {
  it("exports KPIPanel", () => {
    expect(KPIPanel).toBeDefined();
  });

  it("exports KPICard", () => {
    expect(KPICard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: KPIItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: KPIPanelProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
