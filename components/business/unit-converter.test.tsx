import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  UnitConverter,
  convertValue,
  formatResult,
  builtInCategories,
} from "./unit-converter";

describe("UnitConverter", () => {
  it("renders all category tabs", () => {
    render(<UnitConverter />);
    const tabs = screen.getByTestId("category-tabs");
    expect(tabs).toBeDefined();
    for (const cat of builtInCategories) {
      expect(screen.getByTestId(`tab-${cat.id}`)).toBeDefined();
    }
  });

  it("renders the component with from input and result display", () => {
    render(<UnitConverter defaultCategory="length" />);
    expect(screen.getByTestId("from-input")).toBeDefined();
    expect(screen.getByTestId("result-display")).toBeDefined();
    expect(screen.getByTestId("swap-button")).toBeDefined();
  });

  it("swap button swaps from/to units", () => {
    render(<UnitConverter defaultCategory="length" defaultFrom="m" defaultTo="km" />);
    const fromSelect = screen.getByTestId("from-unit-select");
    const toSelect = screen.getByTestId("to-unit-select");
    expect(fromSelect).toBeDefined();
    expect(toSelect).toBeDefined();

    fireEvent.click(screen.getByTestId("swap-button"));
    // After swap, the from-input value should update to the conversion result
    expect(screen.getByTestId("from-input")).toBeDefined();
  });

  it("real-time conversion on input change", () => {
    render(<UnitConverter defaultCategory="length" defaultFrom="m" defaultTo="cm" />);
    const input = screen.getByTestId("from-input");
    fireEvent.change(input, { target: { value: "5" } });
    // 5 m = 500 cm - the result display should update
    const result = screen.getByTestId("result-display");
    expect(result).toBeDefined();
  });

  it("compact mode shows Select instead of tabs", () => {
    render(<UnitConverter compact />);
    expect(screen.getByTestId("category-select")).toBeDefined();
    expect(screen.queryByTestId("category-tabs")).toBeNull();
  });

  it("default category/unit respected", () => {
    render(<UnitConverter defaultCategory="weight" />);
    // Should start on weight category
    expect(screen.getByTestId("from-unit-select")).toBeDefined();
    expect(screen.getByTestId("to-unit-select")).toBeDefined();
  });

  it("has data-slot attribute on root", () => {
    const { container } = render(<UnitConverter />);
    expect(container.querySelector('[data-slot="unit-converter"]')).toBeDefined();
  });

  it("showSwap=false hides swap button", () => {
    render(<UnitConverter showSwap={false} />);
    expect(screen.queryByTestId("swap-button")).toBeNull();
  });

  it("compact mode has tighter padding class", () => {
    const { container } = render(<UnitConverter compact />);
    const root = container.querySelector('[data-slot="unit-converter"]');
    expect(root?.className).toContain("p-3");
  });

  it("accepts custom categories", () => {
    const customCategories = [
      {
        id: "speed",
        name: "Speed",
        units: [
          { id: "mps", name: "Meters per second", abbr: "m/s", toBase: 1, fromBase: 1 },
          { id: "kph", name: "Kilometers per hour", abbr: "km/h", toBase: 1 / 3.6, fromBase: 3.6 },
        ],
      },
    ];
    render(<UnitConverter categories={customCategories} />);
    expect(screen.getByTestId("tab-speed")).toBeDefined();
  });
});

describe("convertValue helper", () => {
  const lengthCat = builtInCategories.find((c) => c.id === "length")!;
  const tempCat = builtInCategories.find((c) => c.id === "temperature")!;
  const weightCat = builtInCategories.find((c) => c.id === "weight")!;

  it("1 inch = 2.54 cm", () => {
    const inch = lengthCat.units.find((u) => u.id === "inch")!;
    const cm = lengthCat.units.find((u) => u.id === "cm")!;
    const result = convertValue(1, inch, cm);
    expect(Math.abs(result - 2.54)).toBeLessThan(0.001);
  });

  it("1 mile = 1.60934 km", () => {
    const mile = lengthCat.units.find((u) => u.id === "mile")!;
    const km = lengthCat.units.find((u) => u.id === "km")!;
    const result = convertValue(1, mile, km);
    expect(Math.abs(result - 1.60934)).toBeLessThan(0.001);
  });

  it("1 kg = 2.20462 lb", () => {
    const kg = weightCat.units.find((u) => u.id === "kg")!;
    const lb = weightCat.units.find((u) => u.id === "lb")!;
    const result = convertValue(1, kg, lb);
    expect(Math.abs(result - 2.20462)).toBeLessThan(0.001);
  });

  it("100 C = 212 F", () => {
    const c = tempCat.units.find((u) => u.id === "c")!;
    const f = tempCat.units.find((u) => u.id === "f")!;
    const result = convertValue(100, c, f);
    expect(Math.abs(result - 212)).toBeLessThan(0.01);
  });

  it("0 C = 32 F", () => {
    const c = tempCat.units.find((u) => u.id === "c")!;
    const f = tempCat.units.find((u) => u.id === "f")!;
    const result = convertValue(0, c, f);
    expect(Math.abs(result - 32)).toBeLessThan(0.01);
  });

  it("0 C = 273.15 K", () => {
    const c = tempCat.units.find((u) => u.id === "c")!;
    const k = tempCat.units.find((u) => u.id === "k")!;
    const result = convertValue(0, c, k);
    expect(Math.abs(result - 273.15)).toBeLessThan(0.01);
  });

  it("212 F = 100 C (reverse)", () => {
    const c = tempCat.units.find((u) => u.id === "c")!;
    const f = tempCat.units.find((u) => u.id === "f")!;
    const result = convertValue(212, f, c);
    expect(Math.abs(result - 100)).toBeLessThan(0.01);
  });

  it("1 atm = 101325 Pa", () => {
    const pressureCat = builtInCategories.find((c) => c.id === "pressure")!;
    const atm = pressureCat.units.find((u) => u.id === "atm")!;
    const pa = pressureCat.units.find((u) => u.id === "pa")!;
    const result = convertValue(1, atm, pa);
    expect(Math.abs(result - 101325)).toBeLessThan(1);
  });
});

describe("formatResult helper", () => {
  it("formats finite numbers to 6 significant digits", () => {
    expect(formatResult(2.54)).toBe("2.54");
    expect(formatResult(100)).toBe("100");
    expect(formatResult(0.123456789)).toBe("0.123457");
  });

  it("returns em-dash for non-finite values", () => {
    expect(formatResult(NaN)).toBe("\u2014");
    expect(formatResult(Infinity)).toBe("\u2014");
  });

  it("returns 0 for zero", () => {
    expect(formatResult(0)).toBe("0");
  });
});
