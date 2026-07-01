import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Divider } from "@/components/ui/divider";
import type { DividerProps } from "@/components/ui/divider";

describe("Divider", () => {
  it("renders a horizontal divider by default", () => {
    const { container } = render(<Divider />);
    const el = container.querySelector('[data-slot="divider"]');
    expect(el).not.toBeNull();
    expect(el?.getAttribute("data-type")).toBe("horizontal");
    expect(el?.getAttribute("role")).toBe("separator");
    expect(el?.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("renders a vertical divider", () => {
    const { container } = render(<Divider type="vertical" />);
    const el = container.querySelector('[data-slot="divider"]');
    expect(el).not.toBeNull();
    expect(el?.getAttribute("data-type")).toBe("vertical");
    expect(el?.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("renders with text children (center orientation by default)", () => {
    const { container, getByText } = render(<Divider>Section</Divider>);
    expect(getByText("Section")).toBeDefined();
    const el = container.querySelector('[data-slot="divider"]');
    expect(el?.getAttribute("data-type")).toBe("horizontal");
  });

  it("renders with left orientation text", () => {
    const { container } = render(<Divider orientation="left">Left</Divider>);
    expect(container.querySelector('[data-slot="divider"]')).not.toBeNull();
    expect(container.textContent).toContain("Left");
  });

  it("renders with right orientation text", () => {
    const { container } = render(<Divider orientation="right">Right</Divider>);
    expect(container.querySelector('[data-slot="divider"]')).not.toBeNull();
    expect(container.textContent).toContain("Right");
  });

  it("applies dashed style on horizontal divider without text", () => {
    const { container } = render(<Divider dashed />);
    const el = container.querySelector('[data-slot="divider"]');
    expect(el?.className).toContain("border-dashed");
  });

  it("applies dashed style on vertical divider", () => {
    const { container } = render(<Divider type="vertical" dashed />);
    const el = container.querySelector('[data-slot="divider"]');
    expect(el?.className).toContain("border-dashed");
  });

  it("applies dashed style on horizontal divider with text", () => {
    const { container } = render(<Divider dashed>Dashed</Divider>);
    const lines = container.querySelectorAll(".border-dashed");
    expect(lines.length).toBeGreaterThan(0);
  });

  it("applies plain style on text divider", () => {
    const { container } = render(<Divider plain>Plain</Divider>);
    const span = container.querySelector("span");
    expect(span?.className).toContain("text-muted-foreground");
  });

  it("merges custom className", () => {
    const { container } = render(<Divider className="my-divider" />);
    const el = container.querySelector('[data-slot="divider"]');
    expect(el?.className).toContain("my-divider");
  });

  it("merges custom className on vertical divider", () => {
    const { container } = render(
      <Divider type="vertical" className="my-vert" />,
    );
    const el = container.querySelector('[data-slot="divider"]');
    expect(el?.className).toContain("my-vert");
  });

  it("spreads extra HTML div props", () => {
    const { container } = render(<Divider data-testid="hr" />);
    const el = container.querySelector('[data-testid="hr"]');
    expect(el).not.toBeNull();
  });

  it("DividerProps type is importable", () => {
    const _props: DividerProps = {
      type: "vertical",
      dashed: true,
      orientation: "left",
      plain: true,
    };
    expect(_props.type).toBe("vertical");
    expect(_props.dashed).toBe(true);
  });

  it("renders horizontal divider with center orientation and both lines", () => {
    const { container } = render(
      <Divider orientation="center">Center</Divider>,
    );
    const lines = container.querySelectorAll('[data-slot="divider"] > div');
    // Center orientation should render two dividers (left and right of text)
    expect(lines.length).toBe(2);
  });

  it("renders horizontal divider with left orientation and one left line", () => {
    const { container } = render(<Divider orientation="left">Left</Divider>);
    const lines = container.querySelectorAll('[data-slot="divider"] > div');
    // Left orientation: left line is short, right line stretches
    expect(lines.length).toBe(2);
  });
});
