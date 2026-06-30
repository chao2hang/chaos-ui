import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileInput } from "@/components/mobile/mobile-input";
import type { MobileInputProps } from "@/components/mobile/mobile-input";

describe("MobileInput", () => {
  it("is exported and type is importable", () => {
    expect(MobileInput).toBeDefined();
    const _p: MobileInputProps = { type: "text" };
    expect(_p.type).toBe("text");
  });

  it("renders an input with the given placeholder", () => {
    render(<MobileInput placeholder="Enter name" />);
    expect(screen.getByPlaceholderText("Enter name")).toBeDefined();
  });

  it("applies mobile-first className merging (custom className wins)", () => {
    render(<MobileInput placeholder="p" className="my-custom" />);
    const input = screen.getByPlaceholderText("p");
    expect(input.className).toContain("my-custom");
    // mobile base classes still present
    expect(input.className).toContain("h-12");
    expect(input.getAttribute("data-slot")).toBe("input");
  });

  it("displays the provided value", () => {
    render(<MobileInput value="hello" readOnly />);
    expect(screen.getByDisplayValue("hello")).toBeDefined();
  });

  it("fires onChange when typing", async () => {
    const onChange = vi.fn();
    render(<MobileInput placeholder="search" onChange={onChange} />);
    const input = screen.getByPlaceholderText("search");
    await userEvent.type(input, "ab");
    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue("ab");
  });

  it("forwards type=number and other native input props", () => {
    render(<MobileInput type="number" placeholder="age" min={0} max={120} />);
    const input = screen.getByPlaceholderText("age");
    expect(input.getAttribute("type")).toBe("number");
    expect(input.getAttribute("min")).toBe("0");
    expect(input.getAttribute("max")).toBe("120");
  });

  it("supports disabled state", () => {
    render(<MobileInput placeholder="x" disabled />);
    const input = screen.getByPlaceholderText("x");
    expect(input).toBeDisabled();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/mobile/mobile-input");
    expect(mod.MobileInput).toBeDefined();
  });

  it("forwards onFocus handler", () => {
    const onFocus = vi.fn();
    render(<MobileInput placeholder="f" onFocus={onFocus} />);
    fireEvent.focus(screen.getByPlaceholderText("f"));
    expect(onFocus).toHaveBeenCalled();
  });
});
