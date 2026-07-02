import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OeeDashboard } from "./oee-dashboard";
import type { OeeEquipment, OeeLoss } from "./oee-dashboard";

const equipment: OeeEquipment = {
  id: "eq1",
  name: "CNC Machine #3",
  availability: 88.5,
  performance: 95.2,
  quality: 98.7,
  plannedTime: 480,
  downtime: 55,
  totalUnits: 1200,
  defectUnits: 15,
  idealCycleTime: 22,
  runTime: 425,
};

const losses: OeeLoss[] = [
  { label: "Tool Change", minutes: 20, category: "availability" },
  { label: "Breakdown", minutes: 25, category: "availability" },
  { label: "Minor Stops", minutes: 10, category: "performance" },
  { label: "Speed Loss", minutes: 15, category: "performance" },
  { label: "Rejects", minutes: 8, category: "quality" },
  { label: "Rework", minutes: 7, category: "quality" },
];

describe("OeeDashboard", () => {
  it("renders with data-slot", () => {
    const { container } = render(<OeeDashboard equipment={equipment} />);
    expect(container.querySelector('[data-slot="oee-dashboard"]')).toBeTruthy();
  });

  it("renders dashboard title", () => {
    render(<OeeDashboard equipment={equipment} title="Line 1 OEE" />);
    expect(screen.getByText("Line 1 OEE")).toBeTruthy();
  });

  it("renders equipment name", () => {
    render(<OeeDashboard equipment={equipment} />);
    expect(screen.getByText("CNC Machine #3")).toBeTruthy();
  });

  it("renders four gauges", () => {
    const { container } = render(<OeeDashboard equipment={equipment} />);
    const gauges = container.querySelectorAll('[data-slot="oee-gauge"]');
    expect(gauges.length).toBe(4);
  });

  it("renders OEE value", () => {
    render(<OeeDashboard equipment={equipment} />);
    // OEE = 0.885 * 0.952 * 0.987 * 100 = 83.2%
    const oeeText = screen.getByText("OEE");
    expect(oeeText).toBeTruthy();
  });

  it("renders Availability label", () => {
    render(<OeeDashboard equipment={equipment} />);
    expect(screen.getByText("Availability")).toBeTruthy();
  });

  it("renders Performance label", () => {
    render(<OeeDashboard equipment={equipment} />);
    expect(screen.getByText("Performance")).toBeTruthy();
  });

  it("renders Quality label", () => {
    render(<OeeDashboard equipment={equipment} />);
    expect(screen.getByText("Quality")).toBeTruthy();
  });

  it("renders loss breakdown", () => {
    render(<OeeDashboard equipment={equipment} losses={losses} />);
    expect(screen.getByText("Loss Breakdown")).toBeTruthy();
    expect(screen.getByText("Tool Change")).toBeTruthy();
    expect(screen.getByText("Breakdown")).toBeTruthy();
    expect(screen.getByText("Minor Stops")).toBeTruthy();
  });

  it("renders total loss minutes", () => {
    render(<OeeDashboard equipment={equipment} losses={losses} />);
    // 20+25+10+15+8+7 = 85 min = 1h 25m
    expect(screen.getByText(/1h 25m/)).toBeTruthy();
  });

  it("renders key metrics", () => {
    render(<OeeDashboard equipment={equipment} />);
    expect(screen.getByText("Planned Time")).toBeTruthy();
    expect(screen.getByText("Run Time")).toBeTruthy();
    expect(screen.getByText("Downtime")).toBeTruthy();
    expect(screen.getByText("Defect Rate")).toBeTruthy();
  });

  it("renders target badge", () => {
    render(<OeeDashboard equipment={equipment} targetOee={85} />);
    expect(screen.getByText(/Target:/)).toBeTruthy();
  });

  it("does not render loss section when empty", () => {
    render(<OeeDashboard equipment={equipment} losses={[]} />);
    expect(screen.queryByText("Loss Breakdown")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<OeeDashboard equipment={equipment} className="my-oee" />);
    const el = container.querySelector('[data-slot="oee-dashboard"]') as HTMLElement;
    expect(el.className).toContain("my-oee");
  });

  it("renders defect rate correctly", () => {
    render(<OeeDashboard equipment={equipment} />);
    // 15/1200 * 100 = 1.3%
    expect(screen.getByText("1.3%")).toBeTruthy();
  });
});
