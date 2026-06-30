import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackTop } from "@/components/ui/back-top";
import type { BackTopProps } from "@/components/ui/back-top";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    value,
    writable: true,
    configurable: true,
  });
}

afterEach(() => {
  setScrollY(0);
});

describe("BackTop", () => {
  it("BackTopProps type is importable", () => {
    const _p: BackTopProps = {
      visibilityHeight: 300,
      target: () => window,
    };
    expect(_p.visibilityHeight).toBe(300);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/back-top");
    expect(mod.BackTop).toBeDefined();
  });

  it("does not render when not scrolled (visible=false)", () => {
    setScrollY(0);
    const { container } = render(<BackTop visibilityHeight={400} />);
    expect(container.querySelector('[data-slot="back-top"]')).toBeNull();
  });

  it("renders when scrolled past visibilityHeight", () => {
    setScrollY(500);
    const { container } = render(<BackTop visibilityHeight={400} />);
    expect(container.querySelector('[data-slot="back-top"]')).not.toBeNull();
    // default-positioned button exists with aria-label
    expect(container.querySelector('button[aria-label="Back to top"]')).not.toBeNull();
  });

  it("does not render when scrolled but below threshold", () => {
    setScrollY(100);
    const { container } = render(<BackTop visibilityHeight={400} />);
    expect(container.querySelector('[data-slot="back-top"]')).toBeNull();
  });

  it("renders custom children when provided", () => {
    setScrollY(500);
    const { getByText, container } = render(
      <BackTop visibilityHeight={400}>
        <button type="button">Top</button>
      </BackTop>,
    );
    expect(getByText("Top")).toBeDefined();
    expect(container.querySelector('button[aria-label="Back to top"]')).toBeNull();
  });

  it("applies position style (right/bottom)", () => {
    setScrollY(500);
    const { container } = render(
      <BackTop visibilityHeight={400} position={{ right: 10, bottom: 20 }} />,
    );
    const root = container.querySelector('[data-slot="back-top"]') as HTMLElement;
    expect(root.style.right).toBe("10px");
    expect(root.style.bottom).toBe("20px");
  });

  it("uses default position when none provided", () => {
    setScrollY(500);
    const { container } = render(<BackTop visibilityHeight={400} />);
    const root = container.querySelector('[data-slot="back-top"]') as HTMLElement;
    expect(root.style.right).toBe("24px");
    expect(root.style.bottom).toBe("48px");
  });

  it("applies custom className to the root", () => {
    setScrollY(500);
    const { container } = render(
      <BackTop visibilityHeight={400} className="my-back-top" />,
    );
    const root = container.querySelector('[data-slot="back-top"]') as HTMLElement;
    expect(root.className).toContain("my-back-top");
  });

  it("calls onClick and schedules a scroll-to-top animation when clicked", async () => {
    setScrollY(500);
    const user = userEvent.setup();
    // Make requestAnimationFrame a no-op so BackTop's smooth-scroll animation
    // does not loop synchronously (a sync rAF callback floods window.scrollTo
    // because performance.now() never advances, starving the click dispatch).
    const rafSpy = vi.fn(() => 0);
    const origRAF = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = rafSpy;

    const onClick = vi.fn();
    render(<BackTop visibilityHeight={400} onClick={onClick} duration={100} />);
    const btn = screen.getByRole("button", { name: "Back to top" });
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    // The window-target branch schedules an animation frame to scroll to top.
    expect(rafSpy).toHaveBeenCalled();

    globalThis.requestAnimationFrame = origRAF;
  });

  it("uses HTMLElement target and calls scrollTo on it", async () => {
    setScrollY(0);
    const user = userEvent.setup();
    const targetEl = document.createElement("div");
    // jsdom <div> does not implement scrollTo — install a spy.
    const scrollToSpy = vi.fn();
    targetEl.scrollTo = scrollToSpy as unknown as typeof targetEl.scrollTo;
    Object.defineProperty(targetEl, "scrollTop", {
      value: 500,
      configurable: true,
    });
    const onClick = vi.fn();

    const { container } = render(
      <BackTop visibilityHeight={400} target={() => targetEl} onClick={onClick} />,
    );
    expect(container.querySelector('[data-slot="back-top"]')).not.toBeNull();
    const btn = screen.getByRole("button", { name: "Back to top" });
    await user.click(btn);
    expect(onClick).toHaveBeenCalled();
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("HTMLElement target not visible when scrollTop below threshold", () => {
    const targetEl = document.createElement("div");
    Object.defineProperty(targetEl, "scrollTop", {
      value: 100,
      configurable: true,
    });
    const { container } = render(
      <BackTop visibilityHeight={400} target={() => targetEl} />,
    );
    expect(container.querySelector('[data-slot="back-top"]')).toBeNull();
  });

  it("hides again when scrolled back below threshold", () => {
    setScrollY(500);
    const { container } = render(<BackTop visibilityHeight={400} />);
    expect(container.querySelector('[data-slot="back-top"]')).not.toBeNull();
    setScrollY(100);
    fireEvent.scroll(window);
    expect(container.querySelector('[data-slot="back-top"]')).toBeNull();
  });
});
