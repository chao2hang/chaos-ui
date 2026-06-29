import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
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

  it("module is importable", async () => {
    const mod = await import("@/components/business/experiment-summary");
    expect(mod.ExperimentSummary).toBeDefined();
  });
});
