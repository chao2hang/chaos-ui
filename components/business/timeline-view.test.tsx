import { describe, it, expect } from "vitest";
import { TimelineView } from "./timeline-view";
import type { TimelineViewProps } from "./timeline-view";

describe("timeline-view", () => {
  it("exports TimelineView", () => {
    expect(TimelineView).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: TimelineViewProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
