import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Kbd, KbdGroup } from "@chaos_team/chaos-ui/ui";

describe("Kbd", () => {
  it("renders a kbd element with the kbd slot", () => {
    const { container } = render(<Kbd>K</Kbd>);
    const el = container.querySelector('[data-slot="kbd"]');
    expect(el).toBeTruthy();
    expect(el?.tagName).toBe("KBD");
    expect(el?.textContent).toBe("K");
  });

  it("applies the requested size", () => {
    const { container } = render(<Kbd size="lg">X</Kbd>);
    const el = container.querySelector('[data-slot="kbd"]') as HTMLElement;
    expect(el.className).toContain("h-7");
  });

  it("renders KbdGroup as a row with the kbd-group slot", () => {
    const { container } = render(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    const group = container.querySelector('[data-slot="kbd-group"]');
    expect(group).toBeTruthy();
    expect(group?.tagName).toBe("DIV");
    expect(group?.className).toContain("inline-flex");
    expect(group?.querySelectorAll('[data-slot="kbd"]')).toHaveLength(2);
  });

  it("merges custom className into Kbd and KbdGroup", () => {
    const { container } = render(
      <KbdGroup className="my-group">
        <Kbd className="my-kbd">A</Kbd>
      </KbdGroup>,
    );
    const group = container.querySelector(
      '[data-slot="kbd-group"]',
    ) as HTMLElement;
    const kbd = container.querySelector('[data-slot="kbd"]') as HTMLElement;
    expect(group.className).toContain("my-group");
    expect(kbd.className).toContain("my-kbd");
  });
});
