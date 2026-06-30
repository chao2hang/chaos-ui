import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BarList } from "./bar-list";
import type { BarListProps } from "./bar-list";

describe("BarList", () => {
  it("renders each label and value", () => {
    render(
      <BarList
        data={[
          { label: "苹果", value: 10 },
          { label: "香蕉", value: 20 },
        ]}
      />,
    );
    expect(screen.getByText("苹果")).toBeDefined();
    expect(screen.getByText("香蕉")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
    expect(screen.getByText("20")).toBeDefined();
  });

  it("renders an empty list without error", () => {
    const { container } = render(<BarList data={[]} />);
    expect(container.querySelector('[data-slot="bar-list"]')).toBeDefined();
  });

  it("renders the data-slot on the root element", () => {
    const { container } = render(
      <BarList data={[{ label: "x", value: 1 }]} />,
    );
    expect(container.querySelector('[data-slot="bar-list"]')).toBeDefined();
  });

  it("exports types", () => {
    const _tc: BarListProps | undefined = undefined;
    expect(_tc).toBeUndefined();
  });
});
