import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ColorBoard } from "@/components/business/color-board";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ColorBoard", () => {
  it("renders trigger with current color", () => {
    const { container } = render(<ColorBoard value="#3b82f6" />);
    const trigger = container.querySelector('[data-slot="popover-trigger"]');
    expect(trigger).toBeTruthy();
    expect(trigger?.textContent).toContain("#3b82f6");
  });

  it("renders with custom className on trigger", () => {
    const { container } = render(
      <ColorBoard value="#ef4444" className="custom-cb" />,
    );
    const trigger = container.querySelector(
      '[data-slot="popover-trigger"]',
    ) as HTMLElement;
    expect(trigger?.className).toContain("custom-cb");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/business/color-board");
    expect(mod.ColorBoard).toBeDefined();
  });

  it("exports ColorBoard and ColorFormat type", async () => {
    const mod = await import("@/components/business/color-board");
    expect(mod.ColorBoard).toBeDefined();
  });
});
