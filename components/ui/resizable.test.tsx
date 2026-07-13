import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

function mockGroupRect(group: HTMLElement, width = 400, height = 300) {
  vi.spyOn(group, "getBoundingClientRect").mockReturnValue({
    width,
    height,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });
}

function panelFlexGrow(panel: Element) {
  return (panel as HTMLElement).style.flexGrow;
}

describe("Resizable", () => {
  it("renders panels with different defaultSize", () => {
    const { container } = render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={30} />
        <ResizablePanel defaultSize={70} />
      </ResizablePanelGroup>,
    );
    expect(
      container.querySelector('[data-slot="resizable-panel-group"]'),
    ).not.toBeNull();
  });

  it("registers both panels even with the same defaultSize", () => {
    // Previously registerPanel deduped by size, so two panels with the same
    // defaultSize would lose one. Now dedupes by id (useId).
    const { container } = render(
      <ResizablePanelGroup>
        <ResizablePanel defaultSize={50} />
        <ResizablePanel defaultSize={50} />
      </ResizablePanelGroup>,
    );
    // Both panels render (not deduped away).
    expect(
      container.querySelectorAll('[data-slot="resizable-panel"]').length,
    ).toBe(2);
  });

  it("renders handle between panels without error", () => {
    // Handle placed as a sibling between panels (not inside a panel).
    // This is the standard pattern used in docs stories.
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>Panel A</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div>Panel B</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(
      container.querySelector('[data-slot="resizable-handle"]'),
    ).not.toBeNull();
  });

  it("renders handle inside panel without error", () => {
    // Handle placed inside a panel (alternative pattern used in Storybook stories).
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>
          <div>Panel A</div>
          <ResizableHandle withHandle />
        </ResizablePanel>
        <ResizablePanel defaultSize={50}>
          <div>Panel B</div>
        </ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(
      container.querySelector('[data-slot="resizable-handle"]'),
    ).not.toBeNull();
  });

  it("applies flex weights from defaultSize instead of absolute width %", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>Two</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const panels = container.querySelectorAll('[data-slot="resizable-panel"]');
    expect(panelFlexGrow(panels[0]!)).toBe("40");
    expect(panelFlexGrow(panels[1]!)).toBe("60");
    expect((panels[0] as HTMLElement).style.width).toBe("");
  });

  it("rebalances both panels when dragging a handle between them", () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={10} onResize={onPrimary}>
          A
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70} minSize={10} onResize={onSecondary}>
          B
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    const group = container.querySelector(
      '[data-slot="resizable-panel-group"]',
    ) as HTMLElement;
    const handle = container.querySelector(
      '[data-slot="resizable-handle"]',
    ) as HTMLElement;
    mockGroupRect(group, 400, 200);

    // clear mount onResize calls
    onPrimary.mockClear();
    onSecondary.mockClear();

    fireEvent.pointerDown(handle, { clientX: 120, clientY: 10, pointerId: 1 });
    // +40px on 400px group => +10%
    fireEvent.pointerMove(document, {
      clientX: 160,
      clientY: 10,
      pointerId: 1,
    });
    fireEvent.pointerUp(document, { clientX: 160, clientY: 10, pointerId: 1 });

    const panels = container.querySelectorAll('[data-slot="resizable-panel"]');
    expect(panelFlexGrow(panels[0]!)).toBe("40");
    expect(panelFlexGrow(panels[1]!)).toBe("60");
    expect(onPrimary).toHaveBeenCalledWith(40);
    expect(onSecondary).toHaveBeenCalledWith(60);
  });

  it("rebalances when the handle is inside the primary panel", () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={35} minSize={10} onResize={onPrimary}>
          Nav
          <ResizableHandle withHandle />
        </ResizablePanel>
        <ResizablePanel defaultSize={65} minSize={10} onResize={onSecondary}>
          Content
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    const group = container.querySelector(
      '[data-slot="resizable-panel-group"]',
    ) as HTMLElement;
    const handle = container.querySelector(
      '[data-slot="resizable-handle"]',
    ) as HTMLElement;
    mockGroupRect(group, 200, 100);

    onPrimary.mockClear();
    onSecondary.mockClear();

    fireEvent.pointerDown(handle, { clientX: 70, clientY: 10, pointerId: 1 });
    // +20px on 200px => +10%
    fireEvent.pointerMove(document, { clientX: 90, clientY: 10, pointerId: 1 });
    fireEvent.pointerUp(document, { clientX: 90, clientY: 10, pointerId: 1 });

    const panels = container.querySelectorAll('[data-slot="resizable-panel"]');
    expect(panelFlexGrow(panels[0]!)).toBe("45");
    expect(panelFlexGrow(panels[1]!)).toBe("55");
  });

  it("respects the secondary panel minSize while dragging", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40} minSize={10} maxSize={90}>
          A
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60} minSize={40} maxSize={90}>
          B
        </ResizablePanel>
      </ResizablePanelGroup>,
    );

    const group = container.querySelector(
      '[data-slot="resizable-panel-group"]',
    ) as HTMLElement;
    const handle = container.querySelector(
      '[data-slot="resizable-handle"]',
    ) as HTMLElement;
    mockGroupRect(group, 100, 100);

    // try to grow primary by +50% (would push secondary to 10, below min 40)
    fireEvent.pointerDown(handle, { clientX: 40, clientY: 10, pointerId: 1 });
    fireEvent.pointerMove(document, { clientX: 90, clientY: 10, pointerId: 1 });
    fireEvent.pointerUp(document, { clientX: 90, clientY: 10, pointerId: 1 });

    const panels = container.querySelectorAll('[data-slot="resizable-panel"]');
    // pair total 100; secondary min 40 => primary max 60
    expect(Number(panelFlexGrow(panels[0]!))).toBeLessThanOrEqual(60);
    expect(Number(panelFlexGrow(panels[1]!))).toBeGreaterThanOrEqual(40);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/resizable");
    expect(mod.ResizablePanelGroup).toBeDefined();
    expect(mod.ResizableHandle).toBeDefined();
  });
});
