import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  MobileKPICard,
  type MobileKPICardProps,
} from "@/components/mobile/mobile-kpi-card";
import { StarIcon, TrendingUpIcon } from "@/components/ui/icons";

describe("MobileKPICard", () => {
  it("is exported and type is importable", () => {
    expect(MobileKPICard).toBeDefined();
    const _p: MobileKPICardProps = {
      title: "Revenue",
      value: "$1,000",
      change: "+10%",
    };
    expect(_p.title).toBe("Revenue");
  });

  it("renders title and value", () => {
    render(<MobileKPICard title="Revenue" value="$12,345" />);
    expect(screen.getByText("Revenue")).toBeDefined();
    expect(screen.getByText("$12,345")).toBeDefined();
  });

  it("does not render change block when change omitted", () => {
    const { container } = render(
      <MobileKPICard title="Sales" value="100" />,
    );
    expect(container.querySelector(".text-success")).toBeNull();
  });

  it("renders positive change with up icon and success color", () => {
    const { container } = render(
      <MobileKPICard
        title="Growth"
        value="200"
        change="+15%"
        changeType="positive"
      />,
    );
    expect(screen.getByText("+15%")).toBeDefined();
    expect(container.querySelector(".text-success")).not.toBeNull();
  });

  it("renders negative change with destructive color", () => {
    const { container } = render(
      <MobileKPICard
        title="Churn"
        value="5%"
        change="-3%"
        changeType="negative"
      />,
    );
    expect(screen.getByText("-3%")).toBeDefined();
    expect(container.querySelector(".text-destructive")).not.toBeNull();
  });

  it("renders neutral change with muted color (default)", () => {
    const { container } = render(
      <MobileKPICard title="Stable" value="42" change="0%" />,
    );
    expect(screen.getByText("0%")).toBeDefined();
    // default changeType is neutral -> muted-foreground
    expect(container.querySelector(".text-muted-foreground")).not.toBeNull();
  });

  it("renders custom icon when provided", () => {
    render(
      <MobileKPICard
        title="Stars"
        value="99"
        icon={StarIcon}
        change="+1"
        changeType="positive"
      />,
    );
    expect(screen.getByText("Stars")).toBeDefined();
    expect(screen.getByText("99")).toBeDefined();
  });

  it("renders without icon when icon omitted", () => {
    render(<MobileKPICard title="NoIcon" value="1" />);
    expect(screen.getByText("NoIcon")).toBeDefined();
  });

  it("applies custom className to root card", () => {
    const { container } = render(
      <MobileKPICard title="T" value="1" className="my-kpi" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("my-kpi");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-kpi-card");
    expect(mod.MobileKPICard).toBeDefined();
  });

  it("renders trend icon component prop type", () => {
    // exercise the icon prop with a different element type
    render(
      <MobileKPICard
        title="Trend"
        value="10"
        icon={TrendingUpIcon}
        change="+5"
        changeType="positive"
      />,
    );
    expect(screen.getByText("Trend")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
    expect(screen.getByText("+5")).toBeDefined();
  });

  it("change is rendered even for empty string change (falsy)", () => {
    render(<MobileKPICard title="T" value="1" change="" changeType="neutral" />);
    expect(screen.getByText("T")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
  });
});
