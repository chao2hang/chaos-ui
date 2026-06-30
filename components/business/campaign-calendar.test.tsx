import { describe, it, expect } from "vitest";
import { CampaignCalendar } from "./campaign-calendar";
import type {
  CampaignCalendarEvent,
  CampaignCalendarProps,
} from "./campaign-calendar";

describe("campaign-calendar", () => {
  it("exports CampaignCalendar", () => {
    expect(CampaignCalendar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CampaignCalendarEvent | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CampaignCalendarProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
