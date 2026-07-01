import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuPortal,
} from "@/components/ui/context-menu";

describe("ContextMenu", () => {
  it("exports all sub-components", () => {
    expect(ContextMenu).toBeDefined();
    expect(ContextMenuTrigger).toBeDefined();
    expect(ContextMenuContent).toBeDefined();
    expect(ContextMenuGroup).toBeDefined();
    expect(ContextMenuItem).toBeDefined();
    expect(ContextMenuLabel).toBeDefined();
    expect(ContextMenuSeparator).toBeDefined();
    expect(ContextMenuSub).toBeDefined();
    expect(ContextMenuSubTrigger).toBeDefined();
    expect(ContextMenuSubContent).toBeDefined();
    expect(ContextMenuCheckboxItem).toBeDefined();
    expect(ContextMenuRadioGroup).toBeDefined();
    expect(ContextMenuRadioItem).toBeDefined();
    expect(ContextMenuPortal).toBeDefined();
  });

  it("renders the trigger area", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger
          render={<div data-testid="trigger-area">Right-click me</div>}
        />
      </ContextMenu>,
    );
    expect(screen.getByTestId("trigger-area")).toBeDefined();
    expect(screen.getByText("Right-click me")).toBeDefined();
  });

  it("renders content with items when open (controlled)", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>Trigger</div>} />
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel inset>Actions</ContextMenuLabel>
            <ContextMenuItem inset>Copy</ContextMenuItem>
            <ContextMenuItem inset variant="destructive">
              Delete
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Share</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Copy")).toBeDefined();
    });
    expect(screen.getByText("Delete")).toBeDefined();
    expect(screen.getByText("Share")).toBeDefined();
    expect(screen.getByText("Actions")).toBeDefined();
  });

  it("renders ContextMenuItem with data-variant=destructive", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Delete")).toBeDefined();
    });
    const item = screen
      .getByText("Delete")
      .closest('[data-slot="context-menu-item"]');
    expect(item?.getAttribute("data-variant")).toBe("destructive");
  });

  it("renders ContextMenuLabel with data-inset", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel inset>Group Label</ContextMenuLabel>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Group Label")).toBeDefined();
    });
    const label = screen
      .getByText("Group Label")
      .closest('[data-slot="context-menu-label"]');
    expect(label?.getAttribute("data-inset")).toBe("true");
  });

  it("renders ContextMenuItem with data-inset", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuItem inset>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Item")).toBeDefined();
    });
    const item = screen
      .getByText("Item")
      .closest('[data-slot="context-menu-item"]');
    expect(item?.getAttribute("data-inset")).toBe("true");
  });

  it("renders submenu items when open (controlled)", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Options</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub Item 1</ContextMenuItem>
              <ContextMenuItem>Sub Item 2</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("More Options")).toBeDefined();
    });
  });

  it("renders checkbox items when open (controlled)", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>Enabled</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Enabled")).toBeDefined();
    });
    const item = screen
      .getByText("Enabled")
      .closest('[data-slot="context-menu-checkbox-item"]');
    expect(item).not.toBeNull();
  });

  it("renders radio group with radio items when open (controlled)", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuRadioGroup>
            <ContextMenuRadioItem value="a">Option A</ContextMenuRadioItem>
            <ContextMenuRadioItem value="b">Option B</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Option A")).toBeDefined();
    });
    expect(screen.getByText("Option B")).toBeDefined();
  });

  it("renders separator when open (controlled)", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Item 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeDefined();
    });
    const separator = document.querySelector(
      '[data-slot="context-menu-separator"]',
    );
    expect(separator).not.toBeNull();
  });

  it("ContextMenuContent merges custom className", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent className="custom-menu">Item</ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Item")).toBeDefined();
    });
    const content = document.querySelector(
      '[data-slot="context-menu-content"]',
    );
    expect(content?.className).toContain("custom-menu");
  });

  it("ContextMenuLabel merges custom className", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel className="custom-label">Label</ContextMenuLabel>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Label")).toBeDefined();
    });
    const label = screen
      .getByText("Label")
      .closest('[data-slot="context-menu-label"]');
    expect(label?.className).toContain("custom-label");
  });

  it("ContextMenuItem merges custom className", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuItem className="custom-item">Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      expect(screen.getByText("Item")).toBeDefined();
    });
    const item = screen
      .getByText("Item")
      .closest('[data-slot="context-menu-item"]');
    expect(item?.className).toContain("custom-item");
  });

  it("ContextMenuSeparator merges custom className", async () => {
    render(
      <ContextMenu open>
        <ContextMenuTrigger render={<div>T</div>} />
        <ContextMenuContent>
          <ContextMenuSeparator className="custom-sep" />
        </ContextMenuContent>
      </ContextMenu>,
    );
    await waitFor(() => {
      const separator = document.querySelector(
        '[data-slot="context-menu-separator"]',
      );
      expect(separator).not.toBeNull();
      expect(separator?.className).toContain("custom-sep");
    });
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/context-menu");
    expect(mod.ContextMenu).toBeDefined();
    expect(mod.ContextMenuContent).toBeDefined();
    expect(mod.ContextMenuItem).toBeDefined();
    expect(mod.ContextMenuLabel).toBeDefined();
    expect(mod.ContextMenuSeparator).toBeDefined();
    expect(mod.ContextMenuGroup).toBeDefined();
    expect(mod.ContextMenuTrigger).toBeDefined();
    expect(mod.ContextMenuPortal).toBeDefined();
    expect(mod.ContextMenuSub).toBeDefined();
    expect(mod.ContextMenuSubTrigger).toBeDefined();
    expect(mod.ContextMenuSubContent).toBeDefined();
    expect(mod.ContextMenuCheckboxItem).toBeDefined();
    expect(mod.ContextMenuRadioGroup).toBeDefined();
    expect(mod.ContextMenuRadioItem).toBeDefined();
  });
});
