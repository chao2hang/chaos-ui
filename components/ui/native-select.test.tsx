import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NativeSelect } from "./native-select";

const flatOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "disabled", label: "Disabled", disabled: true },
];

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ],
  },
];

describe("NativeSelect", () => {
  it("exports NativeSelect", () => {
    expect(NativeSelect).toBeDefined();
  });

  it("renders flat options", () => {
    render(<NativeSelect options={flatOptions} />);
    expect(screen.getByText("United States")).toBeDefined();
    expect(screen.getByText("United Kingdom")).toBeDefined();
  });

  it("renders placeholder option", () => {
    render(<NativeSelect options={flatOptions} placeholder="Choose..." />);
    expect(screen.getByText("Choose...")).toBeDefined();
  });

  it("renders grouped options", () => {
    render(<NativeSelect options={groupedOptions} />);
    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.getByText("Banana")).toBeDefined();
  });

  it("renders disabled state on select", () => {
    const { container } = render(
      <NativeSelect options={flatOptions} disabled />,
    );
    const select = container.querySelector("select");
    expect(select?.disabled).toBe(true);
  });

  it("renders error state", () => {
    const { container } = render(<NativeSelect options={flatOptions} error />);
    const select = container.querySelector("select");
    expect(select?.className).toContain("border-destructive");
  });

  it("renders sm size", () => {
    const { container } = render(
      <NativeSelect options={flatOptions} size="sm" />,
    );
    const select = container.querySelector("select");
    expect(select?.getAttribute("data-size")).toBe("sm");
  });

  it("calls onChange", () => {
    const onChange = vi.fn();
    const { container } = render(
      <NativeSelect options={flatOptions} onChange={onChange} />,
    );
    fireEvent.change(container.querySelector("select")!, {
      target: { value: "uk" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("has data-slot attribute", () => {
    const { container } = render(<NativeSelect options={flatOptions} />);
    expect(
      container.querySelector('[data-slot="native-select"]'),
    ).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("./native-select");
    expect(mod.NativeSelect).toBeDefined();
  });
});
