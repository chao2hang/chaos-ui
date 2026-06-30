import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StatCardRow } from "./stat-card-row";
import type { StatCardRowProps } from "./stat-card-row";

describe("StatCardRow", () => {
  it("exports StatCardRow", () => {
    expect(StatCardRow).toBeDefined();
  });

  it("exports types", () => {
    const _tc: StatCardRowProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });

  it("renders titles and values for all cards", () => {
    render(
      <StatCardRow
        cards={[
          { title: "Revenue", value: "$1k" },
          { title: "Orders", value: 42 },
        ]}
      />,
    );
    expect(screen.getByText("Revenue")).toBeDefined();
    expect(screen.getByText("$1k")).toBeDefined();
    expect(screen.getByText("Orders")).toBeDefined();
    expect(screen.getByText("42")).toBeDefined();
  });

  it("renders descriptions when provided", () => {
    render(
      <StatCardRow
        cards={[{ title: "Revenue", value: "$1k", description: "vs last month" }]}
      />,
    );
    expect(screen.getByText("vs last month")).toBeDefined();
  });

  it("renders trend with up arrow and red color (Chinese convention)", () => {
    render(
      <StatCardRow
        cards={[
          {
            title: "Revenue",
            value: "$1k",
            trend: { value: 12.5, direction: "up" },
          },
        ]}
      />,
    );
    const trend = screen.getByText(/12\.5%/);
    expect(trend.textContent).toContain("↑");
    expect(trend.className).toContain("text-red-500");
  });

  it("renders trend with down arrow and green color", () => {
    render(
      <StatCardRow
        cards={[
          {
            title: "Refunds",
            value: 5,
            trend: { value: -3.2, direction: "down" },
          },
        ]}
      />,
    );
    const trend = screen.getByText(/3\.2%/);
    expect(trend.textContent).toContain("↓");
    expect(trend.className).toContain("text-green-500");
  });

  it("renders trend with no direction as muted", () => {
    render(
      <StatCardRow
        cards={[
          { title: "X", value: 1, trend: { value: 0 } },
        ]}
      />,
    );
    const trend = screen.getByText(/0\.0%/);
    expect(trend.className).toContain("text-muted-foreground");
  });

  it("renders sparkline node when provided", () => {
    render(
      <StatCardRow
        cards={[
          {
            title: "X",
            value: 1,
            sparkline: <div data-testid="spark">spark</div>,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("spark")).toBeDefined();
  });

  it("renders icon with color background when provided", () => {
    const { container } = render(
      <StatCardRow
        cards={[
          {
            title: "X",
            value: 1,
            icon: <span data-testid="icn">★</span>,
            color: "#ff0000",
          },
        ]}
      />,
    );
    const iconWrap = container.querySelector(
      ".flex.size-10.items-center.justify-center",
    );
    expect(iconWrap).not.toBeNull();
    // jsdom converts "#ff000015" (hex + alpha) to an rgba background-color,
    // so assert the background style is set (non-empty) rather than the raw hex.
    const style = iconWrap?.getAttribute("style") ?? "";
    expect(style).toContain("background");
    expect(screen.getByTestId("icn")).toBeDefined();
  });

  it("renders icon without color style when color omitted", () => {
    const { container } = render(
      <StatCardRow
        cards={[
          {
            title: "X",
            value: 1,
            icon: <span data-testid="icn">★</span>,
          },
        ]}
      />,
    );
    const iconWrap = container.querySelector(
      ".flex.size-10.items-center.justify-center",
    );
    expect(iconWrap?.getAttribute("style") ?? "").not.toContain("background");
  });

  it("fires card.onClick when the card is clicked", () => {
    const onClick = vi.fn();
    const { container } = render(
      <StatCardRow cards={[{ title: "X", value: 1, onClick }]} />,
    );
    const card = container.querySelector('[data-slot="card"]') as HTMLElement;
    expect(card.className).toContain("cursor-pointer");
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies responsive column classes", () => {
    const { container } = render(
      <StatCardRow
        cards={[{ title: "X", value: 1 }]}
        columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
      />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("grid-cols-2");
    expect(root.className).toContain("sm:grid-cols-3");
    expect(root.className).toContain("md:grid-cols-4");
    expect(root.className).toContain("lg:grid-cols-5");
  });

  it("defaults to grid-cols-1 / md:grid-cols-2 / lg:grid-cols-4", () => {
    const { container } = render(
      <StatCardRow cards={[{ title: "X", value: 1 }]} />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("grid-cols-1");
    expect(root.className).toContain("md:grid-cols-2");
    expect(root.className).toContain("lg:grid-cols-4");
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatCardRow cards={[{ title: "X", value: 1 }]} className="my-row" />,
    );
    expect((container.firstChild as HTMLElement).className).toContain("my-row");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/stat-card-row");
    expect(mod.StatCardRow).toBeDefined();
  });
});
