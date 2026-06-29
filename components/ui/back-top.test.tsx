import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BackTop } from "@/components/ui/back-top";
import type { BackTopProps } from "@/components/ui/back-top";

describe("BackTop", () => {
  it("BackTopProps type is importable", () => {
    const _p: BackTopProps = {
      visibilityHeight: 300,
      target: () => window,
    };
    expect(_p.visibilityHeight).toBe(300);
  });

  it("does not render when not scrolled (visible=false)", () => {
    const { container } = render(<BackTop visibilityHeight={400} />);
    // window.scrollY is 0 in jsdom → visible=false → renders null.
    expect(container.querySelector('[data-slot="back-top"]')).toBeNull();
  });

  it("renders when scrolled past visibilityHeight", () => {
    // Simulate scroll position.
    Object.defineProperty(window, "scrollY", { value: 500, writable: true, configurable: true });
    const { container } = render(<BackTop visibilityHeight={400} />);
    // handleScroll runs on mount; visible should become true.
    expect(container.querySelector('[data-slot="back-top"]')).not.toBeNull();
    // reset
    Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/back-top");
    expect(mod.BackTop).toBeDefined();
  });
});
