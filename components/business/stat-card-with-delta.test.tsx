import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCardWithDelta } from "./stat-card-with-delta";
import type { StatCardWithDeltaProps } from "./stat-card-with-delta";
import { TrendingUpIcon } from "@/components/ui";

describe("StatCardWithDelta", () => {
  it("renders label and formatted number value", () => {
    render(<StatCardWithDelta label="月营收" value={1280000} delta={12.5} />);
    expect(screen.getByText("月营收")).toBeDefined();
    expect(screen.getByText("1,280,000")).toBeDefined();
  });

  it("renders a string value verbatim", () => {
    render(<StatCardWithDelta label="用户数" value="9,800" delta={5} />);
    expect(screen.getByText("9,800")).toBeDefined();
  });

  it("uses default label/value when props omitted", () => {
    render(<StatCardWithDelta delta={0} />);
    expect(screen.getByText("指标")).toBeDefined();
    expect(screen.getByText("0")).toBeDefined();
  });

  it("shows rising trend aria-label for positive delta", () => {
    render(<StatCardWithDelta label="营收" value={100} delta={12.5} />);
    expect(screen.getByLabelText("趋势 上升 12.5%")).toBeDefined();
    expect(screen.getByText("12.5%")).toBeDefined();
  });

  it("shows falling trend aria-label for negative delta", () => {
    render(<StatCardWithDelta label="成本" value={100} delta={-3.2} />);
    expect(screen.getByLabelText("趋势 下降 3.2%")).toBeDefined();
    expect(screen.getByText("3.2%")).toBeDefined();
  });

  it("treats zero delta as rising", () => {
    render(<StatCardWithDelta label="持平" value={10} delta={0} />);
    expect(screen.getByLabelText("趋势 上升 0%")).toBeDefined();
  });

  it("renders leading icon container when icon provided", () => {
    const { container } = render(
      <StatCardWithDelta label="带图标" value={5} delta={1} icon={TrendingUpIcon} />,
    );
    expect(container.querySelector('[data-slot="stat-card-with-delta"] .size-10')).not.toBeNull();
  });

  it("omits icon container when no icon prop", () => {
    const { container } = render(
      <StatCardWithDelta label="无图标" value={5} delta={1} />,
    );
    expect(container.querySelector('[data-slot="stat-card-with-delta"] .size-10')).toBeNull();
  });

  it("applies custom className to root", () => {
    const { container } = render(
      <StatCardWithDelta label="x" value={1} delta={1} className="my-extra" />,
    );
    expect(container.querySelector(".my-extra")).not.toBeNull();
  });

  it("exports types", () => {
    const _t: StatCardWithDeltaProps | undefined = undefined;
    expect(_t).toBeUndefined();
  });
});
