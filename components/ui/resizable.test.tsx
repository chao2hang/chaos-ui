import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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

  it("module is importable", async () => {
    const mod = await import("@/components/ui/resizable");
    expect(mod.ResizablePanelGroup).toBeDefined();
    expect(mod.ResizableHandle).toBeDefined();
  });
});
