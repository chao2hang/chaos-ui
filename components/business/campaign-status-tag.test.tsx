import { describe, it, expect } from "vitest";
import { CampaignStatusTag } from "./campaign-status-tag";
import type {
  CampaignStatus,
  CampaignStatusTagProps,
} from "./campaign-status-tag";

describe("campaign-status-tag", () => {
  it("exports CampaignStatusTag", () => {
    expect(CampaignStatusTag).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CampaignStatus | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CampaignStatusTagProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });
});
