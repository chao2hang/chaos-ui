import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StarIcon } from "@/components/ui/icons";
import { StatCard } from "./stat-card";

describe("StatCard", () => {
  it("exports StatCard", () => {
    expect(StatCard).toBeDefined();
  });

  it("renders title and value", () => {
    render(<StatCard title="Revenue" value={12345} />);
    expect(screen.getByText("Revenue")).toBeDefined();
    expect(screen.getByText("12345")).toBeDefined();
  });

  it("renders string values", () => {
    render(<StatCard title="Users" value="1.2k" />);
    expect(screen.getByText("1.2k")).toBeDefined();
  });

  it("renders the icon when provided", () => {
    const { container } = render(
      <StatCard title="Revenue" value={100} icon={StarIcon} />,
    );
    // icon is rendered as an svg inside the card header
    const header = container.querySelector('[data-slot="card-header"]');
    const svg = header?.querySelector("svg");
    expect(svg).not.toBeNull();
  });

  it("does not render change block when change is undefined", () => {
    const { container } = render(<StatCard title="Revenue" value={100} />);
    // no trend icon (TrendingUp/Down/Minus) rendered -> no svg at all
    expect(container.querySelector("svg")).toBeNull();
  });

  it("renders change text with positive trend icon", () => {
    const { container } = render(
      <StatCard
        title="Revenue"
        value={100}
        change="+12%"
        changeType="positive"
      />,
    );
    expect(screen.getByText("+12%")).toBeDefined();
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    // positive change span has text-success class
    const changeSpan = screen.getByText("+12%");
    expect(changeSpan.className).toContain("text-success");
  });

  it("renders negative changeType with destructive color", () => {
    render(
      <StatCard
        title="Refunds"
        value={5}
        change="-3%"
        changeType="negative"
      />,
    );
    const changeSpan = screen.getByText("-3%");
    expect(changeSpan.className).toContain("text-destructive");
  });

  it("renders neutral changeType with muted color", () => {
    render(
      <StatCard title="Stable" value={5} change="0%" changeType="neutral" />,
    );
    const changeSpan = screen.getByText("0%");
    expect(changeSpan.className).toContain("text-muted-foreground");
  });

  it("defaults changeType to neutral", () => {
    render(<StatCard title="Stable" value={5} change="0%" />);
    const changeSpan = screen.getByText("0%");
    expect(changeSpan.className).toContain("text-muted-foreground");
  });

  it("applies custom className to the card", () => {
    const { container } = render(
      <StatCard title="Revenue" value={100} className="my-card" />,
    );
    // root is the Card element (first child)
    expect((container.firstChild as HTMLElement).className).toContain("my-card");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/stat-card");
    expect(mod.StatCard).toBeDefined();
  });
});
