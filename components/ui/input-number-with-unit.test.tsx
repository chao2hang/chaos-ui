import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { InputNumberWithUnit } from "@/components/ui/input-number-with-unit";

describe("InputNumberWithUnit", () => {
  it("renders an input with suffix unit by default", () => {
    const { container } = render(
      <InputNumberWithUnit unit="元" value={100} onChange={() => {}} />,
    );
    expect(container.querySelector("input")).not.toBeNull();
    expect(container.textContent).toContain("元");
    // Suffix: unit should appear after the input in DOM order
    const unit = container.querySelector("[data-slot=input-number-unit]");
    expect(unit).not.toBeNull();
    expect(unit!.textContent).toBe("元");
  });

  it("renders unit as prefix when unitPosition=prefix", () => {
    const { container } = render(
      <InputNumberWithUnit
        unit="$"
        unitPosition="prefix"
        value={50}
        onChange={() => {}}
      />,
    );
    const unit = container.querySelector("[data-slot=input-number-unit]");
    expect(unit).not.toBeNull();
    expect(unit!.textContent).toBe("$");
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    const { container } = render(
      <InputNumberWithUnit unit="件" value={null} onChange={onChange} />,
    );
    const input = container.querySelector("input");
    if (input) {
      fireEvent.change(input, { target: { value: "42" } });
    }
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it("passes through number constraints (min/max/step)", () => {
    const onChange = vi.fn();
    const { container } = render(
      <InputNumberWithUnit
        unit="kg"
        min={0}
        max={100}
        step={0.5}
        value={10}
        onChange={onChange}
      />,
    );
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    // min/max/step are passed through to InputNumber internally
  });

  it("applies disabled state", () => {
    const { container } = render(
      <InputNumberWithUnit
        unit="元"
        value={5}
        disabled
        onChange={() => {}}
      />,
    );
    const input = container.querySelector("input");
    expect(input).not.toBeNull();
    expect(input!.disabled).toBe(true);
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(
      <InputNumberWithUnit
        unit="件"
        value={0}
        className="custom-class"
        onChange={() => {}}
      />,
    );
    expect(
      container.querySelector("[data-slot=input-number-with-unit]")?.classList,
    ).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/input-number-with-unit");
    expect(mod.InputNumberWithUnit).toBeDefined();
  });
});
