import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import type { CheckboxProps } from "@/components/ui/checkbox";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('[data-slot="checkbox"]')).not.toBeNull();
  });

  it("renders the indicator slot", () => {
    const { container } = render(<Checkbox checked />);
    expect(container.querySelector('[data-slot="checkbox-indicator"]')).not.toBeNull();
  });

  it("forwards checked state via props", () => {
    const { container } = render(<Checkbox checked />);
    const cb = container.querySelector('[data-slot="checkbox"]');
    expect(cb).not.toBeNull();
  });

  it("CheckboxProps type is importable", () => {
    const _props: CheckboxProps = { checked: true };
    expect(_props.checked).toBe(true);
  });

  it("fires onCheckedChange when clicked (uncontrolled)", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(
      <Checkbox onCheckedChange={onCheckedChange} />,
    );
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    fireEvent.click(cb);
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it("toggles checked state on click (uncontrolled)", () => {
    const { container } = render(<Checkbox />);
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    // Base UI renders `data-checked` as a boolean attribute (present="" / absent).
    expect(cb.getAttribute("data-checked")).toBeNull();
    fireEvent.click(cb);
    expect(cb.getAttribute("data-checked")).toBe("");
    fireEvent.click(cb);
    expect(cb.getAttribute("data-checked")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<Checkbox className="my-cb" />);
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    expect(cb.className).toContain("my-cb");
  });

  it("renders disabled and does not toggle", () => {
    const onCheckedChange = vi.fn();
    const { container } = render(
      <Checkbox disabled onCheckedChange={onCheckedChange} />,
    );
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    expect(cb.getAttribute("data-disabled")).toBe("");
    fireEvent.click(cb);
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("supports aria-label for accessibility", () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />);
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    expect(cb.getAttribute("aria-label")).toBe("Accept terms");
  });

  it("supports indeterminate state", () => {
    const { container } = render(<Checkbox indeterminate />);
    const cb = container.querySelector('[data-slot="checkbox"]');
    expect(cb).not.toBeNull();
  });

  it("controlled checked prop reflects the provided value", () => {
    const { container } = render(<Checkbox checked />);
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    expect(cb.getAttribute("data-checked")).toBe("");
  });

  it("controlled unchecked does not show data-checked", () => {
    const { container } = render(<Checkbox checked={false} />);
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    expect(cb.getAttribute("data-checked")).toBeNull();
  });

  it("does not toggle when controlled (controlled value wins)", () => {
    const { container } = render(<Checkbox checked={false} />);
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    fireEvent.click(cb);
    // remains unchecked because the controlled prop is false
    expect(cb.getAttribute("data-checked")).toBeNull();
  });

  it("applies aria-invalid styling hook", () => {
    const { container } = render(<Checkbox aria-invalid />);
    const cb = container.querySelector('[data-slot="checkbox"]') as HTMLElement;
    expect(cb.getAttribute("aria-invalid")).toBe("true");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/checkbox");
    expect(mod.Checkbox).toBeDefined();
  });
});
