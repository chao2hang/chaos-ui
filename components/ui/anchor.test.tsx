import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Anchor } from "@/components/ui/anchor";
import type { AnchorProps, AnchorItem } from "@/components/ui/anchor";

describe("Anchor", () => {
  it("AnchorProps/Item types are importable", () => {
    const _p: AnchorProps = {
      items: [{ key: "a", href: "#a", label: "A" }],
      onActiveChange: () => {},
    };
    const _i: AnchorItem = { key: "a", href: "#a", label: "A", level: 2 };
    expect(_p.items.length).toBe(1);
    expect(_i.level).toBe(2);
  });

  it("renders nav with anchor links", () => {
    const { container, getByText } = render(
      <Anchor
        items={[
          { key: "a", href: "#a", label: "Alpha" },
          { key: "b", href: "#b", label: "Beta" },
        ]}
      />,
    );
    expect(container.querySelector('[data-slot="anchor"]')).not.toBeNull();
    expect(container.querySelectorAll("a").length).toBe(2);
    expect(getByText("Alpha")).toBeDefined();
  });

  it("renders level 2/3 indented classes", () => {
    const { container } = render(
      <Anchor
        items={[
          { key: "a", href: "#a", label: "A", level: 2 },
          { key: "b", href: "#b", label: "B", level: 3 },
        ]}
      />,
    );
    const links = container.querySelectorAll("a");
    expect(links[0]?.className).toContain("pl-6");
    expect(links[1]?.className).toContain("pl-9");
  });

  it("uses controlled activeKey to style the active link", () => {
    const { container } = render(
      <Anchor
        activeKey="b"
        items={[
          { key: "a", href: "#a", label: "A" },
          { key: "b", href: "#b", label: "B" },
        ]}
      />,
    );
    const links = container.querySelectorAll("a");
    expect(links[0]?.className).toContain("text-muted-foreground");
    expect(links[1]?.className).toContain("bg-muted");
  });

  it("defaults activeKey to first item", () => {
    const { container } = render(
      <Anchor
        items={[
          { key: "a", href: "#a", label: "A" },
          { key: "b", href: "#b", label: "B" },
        ]}
      />,
    );
    const links = container.querySelectorAll("a");
    expect(links[0]?.className).toContain("bg-muted");
  });

  it("click handler calls onActiveChange + preventDefault", () => {
    const target = document.createElement("div");
    target.id = "a";
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    const onActiveChange = vi.fn();
    const { container } = render(
      <Anchor
        items={[{ key: "a", href: "#a", label: "A" }]}
        onActiveChange={onActiveChange}
      />,
    );
    const link = container.querySelector("a") as HTMLAnchorElement;
    fireEvent.click(link);
    expect(onActiveChange).toHaveBeenCalledWith("a");
    expect(target.scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(target);
  });

  it("does not scroll/call onActiveChange when target element is missing", () => {
    const onActiveChange = vi.fn();
    const { container } = render(
      <Anchor
        items={[{ key: "x", href: "#missing", label: "X" }]}
        onActiveChange={onActiveChange}
      />,
    );
    const link = container.querySelector("a") as HTMLAnchorElement;
    fireEvent.click(link);
    // No matching element → el is null → onActiveChange not called.
    expect(onActiveChange).not.toHaveBeenCalled();
  });

  it("uses getContainer for scroll listening", () => {
    const fakeContainer = document.createElement("div");
    const addSpy = vi.spyOn(fakeContainer, "addEventListener");
    render(
      <Anchor
        getContainer={() => fakeContainer}
        items={[{ key: "a", href: "#a", label: "A" }]}
      />,
    );
    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), {
      passive: true,
    });
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/anchor");
    expect(mod.Anchor).toBeDefined();
  });
});
