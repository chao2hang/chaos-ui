import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SplitPane } from "./split-pane";
import type { SplitPaneProps } from "./split-pane";

describe("split-pane", () => {
  it("exports SplitPane", () => {
    expect(SplitPane).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: SplitPaneProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
  });

  it("renders first and second panes", () => {
    render(
      <SplitPane first={<div>Left</div>} second={<div>Right</div>} />,
    );
    expect(screen.getByText("Left")).toBeDefined();
    expect(screen.getByText("Right")).toBeDefined();
  });

  it("renders the resizer by default", () => {
    const { container } = render(
      <SplitPane first={<div>L</div>} second={<div>R</div>} />,
    );
    expect(
      container.querySelector('[data-slot="split-pane-resizer"]'),
    ).not.toBeNull();
  });

  it("hides the resizer when resizer={false}", () => {
    const { container } = render(
      <SplitPane resizer={false} first={<div>L</div>} second={<div>R</div>} />,
    );
    expect(
      container.querySelector('[data-slot="split-pane-resizer"]'),
    ).toBeNull();
  });

  it("applies horizontal direction data attribute", () => {
    const { container } = render(
      <SplitPane direction="horizontal" first={<div>L</div>} second={<div>R</div>} />,
    );
    expect(
      container
        .querySelector('[data-slot="split-pane"]')
        ?.getAttribute("data-direction"),
    ).toBe("horizontal");
  });

  it("applies vertical direction and flex-col", () => {
    const { container } = render(
      <SplitPane direction="vertical" first={<div>T</div>} second={<div>B</div>} />,
    );
    const root = container.querySelector('[data-slot="split-pane"]');
    expect(root?.getAttribute("data-direction")).toBe("vertical");
    expect(root?.className).toContain("flex-col");
  });

  it("applies default split size to first pane width", () => {
    const { container } = render(
      <SplitPane defaultSize={30} first={<div>L</div>} second={<div>R</div>} />,
    );
    const first = container.querySelector(
      '[data-slot="split-pane-first"]',
    ) as HTMLElement;
    expect(first.style.width).toBe("30%");
    const second = container.querySelector(
      '[data-slot="split-pane-second"]',
    ) as HTMLElement;
    expect(second.style.width).toBe("70%");
  });

  it("clamps resize within min/max bounds", () => {
    const onResize = vi.fn();
    const { container } = render(
      <SplitPane
        defaultSize={50}
        minSize={20}
        maxSize={80}
        onResize={onResize}
        first={<div>L</div>}
        second={<div>R</div>}
      />,
    );
    // jsdom reports offsetWidth=0, so delta/containerSize*100 = Infinity-ish.
    // We instead verify the drag flow runs: mousedown sets dragging state,
    // mousemove calls onResize with a clamped value, mouseup clears dragging.
    const resizer = container.querySelector(
      '[data-slot="split-pane-resizer"]',
    ) as HTMLElement;

    fireEvent.mouseDown(resizer, { clientX: 100, clientY: 100 });
    // dragging -> select-none applied
    expect(
      container.querySelector('[data-slot="split-pane"]')?.className,
    ).toContain("select-none");

    // mousemove with large delta -> clamped to maxSize (80)
    fireEvent.mouseMove(document, { clientX: 9999, clientY: 9999 });
    // onResize called with a value within [min, max]
    expect(onResize).toHaveBeenCalled();
    const last = onResize.mock.calls.at(-1)?.[0] as number;
    expect(last).toBeGreaterThanOrEqual(20);
    expect(last).toBeLessThanOrEqual(80);

    // mouseup clears dragging
    fireEvent.mouseUp(document);
    expect(
      container.querySelector('[data-slot="split-pane"]')?.className,
    ).not.toContain("select-none");
  });

  it("removes document listeners after mouseup", () => {
    const onResize = vi.fn();
    const { container } = render(
      <SplitPane onResize={onResize} first={<div>L</div>} second={<div>R</div>} />,
    );
    const resizer = container.querySelector(
      '[data-slot="split-pane-resizer"]',
    ) as HTMLElement;
    fireEvent.mouseDown(resizer, { clientX: 0 });
    fireEvent.mouseUp(document);
    // After mouseup, further mousemove should NOT call onResize.
    onResize.mockClear();
    fireEvent.mouseMove(document, { clientX: 500 });
    expect(onResize).not.toHaveBeenCalled();
  });

  it("does not attach drag handlers when resizer is disabled", () => {
    const onResize = vi.fn();
    const { container } = render(
      <SplitPane resizer={false} onResize={onResize} first={<div>L</div>} second={<div>R</div>} />,
    );
    // no resizer to click; onResize never invoked
    expect(
      container.querySelector('[data-slot="split-pane-resizer"]'),
    ).toBeNull();
    expect(onResize).not.toHaveBeenCalled();
  });

  it("merges custom className", () => {
    const { container } = render(
      <SplitPane className="my-split" first={<div>L</div>} second={<div>R</div>} />,
    );
    expect(
      container.querySelector('[data-slot="split-pane"]')?.className,
    ).toContain("my-split");
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/split-pane");
    expect(mod.SplitPane).toBeDefined();
  });
});
