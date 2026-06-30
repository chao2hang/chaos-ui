import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("toggle-group", () => {
  it("exports ToggleGroup", () => {
    expect(ToggleGroup).toBeDefined();
  });

  it("exports ToggleGroupItem", () => {
    expect(ToggleGroupItem).toBeDefined();
  });

  it("renders toggle group items with labels", () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("button", { name: "A" })).toBeDefined();
    expect(screen.getByRole("button", { name: "B" })).toBeDefined();
  });

  it("applies variant data attribute from group to items", () => {
    const { container } = render(
      <ToggleGroup variant="outline">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    const group = container.querySelector(
      '[data-slot="toggle-group"]',
    );
    expect(group?.getAttribute("data-variant")).toBe("outline");
    // item inherits variant from context
    const item = container.querySelector(
      '[data-slot="toggle-group-item"]',
    );
    expect(item?.getAttribute("data-variant")).toBe("outline");
  });

  it("applies size data attribute from group to items", () => {
    const { container } = render(
      <ToggleGroup size="sm">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(
      container
        .querySelector('[data-slot="toggle-group"]')
        ?.getAttribute("data-size"),
    ).toBe("sm");
    expect(
      container
        .querySelector('[data-slot="toggle-group-item"]')
        ?.getAttribute("data-size"),
    ).toBe("sm");
  });

  it("applies spacing data attribute", () => {
    const { container } = render(
      <ToggleGroup spacing={0}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(
      container
        .querySelector('[data-slot="toggle-group"]')
        ?.getAttribute("data-spacing"),
    ).toBe("0");
  });

  it("applies vertical orientation data attribute and flex-col", () => {
    const { container } = render(
      <ToggleGroup orientation="vertical">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    const group = container.querySelector(
      '[data-slot="toggle-group"]',
    ) as HTMLElement;
    expect(group.getAttribute("data-orientation")).toBe("vertical");
    expect(group.className).toContain("data-vertical:flex-col");
  });

  it("fires onValueChange when an item is toggled (single-select)", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup onValueChange={onValueChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    fireEvent.click(screen.getByRole("button", { name: "A" }));
    expect(onValueChange).toHaveBeenCalled();
  });

  it("reflects defaultValue pressed state on items", () => {
    const { container } = render(
      <ToggleGroup defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );
    const items = container.querySelectorAll(
      '[data-slot="toggle-group-item"]',
    );
    expect(items[0]?.getAttribute("data-pressed")).toBe("true");
    expect(items[1]?.getAttribute("data-pressed")).toBe("false");
  });

  it("item uses local variant/size when group does not provide them", () => {
    const { container } = render(
      <ToggleGroup>
        <ToggleGroupItem value="a" variant="outline" size="lg">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    const item = container.querySelector(
      '[data-slot="toggle-group-item"]',
    );
    expect(item?.getAttribute("data-variant")).toBe("outline");
    expect(item?.getAttribute("data-size")).toBe("lg");
  });

  it("disabled item does not toggle", () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup onValueChange={onValueChange}>
        <ToggleGroupItem value="a" disabled>
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    const btn = screen.getByRole("button", { name: "A" });
    fireEvent.click(btn);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("merges custom className on ToggleGroup", () => {
    const { container } = render(
      <ToggleGroup className="my-tg">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(
      container.querySelector('[data-slot="toggle-group"]')?.className,
    ).toContain("my-tg");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/toggle-group");
    expect(mod.ToggleGroup).toBeDefined();
    expect(mod.ToggleGroupItem).toBeDefined();
  });
});
