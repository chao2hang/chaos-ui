import { describe, it, expect } from "vitest";
import { StatusBadge, STATUS_BADGE_PRESETS } from "./status-badge";
import type {
  StatusBadgeProps,
  StatusPreset,
  StatusMapping,
  StatusEntry,
} from "./status-badge";

describe("status-badge", () => {
  it("exports StatusBadge", () => {
    expect(StatusBadge).toBeDefined();
  });

  it("exports STATUS_BADGE_PRESETS", () => {
    expect(STATUS_BADGE_PRESETS).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: StatusBadgeProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: StatusPreset | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: StatusMapping | undefined = undefined;
    expect(_tc3).toBeUndefined();
    const _tc4: StatusEntry | undefined = undefined;
    expect(_tc4).toBeUndefined();
  });
});
