import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
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
    expect(container.querySelectorAll('[data-slot="resizable-panel"]').length).toBe(2);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/resizable");
    expect(mod.ResizablePanelGroup).toBeDefined();
  });
});
