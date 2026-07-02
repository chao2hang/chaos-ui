import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MaintenanceLog } from "./maintenance-log";
import type { MaintenanceEntry } from "./maintenance-log";

const entries: MaintenanceEntry[] = [
  {
    id: "m-1",
    date: "2025-01-15",
    type: "preventive",
    title: "Oil change",
    description: "Replaced hydraulic oil and filters.",
    technician: "Zhang Wei",
    parts: ["Hydraulic filter HF-220", "ISO VG 46 Oil (20L)"],
    duration: "2.5 hours",
    status: "completed",
    cost: 1200,
  },
  {
    id: "m-2",
    date: "2025-01-18",
    type: "corrective",
    title: "Bearing replacement",
    description: "Replaced worn spindle bearing after vibration alarm.",
    technician: "Li Ming",
    parts: ["SKF 7014 Bearing"],
    duration: "6 hours",
    status: "completed",
  },
  {
    id: "m-3",
    date: "2025-01-20",
    type: "inspection",
    title: "Quarterly safety check",
    description: "Inspected all safety guards and e-stop buttons.",
    technician: "Wang Fang",
    duration: "1 hour",
    status: "in-progress",
  },
  {
    id: "m-4",
    date: "2025-02-01",
    type: "emergency",
    title: "Motor failure",
    description: "Emergency motor replacement after burnout.",
    status: "scheduled",
  },
];

describe("MaintenanceLog", () => {
  it("exports MaintenanceLog", () => {
    expect(MaintenanceLog).toBeDefined();
  });

  it("renders all entries", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.getByText("Oil change")).toBeDefined();
    expect(screen.getByText("Bearing replacement")).toBeDefined();
    expect(screen.getByText("Quarterly safety check")).toBeDefined();
    expect(screen.getByText("Motor failure")).toBeDefined();
  });

  it("renders entry descriptions", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(
      screen.getByText("Replaced hydraulic oil and filters."),
    ).toBeDefined();
  });

  it("renders type badges", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.getAllByText("Preventive").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Corrective").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Inspection").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Emergency").length).toBeGreaterThanOrEqual(1);
  });

  it("renders status badges", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.getAllByText("Completed").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("In Progress").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Scheduled").length).toBeGreaterThanOrEqual(1);
  });

  it("renders technician names", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.getByText("Zhang Wei")).toBeDefined();
    expect(screen.getByText("Li Ming")).toBeDefined();
  });

  it("renders duration", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.getByText("2.5 hours")).toBeDefined();
    expect(screen.getByText("6 hours")).toBeDefined();
  });

  it("renders cost", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.getByText(/1,200/)).toBeDefined();
  });

  it("renders parts list", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.getByText("Hydraulic filter HF-220")).toBeDefined();
    expect(screen.getByText("ISO VG 46 Oil (20L)")).toBeDefined();
  });

  it("renders title when provided", () => {
    render(
      <MaintenanceLog entries={entries} title="Maintenance History" />,
    );
    expect(screen.getByText("Maintenance History")).toBeDefined();
  });

  it("shows filter tabs when showFilter is true", () => {
    render(<MaintenanceLog entries={entries} showFilter />);
    expect(screen.getByRole("button", { name: "All" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Preventive" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Corrective" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Emergency" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Inspection" })).toBeDefined();
  });

  it("does not show filter tabs by default", () => {
    render(<MaintenanceLog entries={entries} />);
    expect(screen.queryByRole("button", { name: "All" })).toBeNull();
  });

  it("filters entries by type when filter tab is clicked", () => {
    render(<MaintenanceLog entries={entries} showFilter />);

    fireEvent.click(screen.getByRole("button", { name: "Emergency" }));

    expect(screen.getByText("Motor failure")).toBeDefined();
    expect(screen.queryByText("Oil change")).toBeNull();
    expect(screen.queryByText("Bearing replacement")).toBeNull();
  });

  it("shows all entries when 'All' filter is selected", () => {
    render(<MaintenanceLog entries={entries} showFilter />);

    fireEvent.click(screen.getByRole("button", { name: "Emergency" }));
    expect(screen.queryByText("Oil change")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("Oil change")).toBeDefined();
    expect(screen.getByText("Motor failure")).toBeDefined();
  });

  it("renders empty state when no entries", () => {
    render(<MaintenanceLog entries={[]} />);
    expect(screen.getByText("No maintenance records.")).toBeDefined();
  });

  it("renders custom empty text", () => {
    render(
      <MaintenanceLog entries={[]} emptyText="Nothing here." />,
    );
    expect(screen.getByText("Nothing here.")).toBeDefined();
  });

  it("applies className to root element", () => {
    const { container } = render(
      <MaintenanceLog entries={[]} className="custom-class" />,
    );
    const root = container.querySelector(
      "[data-slot='maintenance-log']",
    );
    expect(root).not.toBeNull();
    expect(root!.className).toContain("custom-class");
  });

  it("renders dates as time elements", () => {
    const { container } = render(
      <MaintenanceLog entries={entries} />,
    );
    const timeElements = container.querySelectorAll("time");
    expect(timeElements.length).toBeGreaterThanOrEqual(entries.length);
  });
});
