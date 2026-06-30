import { describe, it, expect } from "vitest";
import { AnnouncementCard } from "./announcement-card";
import type { AnnouncementCardProps } from "./announcement-card";

describe("announcement-card", () => {
  it("exports AnnouncementCard", () => {
    expect(AnnouncementCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AnnouncementCardProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });
});
