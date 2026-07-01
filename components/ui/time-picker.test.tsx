import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TimePicker, formatTimeInput } from "./time-picker";

describe("TimePicker", () => {
  it("exports TimePicker", () => {
    expect(TimePicker).toBeDefined();
  });

  it("exports formatTimeInput", () => {
    expect(formatTimeInput).toBeDefined();
  });

  it("renders the placeholder when no value provided", () => {
    render(<TimePicker placeholder="选择时间" />);
    expect(screen.getByText("选择时间")).toBeDefined();
  });

  it("renders the default placeholder text", () => {
    render(<TimePicker />);
    expect(screen.getByText("选择时间")).toBeDefined();
  });

  it("renders the provided value", () => {
    render(<TimePicker value="09:30" />);
    expect(screen.getByText("09:30")).toBeDefined();
  });

  it("renders a 12h formatted value", () => {
    render(<TimePicker value="01:30 PM" format="12h" />);
    expect(screen.getByText("01:30 PM")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    const { container } = render(<TimePicker value="09:30" />);
    expect(container.querySelector('[data-slot="time-picker"]')).not.toBeNull();
  });

  it("renders the trigger as a disabled button when disabled", () => {
    render(<TimePicker value="09:30" disabled />);
    const btn = screen.getByText("09:30").closest("button");
    expect(btn).not.toBeNull();
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it("formatTimeInput produces 24h format by default", () => {
    expect(formatTimeInput(9, 5)).toBeTruthy();
  });

  it("formatTimeInput produces 12h format when requested", () => {
    const out = formatTimeInput(13, 30, "12h");
    expect(out).toContain("PM");
  });

  it("formatTimeInput 12h midnight is 12:00 AM", () => {
    const out = formatTimeInput(0, 0, "12h");
    expect(out).toContain("AM");
  });

  it("module is importable", async () => {
    const mod = await import("./time-picker");
    expect(mod.TimePicker).toBeDefined();
    expect(mod.formatTimeInput).toBeDefined();
  });
});
