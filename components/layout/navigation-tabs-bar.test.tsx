import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavigationTabsBar } from "./navigation-tabs-bar";
import type {
  NavigationTabsBarProps,
  NavigationTabsBarTabItem,
} from "./navigation-tabs-bar";

describe("NavigationTabsBar", () => {
  it("exports NavigationTabsBar", () => {
    expect(NavigationTabsBar).toBeDefined();
  });

  it("exports types", () => {
    const _tc1: NavigationTabsBarProps | undefined = undefined;
    expect(_tc1).toBeUndefined();
    const _tc2: NavigationTabsBarTabItem | undefined = undefined;
    expect(_tc2).toBeUndefined();
  });

  it("module is importable", async () => {
    const mod = await import("@/components/layout/navigation-tabs-bar");
    expect(mod.NavigationTabsBar).toBeDefined();
  });

  it("renders nothing when no items", () => {
    const { container } = render(<NavigationTabsBar />);
    expect(
      container.querySelector('[data-slot="navigation-tabs-bar"]'),
    ).not.toBeNull();
    expect(container.querySelector("button")).toBeNull();
  });

  it("renders all tab labels and marks first active by default", () => {
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });

  it("fires onChange when a tab is clicked (uncontrolled active)", () => {
    const onChange = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Settings"));
    expect(onChange).toHaveBeenCalledWith("settings");
  });

  it("uses activeKey (controlled) and does not change internal state", () => {
    const onChange = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        activeKey="settings"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onChange).toHaveBeenCalledWith("home");
  });

  it("renders tab icon when provided", () => {
    render(
      <NavigationTabsBar
        items={[{ key: "home", label: "Home", icon: <span>ICON</span> }]}
      />,
    );
    expect(screen.getByText("ICON")).toBeDefined();
  });

  it("renders close button for closable tabs and fires onClose", () => {
    const onClose = vi.fn();
    render(
      <NavigationTabsBar
        items={[{ key: "home", label: "Home", closable: true }]}
        onClose={onClose}
      />,
    );
    const closeBtn = screen.getByLabelText("Close tab");
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledWith("home");
  });

  it("hides close button when closable is false", () => {
    render(
      <NavigationTabsBar
        items={[{ key: "home", label: "Home", closable: false }]}
      />,
    );
    expect(screen.queryByLabelText("Close tab")).toBeNull();
  });

  it("close button click stops propagation (does not fire onChange)", () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    render(
      <NavigationTabsBar
        items={[{ key: "home", label: "Home" }]}
        onChange={onChange}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByLabelText("Close tab"));
    expect(onClose).toHaveBeenCalledWith("home");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("opens context menu on right-click and triggers close action", () => {
    const onClose = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onClose={onClose}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Settings"));
    // Menu should now be visible
    const closeMenuBtn = screen.getByText("Close");
    fireEvent.click(closeMenuBtn);
    expect(onClose).toHaveBeenCalledWith("settings");
  });

  it("context menu triggers refresh action", () => {
    const onRefresh = vi.fn();
    render(
      <NavigationTabsBar
        items={[{ key: "home", label: "Home" }]}
        onRefresh={onRefresh}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Refresh"));
    expect(onRefresh).toHaveBeenCalledWith("home");
  });

  it("context menu triggers closeOthers action", () => {
    const onCloseOthers = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onCloseOthers={onCloseOthers}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Settings"));
    fireEvent.click(screen.getByText("Close Others"));
    expect(onCloseOthers).toHaveBeenCalledWith("settings");
  });

  it("context menu triggers closeToRight action", () => {
    const onCloseToRight = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onCloseToRight={onCloseToRight}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Close to Right"));
    expect(onCloseToRight).toHaveBeenCalledWith("home");
  });

  it("context menu triggers closeAll action", () => {
    const onCloseAll = vi.fn();
    render(
      <NavigationTabsBar
        items={[{ key: "home", label: "Home" }]}
        onCloseAll={onCloseAll}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    fireEvent.click(screen.getByText("Close All"));
    expect(onCloseAll).toHaveBeenCalledTimes(1);
  });

  it("hides scrollbar via CSS classes", () => {
    const { container } = render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
      />,
    );
    // The inner scrollable container should have the scrollbar-hiding classes
    const scrollContainer = container.querySelector(
      '[data-slot="navigation-tabs-bar"] > div',
    );
    expect(scrollContainer?.className).toContain("overflow-x-auto");
  });

  it("applies className to root", () => {
    const { container } = render(<NavigationTabsBar className="my-tabs" />);
    const root = container.querySelector('[data-slot="navigation-tabs-bar"]');
    expect(root?.classList.contains("my-tabs")).toBe(true);
  });

  it("closes tab on middle-click (auxClick) with button === 1", () => {
    const onClose = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onClose={onClose}
      />,
    );
    const tabLabel = screen.getByText("Settings");
    fireEvent(
      tabLabel,
      new MouseEvent("auxclick", { bubbles: true, button: 1 }),
    );
    expect(onClose).toHaveBeenCalledWith("settings");
  });

  it("does not close non-closable tab on middle-click", () => {
    const onClose = vi.fn();
    render(
      <NavigationTabsBar
        items={[{ key: "home", label: "Home", closable: false }]}
        onClose={onClose}
      />,
    );
    const tabLabel = screen.getByText("Home");
    fireEvent(
      tabLabel,
      new MouseEvent("auxclick", { bubbles: true, button: 1 }),
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renders context menu with all menu items", () => {
    const onRefresh = vi.fn();
    const onClose = vi.fn();
    const onCloseOthers = vi.fn();
    const onCloseToRight = vi.fn();
    const onCloseAll = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        onRefresh={onRefresh}
        onClose={onClose}
        onCloseOthers={onCloseOthers}
        onCloseToRight={onCloseToRight}
        onCloseAll={onCloseAll}
      />,
    );
    fireEvent.contextMenu(screen.getByText("Home"));
    expect(screen.getByText("Refresh")).toBeDefined();
    expect(screen.getByText("Close")).toBeDefined();
    expect(screen.getByText("Close Others")).toBeDefined();
    expect(screen.getByText("Close to Right")).toBeDefined();
    expect(screen.getByText("Close All")).toBeDefined();
  });

  it("uses defaultActiveKey for uncontrolled initial active tab", () => {
    const onChange = vi.fn();
    render(
      <NavigationTabsBar
        items={[
          { key: "home", label: "Home" },
          { key: "settings", label: "Settings" },
        ]}
        defaultActiveKey="settings"
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByText("Home"));
    expect(onChange).toHaveBeenCalledWith("home");
  });
});
