import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SegmentedControl } from "./segmented-control";

const opts = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

describe("SegmentedControl", () => {
  it("exports SegmentedControl", () => {
    expect(SegmentedControl).toBeDefined();
  });

  it("renders all option labels", () => {
    render(<SegmentedControl options={opts} defaultValue="week" />);
    expect(screen.getByText("Day")).toBeDefined();
    expect(screen.getByText("Week")).toBeDefined();
    expect(screen.getByText("Month")).toBeDefined();
  });

  it("renders a data-slot root", () => {
    const { container } = render(
      <SegmentedControl options={opts} defaultValue="week" />,
    );
    expect(
      container.querySelector('[data-slot="segmented-control"]'),
    ).not.toBeNull();
  });

  it("marks the default value as pressed", () => {
    const { container } = render(
      <SegmentedControl options={opts} defaultValue="week" />,
    );
    const items = container.querySelectorAll('[data-slot="toggle-group-item"]');
    expect(items[1]!.getAttribute("data-pressed")).not.toBeNull();
    expect(items[0]!.getAttribute("data-pressed")).toBeNull();
  });

  it("fires onChange when an option is clicked", () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl
        options={opts}
        defaultValue="day"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Month"));
    expect(onChange).toHaveBeenCalledWith("month");
  });

  it("renders option icons", () => {
    render(
      <SegmentedControl
        options={[
          { value: "a", label: "A", icon: <span>D</span> },
          { value: "b", label: "B" },
        ]}
        defaultValue="a"
      />,
    );
    expect(screen.getByText("D")).toBeDefined();
  });

  it("applies vertical orientation", () => {
    const { container } = render(
      <SegmentedControl
        options={opts}
        defaultValue="day"
        orientation="vertical"
      />,
    );
    const el = container.querySelector(
      '[data-slot="segmented-control"]',
    ) as HTMLElement;
    expect(el.className).toContain("flex-col");
  });

  it("disables all items when disabled", () => {
    const { container } = render(
      <SegmentedControl options={opts} defaultValue="day" disabled />,
    );
    const items = container.querySelectorAll('[data-slot="toggle-group-item"]');
    items.forEach((it) => {
      expect(it.getAttribute("data-disabled")).not.toBeNull();
    });
  });

  it("supports per-option disabled", () => {
    const { container } = render(
      <SegmentedControl
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B", disabled: true },
        ]}
        defaultValue="a"
      />,
    );
    const items = container.querySelectorAll('[data-slot="toggle-group-item"]');
    expect(items[1]!.getAttribute("data-disabled")).not.toBeNull();
    expect(items[0]!.getAttribute("data-disabled")).toBeNull();
  });
});
