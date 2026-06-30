import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DateRangePicker } from "./date-range-picker";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } }),
}));

// formatDate uses Intl which works in jsdom, but mock for deterministic labels.
vi.mock("@/lib/format", async () => {
  const actual = await vi.importActual<typeof import("@/lib/format")>(
    "@/lib/format",
  );
  return {
    ...actual,
    formatDate: (d: Date) => d.toISOString().slice(0, 10),
  };
});

describe("date-range-picker", () => {
  it("exports DateRangePicker", () => {
    expect(DateRangePicker).toBeDefined();
  });

  it("renders placeholder when no value", () => {
    render(<DateRangePicker />);
    expect(screen.getByText("dateRangePicker.placeholder")).toBeDefined();
  });

  it("renders custom placeholder", () => {
    render(<DateRangePicker placeholder="选择日期范围" />);
    expect(screen.getByText("选择日期范围")).toBeDefined();
  });

  it("renders single date label when only from is set", () => {
    const from = new Date("2026-06-01T00:00:00Z");
    render(<DateRangePicker value={{ from }} />);
    expect(screen.getByText("2026-06-01")).toBeDefined();
  });

  it("renders single date label when from === to", () => {
    const d = new Date("2026-06-15T00:00:00Z");
    render(<DateRangePicker value={{ from: d, to: d }} />);
    expect(screen.getByText("2026-06-15")).toBeDefined();
  });

  it("renders range label when from and to differ", () => {
    const from = new Date("2026-06-01T00:00:00Z");
    const to = new Date("2026-06-10T00:00:00Z");
    render(<DateRangePicker value={{ from, to }} />);
    expect(screen.getByText("2026-06-01 - 2026-06-10")).toBeDefined();
  });

  it("disables the trigger button when disabled", () => {
    const { container } = render(<DateRangePicker disabled />);
    const btn = container.querySelector("button");
    expect(btn).not.toBeNull();
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders the calendar trigger with a button element", () => {
    const { container } = render(<DateRangePicker />);
    expect(container.querySelector("button")).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/date-range-picker");
    expect(mod.DateRangePicker).toBeDefined();
  });
});
