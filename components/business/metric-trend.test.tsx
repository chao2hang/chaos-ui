import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sparkline, MetricTrend } from "./metric-trend";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
  };
});

describe("Sparkline", () => {
  it("renders null for empty data", () => {
    const { container } = render(<Sparkline data={[]} />);
    expect(container.querySelector("svg")).toBeNull();
  });

  it("renders an svg with polyline for non-empty data", () => {
    const { container } = render(<Sparkline data={[1, 2, 3, 4]} />);
    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelector("polyline")).not.toBeNull();
    expect(container.querySelector("polygon")).not.toBeNull(); // fill area
  });

  it("renders without fill when fill=false", () => {
    const { container } = render(<Sparkline data={[1, 2]} fill={false} />);
    expect(container.querySelector("polygon")).toBeNull();
  });

  it("renders a single point without crashing", () => {
    const { container } = render(<Sparkline data={[5]} />);
    expect(container.querySelector("polyline")).not.toBeNull();
  });
});

describe("MetricTrend", () => {
  it("renders label and numeric value (number format)", () => {
    render(<MetricTrend label="Users" value={1234} />);
    expect(screen.getByText("Users")).toBeDefined();
    // formatNumber(1234) -> "1,234"
    expect(screen.getByText("1,234")).toBeDefined();
  });

  it("renders a string value as-is", () => {
    render(<MetricTrend label="L" value="custom-text" />);
    expect(screen.getByText("custom-text")).toBeDefined();
  });

  it("renders unit next to the value", () => {
    render(<MetricTrend label="L" value={10} unit="ms" />);
    expect(screen.getByText("ms")).toBeDefined();
  });

  it("shows the change badge for positive change (up-good)", () => {
    const { container } = render(
      <MetricTrend label="L" value={1} change={5} trendDirection="up-good" />,
    );
    expect(
      container.querySelector('[data-slot="metric-trend"]'),
    ).not.toBeNull();
    // ArrowUpIcon svg present in the badge
    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
    // change label (translation key) is rendered
    expect(screen.getByText("metricTrend.changeLabel")).toBeDefined();
  });

  it("does not render change badge when change is 0", () => {
    const { container } = render(
      <MetricTrend label="L" value={1} change={0} />,
    );
    // sparkline none, only the (possible) up arrow absent because change===0
    // assert no svg arrows: total svgs should be 0
    expect(container.querySelectorAll("svg").length).toBe(0);
  });

  it("does not render change badge when change is undefined", () => {
    render(<MetricTrend label="L" value={1} />);
    expect(screen.queryByText("metricTrend.changeLabel")).toBeNull();
  });

  it("renders down-good variant as success when change is negative", () => {
    const { container } = render(
      <MetricTrend
        label="Errors"
        value={1}
        change={-5}
        trendDirection="down-good"
      />,
    );
    expect(
      container.querySelector('[data-slot="metric-trend"]'),
    ).not.toBeNull();
  });

  it("renders the change label text even for flat change", () => {
    render(
      <MetricTrend label="L" value={1} change={0} changeLabel="no change" />,
    );
    expect(screen.getByText("no change")).toBeDefined();
  });

  it("renders loading skeleton instead of value when loading", () => {
    const { container } = render(
      <MetricTrend label="L" value={1234} loading />,
    );
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
    expect(screen.queryByText("1,234")).toBeNull();
  });

  it("renders a sparkline when sparklineData provided", () => {
    const { container } = render(
      <MetricTrend label="L" value={1} sparklineData={[1, 2, 3]} />,
    );
    expect(container.querySelector("polyline")).not.toBeNull();
  });

  it("uses percent format for numeric value", () => {
    render(<MetricTrend label="Rate" value={0.42} format="percent" />);
    // formatPercent(0.42) contains "42"
    expect(screen.getByText(/42/)).toBeDefined();
  });

  it("renders an icon node when provided", () => {
    render(
      <MetricTrend
        label="L"
        value={1}
        icon={<span data-testid="ic">I</span>}
      />,
    );
    expect(screen.getByTestId("ic")).toBeDefined();
  });

  it("exports Sparkline and MetricTrend", () => {
    expect(Sparkline).toBeDefined();
    expect(MetricTrend).toBeDefined();
  });
});
