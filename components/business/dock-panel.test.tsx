import { describe, it, expect } from "vitest";
import { DockPanel } from "./dock-panel";
import type { DockPanelProps } from "./dock-panel";

describe("dock-panel", () => {
  it("exports DockPanel", () => {
    expect(DockPanel).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: DockPanelProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
