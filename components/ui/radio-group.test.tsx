import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  it("exports RadioGroup and RadioGroupItem", () => {
    expect(RadioGroup).toBeDefined();
    expect(RadioGroupItem).toBeDefined();
  });

  it("renders a radiogroup with items", () => {
    const { container } = render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>,
    );
    expect(container.querySelector('[data-slot="radio-group"]')).not.toBeNull();
    expect(container.querySelectorAll('[data-slot="radio-group-item"]')).toHaveLength(2);
  });

  it("renders the indicator element inside each item", () => {
    const { container } = render(<RadioGroup defaultValue="a"><RadioGroupItem value="a" /></RadioGroup>);
    expect(container.querySelector('[data-slot="radio-group-indicator"]')).not.toBeNull();
  });

  it("fires onValueChange when an item is clicked", () => {
    const onValueChange = vi.fn();
    render(<RadioGroup onValueChange={onValueChange}><RadioGroupItem value="x" aria-label="X" /><RadioGroupItem value="y" aria-label="Y" /></RadioGroup>);
    const radios = screen.getAllByRole("radio");
    fireEvent.click(radios[1]);
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0]?.[0]).toBe("y");
  });

  it("marks the selected radio as checked", () => {
    render(<RadioGroup value="b"><RadioGroupItem value="a" aria-label="A" /><RadioGroupItem value="b" aria-label="B" /></RadioGroup>);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]?.getAttribute("aria-checked")).toBe("false");
    expect(radios[1]?.getAttribute("aria-checked")).toBe("true");
  });

  it("applies custom className to the group", () => {
    const { container } = render(<RadioGroup className="custom-group"><RadioGroupItem value="a" /></RadioGroup>);
    expect((container.querySelector('[data-slot="radio-group"]') as HTMLElement).className).toContain("custom-group");
  });

  it("supports disabled item", () => {
    const { container } = render(<RadioGroup><RadioGroupItem value="a" disabled /></RadioGroup>);
    expect((container.querySelector('[data-slot="radio-group-item"]') as HTMLElement).getAttribute("data-disabled")).not.toBeNull();
  });
});
