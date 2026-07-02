import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EquipmentCard } from "./equipment-card";
import type { EquipmentStatus } from "./equipment-card";

describe("EquipmentCard", () => {
  it("exports EquipmentCard", () => {
    expect(EquipmentCard).toBeDefined();
  });

  it("renders equipment name and model", () => {
    render(
      <EquipmentCard
        name="CNC Mill #3"
        model="Haas VF-2SS"
        status="running"
      />,
    );
    expect(screen.getByText("CNC Mill #3")).toBeDefined();
    expect(screen.getByText("Haas VF-2SS")).toBeDefined();
  });

  it.each<EquipmentStatus>([
    "running",
    "idle",
    "maintenance",
    "fault",
    "offline",
  ])("renders status badge for '%s'", (status) => {
    render(
      <EquipmentCard name="Test Equipment" status={status} />,
    );
    const labels: Record<EquipmentStatus, string> = {
      running: "Running",
      idle: "Idle",
      maintenance: "Maintenance",
      fault: "Fault",
      offline: "Offline",
    };
    expect(screen.getByText(labels[status])).toBeDefined();
  });

  it("renders metrics in a 2-column grid", () => {
    render(
      <EquipmentCard
        name="Test"
        status="running"
        metrics={[
          { label: "OEE", value: "92%" },
          { label: "Output", value: 1240, unit: "pcs" },
          { label: "Temp", value: 42.5, unit: "C" },
          { label: "Runtime", value: "7.5h" },
        ]}
      />,
    );
    expect(screen.getByText("OEE")).toBeDefined();
    expect(screen.getByText("92%")).toBeDefined();
    expect(screen.getByText("Output")).toBeDefined();
    expect(screen.getByText("1240")).toBeDefined();
    expect(screen.getByText("pcs")).toBeDefined();
  });

  it("renders location with map pin icon", () => {
    render(
      <EquipmentCard
        name="Test"
        status="running"
        location="Building A, Line 2"
      />,
    );
    expect(screen.getByText("Building A, Line 2")).toBeDefined();
  });

  it("renders next maintenance date", () => {
    render(
      <EquipmentCard
        name="Test"
        status="running"
        nextMaintenance="2025-02-15"
      />,
    );
    expect(
      screen.getByText("Next maintenance: 2025-02-15"),
    ).toBeDefined();
  });

  it("renders action buttons in footer", () => {
    const onClickStart = vi.fn();
    const onClickDetails = vi.fn();
    render(
      <EquipmentCard
        name="Test"
        status="idle"
        actions={[
          { label: "Start", onClick: onClickStart },
          { label: "Details", onClick: onClickDetails },
        ]}
      />,
    );
    const startBtn = screen.getByText("Start");
    fireEvent.click(startBtn);
    expect(onClickStart).toHaveBeenCalledTimes(1);

    const detailsBtn = screen.getByText("Details");
    fireEvent.click(detailsBtn);
    expect(onClickDetails).toHaveBeenCalledTimes(1);
  });

  it("fires onClick when card is clicked", () => {
    const onClick = vi.fn();
    render(
      <EquipmentCard
        name="Test"
        status="running"
        onClick={onClick}
      />,
    );
    fireEvent.click(screen.getByText("Test"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has role=button when onClick is provided", () => {
    const { container } = render(
      <EquipmentCard
        name="Test"
        status="running"
        onClick={() => {}}
      />,
    );
    const card = container.querySelector("[data-slot='equipment-card']");
    expect(card?.getAttribute("role")).toBe("button");
  });

  it("does not have role=button when onClick is not provided", () => {
    const { container } = render(
      <EquipmentCard name="Test" status="running" />,
    );
    const card = container.querySelector("[data-slot='equipment-card']");
    expect(card?.getAttribute("role")).toBeNull();
  });

  it("action button clicks do not trigger card onClick", () => {
    const onCardClick = vi.fn();
    const onActionClick = vi.fn();
    render(
      <EquipmentCard
        name="Test"
        status="idle"
        onClick={onCardClick}
        actions={[{ label: "Action", onClick: onActionClick }]}
      />,
    );
    fireEvent.click(screen.getByText("Action"));
    expect(onActionClick).toHaveBeenCalledTimes(1);
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("renders trend icons for metrics", () => {
    const { container } = render(
      <EquipmentCard
        name="Test"
        status="running"
        metrics={[
          { label: "OEE", value: "92%", trend: "up" },
          { label: "Defects", value: "2%", trend: "down" },
        ]}
      />,
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it("applies className to root", () => {
    const { container } = render(
      <EquipmentCard
        name="Test"
        status="running"
        className="custom-class"
      />,
    );
    const card = container.querySelector("[data-slot='equipment-card']");
    expect(card?.className).toContain("custom-class");
  });
});
