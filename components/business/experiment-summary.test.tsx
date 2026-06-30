import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperimentSummary } from "@/components/business/experiment-summary";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

const variants = [
  { id: "a", name: "A", sampleSize: undefined as unknown as number, conversionRate: undefined as unknown as number },
  { id: "b", name: "B", sampleSize: 100, conversionRate: 5.5, lift: 10 },
];

describe("ExperimentSummary", () => {
  it("renders without crashing when conversionRate/sampleSize are undefined", () => {
    expect(() =>
      render(<ExperimentSummary name="Test A/B" variants={variants} />),
    ).not.toThrow();
  });

  it("renders variant names", () => {
    const { getByText } = render(
      <ExperimentSummary
        name="Test A/B"
        variants={[{ id: "a", name: "VariantA", sampleSize: 100, conversionRate: 5.5 }]}
      />,
    );
    expect(getByText("VariantA")).toBeTruthy();
  });

  it("renders experiment name and status badge", () => {
    render(
      <ExperimentSummary name="Checkout Test" status="completed" variants={[]} />,
    );
    expect(screen.getByText("Checkout Test")).toBeDefined();
    expect(screen.getByText("experimentSummary.status.completed")).toBeDefined();
  });

  it("renders default status running when omitted", () => {
    render(<ExperimentSummary name="X" variants={[]} />);
    expect(screen.getByText("experimentSummary.status.running")).toBeDefined();
  });

  it("renders hypothesis as description when provided", () => {
    render(
      <ExperimentSummary
        name="X"
        hypothesis="Bigger button increases CTR"
        variants={[]}
      />,
    );
    expect(screen.getByText("Bigger button increases CTR")).toBeDefined();
  });

  it("omits hypothesis when not provided", () => {
    const { container } = render(<ExperimentSummary name="X" variants={[]} />);
    expect(container.querySelector('[data-slot="card-description"]')).toBeNull();
  });

  it("uses provided primaryMetric, falls back to i18n key", () => {
    const { rerender } = render(
      <ExperimentSummary name="X" variants={[]} primaryMetric="Revenue" />,
    );
    expect(screen.getByText("Revenue")).toBeDefined();
    rerender(<ExperimentSummary name="X" variants={[]} />);
    expect(screen.getByText("experimentSummary.primaryMetric")).toBeDefined();
  });

  it("renders table headers", () => {
    render(<ExperimentSummary name="X" variants={[]} />);
    expect(screen.getByText("experimentSummary.variant")).toBeDefined();
    expect(screen.getByText("experimentSummary.sample")).toBeDefined();
    expect(screen.getByText("experimentSummary.rate")).toBeDefined();
    expect(screen.getByText("experimentSummary.lift")).toBeDefined();
  });

  it("formats sample size and conversion rate", () => {
    render(
      <ExperimentSummary
        name="X"
        variants={[
          { id: "a", name: "V1", sampleSize: 12345, conversionRate: 5.5 },
        ]}
      />,
    );
    expect(screen.getByText("12,345")).toBeDefined();
    expect(screen.getByText("5.50%")).toBeDefined();
  });

  it("renders lift with + sign when positive, - when negative, dash when undefined", () => {
    render(
      <ExperimentSummary
        name="X"
        variants={[
          { id: "a", name: "A", sampleSize: 1, conversionRate: 1, lift: 12.3 },
          { id: "b", name: "B", sampleSize: 1, conversionRate: 1, lift: -4 },
          { id: "c", name: "C", sampleSize: 1, conversionRate: 1 },
        ]}
      />,
    );
    expect(screen.getByText("+12.3%")).toBeDefined();
    expect(screen.getByText("-4.0%")).toBeDefined();
    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });

  it("renders winner badge and row highlight for winner variant", () => {
    render(
      <ExperimentSummary
        name="X"
        variants={[
          {
            id: "a",
            name: "Champ",
            sampleSize: 100,
            conversionRate: 9,
            lift: 5,
            winner: true,
          },
        ]}
      />,
    );
    expect(screen.getByText("experimentSummary.winner")).toBeDefined();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ExperimentSummary name="X" variants={[]} className="my-exp" />,
    );
    expect(container.querySelector(".my-exp")).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/experiment-summary");
    expect(mod.ExperimentSummary).toBeDefined();
  });
});
