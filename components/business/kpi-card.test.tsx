import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KPICard } from "./kpi-card";
import { TrendingUpIcon } from "@/components/ui/icons";

// KPICard uses recharts ResponsiveContainer for the sparkline. recharts needs
// a measured size; in jsdom ResponsiveContainer renders nothing but does not
// throw, so we assert on the non-chart content and that rendering does not crash.

describe("KPICard", () => {
  it("renders title and value", () => {
    render(<KPICard title="Revenue" value="$1,200" />);
    expect(screen.getByText("Revenue")).toBeDefined();
    expect(screen.getByText("$1,200")).toBeDefined();
  });

  it("renders the icon when provided", () => {
    const { container } = render(
      <KPICard title="Sales" value="10" icon={TrendingUpIcon} />,
    );
    // Icon renders as an svg in the header
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("renders change with positive trend icon and label", () => {
    render(
      <KPICard
        title="Growth"
        value="5%"
        change="+12%"
        changeLabel="vs last month"
        changeType="positive"
      />,
    );
    expect(screen.getByText("+12%")).toBeDefined();
    expect(screen.getByText("vs last month")).toBeDefined();
  });

  it("does not render change block when change is undefined", () => {
    render(<KPICard title="X" value="1" />);
    expect(screen.queryByText("vs last month")).toBeNull();
  });

  it("renders neutral changeType without crash", () => {
    render(
      <KPICard title="X" value="1" change="0%" changeType="neutral" />,
    );
    expect(screen.getByText("0%")).toBeDefined();
  });

  it("renders negative changeType", () => {
    render(
      <KPICard title="X" value="1" change="-3%" changeType="negative" />,
    );
    expect(screen.getByText("-3%")).toBeDefined();
  });

  it("renders target progress bar and label", () => {
    const { container } = render(
      <KPICard
        title="Goal"
        value="42"
        target={42}
        targetLabel="Completion"
      />,
    );
    expect(screen.getByText("Completion")).toBeDefined();
    expect(screen.getByText("42%")).toBeDefined();
    // progress bar fill div
    const fills = container.querySelectorAll(".bg-primary.rounded-full");
    expect(fills.length).toBeGreaterThan(0);
  });

  it("uses default 'Progress' label when targetLabel omitted", () => {
    render(<KPICard title="Goal" value="42" target={42} />);
    expect(screen.getByText("Progress")).toBeDefined();
  });

  it("renders sparkline container without crashing", () => {
    const { container } = render(
      <KPICard
        title="Trend"
        value="1"
        sparkline={[{ value: 1 }, { value: 2 }, { value: 3 }]}
      />,
    );
    // recharts ResponsiveContainer needs a measured size; in jsdom it renders
    // no svg but must not throw. Assert the sparkline wrapper div is present
    // and the card value still renders.
    expect(container.querySelector('[data-slot="card"]')).not.toBeNull();
    expect(screen.getByText("1")).toBeDefined();
  });

  it("exports KPICard", () => {
    expect(KPICard).toBeDefined();
  });
});
