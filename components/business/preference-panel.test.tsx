import { describe, it, expect } from "vitest";
import { PreferencePanel } from "./preference-panel";
import type { PreferencePanelProps } from "./preference-panel";

describe("preference-panel", () => {
  it("exports PreferencePanel", () => {
    expect(PreferencePanel).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: PreferencePanelProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
