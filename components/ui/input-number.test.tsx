import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { InputNumber } from "@/components/ui/input-number";

describe("InputNumber", () => {
  it("renders an input", () => {
    const { container } = render(<InputNumber value={5} onChange={() => {}} />);
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("steps up from current value", () => {
    const onChange = vi.fn();
    const { container } = render(
      <InputNumber value={5} step={1} onChange={onChange} />,
    );
    const upBtn = container.querySelectorAll("button")[0];
    if (upBtn) fireEvent.click(upBtn);
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("steps up from min when value is empty (min > 0)", () => {
    const onChange = vi.fn();
    const { container } = render(
      <InputNumber value={null} step={1} min={10} onChange={onChange} />,
    );
    const upBtn = container.querySelectorAll("button")[0];
    if (upBtn) fireEvent.click(upBtn);
    // base = min (10), up → 11
    expect(onChange).toHaveBeenCalledWith(11);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/input-number");
    expect(mod.InputNumber).toBeDefined();
  });
});
