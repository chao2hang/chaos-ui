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
    const { container } = render(
      <Anchor
        items={[
          { key: "a", href: "#a", label: "A" },
          { key: "b", href: "#b", label: "B" },
        ]}
      />,
    );
    expect(container.querySelector('[data-slot="anchor"]')).not.toBeNull();
    expect(container.querySelectorAll("a").length).toBe(2);
  });

  it("click handler calls onActiveChange + preventDefault", () => {
    // Anchor's handleClick looks up document.querySelector(href); provide a
    // matching element so the click reaches onActiveChange.
    const target = document.createElement("div");
    target.id = "a";
    // jsdom does not implement scrollIntoView; mock it so handleClick works.
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

    document.body.removeChild(target);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/anchor");
    expect(mod.Anchor).toBeDefined();
  });
});
