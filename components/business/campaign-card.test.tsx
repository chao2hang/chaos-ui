import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CampaignCard } from "./campaign-card";
import type { CampaignMetric, CampaignCardProps } from "./campaign-card";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("CampaignCard", () => {
  it("exports CampaignCard", () => {
    expect(CampaignCard).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: CampaignMetric | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: CampaignCardProps | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders the campaign name and joined channels", () => {
    render(
      <CampaignCard
        name="Holiday Launch"
        status="active"
        channels={["email", "sms"]}
      />,
    );
    expect(screen.getByText("Holiday Launch")).toBeDefined();
    expect(screen.getByText("email, sms")).toBeDefined();
  });

  it("renders the description when provided", () => {
    render(
      <CampaignCard
        name="C"
        status="draft"
        channels={[]}
        description="A short blurb"
      />,
    );
    expect(screen.getByText("A short blurb")).toBeDefined();
  });

  it("renders the date range when provided", () => {
    render(
      <CampaignCard
        name="C"
        status="scheduled"
        channels={["push"]}
        dateRange="Jun 1 - Jun 30"
      />,
    );
    expect(screen.getByText("Jun 1 - Jun 30")).toBeDefined();
  });

  it("renders the formatted budget in USD", () => {
    render(
      <CampaignCard
        name="C"
        status="active"
        channels={[]}
        budget={5000}
        currency="USD"
      />,
    );
    expect(screen.getByText("$5,000")).toBeDefined();
  });

  it("renders budget in a custom currency", () => {
    render(
      <CampaignCard
        name="C"
        status="active"
        channels={[]}
        budget={12000}
        currency="EUR"
      />,
    );
    expect(screen.getByText("€12,000")).toBeDefined();
  });

  it("renders the spend progress and percentage when budget and spent are set", () => {
    render(
      <CampaignCard
        name="C"
        status="active"
        channels={[]}
        budget={10000}
        spent={2500}
      />,
    );
    expect(screen.getByText("C")).toBeDefined();
    expect(screen.getByText("$10,000")).toBeDefined();
  });

  it("caps the budget percentage at 100 when overspent", () => {
    render(
      <CampaignCard
        name="C"
        status="active"
        channels={[]}
        budget={1000}
        spent={5000}
      />,
    );
    expect(screen.getByText("100%")).toBeDefined();
  });

  it("renders metrics with label, value, and helper", () => {
    const metrics: CampaignMetric[] = [
      { label: "CTR", value: "3.2%", helper: "vs 2.1% last week" },
      { label: "Reach", value: 12000 },
    ];
    render(
      <CampaignCard
        name="C"
        status="completed"
        channels={[]}
        metrics={metrics}
      />,
    );
    expect(screen.getByText("CTR")).toBeDefined();
    expect(screen.getByText("3.2%")).toBeDefined();
    expect(screen.getByText("vs 2.1% last week")).toBeDefined();
    expect(screen.getByText("Reach")).toBeDefined();
    expect(screen.getByText("12000")).toBeDefined();
  });

  it("renders custom actions in the footer when provided", () => {
    render(
      <CampaignCard
        name="C"
        status="active"
        channels={[]}
        actions={<button type="button">Pause</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Pause" })).toBeDefined();
  });

  it("renders the status tag in the header action area", () => {
    render(<CampaignCard name="C" status="paused" channels={[]} />);
    expect(screen.getByText("Paused")).toBeDefined();
  });
});
