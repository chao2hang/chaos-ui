import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Space } from "./space";
import type { SpaceProps } from "./space";

describe("space", () => {
  it("exports Space", () => {
    expect(Space).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SpaceProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders children horizontally by default", () => {
    render(
      <Space>
        <span>A</span>
        <span>B</span>
      </Space>,
    );
    const space = screen.getByText("A").parentElement;
    expect(space?.getAttribute("data-slot")).toBe("space");
    expect(space?.className).toContain("flex-row");
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });

  it("renders vertical direction", () => {
    render(
      <Space direction="vertical">
        <span>X</span>
      </Space>,
    );
    const space = screen.getByText("X").parentElement;
    expect(space?.className).toContain("flex-col");
  });

  it("applies size presets as gap class", () => {
    render(
      <Space size="lg">
        <span>L</span>
      </Space>,
    );
    expect(screen.getByText("L").parentElement?.className).toContain("gap-6");
  });

  it("applies numeric size as inline gap style", () => {
    render(
      <Space size={12}>
        <span>N</span>
      </Space>,
    );
    const space = screen.getByText("N").parentElement;
    expect(space?.style.gap).toBe("12px");
  });

  it("applies align class", () => {
    render(
      <Space align="center">
        <span>C</span>
      </Space>,
    );
    expect(screen.getByText("C").parentElement?.className).toContain(
      "items-center",
    );
  });

  it("applies wrap class when wrap is true", () => {
    render(
      <Space wrap>
        <span>W</span>
      </Space>,
    );
    expect(screen.getByText("W").parentElement?.className).toContain(
      "flex-wrap",
    );
  });

  it("merges custom className", () => {
    render(
      <Space className="custom-space">
        <span>CC</span>
      </Space>,
    );
    expect(screen.getByText("CC").parentElement?.className).toContain(
      "custom-space",
    );
  });
});
