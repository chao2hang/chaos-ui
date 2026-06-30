import { describe, it, expect } from "vitest";
import { CampaignCard } from "./campaign-card";
import type { CampaignMetric, CampaignCardProps } from "./campaign-card";

describe("campaign-card", () => {
  it("exports CampaignCard", () => {
    expect(CampaignCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CampaignMetric | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CampaignCardProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
