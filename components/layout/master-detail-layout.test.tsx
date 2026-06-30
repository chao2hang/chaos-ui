import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MasterDetailLayout } from "@/components/layout/master-detail-layout";
import type { MasterDetailLayoutProps } from "@/components/layout/master-detail-layout";

describe("MasterDetailLayout", () => {
  it("MasterDetailLayoutProps type is importable", () => {
    const _p: MasterDetailLayoutProps = {
      sidebar: <div>s</div>,
      main: <div>m</div>,
      collapsible: true,
      collapsibleDesktop: true,
    };
    expect(_p.collapsibleDesktop).toBe(true);
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/master-detail-layout");
    expect(mod.MasterDetailLayout).toBeDefined();
  });

  it("renders sidebar + main in non-collapsible mode", () => {
    const { container, getByText } = render(
      <MasterDetailLayout sidebar={<div>sidebar</div>} main={<div>main</div>} />,
    );
    expect(container.querySelector('[data-slot="master-detail-layout"]')).not.toBeNull();
    expect(getByText("sidebar")).toBeTruthy();
    expect(getByText("main")).toBeTruthy();
  });

  it("applies gap-md class by default in non-collapsible mode", () => {
    const { container } = render(
      <MasterDetailLayout sidebar={<div>s</div>} main={<div>m</div>} />,
    );
    const root = container.querySelector('[data-slot="master-detail-layout"]');
    expect(root?.classList.contains("gap-4")).toBe(true);
  });

  it("applies gap variant classes (sm, lg)", () => {
    const { container: c1 } = render(
      <MasterDetailLayout gap="sm" sidebar={<div>s</div>} main={<div>m</div>} />,
    );
    expect(c1.querySelector('[data-slot="master-detail-layout"]')?.classList.contains("gap-2")).toBe(true);

    const { container: c2 } = render(
      <MasterDetailLayout gap="lg" sidebar={<div>s</div>} main={<div>m</div>} />,
    );
    expect(c2.querySelector('[data-slot="master-detail-layout"]')?.classList.contains("gap-6")).toBe(true);
  });

  it("renders a default toggle button in collapsible mode", () => {
    const { container } = render(
      <MasterDetailLayout collapsible sidebar={<div>sidebar</div>} main={<div>main</div>} />,
    );
    const toggle = container.querySelector('button[aria-label="Toggle master"]');
    expect(toggle).not.toBeNull();
  });

  it("renders a custom masterToggle instead of the default", () => {
    render(
      <MasterDetailLayout
        collapsible
        masterToggle={<button type="button">Open Drawer</button>}
        sidebar={<div>sidebar</div>}
        main={<div>main</div>}
      />,
    );
    expect(screen.getByText("Open Drawer")).toBeDefined();
    expect(screen.queryByLabelText("Toggle master")).toBeNull();
  });

  it("toggles the drawer open via the default toggle button (uncontrolled)", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        defaultMasterOpen={false}
        sidebar={<div>sidebar</div>}
        main={<div>main</div>}
      />,
    );
    const aside = container.querySelector("aside");
    // Closed initially -> translate-x-full negative
    expect(aside?.className ?? "").toContain("-translate-x-full");
    // No backdrop when closed
    expect(container.querySelector('button[aria-label="Close master"]')).toBeNull();

    fireEvent.click(screen.getByLabelText("Toggle master"));
    const asideAfter = container.querySelector("aside");
    expect(asideAfter?.className ?? "").toContain("translate-x-0");
    expect(asideAfter?.className ?? "").not.toContain("-translate-x-full");
    // Backdrop appears when open
    expect(container.querySelector('button[aria-label="Close master"]')).not.toBeNull();
  });

  it("closes the drawer via the backdrop button", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        defaultMasterOpen
        sidebar={<div>sidebar</div>}
        main={<div>main</div>}
      />,
    );
    const backdrop = container.querySelector('button[aria-label="Close master"]');
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop as HTMLElement);
    expect(container.querySelector('button[aria-label="Close master"]')).toBeNull();
    expect(container.querySelector("aside")?.className ?? "").toContain("-translate-x-full");
  });

  it("fires onMasterOpenChange when toggling", () => {
    const onMasterOpenChange = vi.fn();
    render(
      <MasterDetailLayout
        collapsible
        defaultMasterOpen={false}
        onMasterOpenChange={onMasterOpenChange}
        sidebar={<div>sidebar</div>}
        main={<div>main</div>}
      />,
    );
    fireEvent.click(screen.getByLabelText("Toggle master"));
    expect(onMasterOpenChange).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByLabelText("Toggle master"));
    expect(onMasterOpenChange).toHaveBeenCalledWith(false);
  });

  it("respects controlled masterOpen and does not change internal state on toggle", () => {
    const { container, rerender } = render(
      <MasterDetailLayout
        collapsible
        masterOpen={false}
        sidebar={<div>sidebar</div>}
        main={<div>main</div>}
      />,
    );
    expect(container.querySelector("aside")?.className ?? "").toContain("-translate-x-full");
    // Clicking the toggle fires onMasterOpenChange but, controlled, stays closed until prop changes
    fireEvent.click(screen.getByLabelText("Toggle master"));
    expect(container.querySelector("aside")?.className ?? "").toContain("-translate-x-full");
    // Parent updates the controlled prop
    rerender(
      <MasterDetailLayout
        collapsible
        masterOpen
        sidebar={<div>sidebar</div>}
        main={<div>main</div>}
      />,
    );
    expect(container.querySelector("aside")?.className ?? "").toContain("translate-x-0");
    expect(container.querySelector('button[aria-label="Close master"]')).not.toBeNull();
  });

  it("applies sidebarWidth as maxWidth on the aside", () => {
    const { container } = render(
      <MasterDetailLayout
        sidebar={<div>s</div>}
        main={<div>m</div>}
        sidebarWidth={420}
      />,
    );
    const aside = container.querySelector("aside");
    expect(aside?.getAttribute("style") ?? "").toContain("max-width: 420px");
  });

  it("renders collapsibleDesktop toggle without md:hidden when enabled", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        collapsibleDesktop
        sidebar={<div>s</div>}
        main={<div>m</div>}
      />,
    );
    const toggleWrap = container.querySelector('button[aria-label="Toggle master"]')?.parentElement;
    expect(toggleWrap?.className ?? "").not.toContain("md:hidden");
  });

  it("applies a custom className on the root", () => {
    const { container } = render(
      <MasterDetailLayout
        sidebar={<div>s</div>}
        main={<div>m</div>}
        className="custom-mdl"
      />,
    );
    const root = container.querySelector('[data-slot="master-detail-layout"]');
    expect(root?.classList.contains("custom-mdl")).toBe(true);
  });

  // ---- Deeper interaction tests ----

  it("collapsibleDesktop applies the open-width classes when drawer is open", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        collapsibleDesktop
        defaultMasterOpen
        sidebar={<div>s</div>}
        main={<div>m</div>}
      />,
    );
    const aside = container.querySelector("aside");
    // Open + desktop collapse => width-auto arm, not the collapsed 0-width arm
    expect(aside?.className ?? "").toContain("md:w-auto");
    expect(aside?.className ?? "").toContain("md:opacity-100");
    expect(aside?.className ?? "").not.toContain("md:!w-0");
  });

  it("collapsibleDesktop applies the collapsed 0-width classes when drawer is closed", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        collapsibleDesktop
        defaultMasterOpen={false}
        sidebar={<div>s</div>}
        main={<div>m</div>}
      />,
    );
    const aside = container.querySelector("aside");
    expect(aside?.className ?? "").toContain("md:!w-0");
    expect(aside?.className ?? "").toContain("md:opacity-0");
  });

  it("non-collapsibleDesktop hides the toggle on desktop (md:hidden wrapper)", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        collapsibleDesktop={false}
        sidebar={<div>s</div>}
        main={<div>m</div>}
      />,
    );
    const toggleWrap = container.querySelector('button[aria-label="Toggle master"]')?.parentElement;
    expect(toggleWrap?.className ?? "").toContain("md:hidden");
  });

  it("controlled masterOpen true renders the backdrop and translate-x-0", () => {
    const { container } = render(
      <MasterDetailLayout
        collapsible
        masterOpen
        sidebar={<div>s</div>}
        main={<div>m</div>}
      />,
    );
    expect(container.querySelector("aside")?.className ?? "").toContain("translate-x-0");
    expect(container.querySelector('button[aria-label="Close master"]')).not.toBeNull();
  });

  it("custom masterToggle click still calls onMasterOpenChange when wired", () => {
    const onMasterOpenChange = vi.fn();
    render(
      <MasterDetailLayout
        collapsible
        defaultMasterOpen={false}
        onMasterOpenChange={onMasterOpenChange}
        masterToggle={<button type="button" onClick={() => onMasterOpenChange(true)}>Open Drawer</button>}
        sidebar={<div>s</div>}
        main={<div>m</div>}
      />,
    );
    fireEvent.click(screen.getByText("Open Drawer"));
    expect(onMasterOpenChange).toHaveBeenCalledWith(true);
  });

  it("applies gap-sm on the root in collapsible mode", () => {
    const { container } = render(
      <MasterDetailLayout collapsible gap="sm" sidebar={<div>s</div>} main={<div>m</div>} />,
    );
    const root = container.querySelector('[data-slot="master-detail-layout"]');
    expect(root?.classList.contains("gap-2")).toBe(true);
  });

  it("renders a custom className on the root in collapsible mode", () => {
    const { container } = render(
      <MasterDetailLayout collapsible className="custom-collapsible" sidebar={<div>s</div>} main={<div>m</div>} />,
    );
    const root = container.querySelector('[data-slot="master-detail-layout"]');
    expect(root?.classList.contains("custom-collapsible")).toBe(true);
  });

  it("forwards extra div props to the root element", () => {
    const { container } = render(
      <MasterDetailLayout id="md-root" aria-label="Master detail" sidebar={<div>s</div>} main={<div>m</div>} />,
    );
    const root = container.querySelector('[data-slot="master-detail-layout"]');
    expect(root?.id).toBe("md-root");
    expect(root?.getAttribute("aria-label")).toBe("Master detail");
  });
});
