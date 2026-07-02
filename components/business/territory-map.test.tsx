import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TerritoryMap } from "./territory-map";
import type { TerritoryRegion } from "./territory-map";

const regions: TerritoryRegion[] = [
  { id: "r1", name: "North", rep: "Alice", sales: 1200000, target: 1000000, customerCount: 45 },
  { id: "r2", name: "South", rep: "Bob", sales: 800000, target: 1000000, customerCount: 38 },
  { id: "r3", name: "East", rep: "Carol", sales: 550000, target: 800000, customerCount: 30 },
  { id: "r4", name: "West", sales: 200000, target: 600000, customerCount: 15 },
];

describe("TerritoryMap", () => {
  it("renders with data-slot", () => {
    const { container } = render(<TerritoryMap regions={regions} />);
    expect(container.querySelector('[data-slot="territory-map"]')).toBeTruthy();
  });

  it("renders title", () => {
    render(<TerritoryMap regions={regions} title="Q3 Sales Map" />);
    expect(screen.getByText("Q3 Sales Map")).toBeTruthy();
  });

  it("renders default title", () => {
    render(<TerritoryMap regions={regions} />);
    expect(screen.getByText("Sales Territory Map")).toBeTruthy();
  });

  it("renders all region names", () => {
    render(<TerritoryMap regions={regions} />);
    expect(screen.getByText("North")).toBeTruthy();
    expect(screen.getByText("South")).toBeTruthy();
    expect(screen.getByText("East")).toBeTruthy();
    expect(screen.getByText("West")).toBeTruthy();
  });

  it("renders rep names", () => {
    render(<TerritoryMap regions={regions} />);
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("Bob")).toBeTruthy();
    expect(screen.getByText("Carol")).toBeTruthy();
  });

  it("shows unassigned for regions without rep", () => {
    render(<TerritoryMap regions={regions} />);
    expect(screen.getByText("Unassigned")).toBeTruthy();
  });

  it("renders total sales", () => {
    render(<TerritoryMap regions={regions} currencySymbol="¥" />);
    // 1200000 + 800000 + 550000 + 200000 = 2750000 => ¥2.8M
    expect(screen.getByText(/¥2\.8M/)).toBeTruthy();
  });

  it("renders achievement percentage", () => {
    render(<TerritoryMap regions={regions} />);
    // North: 1200000/1000000 * 100 = 120%
    expect(screen.getByText("120%")).toBeTruthy();
  });

  it("renders customer counts", () => {
    render(<TerritoryMap regions={regions} />);
    expect(screen.getByText(/45 customers/)).toBeTruthy();
    expect(screen.getByText(/38 customers/)).toBeTruthy();
  });

  it("renders legend", () => {
    render(<TerritoryMap regions={regions} />);
    expect(screen.getByText("Coverage:")).toBeTruthy();
    expect(screen.getByText("≥100%")).toBeTruthy();
    expect(screen.getByText("<40%")).toBeTruthy();
  });

  it("renders total customer count", () => {
    render(<TerritoryMap regions={regions} />);
    // 45 + 38 + 30 + 15 = 128
    expect(screen.getByText(/128 total customers/)).toBeTruthy();
  });

  it("renders region count", () => {
    render(<TerritoryMap regions={regions} />);
    expect(screen.getByText(/4 regions/)).toBeTruthy();
  });

  it("calls onRegionClick when region clicked", () => {
    const onClick = vi.fn();
    const { container } = render(<TerritoryMap regions={regions} onRegionClick={onClick} />);
    const regionEls = container.querySelectorAll('[data-slot="territory-region"]');
    fireEvent.click(regionEls[0]!);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: "r1" }));
  });

  it("renders heat background for each region", () => {
    const { container } = render(<TerritoryMap regions={regions} />);
    const heats = container.querySelectorAll('[data-slot="territory-heat"]');
    expect(heats.length).toBe(4);
  });

  it("applies custom className", () => {
    const { container } = render(<TerritoryMap regions={regions} className="my-map" />);
    const el = container.querySelector('[data-slot="territory-map"]') as HTMLElement;
    expect(el.className).toContain("my-map");
  });
});
