import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeatmapCalendar } from "./heatmap-calendar";

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    useTranslation: () => ({
      t: (k: string, opts?: Record<string, unknown>) =>
        opts && "count" in opts ? `${k}:${String(opts.count)}` : k,
      i18n: { language: "en" },
    }),
  };
});

describe("HeatmapCalendar", () => {
  it("renders day labels and legend by default", () => {
    const start = new Date("2024-01-01");
    const end = new Date("2024-01-31");
    const { container } = render(
      <HeatmapCalendar
        data={[{ date: "2024-01-15", value: 5 }]}
        startDate={start}
        endDate={end}
      />,
    );
    expect(
      container.querySelector('[data-slot="heatmap-calendar"]'),
    ).not.toBeNull();
    expect(screen.getByText("heatmapCalendar.less")).toBeDefined();
    expect(screen.getByText("heatmapCalendar.more")).toBeDefined();
  });

  it("renders weekStartsOn=1 day labels (sun, tue, thu, sat)", () => {
    render(
      <HeatmapCalendar
        data={[]}
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-01-14")}
        weekStartsOn={1}
      />,
    );
    expect(screen.getByText("heatmapCalendar.day.sun")).toBeDefined();
    expect(screen.getByText("heatmapCalendar.day.sat")).toBeDefined();
  });

  it("renders weekStartsOn=0 day labels (mon, wed, fri)", () => {
    render(
      <HeatmapCalendar
        data={[]}
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-01-14")}
        weekStartsOn={0}
      />,
    );
    expect(screen.getByText("heatmapCalendar.day.mon")).toBeDefined();
    expect(screen.getByText("heatmapCalendar.day.fri")).toBeDefined();
  });

  it("accepts Date objects in data and renders cell titles", () => {
    const { container } = render(
      <HeatmapCalendar
        data={[{ date: new Date("2024-01-10"), value: 3 }]}
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-01-31")}
      />,
    );
    const titled = container.querySelector('[title="2024-01-10: 3"]');
    expect(titled).not.toBeNull();
  });

  it("hides legend when showLegend=false", () => {
    render(
      <HeatmapCalendar
        data={[]}
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-01-14")}
        showLegend={false}
      />,
    );
    expect(screen.queryByText("heatmapCalendar.less")).toBeNull();
  });

  it("renders custom color stops as CSS variables", () => {
    const { container } = render(
      <HeatmapCalendar
        data={[{ date: "2024-01-05", value: 1 }]}
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-01-31")}
        colorStops={["#aaa", "#bbb", "#ccc", "#ddd", "#eee"]}
      />,
    );
    const root = container.querySelector(
      '[data-slot="heatmap-calendar"]',
    ) as HTMLElement;
    expect(root.style.getPropertyValue("--hm-2")).toBe("#ccc");
  });

  it("uses default date range when none provided", () => {
    const { container } = render(
      <HeatmapCalendar data={[{ date: new Date(), value: 2 }]} />,
    );
    expect(
      container.querySelector('[data-slot="heatmap-calendar"]'),
    ).not.toBeNull();
  });

  it("exports HeatmapCalendar", () => {
    expect(HeatmapCalendar).toBeDefined();
  });
});
