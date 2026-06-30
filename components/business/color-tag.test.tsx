import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ColorTag, colorConfig } from "./color-tag";
import type { ColorTagProps, ColorTagColor } from "./color-tag";

describe("ColorTag", () => {
  it("exports ColorTag", () => {
    expect(ColorTag).toBeDefined();
  });

  it("exports colorConfig", () => {
    expect(colorConfig).toBeDefined();
    expect(colorConfig.success).toBeDefined();
    expect(colorConfig.processing).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: ColorTagProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: ColorTagColor | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("renders its children text", () => {
    render(<ColorTag color="success">Active</ColorTag>);
    expect(screen.getByText("Active")).toBeDefined();
  });

  it("renders a dot indicator when dot is true", () => {
    const { container } = render(
      <ColorTag color="info" dot>
        Info
      </ColorTag>,
    );
    expect(screen.getByText("Info")).toBeDefined();
    // The dot is an aria-hidden span inside the tag.
    const dot = container.querySelector('span[aria-hidden="true"]');
    expect(dot).not.toBeNull();
  });

  it("does not render a dot when dot is false (default)", () => {
    const { container } = render(<ColorTag color="default">Plain</ColorTag>);
    expect(container.querySelector('span[aria-hidden="true"]')).toBeNull();
  });

  it("applies size classes for each size variant", () => {
    for (const size of ["sm", "md", "lg"] as const) {
      const { unmount } = render(
        <ColorTag color="primary" size={size}>
          S
        </ColorTag>,
      );
      const node = screen.getByText("S");
      // Each size config sets a distinct gap/padding class set.
      expect(node.className.length).toBeGreaterThan(0);
      unmount();
    }
  });

  it("renders every supported color key", () => {
    const colors: ColorTagColor[] = [
      "default",
      "primary",
      "success",
      "warning",
      "error",
      "info",
      "muted",
      "blue",
      "red",
      "orange",
      "gold",
      "cyan",
      "green",
      "processing",
    ];
    for (const color of colors) {
      const { unmount } = render(<ColorTag color={color}>{color}</ColorTag>);
      expect(screen.getByText(color)).toBeDefined();
      unmount();
    }
  });

  it("merges a custom colorConfig override", () => {
    render(
      <ColorTag
        color="custom"
        colorConfig={{
          custom: {
            bg: "bg-custom-bg",
            text: "text-custom-text",
            border: "border-custom-border",
          },
        }}
      >
        Custom
      </ColorTag>,
    );
    const node = screen.getByText("Custom");
    expect(node.className).toContain("bg-custom-bg");
    expect(node.className).toContain("text-custom-text");
    expect(node.className).toContain("border-custom-border");
  });

  it("accepts arbitrary string colors via the (string & {}) escape hatch", () => {
    // An unknown color falls back to the default config.
    render(
      <ColorTag color="unknown-color" colorConfig={{}}>
        Fallback
      </ColorTag>,
    );
    expect(screen.getByText("Fallback")).toBeDefined();
  });

  it("applies a custom className", () => {
    render(<ColorTag color="warning" className="my-cls">
      W
    </ColorTag>);
    expect(screen.getByText("W").className).toContain("my-cls");
  });
});
