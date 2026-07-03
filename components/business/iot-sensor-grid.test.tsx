import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IotSensorGrid } from "./iot-sensor-grid";
import type { Sensor } from "./iot-sensor-grid";

const sensors: Sensor[] = [
  {
    id: "s1",
    name: "Temp Sensor 01",
    location: "Warehouse A",
    type: "temperature",
    value: 22.5,
    unit: "°C",
    minThreshold: 10,
    maxThreshold: 35,
    batteryLevel: 85,
    signalStrength: 90,
    lastUpdate: "2s ago",
  },
  {
    id: "s2",
    name: "Humidity 02",
    location: "Warehouse B",
    type: "humidity",
    value: 68,
    unit: "%",
    minThreshold: 30,
    maxThreshold: 70,
    batteryLevel: 45,
    signalStrength: 60,
    lastUpdate: "5s ago",
  },
  {
    id: "s3",
    name: "Pressure 01",
    location: "Line 3",
    type: "pressure",
    value: 2.1,
    unit: "bar",
    minThreshold: 1.5,
    maxThreshold: 3.0,
    batteryLevel: 15,
    signalStrength: 30,
    lastUpdate: "1m ago",
  },
  {
    id: "s4",
    name: "CO2 Monitor",
    location: "Office",
    type: "co2",
    value: 1200,
    unit: "ppm",
    minThreshold: 0,
    maxThreshold: 1000,
    batteryLevel: 70,
    signalStrength: 80,
    lastUpdate: "3s ago",
  },
  {
    id: "s5",
    name: "Vibration 01",
    location: "Pump Room",
    type: "vibration",
    value: 0.5,
    unit: "mm/s",
    minThreshold: 0,
    maxThreshold: 2.0,
    batteryLevel: 90,
    signalStrength: 95,
    status: "offline",
  },
];

describe("IotSensorGrid", () => {
  it("renders with data-slot", () => {
    const { container } = render(<IotSensorGrid sensors={sensors} />);
    expect(
      container.querySelector('[data-slot="iot-sensor-grid"]'),
    ).toBeTruthy();
  });

  it("renders title", () => {
    render(<IotSensorGrid sensors={sensors} title="Factory Sensors" />);
    expect(screen.getByText("Factory Sensors")).toBeTruthy();
  });

  it("renders default title", () => {
    render(<IotSensorGrid sensors={sensors} />);
    expect(screen.getByText("IoT Sensor Grid")).toBeTruthy();
  });

  it("renders all sensor names", () => {
    render(<IotSensorGrid sensors={sensors} />);
    expect(screen.getByText("Temp Sensor 01")).toBeTruthy();
    expect(screen.getByText("Humidity 02")).toBeTruthy();
    expect(screen.getByText("Pressure 01")).toBeTruthy();
    expect(screen.getByText("CO2 Monitor")).toBeTruthy();
    expect(screen.getByText("Vibration 01")).toBeTruthy();
  });

  it("renders sensor locations", () => {
    render(<IotSensorGrid sensors={sensors} />);
    expect(screen.getByText("Warehouse A")).toBeTruthy();
    expect(screen.getByText("Warehouse B")).toBeTruthy();
    expect(screen.getByText("Line 3")).toBeTruthy();
  });

  it("renders sensor values", () => {
    render(<IotSensorGrid sensors={sensors} />);
    expect(screen.getByText("22.5")).toBeTruthy();
    expect(screen.getByText("68.0")).toBeTruthy();
    expect(screen.getByText("1200.0")).toBeTruthy();
  });

  it("renders status counts in header", () => {
    render(<IotSensorGrid sensors={sensors} />);
    // s1 online, s2 warning (68 > 70*0.9=63), s3 warning (15% battery doesn't affect), s4 critical (1200 > 1000), s5 offline
    expect(screen.getByText(/Online:/)).toBeTruthy();
    expect(screen.getByText(/Warning:/)).toBeTruthy();
    expect(screen.getByText(/Critical:/)).toBeTruthy();
    expect(screen.getByText(/Offline:/)).toBeTruthy();
  });

  it("renders battery levels", () => {
    render(<IotSensorGrid sensors={sensors} />);
    expect(screen.getByText("85%")).toBeTruthy();
    expect(screen.getByText("45%")).toBeTruthy();
    expect(screen.getByText("15%")).toBeTruthy();
  });

  it("renders signal strength", () => {
    render(<IotSensorGrid sensors={sensors} />);
    // "90%" collides: sensor s1 has signalStrength 90, and s5 has batteryLevel
    // 90 (both rendered as "<n>%"), so it appears more than once.
    expect(screen.getAllByText("90%").length).toBeGreaterThan(0);
    expect(screen.getByText("60%")).toBeTruthy();
  });

  it("renders threshold ranges", () => {
    render(<IotSensorGrid sensors={sensors} />);
    expect(screen.getByText(/Range: 10 ~ 35 °C/)).toBeTruthy();
    expect(screen.getByText(/Range: 0 ~ 1000 ppm/)).toBeTruthy();
  });

  it("renders live indicator dot", () => {
    const { container } = render(<IotSensorGrid sensors={sensors} />);
    expect(
      container.querySelector('[data-slot="live-indicator"]'),
    ).toBeTruthy();
  });

  it("renders sensor cards", () => {
    const { container } = render(<IotSensorGrid sensors={sensors} />);
    const cards = container.querySelectorAll('[data-slot="sensor-card"]');
    expect(cards.length).toBe(5);
  });

  it("calls onSensorClick when card clicked", () => {
    const onClick = vi.fn();
    const { container } = render(
      <IotSensorGrid sensors={sensors} onSensorClick={onClick} />,
    );
    const cards = container.querySelectorAll('[data-slot="sensor-card"]');
    fireEvent.click(cards[0]!);
    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ id: "s1" }));
  });

  it("shows empty state when no sensors", () => {
    render(<IotSensorGrid sensors={[]} />);
    expect(screen.getByText("No sensors deployed")).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <IotSensorGrid sensors={sensors} className="my-iot" />,
    );
    const el = container.querySelector(
      '[data-slot="iot-sensor-grid"]',
    ) as HTMLElement;
    expect(el.className).toContain("my-iot");
  });
});
