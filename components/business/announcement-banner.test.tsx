import { describe, it, expect } from "vitest";
import { AnnouncementBanner } from "./announcement-banner";
import type {
  AnnouncementBannerProps,
  Announcement,
  BannerPriority,
} from "./announcement-banner";

describe("announcement-banner", () => {
  it("exports AnnouncementBanner", () => {
    expect(AnnouncementBanner).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: AnnouncementBannerProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: Announcement | undefined = undefined;
    expect(_tc2).toBeUndefined();
    const _tc3: BannerPriority | undefined = undefined;
    expect(_tc3).toBeUndefined();
  });
});
