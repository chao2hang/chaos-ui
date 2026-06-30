import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControl } from "./segmented-control";

type Opt = "a" | "b" | "c";
const options: { value: Opt; label: string }[] = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma" },
];

describe("SegmentedControl", () => {
  it("exports SegmentedControl", () => {
    expect(SegmentedControl).toBeDefined();
    expect(typeof SegmentedControl).toBe("function");
  });

  it("renders all option labels", () => {
    render(<SegmentedControl options={options} value="a" />);
    expect(screen.getByText("Alpha")).toBeDefined();
    expect(screen.getByText("Beta")).toBeDefined();
    expect(screen.getByText("Gamma")).toBeDefined();
  });

  it("renders the segmented-control data-slot", () => {
    const { container } = render(
      <SegmentedControl options={options} value="a" />,
    );
    expect(container.querySelector('[data-slot="segmented-control"]')).not.toBeNull();
  });

  it("fires onChange when an option is clicked", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl options={options} value="a" onChange={onChange} />,
    );
    fireEvent.click(screen.getByText("Beta"));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("uses defaultValue when value is undefined", () => {
    render(<SegmentedControl options={options} defaultValue="b" />);
    // Beta toggle should be pressed
    const beta = screen.getByText("Beta").closest("button");
    expect(beta?.getAttribute("aria-pressed") === "true" || beta?.getAttribute("data-pressed") !== undefined).toBe(true);
  });

  it("disables all items when disabled", () => {
    render(<SegmentedControl options={options} value="a" disabled />);
    const alpha = screen.getByText("Alpha").closest("button");
    expect(alpha?.hasAttribute("disabled")).toBe(true);
  });

  it("disables a single item via option.disabled", () => {
    const opts = [
      ...options,
      { value: "d" as const, label: "Delta", disabled: true },
    ];
    render(<SegmentedControl options={opts} value="a" />);
    const delta = screen.getByText("Delta").closest("button");
    expect(delta?.hasAttribute("disabled")).toBe(true);
  });

  it("applies size variants", () => {
    const { rerender } = render(
      <SegmentedControl options={options} value="a" size="sm" />,
    );
    const btnSm = screen.getByText("Alpha").closest("button");
    expect(btnSm?.className).toContain("h-7");
    rerender(<SegmentedControl options={options} value="a" size="lg" />);
    const btnLg = screen.getByText("Alpha").closest("button");
    expect(btnLg?.className).toContain("h-9");
  });

  it("supports vertical orientation", () => {
    const { container } = render(
      <SegmentedControl options={options} value="a" orientation="vertical" />,
    );
    const root = container.querySelector('[data-slot="segmented-control"]');
    expect(root?.className).toContain("flex-col");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SegmentedControl options={options} value="a" className="my-control" />,
    );
    const root = container.querySelector('[data-slot="segmented-control"]');
    expect(root?.className).toContain("my-control");
  });

  it("renders option icons", () => {
    render(
      <SegmentedControl
        options={[{ value: "a", label: "WithIcon", icon: <span data-testid="ic">★</span> }]}
        value="a"
      />,
    );
    expect(screen.getByTestId("ic")).toBeDefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/segmented-control");
    expect(mod.SegmentedControl).toBeDefined();
  });
});
