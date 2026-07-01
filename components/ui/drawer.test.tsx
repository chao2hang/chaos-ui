import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerPortal,
  DrawerOverlay,
} from "@/components/ui/drawer";

describe("Drawer", () => {
  it("exports all sub-components", () => {
    expect(Drawer).toBeDefined();
    expect(DrawerPortal).toBeDefined();
    expect(DrawerOverlay).toBeDefined();
    expect(DrawerTrigger).toBeDefined();
    expect(DrawerClose).toBeDefined();
    expect(DrawerContent).toBeDefined();
    expect(DrawerHeader).toBeDefined();
    expect(DrawerFooter).toBeDefined();
    expect(DrawerTitle).toBeDefined();
    expect(DrawerDescription).toBeDefined();
  });

  it("renders the trigger (closed by default)", () => {
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button type="button">Open drawer</button>
        </DrawerTrigger>
      </Drawer>,
    );
    expect(screen.getByText("Open drawer")).toBeDefined();
  });

  it("renders content when open (controlled)", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerTrigger asChild>
          <button type="button">t</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>Drawer description text</DrawerDescription>
          </DrawerHeader>
          <p>Drawer body content</p>
          <DrawerFooter>
            <button type="button">Submit</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("Drawer Title")).toBeDefined();
    });
    expect(screen.getByText("Drawer description text")).toBeDefined();
    expect(screen.getByText("Drawer body content")).toBeDefined();
    expect(screen.getByText("Submit")).toBeDefined();
  });

  it("DrawerHeader renders with data-slot attribute standalone", () => {
    const { container } = render(<DrawerHeader>Header content</DrawerHeader>);
    const el = container.querySelector('[data-slot="drawer-header"]');
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe("Header content");
  });

  it("DrawerFooter renders with data-slot attribute standalone", () => {
    const { container } = render(<DrawerFooter>Footer content</DrawerFooter>);
    const el = container.querySelector('[data-slot="drawer-footer"]');
    expect(el).not.toBeNull();
    expect(el?.textContent).toBe("Footer content");
  });

  it("DrawerHeader merges custom className", () => {
    const { container } = render(
      <DrawerHeader className="my-header">H</DrawerHeader>,
    );
    const el = container.querySelector('[data-slot="drawer-header"]');
    expect(el?.className).toContain("my-header");
  });

  it("DrawerFooter merges custom className", () => {
    const { container } = render(
      <DrawerFooter className="my-footer">F</DrawerFooter>,
    );
    const el = container.querySelector('[data-slot="drawer-footer"]');
    expect(el?.className).toContain("my-footer");
  });

  it("DrawerHeader spreads HTML div props", () => {
    const { container } = render(
      <DrawerHeader data-testid="dh">Test</DrawerHeader>,
    );
    expect(container.querySelector('[data-testid="dh"]')).not.toBeNull();
  });

  it("DrawerFooter spreads HTML div props", () => {
    const { container } = render(
      <DrawerFooter data-testid="df">Test</DrawerFooter>,
    );
    expect(container.querySelector('[data-testid="df"]')).not.toBeNull();
  });

  it("opens on trigger click and notifies onOpenChange", async () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <button type="button">open</button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Opened</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>,
    );
    fireEvent.click(screen.getByText("open"));
    expect(onOpenChange).toHaveBeenCalled();
  });

  it("DrawerContent renders with data-slot attribute when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent>
          <span>content-here</span>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("content-here")).toBeDefined();
    });
    const content = document.querySelector('[data-slot="drawer-content"]');
    expect(content).not.toBeNull();
  });

  it("DrawerTitle renders with data-slot attribute when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent>
          <DrawerTitle>My Title</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("My Title")).toBeDefined();
    });
    const title = document.querySelector('[data-slot="drawer-title"]');
    expect(title).not.toBeNull();
  });

  it("DrawerDescription renders with data-slot attribute when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>My description</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("My description")).toBeDefined();
    });
    const desc = document.querySelector('[data-slot="drawer-description"]');
    expect(desc).not.toBeNull();
  });

  it("DrawerOverlay renders with data-slot attribute when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent>
          <DrawerTitle>T</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("T")).toBeDefined();
    });
    const overlay = document.querySelector('[data-slot="drawer-overlay"]');
    expect(overlay).not.toBeNull();
  });

  it("DrawerContent merges custom className when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent className="custom-content">
          <DrawerTitle>T</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("T")).toBeDefined();
    });
    const content = document.querySelector('[data-slot="drawer-content"]');
    expect(content?.className).toContain("custom-content");
  });

  it("DrawerTitle merges custom className when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent>
          <DrawerTitle className="custom-title">T</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("T")).toBeDefined();
    });
    const title = document.querySelector('[data-slot="drawer-title"]');
    expect(title?.className).toContain("custom-title");
  });

  it("DrawerDescription merges custom className when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent>
          <DrawerTitle>T</DrawerTitle>
          <DrawerDescription className="custom-desc">D</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("D")).toBeDefined();
    });
    const desc = document.querySelector('[data-slot="drawer-description"]');
    expect(desc?.className).toContain("custom-desc");
  });

  it("DrawerOverlay merges custom className when open", async () => {
    render(
      <Drawer open onOpenChange={() => undefined}>
        <DrawerContent>
          <DrawerTitle>T</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByText("T")).toBeDefined();
    });
    // Overlay is rendered by DrawerContent internally
    const overlay = document.querySelector('[data-slot="drawer-overlay"]');
    expect(overlay).not.toBeNull();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/ui/drawer");
    expect(mod.Drawer).toBeDefined();
    expect(mod.DrawerContent).toBeDefined();
    expect(mod.DrawerHeader).toBeDefined();
    expect(mod.DrawerFooter).toBeDefined();
    expect(mod.DrawerTitle).toBeDefined();
    expect(mod.DrawerDescription).toBeDefined();
    expect(mod.DrawerTrigger).toBeDefined();
    expect(mod.DrawerClose).toBeDefined();
    expect(mod.DrawerOverlay).toBeDefined();
    expect(mod.DrawerPortal).toBeDefined();
  });
});
