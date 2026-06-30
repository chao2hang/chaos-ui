import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CampaignStatusTag } from "./campaign-status-tag";
import type {
  CampaignStatus,
  CampaignStatusTagProps,
} from "./campaign-status-tag";

const statuses: CampaignStatus[] = [
  "draft",
  "scheduled",
  "active",
  "paused",
  "completed",
  "failed",
  "archived",
];

describe("CampaignStatusTag", () => {
  it("exports CampaignStatusTag", () => {
    expect(CampaignStatusTag).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CampaignStatus | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CampaignStatusTagProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders the default label for each status", () => {
    for (const status of statuses) {
      const { unmount } = render(<CampaignStatusTag status={status} />);
      const meta: Record<CampaignStatus, string> = {
        draft: "Draft",
        scheduled: "Scheduled",
        active: "Active",
        paused: "Paused",
        completed: "Completed",
        failed: "Failed",
        archived: "Archived",
      };
      expect(screen.getByText(meta[status])).toBeDefined();
      unmount();
    }
  });

  it("renders a custom label when provided", () => {
    render(<CampaignStatusTag status="active" label="Live Now" />);
    expect(screen.getByText("Live Now")).toBeDefined();
    expect(screen.queryByText("Active")).toBeNull();
  });

  it("renders with the sm size variant without error", () => {
    render(<CampaignStatusTag status="scheduled" size="sm" />);
    expect(screen.getByText("Scheduled")).toBeDefined();
  });

  it("applies a custom className to the rendered tag", () => {
    render(<CampaignStatusTag status="failed" className="custom-cls" />);
    const node = screen.getByText("Failed");
    expect(node.className).toContain("custom-cls");
  });

  it("renders the status text as the badge content", () => {
    render(<CampaignStatusTag status="draft" />);
    expect(screen.getByText("Draft")).toBeDefined();
  });
});
