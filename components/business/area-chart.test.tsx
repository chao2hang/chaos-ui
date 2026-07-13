import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AreaChart } from "./area-chart";
import type { AreaChartProps } from "./area-chart";

describe("AreaChart", () => {
  it("renders x-axis labels from data", () => {
    render(<AreaChart data={[10, 40, 25]} labels={["一", "二", "三"]} />);
    expect(screen.getByText("一")).toBeDefined();
    expect(screen.getByText("二")).toBeDefined();
    expect(screen.getByText("三")).toBeDefined();
  });

  it("renders default labels when omitted", () => {
    render(<AreaChart />);
    expect(screen.getByText("日")).toBeDefined();
  });

  it("exports types", () => {
    const _t: AreaChartProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });

  it("maps CSS var token colors to concrete SVG strokes (CUI-DASH-01)", () => {
    const { container } = render(
      <AreaChart
        data={[10, 20, 30]}
        labels={["a", "b", "c"]}
        color="var(--color-primary)"
        gradient={false}
      />,
    );
    const strokePath = container.querySelector(
      'path[stroke]:not([stroke="none"])',
    ) as SVGPathElement | null;
    expect(strokePath).not.toBeNull();
    expect(strokePath?.getAttribute("stroke")).toBe("#3b82f6");
    expect(strokePath?.getAttribute("stroke") ?? "").not.toContain("var(");
  });

  it("defaults to palette color instead of currentColor", () => {
    const { container } = render(
      <AreaChart data={[1, 2, 3]} labels={["a", "b", "c"]} gradient={false} />,
    );
    const strokePath = container.querySelector(
      'path[stroke]:not([stroke="none"])',
    ) as SVGPathElement | null;
    expect(strokePath?.getAttribute("stroke")).toBe("#3b82f6");
  });
});
