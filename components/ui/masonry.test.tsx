import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Masonry } from "./masonry";

describe("Masonry", () => {
  it("exports Masonry", () => {
    expect(Masonry).toBeDefined();
  });

  it("renders children", () => {
    render(
      <Masonry>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Masonry>,
    );
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 2")).toBeDefined();
    expect(screen.getByText("Item 3")).toBeDefined();
  });

  it("applies columnCount style", () => {
    const { container } = render(
      <Masonry columns={3}>
        <div>Item</div>
      </Masonry>,
    );
    const el = container.querySelector('[data-slot="masonry"]') as HTMLElement;
    expect(el.style.columnCount).toBe("3");
  });

  it("applies columnGap style", () => {
    const { container } = render(
      <Masonry columns={2} gap={24}>
        <div>Item</div>
      </Masonry>,
    );
    const el = container.querySelector('[data-slot="masonry"]') as HTMLElement;
    expect(el.style.columnGap).toBe("24px");
  });

  it("wraps each child in break-inside-avoid div", () => {
    const { container } = render(
      <Masonry>
        <div>Item 1</div>
      </Masonry>,
    );
    const wrapper = container.querySelector(".break-inside-avoid");
    expect(wrapper).not.toBeNull();
    expect(wrapper?.querySelector("div")?.textContent).toBe("Item 1");
  });

  it("renders with custom className", () => {
    const { container } = render(
      <Masonry className="custom-class">
        <div>Item</div>
      </Masonry>,
    );
    expect(container.querySelector(".custom-class")).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("./masonry");
    expect(mod.Masonry).toBeDefined();
  });
});
