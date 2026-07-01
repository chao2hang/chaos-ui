import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Statistic } from "@/components/ui/statistic";
import type { StatisticProps } from "@/components/ui/statistic";

describe("Statistic", () => {
  it("exports Statistic component", () => {
    expect(Statistic).toBeDefined();
    expect(typeof Statistic).toBe("function");
  });

  it("exports StatisticProps type", () => {
    const props: StatisticProps = {
      title: "Revenue",
      value: 12345,
      prefix: "$",
      suffix: "USD",
      precision: 2,
      groupSeparator: ",",
      trend: 12.5,
      trendMode: "default",
      valueStyle: { color: "red" },
      loading: false,
      className: "test",
      style: {},
    };
    expect(props).toBeDefined();
  });

  it("renders with data-slot attribute", () => {
    const { container } = render(<Statistic value={100} />);
    expect(container.querySelector('[data-slot="statistic"]')).not.toBeNull();
  });

  it("renders numeric value", () => {
    render(<Statistic value={12345} />);
    expect(screen.getByText("12,345")).toBeDefined();
  });

  it("renders title", () => {
    render(<Statistic title="Revenue" value={100} />);
    expect(screen.getByText("Revenue")).toBeDefined();
  });

  it("renders prefix", () => {
    render(<Statistic value={100} prefix="¥" />);
    expect(screen.getByText("¥")).toBeDefined();
  });

  it("renders suffix", () => {
    render(<Statistic value={85.5} suffix="%" />);
    expect(screen.getByText("%")).toBeDefined();
  });

  it("renders both prefix and suffix", () => {
    render(<Statistic value={100} prefix="$" suffix="USD" />);
    expect(screen.getByText("$")).toBeDefined();
    expect(screen.getByText("USD")).toBeDefined();
  });

  it("formats value with precision", () => {
    render(<Statistic value={1234.567} precision={2} />);
    expect(screen.getByText("1,234.57")).toBeDefined();
  });

  it("formats value with precision=0", () => {
    render(<Statistic value={1234.567} precision={0} />);
    expect(screen.getByText("1,235")).toBeDefined();
  });

  it("applies thousands separator", () => {
    render(<Statistic value={1000000} />);
    expect(screen.getByText("1,000,000")).toBeDefined();
  });

  it("uses custom group separator", () => {
    render(<Statistic value={1000000} groupSeparator="." />);
    expect(screen.getByText("1.000.000")).toBeDefined();
  });

  it("disables group separator when empty string", () => {
    render(<Statistic value={1000000} groupSeparator="" />);
    expect(screen.getByText("1000000")).toBeDefined();
  });

  it("renders string value as-is", () => {
    render(<Statistic value="N/A" />);
    expect(screen.getByText("N/A")).toBeDefined();
  });

  it("renders -- for undefined value", () => {
    render(<Statistic />);
    expect(screen.getByText("--")).toBeDefined();
  });

  it("renders -- for null value", () => {
    render(<Statistic value={null as unknown as number} />);
    expect(screen.getByText("--")).toBeDefined();
  });

  it("renders upward trend with green color", () => {
    const { container } = render(<Statistic value={100} trend={12.5} />);
    const trendEl = container.querySelector(".text-green-500");
    expect(trendEl).not.toBeNull();
    expect(screen.getByText("↑")).toBeDefined();
    expect(screen.getByText("12.5%")).toBeDefined();
  });

  it("renders downward trend with red color", () => {
    const { container } = render(<Statistic value={100} trend={-8.3} />);
    const trendEl = container.querySelector(".text-red-500");
    expect(trendEl).not.toBeNull();
    expect(screen.getByText("↓")).toBeDefined();
    expect(screen.getByText("8.3%")).toBeDefined();
  });

  it("renders neutral trend dash when trend is 0", () => {
    render(<Statistic value={100} trend={0} />);
    expect(screen.getByText("–")).toBeDefined();
    expect(screen.getByText("0%")).toBeDefined();
  });

  it("inverts trend colors with trendMode='invert'", () => {
    const { container } = render(
      <Statistic value={100} trend={12.5} trendMode="invert" />,
    );
    // Positive trend should be red in invert mode
    const trendEl = container.querySelector(".text-red-500");
    expect(trendEl).not.toBeNull();
  });

  it("inverts negative trend color with trendMode='invert'", () => {
    const { container } = render(
      <Statistic value={100} trend={-8.3} trendMode="invert" />,
    );
    // Negative trend should be green in invert mode
    const trendEl = container.querySelector(".text-green-500");
    expect(trendEl).not.toBeNull();
  });

  it("renders loading skeleton", () => {
    const { container } = render(<Statistic value={100} loading />);
    // Loading state shows animated pulse element instead of value
    const pulse = container.querySelector(".animate-pulse");
    expect(pulse).not.toBeNull();
    // Value text should not be present
    expect(screen.queryByText("100")).toBeNull();
  });

  it("applies valueStyle to the value element", () => {
    const { container } = render(
      <Statistic value={100} valueStyle={{ color: "red", fontSize: 48 }} />,
    );
    const valueEl = container.querySelector('[style*="color: red"]');
    expect(valueEl).not.toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<Statistic value={100} className="my-stat" />);
    const el = container.querySelector('[data-slot="statistic"]');
    expect(el?.className).toContain("my-stat");
  });

  it("applies custom style", () => {
    const { container } = render(
      <Statistic value={100} style={{ border: "1px solid" }} />,
    );
    const el = container.querySelector('[data-slot="statistic"]');
    expect(el?.getAttribute("style")).toContain("border");
  });

  it("renders prefix as ReactNode", () => {
    render(
      <Statistic value={100} prefix={<span data-testid="dollar">$</span>} />,
    );
    expect(screen.getByTestId("dollar")).not.toBeNull();
  });

  it("renders suffix as ReactNode", () => {
    render(
      <Statistic value={100} suffix={<span data-testid="unit">km</span>} />,
    );
    expect(screen.getByTestId("unit")).not.toBeNull();
  });

  it("does not render trend section when trend is undefined", () => {
    render(<Statistic value={100} />);
    expect(screen.queryByText(/↑|↓|–/)).toBeNull();
  });

  it("formats decimal values correctly", () => {
    render(<Statistic value={1234.5} />);
    expect(screen.getByText("1,234.5")).toBeDefined();
  });

  it("formats value with precision and group separator together", () => {
    render(<Statistic value={1234567.891} precision={2} />);
    expect(screen.getByText("1,234,567.89")).toBeDefined();
  });
});
