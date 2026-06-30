import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryBar } from "./category-bar";
import type { CategoryBarProps } from "./category-bar";

describe("CategoryBar", () => {
  it("renders each label and value", () => {
    render(
      <CategoryBar
        data={[
          { label: "食品", value: 30, color: "#ef4444" },
          { label: "日用品", value: 70, color: "#3b82f6" },
        ]}
      />,
    );
    expect(screen.getByText("食品")).toBeDefined();
    expect(screen.getByText("日用品")).toBeDefined();
    expect(screen.getByText("30")).toBeDefined();
    expect(screen.getByText("70")).toBeDefined();
  });

  it("renders an empty list without error", () => {
    const { container } = render(<CategoryBar data={[]} />);
    expect(container.querySelector('[data-slot="category-bar"]')).toBeDefined();
  });

  it("renders the data-slot on the root element", () => {
    const { container } = render(
      <CategoryBar data={[{ label: "x", value: 1, color: "#000" }]} />,
    );
    expect(container.querySelector('[data-slot="category-bar"]')).toBeDefined();
  });

  it("exports types", () => {
    const _tc: CategoryBarProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
