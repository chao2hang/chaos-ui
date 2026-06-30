import { describe, it, expect } from "vitest";
import { ActivityFeed } from "./activity-feed";
import type { ActivityItem } from "./activity-feed";

describe("activity-feed", () => {
  it("exports ActivityFeed", () => {
    expect(ActivityFeed).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ActivityItem | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
